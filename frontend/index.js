import embed from 'vega-embed';
import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';
// import natural from 'natural';
import { calculateTfIdf } from 'ts-tfidf'

import { mean } from 'mathjs'
import { UMAP } from 'umap-js';
import { agnes } from 'ml-hclust';

const nlp = winkNLP(model, ['pos', 'ner', 'cer']);
const its = nlp.its;
const as = nlp.as;



const pythonDefinitions = `
import numpy as np
from sklearn.decomposition import PCA
from sklearn.manifold import MDS
from sklearn.cluster import AgglomerativeClustering
# import snowballstemmer
from textblob import TextBlob, Word
import re

# stemmer = snowballstemmer.stemmer('english')

def pca(vals, n_comps=10):
    return PCA(n_components=n_comps).fit_transform(np.vstack(vals.to_py()))

def mds(vals):
    return MDS(n_components=2).fit_transform(np.vstack(vals.to_py()))

def hclust(vals, n_clusters=10):
    n_clusters = int(n_clusters)
    ward = AgglomerativeClustering(n_clusters=n_clusters, linkage="ward").fit(np.vstack(vals.to_py()))
    return ward.labels_

def lemmatize(texts):
    return [[Word(w).lemmatize() for w in text.split()] for text in texts]
    # return [[w.lemmatize() for w in TextBlob(text).words] for text in texts]
`

function storeOrCreate(eid, func, force=false) {
  if (force || (sessionStorage.getItem(eid) === null)) {
    res = func()
    sessionStorage.setItem(eid, res)
    return res
  }
  return sessionStorage.getItem(eid)
}

function storeObject(eid, obj) {
    sessionStorage.setItem(eid, JSON.stringify(obj))
}

function loadObject(eid) {
    return JSON.parse(sessionStorage.getItem(eid))
}

async function queryS2(query, limit=100) {
    let fields = 'title,abstract,year,citationCount,influentialCitationCount,url'
    let qUrl = `https://api.semanticscholar.org/graph/v1/paper/search?query="${query}"&limit=${limit}&offset=0&fields=${fields}`
    console.log(qUrl)

    const response = await fetch(qUrl);
    const data = await response.json();
    return data;
}

async function embedW2V(texts) {
    const response = await fetch("http://127.0.0.1:28776/w2v", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(texts)
    });
    const data = await response.json();
    return data;
}

function plotTextEmbedding(data, clusterData, plotDivId, textDivId) {
    let schema = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "datasets": {
            "point-data": data,
            "text-data": clusterData
        },
        "layer": [
            {
                "data": {"name": "point-data"},
                "mark": {"type": "circle", "tooltip": {"content": "data"}},
                "encoding": {
                    "x": {
                    "field": "x",
                    "type": "quantitative",
                    "scale": {"zero": false}
                    },
                    "y": {
                    "field": "y",
                    "type": "quantitative",
                    "scale": {"zero": false}
                    },
                    "size": {"field": "logCit", "type": "quantitative"},
                //   "color": {"field": "rank", "type": "quantitative", "scale": {"scheme": "goldred", "reverse": true}},
                    "color": {"field": "cluster"},
                    "opacity": {"field": "opacity", "legend": null}
                //   "shape": {"field": "Species", "type": "nominal"}
                }
            },
            {
                "data": {"name": "text-data"},
                "mark": {"type": "text"},
                "encoding": {
                    "x": {
                        "field": "x",
                        "type": "quantitative",
                        "scale": {"zero": false}
                    },
                    "y": {
                        "field": "y",
                        "type": "quantitative",
                        "scale": {"zero": false}
                    },
                    "text": {"field": "cluster"},
                }
            }
        ],
        "width": 500,
        "height": 500
      }

    //   console.log(schema)
      embed(`#${plotDivId}`, schema).then(function(result) {{
        result.view.addEventListener('click', function(event, item) {{
            document.getElementById(textDivId).innerHTML = `<h2 class="title"><a href=${item.datum.url} target="_blank">${item.datum.title}</a></h2><br>${item.datum.abstract}`;
        }});
      }}).catch(console.error);
}

function preparePlotData(textData, embedding, clusters) {
    let minYear = Math.min(...textData.map(d => d.year))
    return textData.map((d,i) => {
        return({
            ...d,
            'x': embedding[i][0].toFixed(2),
            'y': embedding[i][1].toFixed(2),
            'logCit': Math.log10(d.citationCount),
            'opacity': (d.year - minYear) / (2022 - minYear),
            'rank': i,
            'cluster': clusters[i]
        })
    })
}

export async function updateNClusters({plotDivId, textDivId, pyodideReadyPromise, nClusters}) {
    const emb = loadObject('embedding')
    const pcaRes = loadObject('pcaRes')

    let pyodide = await pyodideReadyPromise;
    const clusts = pyodide.globals.get("hclust")(pcaRes, nClusters).toJs({create_proxies : false})
    storeObject('clusts', clusts)

    const data = loadObject('textData')
    const plotData = preparePlotData(data, emb, clusts)
    plotTextEmbedding(plotData, plotDivId, textDivId)
    console.log("Updated!")
}

export async function initializePython(pyodidePromise) {
    let pyodide = await pyodidePromise;
    await pyodide.loadPackage(["scikit-learn", "numpy", "micropip"]);
    const micropip = pyodide.pyimport("micropip");
    await micropip.install('textblob');
    await micropip.install('snowballstemmer');
    return pyodide;
}

