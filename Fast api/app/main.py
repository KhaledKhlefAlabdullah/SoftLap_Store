from fastapi import FastAPI, HTTPException
from app.database import engine
from app import models
from app.routers import users, products, orders
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to restrict origins
    allow_credentials=True,
    allow_methods=["*"],  # Change this to restrict methods
    allow_headers=["*"],  # Change this to restrict headers
)

models.Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(products.router)
# app.include_router(orders.router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

# تحديد المسار الكامل لملف النموذج
model_path = os.path.join(os.path.dirname(__file__), 'price_prediction_model.pkl')

# محاولة تحميل نموذج التنبؤ
try:
    model = joblib.load(model_path)
except FileNotFoundError:
    raise RuntimeError(f"Model file not found at path: {model_path}")

# تعريف نموذج البيانات الواردة
class PredictionRequest(BaseModel):
    number: int
    name: int
    rating: int

class PredictionResponse(BaseModel):
    predicted_price: float

@app.post("/predict", response_model=PredictionResponse)
def predict_price(request: PredictionRequest):
    # إعداد البيانات الواردة للتنبؤ
    input_data = pd.DataFrame([{
        'number': request.number,
        'name': request.name,
        'rating': request.rating
    }])
    
    # إجراء التنبؤ
    try:
        predicted_price = model.predict(input_data)[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
    
    # إرجاع التنبؤ
    return PredictionResponse(predicted_price=predicted_price)
