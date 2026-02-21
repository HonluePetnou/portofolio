from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Form
from typing import Literal
import os
import uuid
import shutil
from .auth import get_current_user
from ...models.portfolio import User

router = APIRouter(prefix="/media", tags=["Media"])

UPLOAD_DIR = "uploads"
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"}
MAX_SIZE_MB = 5
MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

SUBFOLDERS = {
    "testimonials": "testimonials",
    "articles": "articles",
    "projects": "projects",
    "general": "",
}

def _ensure_dir(path: str):
    if not os.path.exists(path):
        os.makedirs(path)

_ensure_dir(UPLOAD_DIR)


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    folder: str = Form(default="general"),
    current_user: User = Depends(get_current_user),
):
    """
    Upload an image file and return its public URL.

    - **folder**: optional subfolder — one of `testimonials`, `articles`, `projects`, `general`
    - Accepted types: JPEG, PNG, WebP, GIF, SVG
    - Max size: 5 MB
    """
    # ── Validate MIME type ──────────────────────────────────────────────────
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type '{file.content_type}'. Allowed: JPEG, PNG, WebP, GIF, SVG.",
        )

    # ── Read & validate size ────────────────────────────────────────────────
    contents = await file.read()
    if len(contents) > MAX_SIZE_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Maximum allowed size is {MAX_SIZE_MB} MB.",
        )

    # ── Resolve subfolder ───────────────────────────────────────────────────
    subfolder = SUBFOLDERS.get(folder, "")
    target_dir = os.path.join(UPLOAD_DIR, subfolder) if subfolder else UPLOAD_DIR
    _ensure_dir(target_dir)

    # ── Generate unique filename ────────────────────────────────────────────
    ext = os.path.splitext(file.filename or "file")[1].lower() or ".bin"
    unique_filename = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(target_dir, unique_filename)

    # ── Save to disk ────────────────────────────────────────────────────────
    try:
        with open(file_path, "wb") as buffer:
            buffer.write(contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not save file: {str(e)}")

    # ── Return public URL ───────────────────────────────────────────────────
    url_path = f"/uploads/{subfolder}/{unique_filename}" if subfolder else f"/uploads/{unique_filename}"
    return {
        "url": url_path,
        "filename": unique_filename,
        "folder": folder,
        "size_bytes": len(contents),
    }
