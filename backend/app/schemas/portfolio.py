from typing import Optional, List, Dict, Any
from sqlmodel import SQLModel
import uuid
from datetime import datetime
from pydantic import ConfigDict
from pydantic.alias_generators import to_camel

# --- Profile ---
class ProfileBase(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

    name: str
    hero_title: str
    hero_subtitle: str
    bio_summary: str
    about_text: str
    profile_image_url: Optional[str] = None
    cv_url: Optional[str] = None
    social_links: List[Dict[str, Any]] = []
    tech_stack_summary: List[str] = []
    user_id: Optional[int] = None

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

    name: Optional[str] = None
    hero_title: Optional[str] = None
    hero_subtitle: Optional[str] = None
    bio_summary: Optional[str] = None
    about_text: Optional[str] = None
    profile_image_url: Optional[str] = None
    cv_url: Optional[str] = None
    social_links: Optional[List[Dict[str, Any]]] = None
    tech_stack_summary: Optional[List[str]] = None
    user_id: Optional[int] = None

class ProfileRead(ProfileBase):
    id: int

# --- Project ---
class ProjectBase(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

    title: str
    slug: str
    client_name: Optional[str] = None
    industry: Optional[str] = None
    services: List[str] = []
    description: Dict[str, str] = {} # problem, objectives, solution
    results: List[Dict[str, str]] = [] # label, value
    stack: List[str] = []
    timeline: Optional[str] = None
    project_url: Optional[str] = None
    github_url: Optional[str] = None
    main_image: Optional[str] = None
    screenshots: List[str] = []
    interveners: List[Dict[str, str]] = [] # name, role, avatar
    is_featured: bool = False

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

    title: Optional[str] = None
    slug: Optional[str] = None
    client_name: Optional[str] = None
    industry: Optional[str] = None
    services: Optional[List[str]] = None
    description: Optional[Dict[str, str]] = None
    results: Optional[List[Dict[str, str]]] = None
    stack: Optional[List[str]] = None
    timeline: Optional[str] = None
    project_url: Optional[str] = None
    github_url: Optional[str] = None
    main_image: Optional[str] = None
    screenshots: Optional[List[str]] = None
    interveners: Optional[List[Dict[str, str]]] = None
    is_featured: Optional[bool] = None

class ProjectRead(ProjectBase):
    id: uuid.UUID
    created_at: datetime

# --- Testimonial ---
class TestimonialBase(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

    name: str
    role: str
    company: Optional[str] = None
    content: str
    rating: int
    image_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    user_id: Optional[int] = None

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

    name: Optional[str] = None
    role: Optional[str] = None
    company: Optional[str] = None
    content: Optional[str] = None
    rating: Optional[int] = None
    image_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    user_id: Optional[int] = None

class TestimonialRead(TestimonialBase):
    id: int

# --- Article ---
class ArticleBase(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

    title: str
    slug: str
    excerpt: str
    cover_image: Optional[str] = None
    content: Dict[str, Any] = {} # intro, sections [{heading, body}]
    cta: Dict[str, str] = {} # text, url
    related_project_id: Optional[uuid.UUID] = None
    tags: List[str] = []
    seo: Dict[str, Any] = {} # metaTitle, metaDescription, keywords
    published: bool = True
    reading_time: int = 5

class ArticleCreate(ArticleBase):
    pass

class ArticleUpdate(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    cover_image: Optional[str] = None
    content: Optional[Dict[str, Any]] = None
    cta: Optional[Dict[str, str]] = None
    related_project_id: Optional[uuid.UUID] = None
    tags: Optional[List[str]] = None
    seo: Optional[Dict[str, Any]] = None
    published: Optional[bool] = None
    reading_time: Optional[int] = None

class ArticleRead(ArticleBase):
    id: uuid.UUID
    created_at: datetime
