from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import app.crud as crud, app.models as models, app.schemas as schemas
from app.database import SessionLocal

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