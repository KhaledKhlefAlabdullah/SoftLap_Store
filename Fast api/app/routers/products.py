from itertools import product
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
import app.crud as crud, app.models as models, app.schemas as schemas
from app.database import SessionLocal
from app.Algorithms.clustring_products import train_model, predict_cluster

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


@router.get("/", response_model=schemas.CategoriesProductsResponse)
def read_categories_products(db: Session = Depends(get_db)):
    categories = crud.get_categories(db)
    products = crud.get_products(db)
    
    # Constructing the response
    return {
        "categories": categories,
        "products": products
    }

@router.get("/details/{product_id}", response_model=schemas.ProductRead)
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = crud.get_product_by_id(db, product_id=product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.get("/similar_products/{product_id}")
def get_similar_products(product_id: int, num_clusters: Optional[int] = Query(2, ge=1, le=10), db: Session = Depends(get_db)):

    product_content = crud.get_product_content_by_id(db, product_id)
    if not product_content:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_content = product_content[0]  
    kmeans = train_model(num_clusters)

    product_cluster = predict_cluster(product_content, kmeans)

    all_products = crud.get_all_product_contents(db)
    

    similar_products = [
        product for product_id, content in all_products
        if predict_cluster(content, kmeans) == product_cluster and product_id != product_id
    ]
    
    return similar_products