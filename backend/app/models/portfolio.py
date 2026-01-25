from typing import Optional, List
from sqlmodel import SQLModel, Field, JSON

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

class Experience(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    role: str
    company: str
    period: str
    description: str
    achievements: List[str] = Field(default=[], sa_type=JSON)
    order_index: int = 0

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    slug: str = Field(index=True, unique=True)
    description: str
    image_url: str
    stack: List[str] = Field(default=[], sa_type=JSON)
    highlighted_stack: Optional[str] = None
    demo_url: Optional[str] = None
    repo_url: Optional[str] = None

class Testimonial(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    role: str
    content: str
    rating: int = Field(default=5, ge=1, le=5)

# --- Inbox Models ---
class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    subject: str
    message: str
    read: bool = Field(default=False)
    starred: bool = Field(default=False)
    category: str = Field(default="inquiry")
    created_at: str = Field(default="Just now") # For simplicity in mock, real app would use datetime

# --- Blog Models ---
class Article(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    slug: str = Field(index=True, unique=True)
    content: str
    status: str = Field(default="draft") # draft, published
    excerpt: Optional[str] = None
    tags: List[str] = Field(default=[], sa_type=JSON)
    published_date: Optional[str] = None

class BlogIdea(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str

# --- Content Studio Models ---
class ContentTopic(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    status: str = Field(default="idea") # idea, writing, ready, published

class ContentPost(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    topic_id: int = Field(foreign_key="contenttopic.id")
    platform: str # twitter, linkedin, facebook
    content: str
    status: str = Field(default="draft") # draft, ready, published
