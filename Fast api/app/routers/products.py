# from pydantic import BaseModel
# from fastapi import APIRouter
# import joblib


# router = APIRouter(
#     prefix="/products",
#     tags=["products"],
# )




# class TextInput(BaseModel):
#     text: str

# @router.post("/predict/")
# def predict_cluster(text_input: TextInput):
    
#     new_text = text_input.text
#     try:

#         tfidf_vectorizer = joblib.load('app/Algorithms/tfidf_vectorizer.pkl')  
#         kmeans = joblib.load('app/Algorithms/kmeans_model.pkl')  
        
#         new_text_tfidf = tfidf_vectorizer.transform([new_text])
#         cluster = kmeans.predict(new_text_tfidf)
#     except Exception as e:
#         return {"error": str(e)}

#     return {"cluster": int(cluster[0])}

import pandas as pd
from pydantic import BaseModel
from fastapi import APIRouter
import joblib
from sklearn.cluster import KMeans
from sqlalchemy import create_engine
from sklearn.feature_extraction.text import TfidfVectorizer

router = APIRouter(
    prefix="/products",
    tags=["products"],
)




class TextInput(BaseModel):
    text: str

@router.post("/predict/")
def predict_cluster(text_input: TextInput):
    DATABASE_URL = "mysql+mysqlconnector://root:@localhost/softlapstoredb"
    engine = create_engine(DATABASE_URL)

    # Read data from the database
    df = pd.read_sql("SELECT id, name, description FROM products", engine)

    # Initialize and fit the TfidfVectorizer
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(df['description'])

    # Train KMeans clustering
    num_clusters = 2
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    kmeans.fit(tfidf_matrix)

    new_text = text_input.text
    try:
        # Transform new text into the same tf-idf space
        new_text_tfidf = tfidf_vectorizer.transform([new_text])
        # Predict the cluster for the new text
        cluster = kmeans.predict(new_text_tfidf)
    except Exception as e:
        return {"error": str(e)}

    return {"cluster": int(cluster[0])}
