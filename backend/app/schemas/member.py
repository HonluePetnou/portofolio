import uuid
from datetime import datetime
from typing import Optional

from pydantic import ConfigDict
from pydantic.alias_generators import to_camel
from sqlmodel import SQLModel


class MemberCreate(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

    slug: str
    name: str
    role: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    portfolio_url: Optional[str] = None
    is_active: bool = True


class MemberUpdate(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

    slug: Optional[str] = None
    name: Optional[str] = None
    role: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    portfolio_url: Optional[str] = None
    is_active: Optional[bool] = None


class MemberRead(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

    id: uuid.UUID
    slug: str
    name: str
    role: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    portfolio_url: Optional[str] = None
    is_active: bool
    created_at: datetime

