from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .api.routers import general, inbox, blog, content
from .models.database import init_db
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

app.include_router(general.router, tags=["General"])
app.include_router(inbox.router, tags=["Inbox"])
app.include_router(blog.router, tags=["Blog"])
app.include_router(content.router, tags=["Content Studio"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Portfolio API"}
