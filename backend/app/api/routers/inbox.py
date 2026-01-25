from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from ...models.database import get_session
from ...models.portfolio import Message
from ...schemas.portfolio import MessageRead, MessageCreate, MessageUpdate

router = APIRouter()

@router.get("/messages", response_model=List[MessageRead])
def get_messages(session: Session = Depends(get_session)):
    return session.exec(select(Message).order_by(Message.id.desc())).all() # Newest first

@router.post("/messages", response_model=MessageRead)
def create_message(message: MessageCreate, session: Session = Depends(get_session)):
    db_message = Message.model_validate(message)
    session.add(db_message)
    session.commit()
    session.refresh(db_message)
    return db_message

@router.patch("/messages/{message_id}", response_model=MessageRead)
def update_message(message_id: int, message: MessageUpdate, session: Session = Depends(get_session)):
    db_message = session.get(Message, message_id)
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    data = message.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(db_message, key, value)
        
    session.add(db_message)
    session.commit()
    session.refresh(db_message)
    return db_message

@router.delete("/messages/{message_id}")
def delete_message(message_id: int, session: Session = Depends(get_session)):
    db_message = session.get(Message, message_id)
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    session.delete(db_message)
    session.commit()
    return {"ok": True}
