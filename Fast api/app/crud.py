from sqlalchemy.orm import Session
import app.models as models, app.schemas  as schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(email=user.email, hashed_password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_categories(db: Session):
    return db.query(models.Category).all()

def get_products(db: Session):
    return db.query(models.Product).all()

def get_product_by_id(db: Session, product_id: int):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product:
       return {
            "id": product.id,
            "cluster_id": product.cluster_id,
            "user_id": product.user_id,
            "company_id": product.company_id,
            "category_id": product.category_id,
            "name": product.name,
            "description": product.description,
            "face_image": product.face_image,
            "price": product.price,
            "rating": product.rating,
        }
    return None

