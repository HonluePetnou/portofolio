# Portfolio Backend API

The centralized API service powering the Portfolio frontend and Back-Office dashboard.

## Tech Stack

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database ORM**: [SQLModel](https://sqlmodel.tiangolo.com/) (SQLAlchemy + Pydantic)
- **Database**: PostgreSQL
- **Migrations**: Alembic
- **Server**: Uvicorn

## Features

- **Profile API**: CRUD operations for personal details and experience.
- **Inbox API**: Handling contact form submissions and message management.
- **Blog API**: Managing articles and content ideas.
- **Content Studio API**: Managing social media topics and posts.
- **File Uploads**: Handling static asset uploads (Images, PDFs).

## Setup & Run

1.  **Create Virtual Environment**:

    ```bash
    python -m venv venv

    # Windows
    venv\Scripts\activate

    # Mac/Linux
    source venv/bin/activate
    ```

2.  **Install Dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

3.  **Configure Environment**:
    - Create a `.env` file in this directory.
    - Add your database connection string:
      ```env
      DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
      SECRET_KEY=your_secret_key
      ```

4.  **Run the Server**:

    ```bash
    uvicorn app.main:app --reload
    ```

5.  **Access Documentation**:
    - Open [http://localhost:8000/docs](http://localhost:8000/docs) for the interactive Swagger UI.

## Directory Structure

- `app/api`: Route handlers (endpoints).
- `app/models`: Database models (SQLModel).
- `app/schemas`: Pydantic data schemas (Request/Response).
- `app/services`: Business logic and utilities.
- `uploads/`: Directory for uploaded files.
