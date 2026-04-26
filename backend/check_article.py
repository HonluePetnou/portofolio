import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
url = os.getenv('DATABASE_URL')

conn = psycopg2.connect(url)
cur = conn.cursor()
cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'article'")
columns = [row[0] for row in cur.fetchall()]
print(f'Article columns: {columns}')
cur.close()
conn.close()