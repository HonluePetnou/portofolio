from typing import Optional, List, Dict, Any
from sqlmodel import SQLModel
import uuid
from datetime import datetime
from pydantic import ConfigDict, EmailStr
from pydantic.alias_generators import to_camel
from .member import MemberRead
from ..models.blog import BlogStatus

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
    interveners: List[Dict[str, Any]] = [] # name, role, avatar
    is_featured: bool = False
    user_id: Optional[int] = None
    member_id: Optional[uuid.UUID] = None
    agency_visible: bool = False

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
    interveners: Optional[List[Dict[str, Any]]] = None
    is_featured: Optional[bool] = None
    user_id: Optional[int] = None
    member_id: Optional[uuid.UUID] = None
    agency_visible: Optional[bool] = None

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
    published: bool = False
    archived: bool = False
    reading_time: int = 5
    member_id: Optional[uuid.UUID] = None
    agency_visible: bool = False
    published_at: Optional[datetime] = None
    status: BlogStatus = BlogStatus.draft
    ai_generated: bool = False
    ai_mode: Optional[str] = None

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
    archived: Optional[bool] = None
    reading_time: Optional[int] = None
    member_id: Optional[uuid.UUID] = None
    agency_visible: Optional[bool] = None
    published_at: Optional[datetime] = None
    status: Optional[BlogStatus] = None
    ai_generated: Optional[bool] = None
    ai_mode: Optional[str] = None

class ArticleRead(ArticleBase):
    id: uuid.UUID
    created_at: datetime
    member: Optional[MemberRead] = None


# --- Contact / Inbox ---

class ContactBase(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: str
    message: str
    service: Optional[str] = None
    budget: Optional[int] = None


class ContactCreate(ContactBase):
    pass


class ContactAdminUpdate(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

    status: Optional[str] = None
    priority: Optional[str] = None
    internal_notes: Optional[str] = None


class ContactRead(ContactBase):
    id: uuid.UUID
    status: str
    priority: str
    internal_notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime


# --- Social generation output ---

class SocialLinkedIn(SQLModel):
    storytelling: str
    value_driven: str


class SocialTwitter(SQLModel):
    thread_tweets: List[str]
    thread_combined: str
    short: str


class SocialInstagram(SQLModel):
    caption: str


class SocialFacebook(SQLModel):
    post: str


class SocialGenerated(SQLModel):
    blog_id: uuid.UUID
    linkedin: SocialLinkedIn
    twitter: SocialTwitter
    instagram: SocialInstagram
    facebook: SocialFacebook


# --- Settings ---

class SettingsUpdate(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

    ai_api_key: Optional[str] = None
    ai_provider: Optional[str] = None  # GEMINI, OPENAI, CLAUDE
    email_provider: Optional[str] = None  # RESEND, SENDGRID, NONE
    email_api_key: Optional[str] = None
    notification_email: Optional[EmailStr] = None


class SettingsRead(SQLModel):
    ai_provider: Optional[str] = None
    email_provider: Optional[str] = None
    notification_email: Optional[EmailStr] = None
    ai_api_key: dict
    email_api_key: dict

