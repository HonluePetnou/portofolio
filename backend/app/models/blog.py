from enum import Enum


class BlogStatus(str, Enum):
    draft = "draft"
    scheduled = "scheduled"
    published = "published"


__all__ = ["BlogStatus"]

