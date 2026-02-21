from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List, Optional

from ...models.database import get_session
from ...models.portfolio import Testimonial, User
from ...schemas.portfolio import (
    TestimonialRead, TestimonialCreate, TestimonialUpdate
)
from .auth import get_current_user, get_current_admin

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])


# ─── Public ────────────────────────────────────────────────────────────────────

@router.get("", response_model=List[TestimonialRead])
def get_testimonials(
    session: Session = Depends(get_session),
    username: Optional[str] = None,
):
    """
    Public endpoint — used by the portfolio frontend.
    Optionally filter by ?username=<username> to get a specific user's testimonials.
    """
    if username:
        user = session.exec(select(User).where(User.username == username)).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return session.exec(
            select(Testimonial).where(Testimonial.user_id == user.id)
        ).all()

    return session.exec(select(Testimonial)).all()


# ─── Authenticated user ─────────────────────────────────────────────────────────

@router.get("/me", response_model=List[TestimonialRead])
def get_my_testimonials(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """Returns only the testimonials belonging to the currently authenticated user."""
    return session.exec(
        select(Testimonial).where(Testimonial.user_id == current_user.id)
    ).all()


# ─── Admin-only ─────────────────────────────────────────────────────────────────

@router.get("/all", response_model=List[TestimonialRead])
def get_all_testimonials(
    session: Session = Depends(get_session),
    _: User = Depends(get_current_admin),
):
    """
    Admin-only endpoint.
    Returns every testimonial in the database across all users.
    """
    return session.exec(select(Testimonial)).all()


@router.get("/user/{user_id}", response_model=List[TestimonialRead])
def get_testimonials_by_user(
    user_id: int,
    session: Session = Depends(get_session),
    _: User = Depends(get_current_admin),
):
    """
    Admin-only endpoint.
    Returns all testimonials submitted by the user with the given user_id.
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return session.exec(
        select(Testimonial).where(Testimonial.user_id == user_id)
    ).all()


# ─── CRUD (authenticated user owns the resource) ───────────────────────────────

@router.post("", response_model=TestimonialRead)
def create_testimonial(
    testimonial: TestimonialCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    db_testimonial = Testimonial.model_validate(testimonial)
    db_testimonial.user_id = current_user.id
    session.add(db_testimonial)
    session.commit()
    session.refresh(db_testimonial)
    return db_testimonial


@router.patch("/{testimonial_id}", response_model=TestimonialRead)
def update_testimonial(
    testimonial_id: int,
    testimonial: TestimonialUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    db_testimonial = session.get(Testimonial, testimonial_id)
    if not db_testimonial or db_testimonial.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    testimonial_data = testimonial.model_dump(exclude_unset=True)
    for key, value in testimonial_data.items():
        setattr(db_testimonial, key, value)

    session.add(db_testimonial)
    session.commit()
    session.refresh(db_testimonial)
    return db_testimonial


@router.delete("/{testimonial_id}")
def delete_testimonial(
    testimonial_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    db_testimonial = session.get(Testimonial, testimonial_id)
    if not db_testimonial or db_testimonial.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    session.delete(db_testimonial)
    session.commit()
    return {"ok": True}


# ─── Admin overrides (bypass ownership check) ───────────────────────────────────

@router.patch("/admin/{testimonial_id}", response_model=TestimonialRead)
def admin_update_testimonial(
    testimonial_id: int,
    testimonial: TestimonialUpdate,
    session: Session = Depends(get_session),
    _: User = Depends(get_current_admin),
):
    """
    Admin-only: update any testimonial regardless of owner.
    """
    db_testimonial = session.get(Testimonial, testimonial_id)
    if not db_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    testimonial_data = testimonial.model_dump(exclude_unset=True)
    for key, value in testimonial_data.items():
        setattr(db_testimonial, key, value)

    session.add(db_testimonial)
    session.commit()
    session.refresh(db_testimonial)
    return db_testimonial


@router.delete("/admin/{testimonial_id}")
def admin_delete_testimonial(
    testimonial_id: int,
    session: Session = Depends(get_session),
    _: User = Depends(get_current_admin),
):
    """
    Admin-only: delete any testimonial regardless of owner.
    """
    db_testimonial = session.get(Testimonial, testimonial_id)
    if not db_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    session.delete(db_testimonial)
    session.commit()
    return {"ok": True}
