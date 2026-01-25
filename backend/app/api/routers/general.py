from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from ...models.database import get_session
from ...models.portfolio import Profile, Experience, Project, Testimonial
from ...schemas.portfolio import (
    ProfileRead, ProfileUpdate, ProfileCreate,
    ExperienceRead, ExperienceCreate, ExperienceUpdate,
    ProjectRead, ProjectCreate, ProjectUpdate,
    TestimonialRead, TestimonialCreate, TestimonialUpdate
)

router = APIRouter()

# --- Profile Routes ---
@router.get("/profile", response_model=ProfileRead)
def get_profile(session: Session = Depends(get_session)):
    profile = session.exec(select(Profile)).first()
    if not profile:
        # Return default/empty profile if none exists
        return Profile(
            name="Your Name", 
            hero_title="Hero Title", 
            hero_subtitle="Subtitle", 
            bio_summary="Bio", 
            about_text="About"
        )
    return profile

@router.post("/profile", response_model=ProfileRead)
def create_profile(profile: ProfileCreate, session: Session = Depends(get_session)):
    existing_profile = session.exec(select(Profile)).first()
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists")
    db_profile = Profile.model_validate(profile)
    session.add(db_profile)
    session.commit()
    session.refresh(db_profile)
    return db_profile

@router.patch("/profile", response_model=ProfileRead)
def update_profile(profile: ProfileUpdate, session: Session = Depends(get_session)):
    db_profile = session.exec(select(Profile)).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    profile_data = profile.model_dump(exclude_unset=True)
    for key, value in profile_data.items():
        setattr(db_profile, key, value)
    
    session.add(db_profile)
    session.commit()
    session.refresh(db_profile)
    return db_profile

# --- Experience Routes ---
@router.get("/experiences", response_model=List[ExperienceRead])
def get_experiences(session: Session = Depends(get_session)):
    return session.exec(select(Experience)).all()

@router.post("/experiences", response_model=ExperienceRead)
def create_experience(experience: ExperienceCreate, session: Session = Depends(get_session)):
    db_experience = Experience.model_validate(experience)
    session.add(db_experience)
    session.commit()
    session.refresh(db_experience)
    return db_experience

@router.patch("/experiences/{experience_id}", response_model=ExperienceRead)
def update_experience(experience_id: int, experience: ExperienceUpdate, session: Session = Depends(get_session)):
    db_experience = session.get(Experience, experience_id)
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    experience_data = experience.model_dump(exclude_unset=True)
    for key, value in experience_data.items():
        setattr(db_experience, key, value)
        
    session.add(db_experience)
    session.commit()
    session.refresh(db_experience)
    return db_experience

@router.delete("/experiences/{experience_id}")
def delete_experience(experience_id: int, session: Session = Depends(get_session)):
    db_experience = session.get(Experience, experience_id)
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    session.delete(db_experience)
    session.commit()
    return {"ok": True}

# --- Project Routes ---
@router.get("/projects", response_model=List[ProjectRead])
def get_projects(session: Session = Depends(get_session)):
    return session.exec(select(Project)).all()

@router.post("/projects", response_model=ProjectRead)
def create_project(project: ProjectCreate, session: Session = Depends(get_session)):
    db_project = Project.model_validate(project)
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project

@router.patch("/projects/{project_id}", response_model=ProjectRead)
def update_project(project_id: int, project: ProjectUpdate, session: Session = Depends(get_session)):
    db_project = session.get(Project, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project_data = project.model_dump(exclude_unset=True)
    for key, value in project_data.items():
        setattr(db_project, key, value)
        
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project

@router.delete("/projects/{project_id}")
def delete_project(project_id: int, session: Session = Depends(get_session)):
    db_project = session.get(Project, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    session.delete(db_project)
    session.commit()
    return {"ok": True}

# --- Testimonial Routes ---
@router.get("/testimonials", response_model=List[TestimonialRead])
def get_testimonials(session: Session = Depends(get_session)):
    return session.exec(select(Testimonial)).all()

@router.post("/testimonials", response_model=TestimonialRead)
def create_testimonial(testimonial: TestimonialCreate, session: Session = Depends(get_session)):
    db_testimonial = Testimonial.model_validate(testimonial)
    session.add(db_testimonial)
    session.commit()
    session.refresh(db_testimonial)
    return db_testimonial

@router.delete("/testimonials/{testimonial_id}")
def delete_testimonial(testimonial_id: int, session: Session = Depends(get_session)):
    db_testimonial = session.get(Testimonial, testimonial_id)
    if not db_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    session.delete(db_testimonial)
    session.commit()
    return {"ok": True}
