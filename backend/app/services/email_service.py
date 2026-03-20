from __future__ import annotations

import os
from typing import Optional

import httpx

from ..core.encryption import decrypt_value
from ..models.portfolio import Setting
from sqlmodel import Session, select


class EmailClient:
    async def send_email(self, to: str, subject: str, html: str) -> None:
        raise NotImplementedError


class NoopEmailClient(EmailClient):
    async def send_email(self, to: str, subject: str, html: str) -> None:
        return


class ResendEmailClient(EmailClient):
    def __init__(self, api_key: str, default_from: str) -> None:
        self.api_key = api_key
        self.default_from = default_from

    async def send_email(self, to: str, subject: str, html: str) -> None:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={
                    "from": self.default_from,
                    "to": to,
                    "subject": subject,
                    "html": html,
                },
                timeout=20,
            )
        resp.raise_for_status()


class SendGridEmailClient(EmailClient):
    def __init__(self, api_key: str, default_from: str) -> None:
        self.api_key = api_key
        self.default_from = default_from

    async def send_email(self, to: str, subject: str, html: str) -> None:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://api.sendgrid.com/v3/mail/send",
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "personalizations": [{"to": [{"email": to}]}],
                    "from": {"email": self.default_from},
                    "subject": subject,
                    "content": [{"type": "text/html", "value": html}],
                },
                timeout=20,
            )
        resp.raise_for_status()


async def get_email_client(session: Session) -> EmailClient:
    provider = _get_setting_value(session, "EMAIL_PROVIDER")
    enc_key = _get_setting_value(session, "EMAIL_API_KEY")
    notification_email = _get_setting_value(session, "NOTIFICATION_EMAIL")

    if not provider or provider == "NONE" or not enc_key or not notification_email:
        return NoopEmailClient()

    api_key = decrypt_value(enc_key)

    if provider == "RESEND":
        return ResendEmailClient(api_key, notification_email)
    if provider == "SENDGRID":
        return SendGridEmailClient(api_key, notification_email)

    return NoopEmailClient()


def _get_setting_value(session: Session, key: str) -> Optional[str]:
    stmt = select(Setting).where(Setting.key == key)
    setting = session.exec(stmt).first()
    return setting.value if setting else None

