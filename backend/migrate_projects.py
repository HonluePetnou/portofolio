import os
import sys
from sqlmodel import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    print("Error: DATABASE_URL not found in environment")
    sys.exit(1)

print(f"Connecting to: {DATABASE_URL}")
# Force the driver to be psycopg2 if not already there, though SQLModel usually handles it
# If the URL is just postgresql://, it might use some other driver
engine = create_engine(DATABASE_URL)

def migrate():
    with engine.connect() as conn:
        print("Starting migration...")
        try:
            # 1. Add user_id column
            print("Adding user_id column...")
            # PostgreSQL syntax: ALTER TABLE ... ADD COLUMN IF NOT EXISTS ...
            conn.execute(text('ALTER TABLE project ADD COLUMN IF NOT EXISTS user_id INTEGER;'))
            conn.commit()
            print("Column user_id added (or already exists).")

            # 2. Add foreign key constraint
            print("Adding foreign key constraint...")
            try:
                # Check if constraint already exists
                result = conn.execute(text("""
                    SELECT constraint_name 
                    FROM information_schema.key_column_usage 
                    WHERE table_name = 'project' AND constraint_name = 'fk_project_user';
                """)).fetchone()
                
                if not result:
                    conn.execute(text('ALTER TABLE project ADD CONSTRAINT fk_project_user FOREIGN KEY (user_id) REFERENCES "user" (id);'))
                    conn.commit()
                    print("Foreign key constraint added.")
                else:
                    print("Foreign key constraint fk_project_user already exists.")
            except Exception as e:
                print(f"Error adding constraint: {e}")
                conn.rollback()

            print("Migration completed successfully.")
        except Exception as e:
            print(f"CRITICAL ERROR: {e}")
            conn.rollback()

if __name__ == "__main__":
    migrate()
