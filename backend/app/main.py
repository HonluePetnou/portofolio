from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.api.routers import auth, profile, projects, testimonials, media, articles, ai
from app.models.database import init_db
import os

app = FastAPI(
    title="Portfolio API",
    description="Backend for Honlue Petnou Frederic Armel Portfolio",
    version="1.0.0"
)

# CORS configuration — must be registered BEFORE mounting static files
# so that /uploads/* responses also carry CORS headers.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory and subfolders
for folder in ["uploads", "uploads/testimonials", "uploads/articles", "uploads/projects"]:
    os.makedirs(folder, exist_ok=True)

# Mount uploads directory to serve files (after middleware so CORS applies)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(profile.router)
app.include_router(projects.router)
app.include_router(testimonials.router)
app.include_router(media.router)
app.include_router(articles.router)
app.include_router(ai.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Portfolio API"}
