import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("DATABASE_URL")

def get_columns():
    conn = psycopg2.connect(url)
    cur = conn.cursor()
    cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'article'")
    rows = cur.fetchall()
    print("Columns in 'article':")
    for row in rows:
        print(f"- {row[0]}")
    cur.close()
    conn.close()

if __name__ == "__main__":
    get_columns()
