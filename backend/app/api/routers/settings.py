from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from ...models.database import get_session
from ...models.portfolio import Setting, User
from ...schemas.portfolio import SettingsUpdate, SettingsRead
from ...core.encryption import encrypt_value
from .auth import get_current_admin

router = APIRouter(prefix="/settings", tags=["Settings"])

SENSITIVE_KEYS = {"AI_API_KEY", "EMAIL_API_KEY"}


def _get_setting(session: Session, key: str) -> Setting | None:
    stmt = select(Setting).where(Setting.key == key)
    return session.exec(stmt).first()


def _upsert_setting(session: Session, key: str, value: str) -> None:
    setting = _get_setting(session, key)
    if setting:
        setting.value = value
        session.add(setting)
    else:
        setting = Setting(key=key, value=value)
        session.add(setting)


@router.get("", response_model=SettingsRead, response_model_by_alias=True)
def get_settings(
    session: Session = Depends(get_session),
    current_admin: User = Depends(get_current_admin),
):
    ai_provider = _get_setting(session, "AI_PROVIDER")
    email_provider = _get_setting(session, "EMAIL_PROVIDER")
    notification_email = _get_setting(session, "NOTIFICATION_EMAIL")
    ai_api_key = _get_setting(session, "AI_API_KEY")
    email_api_key = _get_setting(session, "EMAIL_API_KEY")

    return SettingsRead(
        ai_provider=ai_provider.value if ai_provider else None,
        email_provider=email_provider.value if email_provider else None,
        notification_email=notification_email.value if notification_email else None,
        ai_api_key={"configured": bool(ai_api_key and ai_api_key.value)},
        email_api_key={"configured": bool(email_api_key and email_api_key.value)},
    )


@router.patch("", response_model=SettingsRead, response_model_by_alias=True)
def update_settings(
    payload: SettingsUpdate,
    session: Session = Depends(get_session),
    current_admin: User = Depends(get_current_admin),
):
    data = payload.model_dump(exclude_unset=True, by_alias=False)
    mapping = {
        "ai_api_key": "AI_API_KEY",
        "ai_provider": "AI_PROVIDER",
        "email_provider": "EMAIL_PROVIDER",
        "email_api_key": "EMAIL_API_KEY",
        "notification_email": "NOTIFICATION_EMAIL",
    }

    for field, db_key in mapping.items():
        if field not in data or data[field] is None:
            continue
        value = data[field]
        if db_key in SENSITIVE_KEYS:
            value = encrypt_value(str(value))
        _upsert_setting(session, db_key, str(value))

    session.commit()

    return get_settings(session=session, current_admin=current_admin)

