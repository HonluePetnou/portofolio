from typing import Optional, List, Dict, Any
from sqlmodel import SQLModel

# --- Profile ---
class ProfileBase(SQLModel):
    name: str
    hero_title: str
    hero_subtitle: str
    bio_summary: str
    about_text: str
    profile_image_url: Optional[str] = None
    cv_url: Optional[str] = None
    social_links: List[Dict[str, Any]] = []
    tech_stack_summary: List[str] = []

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(SQLModel):
    name: Optional[str] = None
    hero_title: Optional[str] = None
    hero_subtitle: Optional[str] = None
    bio_summary: Optional[str] = None
    about_text: Optional[str] = None
    profile_image_url: Optional[str] = None
    cv_url: Optional[str] = None
    social_links: Optional[List[Dict[str, Any]]] = None
    tech_stack_summary: Optional[List[str]] = None

class ProfileRead(ProfileBase):
    id: int

# --- Experience ---
class ExperienceBase(SQLModel):
    role: str
    company: str
    period: str
    description: str
    achievements: List[str] = []
    order_index: int = 0

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(SQLModel):
    role: Optional[str] = None
    company: Optional[str] = None
    period: Optional[str] = None
    description: Optional[str] = None
    achievements: Optional[List[str]] = None
    order_index: Optional[int] = None

class ExperienceRead(ExperienceBase):
    id: int

# --- Project ---
class ProjectBase(SQLModel):
    title: str
    slug: str
    description: str
    image_url: str
    stack: List[str] = []
    highlighted_stack: Optional[str] = None
    demo_url: Optional[str] = None
    repo_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(SQLModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    stack: Optional[List[str]] = None
    highlighted_stack: Optional[str] = None
    demo_url: Optional[str] = None
    repo_url: Optional[str] = None

class ProjectRead(ProjectBase):
    id: int

# --- Testimonial ---
class TestimonialBase(SQLModel):
    name: str
    role: str
    content: str
    rating: int

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(SQLModel):
    name: Optional[str] = None
    role: Optional[str] = None
    content: Optional[str] = None
    rating: Optional[int] = None

class TestimonialRead(TestimonialBase):
    id: int

# --- Inbox ---
class MessageBase(SQLModel):
    name: str
    email: str
    subject: str
    message: str
    category: str = "inquiry"

class MessageCreate(MessageBase):
    pass

class MessageUpdate(SQLModel):
    read: Optional[bool] = None
    starred: Optional[bool] = None
    category: Optional[str] = None

class MessageRead(MessageBase):
    id: int
    read: bool
    starred: bool
    created_at: str

# --- Blog ---
class ArticleBase(SQLModel):
    title: str
    slug: str
    content: str
    status: str = "draft"
    excerpt: Optional[str] = None
    tags: List[str] = []
    published_date: Optional[str] = None

class ArticleCreate(ArticleBase):
    pass

class ArticleUpdate(SQLModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    status: Optional[str] = None
    excerpt: Optional[str] = None
    tags: Optional[List[str]] = None
    published_date: Optional[str] = None

class ArticleRead(ArticleBase):
    id: int

class BlogIdeaBase(SQLModel):
    title: str
    description: str

class BlogIdeaCreate(BlogIdeaBase):
    pass

class BlogIdeaRead(BlogIdeaBase):
    id: int

# --- Content Studio ---
class ContentTopicBase(SQLModel):
    title: str
    status: str = "idea"

class ContentTopicCreate(ContentTopicBase):
    pass

class ContentTopicUpdate(SQLModel):
    title: Optional[str] = None
    status: Optional[str] = None

class ContentPostBase(SQLModel):
    platform: str
    content: str
    status: str = "draft"
    topic_id: int

class ContentPostCreate(ContentPostBase):
    pass

class ContentPostUpdate(SQLModel):
    content: Optional[str] = None
    status: Optional[str] = None

class ContentPostRead(ContentPostBase):
    id: int

class ContentTopicRead(ContentTopicBase):
    id: int
    posts: List[ContentPostRead] = []
