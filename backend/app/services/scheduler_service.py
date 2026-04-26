from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from sqlmodel import Session, select
from datetime import datetime
from ..models.database import get_session
from ..models.portfolio import Article
from ..models.blog import BlogStatus
from .revalidation_service import trigger_revalidation

scheduler = AsyncIOScheduler()

async def publish_scheduled_articles():
    """Job qui s'exécute toutes les 5 minutes pour publier les articles planifiés."""
    session = next(get_session())
    try:
        # Trouver tous les articles scheduled dont published_at <= now
        now = datetime.utcnow()
        scheduled_articles = session.exec(
            select(Article).where(
                Article.status == BlogStatus.scheduled,
                Article.published_at <= now
            )
        ).all()

        for article in scheduled_articles:
            article.status = BlogStatus.published
            session.add(article)
            print(f"Published scheduled article: {article.title}")

        if scheduled_articles:
            session.commit()
            # Trigger revalidation pour le blog
            await trigger_revalidation(["/blog"])

    except Exception as e:
        print(f"Error in publish_scheduled_articles: {e}")
        session.rollback()
    finally:
        session.close()

def start_scheduler():
    """Démarre le scheduler avec le job de publication."""
    if not scheduler.running:
        scheduler.add_job(
            publish_scheduled_articles,
            trigger=IntervalTrigger(minutes=5),
            id="publish_scheduled_articles",
            name="Publish Scheduled Articles",
            max_instances=1
        )
        scheduler.start()

def stop_scheduler():
    """Arrête le scheduler."""
    if scheduler.running:
        scheduler.shutdown()