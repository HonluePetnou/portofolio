from sqlalchemy import text, inspect
from app.models.database import engine

def check_article_table():
    inspector = inspect(engine)
    if 'article' in inspector.get_table_names():
        columns = inspector.get_columns('article')
        print("Columns in 'article' table:")
        for col in columns:
            print(f"- {col['name']}: {col['type']}")
    else:
        print("Table 'article' does not exist.")

if __name__ == "__main__":
    check_article_table()
