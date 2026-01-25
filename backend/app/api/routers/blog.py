from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from ...models.database import get_session
from ...models.portfolio import Article, BlogIdea
from ...schemas.portfolio import (
    ArticleRead, ArticleCreate, ArticleUpdate,
    BlogIdeaRead, BlogIdeaCreate
)

router = APIRouter()

# --- Articles ---
@router.get("/articles", response_model=List[ArticleRead])
def get_articles(session: Session = Depends(get_session)):
    return session.exec(select(Article)).all()

@router.post("/articles", response_model=ArticleRead)
def create_article(article: ArticleCreate, session: Session = Depends(get_session)):
    db_article = Article.model_validate(article)
    session.add(db_article)
    session.commit()
    session.refresh(db_article)
    return db_article

@router.patch("/articles/{article_id}", response_model=ArticleRead)
def update_article(article_id: int, article: ArticleUpdate, session: Session = Depends(get_session)):
    db_article = session.get(Article, article_id)
    if not db_article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    data = article.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(db_article, key, value)
        
    session.add(db_article)
    session.commit()
    session.refresh(db_article)
    return db_article

@router.delete("/articles/{article_id}")
def delete_article(article_id: int, session: Session = Depends(get_session)):
    db_article = session.get(Article, article_id)
    if not db_article:
        raise HTTPException(status_code=404, detail="Article not found")
    session.delete(db_article)
    session.commit()
    return {"ok": True}

# --- Ideas ---
@router.get("/ideas", response_model=List[BlogIdeaRead])
def get_ideas(session: Session = Depends(get_session)):
    return session.exec(select(BlogIdea)).all()

@router.post("/ideas", response_model=BlogIdeaRead)
def create_idea(idea: BlogIdeaCreate, session: Session = Depends(get_session)):
    db_idea = BlogIdea.model_validate(idea)
    session.add(db_idea)
    session.commit()
    session.refresh(db_idea)
    return db_idea

@router.delete("/ideas/{idea_id}")
def delete_idea(idea_id: int, session: Session = Depends(get_session)):
    db_idea = session.get(BlogIdea, idea_id)
    if not db_idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    session.delete(db_idea)
    session.commit()
    return {"ok": True}
