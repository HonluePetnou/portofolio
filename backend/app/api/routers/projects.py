from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import List, Optional
import uuid

from ...models.database import get_session
from ...models.portfolio import Project, User
from ...schemas.portfolio import (
    ProjectRead, ProjectCreate, ProjectUpdate
)
from .auth import get_current_user, get_current_admin

router = APIRouter(prefix="/projects", tags=["Projects"])


# ── 1. Routes Authentifiées (Doivent être AVANT les routes avec ID pour éviter les conflits) ──

@router.get("/me", response_model=List[ProjectRead])
def get_my_projects(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """Récupère uniquement les projets de l'utilisateur connecté."""
    return session.exec(
        select(Project).where(Project.user_id == current_user.id)
    ).all()


@router.get("/all", response_model=List[ProjectRead])
def get_all_projects_admin(
    session: Session = Depends(get_session),
    current_admin: User = Depends(get_current_admin),
):
    """Admin : Récupère tous les projets de tous les utilisateurs."""
    return session.exec(select(Project)).all()


@router.get("/check-slug/{slug}")
def check_slug(
    slug: str,
    exclude_id: Optional[str] = Query(None),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """Vérifie si un slug est disponible."""
    query = select(Project).where(Project.slug == slug)
    if exclude_id:
        try:
            uid = uuid.UUID(exclude_id)
            query = query.where(Project.id != uid)
        except ValueError:
            pass
    existing = session.exec(query).first()
    return {"available": existing is None}


# ── 2. Routes Publiques ──────────────────────────────────────────────────────────

@router.get("", response_model=List[ProjectRead])
def get_projects(
    featured: Optional[bool] = Query(None, description="Filter by featured status"),
    session: Session = Depends(get_session),
):
    query = select(Project)
    if featured is not None:
        query = query.where(Project.is_featured == featured)
    return session.exec(query).all()


@router.get("/slug/{slug}", response_model=ProjectRead)
def get_project_by_slug(slug: str, session: Session = Depends(get_session)):
    """Look up a single project by its URL slug."""
    db_project = session.exec(select(Project).where(Project.slug == slug)).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


@router.get("/{project_id}", response_model=ProjectRead)
def get_project_by_id(project_id: uuid.UUID, session: Session = Depends(get_session)):
    """Récupère un projet par son ID (UUID)."""
    db_project = session.get(Project, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


# ── 3. Écritures (Authentifiées) ────────────────────────────────────────────────

@router.post("", response_model=ProjectRead)
def create_project(
    project: ProjectCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    # Guard against duplicate slug
    existing = session.exec(select(Project).where(Project.slug == project.slug)).first()
    if existing:
        raise HTTPException(status_code=409, detail=f"Slug '{project.slug}' already in use")

    db_project = Project.model_validate(project)
    db_project.user_id = current_user.id
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project


@router.patch("/{project_id}", response_model=ProjectRead)
def update_project(
    project_id: uuid.UUID,
    project: ProjectUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    db_project = session.get(Project, project_id)
    if not db_project or db_project.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Project not found")

    project_data = project.model_dump(exclude_unset=True)

    if "slug" in project_data:
        clash = session.exec(
            select(Project)
            .where(Project.slug == project_data["slug"])
            .where(Project.id != project_id)
        ).first()
        if clash:
            raise HTTPException(status_code=409, detail=f"Slug '{project_data['slug']}' already in use")

    for key, value in project_data.items():
        setattr(db_project, key, value)

    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project


@router.delete("/{project_id}")
def delete_project(
    project_id: uuid.UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    db_project = session.get(Project, project_id)
    if not db_project or db_project.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Project not found")
    session.delete(db_project)
    session.commit()
    return {"ok": True}


# ── 4. Admin Overrides ─────────────────────────────────────────────────────────

@router.patch("/admin/{project_id}", response_model=ProjectRead)
def admin_update_project(
    project_id: uuid.UUID,
    project: ProjectUpdate,
    session: Session = Depends(get_session),
    _: User = Depends(get_current_admin),
):
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


@router.delete("/admin/{project_id}")
def admin_delete_project(
    project_id: uuid.UUID,
    session: Session = Depends(get_session),
    _: User = Depends(get_current_admin),
):
    db_project = session.get(Project, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    session.delete(db_project)
    session.commit()
    return {"ok": True}
