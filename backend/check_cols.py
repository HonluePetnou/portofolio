import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("DATABASE_URL")

def check_columns():
    try:
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'article'")
        columns = [row[0] for row in cur.fetchall()]
        print(f"Columns in 'article': {columns}")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_columns()
