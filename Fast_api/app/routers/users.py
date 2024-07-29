from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import SessionLocal

router = APIRouter(
    prefix="/api",
    tags=["users"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.User, summary="Create a new user", description="Create a new user with the provided email, password, and other details.")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@router.get("/{user_id}", response_model=schemas.User, summary="Get user details", description="Retrieve details of a user by their ID.")
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/login", summary="User login", description="Authenticate a user and return a success message.")
def login_user(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, email=request.email, password=request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return {"message": "Login successful", "user": user}


@router.post("/register", response_model=schemas.User, summary="Register a new user", description="Register a new user with the provided details.")
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = crud.create_user(db=db, user=user)
    return new_user