import os
import shutil
from fastapi import UploadFile
from typing import Optional

UPLOAD_DIR = "uploads"

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

async def save_upload_file(upload_file: UploadFile, subfolder: str = "") -> str:
    folder_path = os.path.join(UPLOAD_DIR, subfolder)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
    
    file_path = os.path.join(folder_path, upload_file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    
    return f"/{UPLOAD_DIR}/{subfolder}/{upload_file.filename}".replace("//", "/")
