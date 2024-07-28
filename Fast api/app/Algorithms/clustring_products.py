import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import joblib

from app import crud

kmeans = joblib.load('kmeans_model.pkl')
tfidf_vectorizer = joblib.load('tfidf_vectorizer.pkl')

def train_model(num_clusters):
    # إعادة تدريب النموذج مع عدد التجمعات المطلوب
    product_contents = crud.get_all_product_contents(db)
    documents = [content for _, content in product_contents]
    tfidf_matrix = tfidf_vectorizer.transform(documents)
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    kmeans.fit(tfidf_matrix)
    return kmeans

def predict_cluster(new_text, kmeans):
    new_text_tfidf = tfidf_vectorizer.transform([new_text])
    cluster = kmeans.predict(new_text_tfidf)
    return cluster[0]
