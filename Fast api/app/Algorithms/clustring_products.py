import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import pandas as pd
from sqlalchemy import create_engine

DATABASE_URL = "mysql+mysqlconnector://root:@localhost/softlapstoredb"
engine = create_engine(DATABASE_URL)

df = pd.read_sql("SELECT id, name, description FROM products", engine)

tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(df['description'])

num_clusters = 2
kmeans = KMeans(n_clusters=num_clusters, random_state=42)
kmeans.fit(tfidf_matrix)


df['cluster'] = kmeans.labels_
df['cluster'] = df['cluster'].astype(int)


joblib.dump(tfidf_vectorizer, 'tfidf_vectorizer.pkl') 
joblib.dump(kmeans, 'kmeans_model.pkl')  
