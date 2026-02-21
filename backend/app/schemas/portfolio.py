from typing import Optional, List, Dict, Any
from sqlmodel import SQLModel
import uuid
from datetime import datetime
from pydantic import ConfigDict
from pydantic.alias_generators import to_camel

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
    user_id: Optional[int] = None

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
    images: List[str] = []
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
    images: Optional[List[str]] = None
    interveners: Optional[List[Dict[str, str]]] = None
    is_featured: Optional[bool] = None

class ProjectRead(ProjectBase):
    id: uuid.UUID
    created_at: datetime

# --- Testimonial ---
class TestimonialBase(SQLModel):
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
