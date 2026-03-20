"""extend_project_and_blogpost_for_agency

Revision ID: 20260224_extend_project_and_blogpost_for_agency
Revises: 20260224_add_member_table
Create Date: 2026-02-24 00:00:00.000000
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "20260224_extend_project_and_blogpost_for_agency"
down_revision = "20260224_add_member_table"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # --- Project ---
    op.add_column(
        "project",
        sa.Column("member_id", postgresql.UUID(as_uuid=True), nullable=True),
    )
    op.add_column(
        "project",
        sa.Column(
            "agency_visible",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("false"),
        ),
    )
    op.create_index("ix_project_member_id", "project", ["member_id"], unique=False)
    op.create_foreign_key(
        "fk_project_member_id_member",
        "project",
        "member",
        ["member_id"],
        ["id"],
        ondelete="SET NULL",
    )

    # --- BlogPost (Article) ---
    op.add_column(
        "article",
        sa.Column("member_id", postgresql.UUID(as_uuid=True), nullable=True),
    )
    op.add_column(
        "article",
        sa.Column(
            "agency_visible",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("false"),
        ),
    )
    op.add_column("article", sa.Column("published_at", sa.DateTime(), nullable=True))

    blogstatus_enum = sa.Enum(
        "draft",
        "scheduled",
        "published",
        name="blogstatus",
    )
    blogstatus_enum.create(op.get_bind(), checkfirst=True)

    op.add_column(
        "article",
        sa.Column(
            "status",
            blogstatus_enum,
            nullable=False,
            server_default=sa.text("'draft'"),
        ),
    )
    op.add_column(
        "article",
        sa.Column(
            "ai_generated",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("false"),
        ),
    )
    op.add_column("article", sa.Column("ai_mode", sa.String(), nullable=True))

    op.create_index("ix_article_member_id", "article", ["member_id"], unique=False)
    op.create_foreign_key(
        "fk_article_member_id_member",
        "article",
        "member",
        ["member_id"],
        ["id"],
        ondelete="SET NULL",
    )


def downgrade() -> None:
    # --- BlogPost (Article) downgrade ---
    op.drop_constraint(
        "fk_article_member_id_member", "article", type_="foreignkey"
    )
    op.drop_index("ix_article_member_id", table_name="article")
    op.drop_column("article", "ai_mode")
    op.drop_column("article", "ai_generated")
    op.drop_column("article", "status")
    op.drop_column("article", "published_at")
    op.drop_column("article", "agency_visible")
    op.drop_column("article", "member_id")

    blogstatus_enum = sa.Enum(
        "draft",
        "scheduled",
        "published",
        name="blogstatus",
    )
    blogstatus_enum.drop(op.get_bind(), checkfirst=True)

    # --- Project downgrade ---
    op.drop_constraint(
        "fk_project_member_id_member", "project", type_="foreignkey"
    )
    op.drop_index("ix_project_member_id", table_name="project")
    op.drop_column("project", "agency_visible")
    op.drop_column("project", "member_id")

