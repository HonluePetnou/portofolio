# Portfolio Project Ecosystem

This repository contains the complete source code for my personal portfolio ecosystem, comprising a private back-office dashboard and a unified backend API.

## Project Structure

- **`back-office/`**:  
  A secured administrative dashboard built with **Next.js** and **Radix UI**. It allows management of all portfolio content, including profile details, projects, inbox messages, blog posts, and content creation.

- **`backend/`**:  
  The core API built with **FastAPI**, **SQLModel**, and **PostgreSQL**. It serves data to the back-office and future frontend, handling database interactions, file uploads, and business logic.

## How to Access and Configure

### 1. Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **pnpm**
- **PostgreSQL** database

### 2. Backend Configuration
Navigate to the `backend` directory:
```bash
cd backend
```
- **Environment Setup**:
  Create a `.env` file based on `.env.example`:
  ```env
  DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
  SECRET_KEY=your_secret_key_here
  GEMINI_API_KEY=your_gemini_api_key_here
  ```
- **Virtual Environment & Dependencies**:
  ```bash
  python -m venv venv
  # Windows
  venv\Scripts\activate
  # Mac/Linux
  source venv/bin/activate

  pip install -r requirements.txt
  ```
- **Run the API**:
  ```bash
  uvicorn app.main:app --reload
  ```
  Interactive API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Back-Office Configuration
Navigate to the `back-office` directory:
```bash
cd back-office
```
- **Environment Setup**:
  Create a `.env.local` file:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:8000
  ```
- **Install & Run**:
  ```bash
  pnpm install
  pnpm run dev
  ```
  Dashboard Access: [http://localhost:3000](http://localhost:3000) (defaults to 3001 if 3000 is occupied)

## Tech Stack Overview

- **Backend**: FastAPI, SQLModel (SQLAlchemy + Pydantic), Alembic, PostgreSQL
- **Back-Office**: Next.js (App Router), Tailwind CSS v4, Radix UI, Lucide React

## Author

**Honlue Petnou Frederic Armel**

