from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List, Optional
import uuid

from ...models.database import get_session
from ...models.portfolio import Article, User
from ...schemas.portfolio import (
    ArticleRead, ArticleCreate, ArticleUpdate
)
from .auth import get_current_user

router = APIRouter(prefix="/articles", tags=["Articles"])

@router.get("", response_model=List[ArticleRead])
def get_articles(
    session: Session = Depends(get_session),
    published_only: bool = False
):
    statement = select(Article)
    if published_only:
        statement = statement.where(Article.published == True)
    return session.exec(statement).all()

@router.get("/{article_id}", response_model=ArticleRead)
def get_article(article_id: uuid.UUID, session: Session = Depends(get_session)):
    db_article = session.get(Article, article_id)
    if not db_article:
        raise HTTPException(status_code=404, detail="Article not found")
    return db_article

@router.post("", response_model=ArticleRead)
def create_article(
    article: ArticleCreate, 
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    db_article = Article.model_validate(article)
    session.add(db_article)
    session.commit()
    session.refresh(db_article)
    return db_article

@router.patch("/{article_id}", response_model=ArticleRead)
def update_article(
    article_id: uuid.UUID, 
    article: ArticleUpdate, 
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    db_article = session.get(Article, article_id)
    if not db_article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    article_data = article.model_dump(exclude_unset=True)
    for key, value in article_data.items():
        setattr(db_article, key, value)
        
    session.add(db_article)
    session.commit()
    session.refresh(db_article)
    return db_article

@router.delete("/{article_id}")
def delete_article(
    article_id: uuid.UUID, 
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    db_article = session.get(Article, article_id)
    if not db_article:
        raise HTTPException(status_code=404, detail="Article not found")
    session.delete(db_article)
    session.commit()
    return {"ok": True}
