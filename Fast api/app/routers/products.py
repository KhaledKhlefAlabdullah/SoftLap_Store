from pydantic import BaseModel
from fastapi import APIRouter
import joblib


router = APIRouter(
    prefix="/products",
    tags=["products"],
)




class TextInput(BaseModel):
    text: str

@router.post("/predict/")
def predict_cluster(text_input: TextInput):
    
    new_text = text_input.text
    try:
        tfidf_vectorizer = joblib.load('app/Algorithms/tfidf_vectorizer.pkl')  
        kmeans = joblib.load('app/Algorithms/kmeans_model.pkl')  
        
        new_text_tfidf = tfidf_vectorizer.transform([new_text])
        cluster = kmeans.predict(new_text_tfidf)
    except Exception as e:
        return {"error": str(e)}

    return {"cluster": int(cluster[0])}
