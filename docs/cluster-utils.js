import { Corpus } from "./_snowpack/pkg/tiny-tfidf.js";

import { Cluster } from './_snowpack/pkg/ml-hclust.js';
import { mean } from './_snowpack/pkg/mathjs.js'

export function extractKeywordsTfIdf(tokens, clusters, {nKeywords=10} = {}) {
    // const corpus = calculateTfIdf({texts: tokens.map(t => t.join(' ')), stopWords: ["null"]})
    const corpus = new Corpus(
        tokens.map((t,i) => i), tokens.map(t => t.join(' ')), true, ["null"]
    );
    const clusterIds = getIdsPerCluster(clusters)

    // average tfidf for each cluster
    const words = Array.from(corpus.getDocumentVector(0).keys())
    const clusterTfidf = clusterIds.map(ids => mean(ids.map(i => Array.from(corpus.getDocumentVector(i).values())), 0))

    // get the top nKeywords keywords for each cluster
    const clusterKeywords = clusterTfidf.map(ct => {
        const sorted = ct.map((t,i) => [i,t]).sort((a,b) => b[1] - a[1])
        return sorted.slice(0, nKeywords).map(t => words[t[0]])
    })

    // join keywords per cluster
    const keywords = clusterKeywords.map(kw => kw.join(','))
    return keywords;
}

export function extractAgnesClusters(tree, nClusters, nObjects) {
    tree = toCluster(tree)
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

export function getIdsPerCluster(clusters) {
    let clusterIds = Array((new Set(clusters)).size).fill().map(() => [])
    for (let i = 0; i < clusters.length; ++i) {
        clusterIds[clusters[i]].push(i)
    }
    return clusterIds;
}

function toCluster(tree) {
    const cluster = new Cluster();
    cluster.height = tree.height;
    cluster.size = tree.size;
    cluster.index = tree.index;
    cluster.isLeaf = tree.isLeaf;
    cluster.children = tree.children.map(toCluster);
    return cluster;
}