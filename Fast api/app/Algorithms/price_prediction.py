from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from sklearn.linear_model import LinearRegression
from typing import List

# تحميل النموذج المدرب
model = joblib.load('price_prediction_model.pkl')

app = FastAPI()