function cosine(x, y) {
    let result = 0.0;
    let normX = 0.0;
    let normY = 0.0;
  
    for (let i = 0; i < x.length; i++) {
      result += x[i] * y[i];
      normX += x[i] ** 2;
      normY += y[i] ** 2;
    }
  
    if (normX === 0 && normY === 0) {
      return 0;
    } else if (normX === 0 || normY === 0) {
      return 1.0;
    } else {
      return 1.0 - result / Math.sqrt(normX * normY);
    }
}

// Word2Vec embedding

async function fetchWord2Vec() {
    return fetch('static/w2v.json').then(r => r.json());
}

function embedSentence(tokens, w2v) {
    // get the average of all word vectors for tokens that are present in w2v
    let vecs = tokens.map(t => w2v[t]).filter(v => v !== undefined)
    if (vecs.length === 0) {
        return Array(Object.values(w2v)[0].length).fill(0.0)
    }
    return mean(vecs, 0)
}

// Clustering and keywords

function extractAgnesClusters(tree, nClusters, nObjects) {
    const groups = tree.group(parseInt(nClusters))
    let clusts = Array(nObjects).fill(-1)
    for (let cli = 0; cli < nClusters; ++cli) {
        let ch = groups.children[cli]
        for (const chi of ch.indices()) {
            clusts[chi] = cli
        }
    }

    return clusts
}

function getIdsPerCluster(clusters) {
    let clusterIds = Array((new Set(clusters)).size).fill().map(() => [])
    for (let i = 0; i < clusters.length; ++i) {
        clusterIds[clusters[i]].push(i)
    }
    return clusterIds;
}

function extractKeywordsTfIdf(tokens, clusters, {nKeywords=10} = {}) {
    const tfidf = calculateTfIdf({texts: tokens.map(t => t.join(' '))})
    const clusterIds = getIdsPerCluster(clusters)

    // average tfidf for each cluster
    const words = Array.from(tfidf[0].keys())
    const clusterTfidf = clusterIds.map(ids => mean(ids.map(i => Array.from(tfidf[i].values())), 0))

    // get the top nKeywords keywords for each cluster
    const clusterKeywords = clusterTfidf.map(ct => {
        const sorted = ct.map((t,i) => [i,t]).sort((a,b) => b[1] - a[1])
        return sorted.slice(0, nKeywords).map(t => words[t[0]])
    })

    // join keywords per cluster
    const keywords = clusterKeywords.map(kw => kw.join(','))
    return keywords;
   // TODO: try to aggregate documents before constructing TfIdf
}

export default async function analyseTexts(query, {plotDivId, textDivId, pyodideReadyPromise, nResults=100, nClusters=10} = {}) {
    console.log("Query: " + query)
    let w2vReq = fetchWord2Vec() //.then(w2v => {storeObject('w2v', w2v); return w2v;})
    let docInfo = await fetch('static/brain_disease_rna.json').then(r => r.json());
    let docs = docInfo.map(d => nlp.readDoc(d.text))
    let tokens = docs.map(d => {
        return d.tokens().
            filter( (t) => ( t.out(its.type) === 'word' && !t.out(its.stopWordFlag) ) ).
            out(its.normal) // its.lemma
    })

    let w2v = await w2vReq;
    let sentVecs = tokens.map(ts => embedSentence(ts, w2v))

    const umap = new UMAP({minDist: 0.1, spread: 2, distanceFn: cosine});
    const embedding = umap.fit(sentVecs);

    const tree = agnes(embedding, {method: 'ward'});
    const clusts = extractAgnesClusters(tree, nClusters, embedding.length)
    const keywords = extractKeywordsTfIdf(tokens, clusts, {nKeywords: 5})

    const plotData = preparePlotData(docInfo, embedding, clusts.map(cl => keywords[cl]))
    const clusterIds = getIdsPerCluster(clusts)
    const clusterData = clusterIds.map(ids => {return({
        x: mean(ids.map(i => plotData[i].x)),
        y: mean(ids.map(i => plotData[i].y)),
        cluster: plotData[ids[0]].cluster
    })})
    console.log(clusterData)

    plotTextEmbedding(plotData, clusterData, plotDivId, textDivId)

    // console.log(nlp)
    // console.log(docs)
    // console.log(clusts)
    
    // let res = queryS2(query, nResults)
    // let pyodide = await pyodideReadyPromise;
    // pyodide.runPython(pythonDefinitions)

    // let texts = pyodide.globals.get("lemmatize")(['the bats saw the cats with stripes hanging upside down by their feet']).toJs({create_proxies : false})
    // console.log(texts)

    return;

    res.then(data => {
        data = data['data']
        storeObject('textData', data)
        let texts = data.map(x => x.title + (x.abstract ? ' ' + x.abstract : ''))
        console.log(texts)

        texts = pyodide.globals.get("lemmatize")(texts).toJs({create_proxies : false})

        console.log(texts)
        console.log("Queried!")
        // embedW2V(texts).then(w2v => {
        //     console.log("W2V!")
        //     let pcaRes = pyodide.globals.get("pca")(w2v).toJs({create_proxies : false})
        //     storeObject('pcaRes', pcaRes.map(x => Array.from(x)))
        //     let embedding = pyodide.globals.get("mds")(pcaRes).toJs({create_proxies : false})
        //     storeObject('embedding', embedding.map(x => Array.from(x)))
        //     let clusts = pyodide.globals.get("hclust")(pcaRes, nClusters).toJs({create_proxies : false})
        //     storeObject('clusts', clusts)

        //     console.log("Embedded!")

        //     const plotData = preparePlotData(data, embedding, clusts)
        //     plotTextEmbedding(plotData, plotDivId, textDivId)
        // })
    })
}