from typing import Optional, List, Dict, Any
from sqlmodel import SQLModel, Field, JSON
import uuid
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    hashed_password: str
    full_name: Optional[str] = None
    role: str = Field(default="admin")

class Profile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    hero_title: str
    hero_subtitle: str
    bio_summary: str
    about_text: str
    profile_image_url: Optional[str] = None
    cv_url: Optional[str] = None
    social_links: List[dict] = Field(default=[], sa_type=JSON)
    tech_stack_summary: List[str] = Field(default=[], sa_type=JSON)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")

class Project(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str
    slug: str = Field(index=True, unique=True)
    client_name: Optional[str] = Field(default=None)
    industry: Optional[str] = None
    services: List[str] = Field(default=[], sa_type=JSON)
    description: Dict[str, str] = Field(default={}, sa_type=JSON)  # problem, objectives, solution
    results: List[Dict[str, str]] = Field(default=[], sa_type=JSON) # label, value
    stack: List[str] = Field(default=[], sa_type=JSON)
    timeline: Optional[str] = None
    project_url: Optional[str] = None
    github_url: Optional[str] = None
    main_image: Optional[str] = None
    screenshots: List[str] = Field(default=[], sa_type=JSON)
    interveners: List[Dict[str, str]] = Field(default=[], sa_type=JSON) # name, role, avatar
    is_featured: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Testimonial(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    role: str
    company: Optional[str] = None
    content: str
    rating: int = Field(default=5, ge=1, le=5)
    image_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
