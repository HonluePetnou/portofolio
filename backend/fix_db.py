from sqlmodel import SQLModel, create_engine
from app.models.database import engine
from app.models.portfolio import User  # Ensure User is imported so SQLModel knows about it
from sqlalchemy import text

def fix_database():
    with engine.connect() as conn:
        print("Dropping tables...")
        conn.execute(text('DROP TABLE IF EXISTS "user" CASCADE'))
        conn.execute(text('DROP TABLE IF EXISTS "profile" CASCADE'))
        conn.execute(text('DROP TABLE IF EXISTS "testimonial" CASCADE'))
        conn.execute(text('DROP TABLE IF EXISTS "project" CASCADE'))
        conn.commit()
    
    print("Recreating all tables...")
    SQLModel.metadata.create_all(engine)
    print("Database schema updated successfully.")

if __name__ == "__main__":
    fix_database()
