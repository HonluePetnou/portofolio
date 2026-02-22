import os
import sys
from sqlmodel import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    res = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'project';"))
    columns = [row[0] for row in res.fetchall()]
    print(f"Columns in project: {columns}")
