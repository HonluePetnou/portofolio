import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
url = os.getenv('DATABASE_URL')

conn = psycopg2.connect(url)
cur = conn.cursor()
cur.execute("SELECT typname FROM pg_type WHERE typname = 'blogstatus'")
result = cur.fetchone()
print(f'blogstatus enum exists: {result is not None}')
cur.close()
conn.close()