import embed from 'vega-embed';

const pythonDefinitions = `
import numpy as np
from sklearn.decomposition import PCA
from sklearn.manifold import MDS
from sklearn.cluster import AgglomerativeClustering
import snowballstemmer

stemmer = snowballstemmer.stemmer('english')

def pca(vals, n_comps=10):
    return PCA(n_components=n_comps).fit_transform(np.vstack(vals.to_py()))

def mds(vals):
    return MDS(n_components=2).fit_transform(np.vstack(vals.to_py()))

def hclust(vals, n_clusters=10):
    n_clusters = int(n_clusters)
    ward = AgglomerativeClustering(n_clusters=n_clusters, linkage="ward").fit(np.vstack(vals.to_py()))
    return ward.labels_

def lemmatize(texts):
    return [stemmer.stemWords(t.split()) for t in texts]
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

function plotTextEmbedding(data, plotDivId, textDivId) {
    let schema = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        // "description": "A scatterplot showing body mass and flipper lengths of penguins.",
        "data": {"values": data},
        "mark": {"type": "circle", "tooltip": {"content": "data"}},
        "width": 500,
        "height": 500,
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
      }

      console.log(schema)

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

export default async function analyseTexts(query, {plotDivId, textDivId, pyodideReadyPromise, nClusters=10} = {}) {
    let res = queryS2(query)
    let pyodide = await pyodideReadyPromise;
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install('snowballstemmer');

    await pyodide.loadPackage(["scikit-learn", "numpy"])
    res.then(data => {
        data = data['data']
        storeObject('textData', data)
        let texts = data.map(x => x['title'] + ' ' + x['abstract'])
        console.log("Queried!")
        embedW2V(texts).then(w2v => {
            console.log("W2V!")
            pyodide.runPython(pythonDefinitions)
            let pcaRes = pyodide.globals.get("pca")(w2v).toJs({create_proxies : false})
            storeObject('pcaRes', pcaRes.map(x => Array.from(x)))
            let embedding = pyodide.globals.get("mds")(pcaRes).toJs({create_proxies : false})
            storeObject('embedding', embedding.map(x => Array.from(x)))
            let clusts = pyodide.globals.get("hclust")(pcaRes, nClusters).toJs({create_proxies : false})
            storeObject('clusts', clusts)

            console.log("Embedded!")

            const plotData = preparePlotData(data, embedding, clusts)
            plotTextEmbedding(plotData, plotDivId, textDivId)
        })
    })
}