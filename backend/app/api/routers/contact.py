from __future__ import annotations

from datetime import datetime
import uuid

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import Session, select

from ...models.database import get_session
from ...models.portfolio import (
    ContactMessage,
    ContactStatus,
    PriorityLevel,
    User,
)
from ...schemas.portfolio import ContactCreate, ContactRead, ContactAdminUpdate
from .auth import get_current_admin
from ...services.email_service import get_email_client

router = APIRouter(tags=["Contact"])


def _determine_priority(payload: ContactCreate) -> PriorityLevel:
    if payload.budget is not None and payload.budget >= 3000:
        return PriorityLevel.HIGH
    if payload.service and "saas" in payload.service.lower():
        return PriorityLevel.HIGH
    return PriorityLevel.LOW


_RATE_LIMIT_BUCKET: dict[str, list[float]] = {}
RATE_LIMIT_WINDOW_SECONDS = 60
RATE_LIMIT_MAX_REQUESTS = 5


def _rate_limited(ip: str) -> bool:
    import time

    now = time.time()
    entries = _RATE_LIMIT_BUCKET.get(ip, [])
    entries = [t for t in entries if now - t < RATE_LIMIT_WINDOW_SECONDS]
    if len(entries) >= RATE_LIMIT_MAX_REQUESTS:
        _RATE_LIMIT_BUCKET[ip] = entries
        return True
    entries.append(now)
    _RATE_LIMIT_BUCKET[ip] = entries
    return False


@router.post("/contact")
async def create_contact(
    payload: ContactCreate,
    request: Request,
    session: Session = Depends(get_session),
):
    ip = request.client.host if request.client else "unknown"
    if _rate_limited(ip):
        raise HTTPException(status_code=429, detail="Too many requests")

    msg = ContactMessage(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        company=payload.company,
        subject=payload.subject,
        message=payload.message,
        service=payload.service,
        budget=payload.budget,
        status=ContactStatus.NEW,
        priority=_determine_priority(payload),
    )
    session.add(msg)
    session.commit()
    session.refresh(msg)

    # fire-and-forget email notification
    try:
        email_client = await get_email_client(session)
        budget_text = f"${payload.budget:,}" if payload.budget is not None else "N/A"
        html = f"""
        <h1>New contact message</h1>
        <p><strong>Name:</strong> {payload.name}</p>
        <p><strong>Email:</strong> {payload.email}</p>
        <p><strong>Phone:</strong> {payload.phone or "N/A"}</p>
        <p><strong>Company:</strong> {payload.company or "N/A"}</p>
        <p><strong>Service:</strong> {payload.service or "N/A"}</p>
        <p><strong>Budget:</strong> {budget_text}</p>
        <p><strong>Subject:</strong> {payload.subject}</p>
        <p><strong>Message:</strong></p>
        <p>{payload.message.replace("\n", "<br/>")}</p>
        """
        await email_client.send_email(
            to="",  # handled by email client default/notification setting
            subject=f"New contact message: {payload.subject}",
            html=html,
        )
    except Exception:
        # Log only; don't block user on email failure
        import logging

        logging.exception("Failed to send contact notification email")

    return {"success": True, "id": str(msg.id)}


@router.get("/admin/contact", response_model=list[ContactRead])
def list_contact(
    session: Session = Depends(get_session),
    current_admin: User = Depends(get_current_admin),
):
    stmt = select(ContactMessage).order_by(ContactMessage.created_at.desc())
    rows = session.exec(stmt).all()
    return rows


@router.get("/admin/contact/{message_id}", response_model=ContactRead)
def get_contact(
    message_id: uuid.UUID,
    session: Session = Depends(get_session),
    current_admin: User = Depends(get_current_admin),
):
    msg = session.get(ContactMessage, message_id)
    if not msg:
        raise HTTPException(status_code=404, detail="Contact message not found")
    return msg


@router.patch("/admin/contact/{message_id}", response_model=ContactRead)
def update_contact(
    message_id: uuid.UUID,
    payload: ContactAdminUpdate,
    session: Session = Depends(get_session),
    current_admin: User = Depends(get_current_admin),
):
    msg = session.get(ContactMessage, message_id)
    if not msg:
        raise HTTPException(status_code=404, detail="Contact message not found")

    data = payload.model_dump(exclude_unset=True)
    if "status" in data and data["status"] is not None:
        msg.status = ContactStatus(data["status"])
    if "priority" in data and data["priority"] is not None:
        msg.priority = PriorityLevel(data["priority"])
    if "internal_notes" in data:
        msg.internal_notes = data["internal_notes"]
    msg.updated_at = datetime.utcnow()

    session.add(msg)
    session.commit()
    session.refresh(msg)
    return msg


@router.delete("/admin/contact/{message_id}")
def delete_contact(
    message_id: uuid.UUID,
    session: Session = Depends(get_session),
    current_admin: User = Depends(get_current_admin),
):
    msg = session.get(ContactMessage, message_id)
    if not msg:
        raise HTTPException(status_code=404, detail="Contact message not found")
    session.delete(msg)
    session.commit()
    return {"ok": True}

