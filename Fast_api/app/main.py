from fastapi import FastAPI
from app.database import engine
from app import models
from app.routers import users, products, orders

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(users.router)
# app.include_router(products.router)
# app.include_router(orders.router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}