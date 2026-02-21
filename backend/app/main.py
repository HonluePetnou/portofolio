from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.routers import auth, profile, projects, testimonials, media
from app.models.database import init_db
import os

app = FastAPI(
    title="Portfolio API",
    description="Backend for Honlue Petnou Frederic Armel Portfolio",
    version="1.0.0"
)

# Create uploads directory if it doesn't exist
if not os.path.exists("uploads"):
    os.makedirs("uploads")

# Mount uploads directory to serve files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(profile.router)
app.include_router(projects.router)
app.include_router(testimonials.router)
app.include_router(media.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Portfolio API"}
