import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("DATABASE_URL")

def migrate():
    try:
        conn = psycopg2.connect(url)
        conn.autocommit = True
        cur = conn.cursor()
        
        print("Checking columns...")
        cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'article'")
        columns = [row[0] for row in cur.fetchall()]
        print(f"Current columns: {columns}")
        
        if 'published' not in columns:
            print("Adding 'published' column...")
            cur.execute("ALTER TABLE article ADD COLUMN published BOOLEAN DEFAULT FALSE")
            print("'published' column added.")
        
        if 'reading_time' not in columns:
            print("Adding 'reading_time' column...")
            cur.execute("ALTER TABLE article ADD COLUMN reading_time INTEGER DEFAULT 5")
            print("'reading_time' column added.")
            
        cur.close()
        conn.close()
        print("Migration finished successfully.")
    except Exception as e:
        print(f"Migration failed: {e}")

if __name__ == "__main__":
    migrate()
