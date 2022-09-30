import embed from 'vega-embed';
import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

import { mean } from 'mathjs'
import { UMAP } from 'umap-js';
import { agnes } from 'ml-hclust';

import {getIdsPerCluster} from './cluster-utils.js'

const nlp = winkNLP(model, ['pos', 'ner', 'cer']);
const its = nlp.its;


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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function queryS2Short(query, limit=100, offset=0) {
    let fields = 'title,abstract,year,citationCount,influentialCitationCount,url'
    let qUrl = `https://api.semanticscholar.org/graph/v1/paper/search?query="${query}"&limit=${limit}&offset=${offset}&fields=${fields}`
    console.log(qUrl)

    const response = await fetch(qUrl);
    const data = await response.json();
    return data.data;
}

async function queryS2(query, limit=100) {
    if (limit <= 100)
        return await queryS2Short(query, limit);

    let res = []
    for (let off = 0; off < limit; off += 100) {
        res = res.concat(await queryS2Short(query, Math.min(limit - off, 100), off));
        await sleep(200);
    }

    return res;
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
                "mark": {"type": "circle"},
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
                    "opacity": {"field": "opacity", "legend": null},
                    "tooltip": [{"field": "title"}, {"field": "citationCount"}, {"field": "year"}, {"field": "cluster"}, {"field": "rank"}]
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
            if (item === null || item.datum === undefined)
                return;
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

function prepareClusterData(clusts, keywords, plotData) {
    const clusterIds = getIdsPerCluster(clusts)
    const clusterData = clusterIds.map((ids,ci) => {return({
        x: mean(ids.map(i => plotData[i].x)),
        y: mean(ids.map(i => plotData[i].y)),
        cluster: keywords[ci]
    })})
    
    return(clusterData)
}

function plotClusterDataAsync({plotDivId, textDivId, nClusters, docInfo, tokens, embedding, tree}) {
    let worker = new Worker("KeywordWorker.js", { type: "module" });
    worker.onmessage = function(e) {
        if (e.data.type == 'update') {
            console.log(e.data.text)
        } else {
            console.log("worker done!")
            const clusts = e.data.clusts;
            const keywords = e.data.keywords;

            const plotData = preparePlotData(docInfo, embedding, clusts.map(cl => keywords[cl]))
            const clusterData = prepareClusterData(clusts, keywords, plotData)
            plotTextEmbedding(plotData, clusterData, plotDivId, textDivId)
        }
    }
    worker.postMessage({tokens: tokens, nClusters: nClusters, embedding: embedding, tree: tree})
}

export async function updateNClusters({plotDivId, textDivId, nClusters}) {
    const embedding = loadObject('umap')
    const tokens = loadObject('tokens')
    const docInfo = loadObject('docInfo')
    const tree = loadObject('hclust')

    plotClusterDataAsync({
        plotDivId: plotDivId, textDivId: textDivId, nClusters: nClusters, 
        docInfo: docInfo, tokens: tokens, embedding: embedding, tree: tree
    })
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

export default async function analyseTexts(query, {plotDivId, textDivId, nResults=100, nClusters=10} = {}) {
    console.log("Query: " + query)
    let w2vReq = fetchWord2Vec()
    let docReq = queryS2(query, nResults)
    // let docReq = fetch('static/brain_disease_rna.json').then(r => r.json());
    docReq.then(di => {
        const docInfo = di.map(d => {return({...d, text: d.title + " " + d.abstract})})
        const docs = docInfo.map(d => nlp.readDoc(d.text))
        const tokens = docs.map(d => {
            return d.tokens().
                filter( (t) => ( t.out(its.type) === 'word' && !t.out(its.stopWordFlag) ) ).
                out(its.normal) // its.lemma
        })

        storeObject('tokens', tokens)
        storeObject('docInfo', docInfo)
        w2vReq.then(w2v => {
            const sentVecs = tokens.map(ts => embedSentence(ts, w2v))

            const umap = new UMAP({minDist: 0.1, spread: 2, distanceFn: cosine});
            const embedding = umap.fit(sentVecs);

            storeObject('umap', embedding)
            const tree = agnes(embedding, {method: 'ward'});
            storeObject('hclust', tree)

            plotClusterDataAsync({
                plotDivId: plotDivId, textDivId: textDivId, nClusters: nClusters, 
                docInfo: docInfo, tokens: tokens, embedding: embedding, tree: tree
            })
        })
    })

    return;
}