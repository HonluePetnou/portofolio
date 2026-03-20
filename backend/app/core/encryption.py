from __future__ import annotations

import base64
import os
from cryptography.fernet import Fernet, InvalidToken
from .security import SECRET_KEY


def _derive_key() -> bytes:
  """
  Derive a Fernet-compatible key from SECRET_KEY or ENCRYPTION_KEY.
  """
  raw = os.getenv("ENCRYPTION_KEY") or SECRET_KEY
  if not raw:
      raise RuntimeError("No encryption key configured.")
  # Fernet expects 32 urlsafe base64-encoded bytes.
  key = base64.urlsafe_b64encode(raw.encode("utf-8")[:32].ljust(32, b"0"))
  return key


_FERNET: Fernet | None = None


def get_fernet() -> Fernet | None:
  global _FERNET
  if _FERNET is None:
      try:
          _FERNET = Fernet(_derive_key())
      except Exception:
          _FERNET = None
  return _FERNET


def encrypt_value(value: str) -> str:
  f = get_fernet()
  if not f:
      return value
  token = f.encrypt(value.encode("utf-8"))
  return token.decode("utf-8")


def decrypt_value(value: str) -> str:
  f = get_fernet()
  if not f:
      return value
  try:
      plain = f.decrypt(value.encode("utf-8"))
      return plain.decode("utf-8")
  except (InvalidToken, ValueError):
      return value

