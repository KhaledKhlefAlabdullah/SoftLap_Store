from pydantic import BaseModel
from database import SessionLocal
from fastapi import APIRouter
import joblib
import mysql.connector
import pandas as pd

router = APIRouter(
    prefix="/api/products",
    tags=["products"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


tfidf_vectorizer = joblib.load('../Algorithms/__pycache__/tfidf_vectorizer.pkl')
kmeans = joblib.load('../Algorithms/__pycache__/kmeans_model.pkl')


mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="softlapstoredb"
)


df = pd.read_sql("SELECT id, name, description FROM products", mydb)


class TextInput(BaseModel):
    text: str

# @router.post("/predict/")
def predict_cluster(text_input: TextInput):
    new_text = text_input.text
    new_text_tfidf = tfidf_vectorizer.transform([new_text])
    cluster = kmeans.predict(new_text_tfidf)
    mydb.close()
    return {"cluster": int(cluster[0])}