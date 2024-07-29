from pydantic import BaseModel
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    user_type: str
    
class User(BaseModel):
    id: int
    username: str
    email: str
    password: str
    is_active: bool
class UserBase(BaseModel):
    name: str
    email: str
    profile: str | None = None
    user_type: str = "customer"

class UserCreate(UserBase):
    password: str
    
class User(UserBase):
    id: int
    is_active: bool
class Config:
    orm_mode = True

class LoginRequest(BaseModel):
    email: str
    password: str