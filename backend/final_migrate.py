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
        
        print("Checking article columns...")
        cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'article'")
        columns = [row[0] for row in cur.fetchall()]
        print(f"Existing columns: {columns}")
        
        if 'published' not in columns:
            print("Adding 'published'...")
            cur.execute("ALTER TABLE article ADD COLUMN published BOOLEAN DEFAULT FALSE")
        
        if 'reading_time' not in columns:
            print("Adding 'reading_time'...")
            cur.execute("ALTER TABLE article ADD COLUMN reading_time INTEGER DEFAULT 5")

        if 'social_content' not in columns:
            print("Adding 'social_content'...")
            cur.execute("ALTER TABLE article ADD COLUMN social_content JSONB DEFAULT '{}'")
            
        cur.close()
        conn.close()
        print("Migration done.")
    except Exception as e:
        print(f"Migration failed: {e}")

if __name__ == "__main__":
    migrate()
