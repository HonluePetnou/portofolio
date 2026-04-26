import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
url = os.getenv('DATABASE_URL')

def add_article_columns():
    try:
        conn = psycopg2.connect(url)
        conn.autocommit = True
        cur = conn.cursor()

        print('Checking article columns...')
        cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'article'")
        columns = [row[0] for row in cur.fetchall()]
        print(f'Existing columns: {columns}')

        if 'member_id' not in columns:
            print('Removing member_id column...')
            # First drop the foreign key constraint if it exists
            try:
                cur.execute('ALTER TABLE article DROP CONSTRAINT IF EXISTS fk_article_member_id_member')
                print('Foreign key constraint dropped.')
            except:
                print('No foreign key constraint to drop.')
            # Drop the index if it exists
            try:
                cur.execute('DROP INDEX IF EXISTS ix_article_member_id')
                print('Index dropped.')
            except:
                print('No index to drop.')
            # Drop the column
            cur.execute('ALTER TABLE article DROP COLUMN IF EXISTS member_id')
            print('member_id column removed.')

        if 'agency_visible' not in columns:
            print('Adding agency_visible column...')
            cur.execute('ALTER TABLE article ADD COLUMN agency_visible BOOLEAN DEFAULT FALSE')
            print('agency_visible column added.')

        if 'published_at' not in columns:
            print('Adding published_at column...')
            cur.execute('ALTER TABLE article ADD COLUMN published_at TIMESTAMP')
            print('published_at column added.')

        if 'status' not in columns:
            print('Adding status column...')
            # First create the enum if it doesn't exist
            try:
                cur.execute("CREATE TYPE blogstatus AS ENUM ('draft', 'scheduled', 'published')")
                print('blogstatus enum created.')
            except:
                print('blogstatus enum already exists.')
            cur.execute("ALTER TABLE article ADD COLUMN status blogstatus DEFAULT 'draft'")
            print('status column added.')

        if 'ai_generated' not in columns:
            print('Adding ai_generated column...')
            cur.execute('ALTER TABLE article ADD COLUMN ai_generated BOOLEAN DEFAULT FALSE')
            print('ai_generated column added.')

        if 'ai_mode' not in columns:
            print('Adding ai_mode column...')
            cur.execute('ALTER TABLE article ADD COLUMN ai_mode VARCHAR')
            print('ai_mode column added.')

        # Check for index - remove member_id index
        cur.execute("SELECT indexname FROM pg_indexes WHERE tablename = 'article' AND indexname = 'ix_article_member_id'")
        if cur.fetchone():
            print('Dropping index on member_id...')
            cur.execute('DROP INDEX ix_article_member_id')
            print('Index dropped.')

        # Check for foreign key - remove member constraint
        cur.execute("""
            SELECT constraint_name
            FROM information_schema.table_constraints
            WHERE table_name = 'article' AND constraint_type = 'FOREIGN KEY'
        """)
        constraints = [row[0] for row in cur.fetchall()]
        if 'fk_article_member_id_member' in constraints:
            print('Dropping foreign key constraint...')
            cur.execute('ALTER TABLE article DROP CONSTRAINT fk_article_member_id_member')
            print('Foreign key dropped.')

        cur.close()
        conn.close()
        print('Article migration completed.')
    except Exception as e:
        print(f'Error: {e}')

if __name__ == "__main__":
    add_article_columns()