from fastapi import FastAPI
from app.database import engine
from app import models
from app.routers import users, products, orders
from fastapi.middleware.cors import CORSMiddleware

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

