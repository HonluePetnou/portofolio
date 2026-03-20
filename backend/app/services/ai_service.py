from __future__ import annotations

import os
from typing import Optional

import httpx
from sqlmodel import Session, select

from ..core.encryption import decrypt_value
from ..models.portfolio import Setting


class AIClient:
    async def generate_text(self, prompt: str) -> str:
        raise NotImplementedError


class OpenAIClient(AIClient):
    def __init__(self, api_key: str, model: str = "gpt-4.1-mini") -> None:
        self.api_key = api_key
        self.model = model

    async def generate_text(self, prompt: str) -> str:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": self.model,
                    "messages": [
                        {
                            "role": "system",
                            "content": "You are a copywriter for a B2B agency. Avoid emojis unless explicitly requested.",
                        },
                        {"role": "user", "content": prompt},
                    ],
                    "temperature": 0.7,
                },
                timeout=40,
            )
        resp.raise_for_status()
        data = resp.json()
        return data.get("choices", [{}])[0].get("message", {}).get("content", "")


class ClaudeClient(AIClient):
    def __init__(self, api_key: str, model: str = "claude-3.5-sonnet") -> None:
        self.api_key = api_key
        self.model = model

    async def generate_text(self, prompt: str) -> str:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": self.api_key,
                    "anthropic-version": "2023-06-01",
                    "Content-Type": "application/json",
                },
                json={
                    "model": self.model,
                    "max_tokens": 800,
                    "system": "You are a copywriter for a B2B agency. Avoid emojis unless explicitly requested.",
                    "messages": [{"role": "user", "content": prompt}],
                },
                timeout=40,
            )
        resp.raise_for_status()
        data = resp.json()
        blocks = data.get("content", [])
        for b in blocks:
            if b.get("type") == "text":
                return b.get("text", "")
        return ""


class GeminiClient(AIClient):
    def __init__(self, api_key: str, model: str = "gemini-1.5-pro-latest") -> None:
        self.api_key = api_key
        self.model = model

    async def generate_text(self, prompt: str) -> str:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                url,
                json={
                    "contents": [
                        {
                            "role": "user",
                            "parts": [{"text": prompt}],
                        }
                    ],
                    "safetySettings": [],
                },
                timeout=40,
            )
        resp.raise_for_status()
        data = resp.json()
        cand = (data.get("candidates") or [{}])[0]
        parts = cand.get("content", {}).get("parts", [])
        if not parts:
            return ""
        if isinstance(parts[0], dict) and "text" in parts[0]:
            return parts[0]["text"]
        return "\n".join(p.get("text", "") for p in parts)


def _get_setting_value(session: Session, key: str) -> Optional[str]:
    stmt = select(Setting).where(Setting.key == key)
    setting = session.exec(stmt).first()
    return setting.value if setting else None


async def get_ai_client(session: Session) -> AIClient:
    provider = _get_setting_value(session, "AI_PROVIDER") or "OPENAI"
    enc_key = _get_setting_value(session, "AI_API_KEY")
    if not enc_key:
        raise RuntimeError("AI_API_KEY is not configured.")

    api_key = decrypt_value(enc_key)

    if provider == "OPENAI":
        return OpenAIClient(api_key)
    if provider == "CLAUDE":
        return ClaudeClient(api_key)
    if provider == "GEMINI":
        return GeminiClient(api_key)

    raise RuntimeError(f"Unsupported AI provider: {provider}")

