from typing import List, Optional
from pydantic import BaseModel

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

# For categories and products
class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryRead(CategoryBase):
    id: int
    name: str
    description: Optional[str] = None
    class Config:
        orm_mode = True

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    face_image: Optional[str] = None
    price: float
    rating: Optional[float] = None


class ProductRead(BaseModel):
    id: int
    cluster_id: Optional[int]
    user_id: Optional[int]
    company_id: Optional[int]
    category_id: Optional[int]
    name: str
    description: Optional[str]
    face_image: Optional[str]
    price: Optional[float]
    rating: Optional[float]

    class Config:
        orm_mode = True

class CategoriesProductsResponse(BaseModel):
    categories: List[CategoryRead]
    products: List[ProductRead]