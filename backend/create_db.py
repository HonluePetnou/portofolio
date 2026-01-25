import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
from dotenv import load_dotenv

load_dotenv()

# Get the db url but switch database to 'postgres' to perform the create command
# Assuming format: postgresql://user:password@localhost:5432/portfolio
original_url = os.getenv("DATABASE_URL")
if not original_url:
    print("DATABASE_URL not found in .env")
    exit(1)

# Parse simple connection params (this is a basic parser)
try:
    # Remove prefix
    url_clean = original_url.replace("postgresql://", "")
    # Split user:pass and rest
    user_pass, network_db = url_clean.split("@")
    user, password = user_pass.split(":")
    # Split host:port and db
    network, db_name = network_db.split("/")
    host, port = network.split(":")
except ValueError:
    print("Could not parse DATABASE_URL. Please ensure it is in format: postgresql://user:password@host:port/dbname")
    exit(1)

def create_database():
    try:
        # Connect to 'postgres' db to create the new db
        con = psycopg2.connect(
            dbname="postgres",
            user=user,
            host=host,
            password=password,
            port=port
        )
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = con.cursor()
        
        # Check if database exists
        cursor.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{db_name}'")
        exists = cursor.fetchone()
        
        if not exists:
            print(f"Creating database '{db_name}'...")
            cursor.execute(f"CREATE DATABASE {db_name}")
            print(f"Database '{db_name}' created successfully!")
        else:
            print(f"Database '{db_name}' already exists.")
            
        cursor.close()
        con.close()
        
    except Exception as e:
        print(f"Error creating database: {e}")

if __name__ == "__main__":
    create_database()
