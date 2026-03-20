import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import Column, DateTime
from sqlmodel import Field, SQLModel


class Member(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    slug: str = Field(index=True, unique=True)
    name: str
    role: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    portfolio_url: Optional[str] = None
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=False),
            nullable=False,
            default=datetime.utcnow,
            onupdate=datetime.utcnow,
        )
    )

