from gensim.models import KeyedVectors
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import RegexpTokenizer
import numpy as np

from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

wv_embeddings = KeyedVectors.load("/home/vpetukhov/data_nlp/embeddings/w2v_arxiv_abstracts_gensim.model")
lemmatizer = WordNetLemmatizer()

def normalize_text_doc(doc, added_stop_words=None):
    """ tokenize, remove stop words and normalize words of sentence for english and russian"""
    stop_words = set(stopwords.words('english'))
    lemmatize = lemmatizer.lemmatize

    if added_stop_words is not None:
        stop_words |= set(added_stop_words)

    words = [lemmatize(w.lower()) for w in RegexpTokenizer(r'\w+').tokenize(doc) if len(w) > 2]
    return [w for w in words if w not in stop_words]


def words_to_vec(words, embeddings):
    emb_mtx = np.r_[[embeddings[w] for w in words if w in embeddings]]
    if emb_mtx.shape[0] == 0:
        return np.zeros(embeddings["i"].size)

    return emb_mtx.mean(axis=0)


@app.route('/<path:path>')
def send_front(path):
    return send_from_directory('../frontend/', path)


@app.route("/w2v", methods=['POST'])
def embed_w2v():
    texts = request.get_json(force=True)
    return jsonify([words_to_vec(normalize_text_doc(d), wv_embeddings.wv).tolist() for d in texts]), 200

if __name__ == '__main__':
    app.run(debug=True, port=28776)
