from typing import Optional, List, Dict, Any
from sqlmodel import SQLModel, Field, JSON, Relationship
import uuid
from datetime import datetime
from enum import Enum
from .member import Member
from .blog import BlogStatus

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
    interveners: List[Dict[str, Any]] = Field(default=[], sa_type=JSON) # name, role, avatar
    is_featured: bool = Field(default=False)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    member_id: Optional[uuid.UUID] = Field(default=None, foreign_key="member.id", index=True)
    agency_visible: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    member: Optional[Member] = Relationship()

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

class Article(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str
    slug: str = Field(index=True, unique=True)
    excerpt: str
    cover_image: Optional[str] = None
    content: Dict[str, Any] = Field(default={}, sa_type=JSON) # intro, sections [{heading, body}]
    cta: Dict[str, str] = Field(default={}, sa_type=JSON) # text, url
    related_project_id: Optional[uuid.UUID] = Field(default=None, foreign_key="project.id")
    tags: List[str] = Field(default=[], sa_type=JSON)
    seo: Dict[str, Any] = Field(default={}, sa_type=JSON) # metaTitle, metaDescription, keywords
    published: bool = Field(default=False)
    archived: bool = Field(default=False)
    reading_time: int = Field(default=5)
    # Agency visibility / assignment
    member_id: Optional[uuid.UUID] = Field(default=None, foreign_key="member.id", index=True)
    agency_visible: bool = Field(default=False)

    # New publication workflow
    published_at: Optional[datetime] = None

    status: BlogStatus = Field(default=BlogStatus.draft)
    ai_generated: bool = Field(default=False)
    ai_mode: Optional[str] = None

    member: Optional[Member] = Relationship()
    created_at: datetime = Field(default_factory=datetime.utcnow)


# --- Contact / Inbox ---

class ContactStatus(str, Enum):
    NEW = "NEW"
    READ = "READ"
    REPLIED = "REPLIED"
    ARCHIVED = "ARCHIVED"


class PriorityLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


class ContactMessage(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: str
    message: str
    service: Optional[str] = None
    budget: Optional[int] = None
    status: ContactStatus = Field(default=ContactStatus.NEW)
    priority: PriorityLevel = Field(default=PriorityLevel.LOW)
    internal_notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# --- Social Posts ---

class SocialPlatform(str, Enum):
    LINKEDIN = "LINKEDIN"
    TWITTER = "TWITTER"
    INSTAGRAM = "INSTAGRAM"
    FACEBOOK = "FACEBOOK"


class SocialStatus(str, Enum):
    DRAFT = "DRAFT"
    READY = "READY"


class SocialPost(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    blog_id: uuid.UUID = Field(foreign_key="article.id")
    platform: SocialPlatform
    content: str
    status: SocialStatus = Field(default=SocialStatus.DRAFT)
    created_at: datetime = Field(default_factory=datetime.utcnow)


# --- Settings ---

class Setting(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    key: str = Field(index=True, unique=True)
    value: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

