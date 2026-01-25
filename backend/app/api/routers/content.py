from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from ...models.database import get_session
from ...models.portfolio import ContentTopic, ContentPost
from ...schemas.portfolio import (
    ContentTopicRead, ContentTopicCreate, ContentTopicUpdate,
    ContentPostRead, ContentPostCreate, ContentPostUpdate
)

router = APIRouter()

@router.get("/content/topics", response_model=List[ContentTopicRead])
def get_topics(session: Session = Depends(get_session)):
    topics = session.exec(select(ContentTopic)).all()
    # Manually populate posts for now, or use SQLModel relations if configured
    result = []
    for topic in topics:
        posts = session.exec(select(ContentPost).where(ContentPost.topic_id == topic.id)).all()
        topic_read = ContentTopicRead.model_validate(topic)
        topic_read.posts = posts
        result.append(topic_read)
    return result

@router.post("/content/topics", response_model=ContentTopicRead)
def create_topic(topic: ContentTopicCreate, session: Session = Depends(get_session)):
    db_topic = ContentTopic.model_validate(topic)
    session.add(db_topic)
    session.commit()
    session.refresh(db_topic)
    return ContentTopicRead.model_validate(db_topic)

@router.patch("/content/topics/{topic_id}", response_model=ContentTopicRead)
def update_topic(topic_id: int, topic: ContentTopicUpdate, session: Session = Depends(get_session)):
    db_topic = session.get(ContentTopic, topic_id)
    if not db_topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    
    data = topic.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(db_topic, key, value)
    
    session.add(db_topic)
    session.commit()
    session.refresh(db_topic)
    # Re-fetch posts
    posts = session.exec(select(ContentPost).where(ContentPost.topic_id == topic_id)).all()
    topic_read = ContentTopicRead.model_validate(db_topic)
    topic_read.posts = posts
    return topic_read

@router.post("/content/posts", response_model=ContentPostRead)
def create_post(post: ContentPostCreate, session: Session = Depends(get_session)):
    db_post = ContentPost.model_validate(post)
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post

@router.patch("/content/posts/{post_id}", response_model=ContentPostRead)
def update_post(post_id: int, post: ContentPostUpdate, session: Session = Depends(get_session)):
    db_post = session.get(ContentPost, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    data = post.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(db_post, key, value)
        
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post
