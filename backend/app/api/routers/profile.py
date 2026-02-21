from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import Optional

from ...models.database import get_session
from ...models.portfolio import Profile, User
from ...schemas.portfolio import (
    ProfileRead, ProfileUpdate, ProfileCreate
)
from .auth import get_current_user

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.get("", response_model=ProfileRead)
def get_profile(
    session: Session = Depends(get_session),
    current_user: Optional[User] = Depends(get_current_user)
):
    if not current_user:
        # Public view defaults to the first profile found
        profile = session.exec(select(Profile)).first()
        if not profile:
            raise HTTPException(status_code=404, detail="No profiles found")
        return profile

    profile = session.exec(select(Profile).where(Profile.user_id == current_user.id)).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found for this user")
    return profile

@router.post("", response_model=ProfileRead)
def create_profile(
    profile: ProfileCreate, 
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    existing_profile = session.exec(select(Profile).where(Profile.user_id == current_user.id)).first()
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists for this user")
    db_profile = Profile.model_validate(profile)
    db_profile.user_id = current_user.id
    session.add(db_profile)
    session.commit()
    session.refresh(db_profile)
    return db_profile

@router.patch("", response_model=ProfileRead)
def update_profile(
    profile: ProfileUpdate, 
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    db_profile = session.exec(select(Profile).where(Profile.user_id == current_user.id)).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    profile_data = profile.model_dump(exclude_unset=True)
    for key, value in profile_data.items():
        setattr(db_profile, key, value)
    
    session.add(db_profile)
    session.commit()
    session.refresh(db_profile)
    return db_profile
