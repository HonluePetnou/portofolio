from __future__ import annotations

import json
import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from ...models.database import get_session
from ...models.portfolio import Article, SocialPost, SocialPlatform, SocialStatus, User
from ...schemas.portfolio import SocialGenerated, SocialLinkedIn, SocialTwitter, SocialInstagram, SocialFacebook
from .auth import get_current_admin
from ...services.ai_service import get_ai_client

router = APIRouter(prefix="/social", tags=["Social"])


@router.post("/generate/{article_id}", response_model=SocialGenerated)
async def generate_social_for_article(
    article_id: uuid.UUID,
    session: Session = Depends(get_session),
    current_admin: User = Depends(get_current_admin),
):
    article = session.get(Article, article_id)
    if not article or not article.published:
        raise HTTPException(status_code=400, detail="Article must exist and be published.")

    ai = await get_ai_client(session)

    base_context = f"""
You are generating social media copy for a B2B agency.
Do NOT use emojis unless explicitly requested.

Blog title: "{article.title}"
Summary: "{article.excerpt}"
Content: {json.dumps(article.content)}
""".strip()

    linkedin_story = await ai.generate_text(
        base_context
        + """

Create a LinkedIn post in a storytelling tone aimed at agency buyers.
Use a strong hook in the first line, 2–3 short paragraphs, and a clear CTA to contact the agency.
Do not add emojis."""
    )

    linkedin_value = await ai.generate_text(
        base_context
        + """

Create a LinkedIn post that is value-driven and educational.
Use bullet-like short sentences (each on a new line) and end with a CTA to read the full article or contact the agency.
Do not add emojis."""
    )

    twitter_thread_raw = await ai.generate_text(
        base_context
        + """

Create a Twitter/X thread with exactly 5 short tweets.
Return the result as a valid JSON array of 5 strings, where each string is one tweet.
Tweets should have strong hooks, be concise, and end the last tweet with a clear CTA to read the article or contact the agency.
Do not add emojis. Output ONLY the JSON array, nothing else."""
    )

    twitter_short = await ai.generate_text(
        base_context
        + """

Create a single, short, punchy tweet (max 240 characters) that teases the article and ends with a clear CTA.
Do not add emojis."""
    )

    instagram_caption = await ai.generate_text(
        base_context
        + """

Create an Instagram caption optimized for saves and shares.
Use short lines, strong hook at the top, and end with a clear CTA to check the link in bio or contact the agency.
Do not add emojis."""
    )

    facebook_post = await ai.generate_text(
        base_context
        + """

Create a Facebook post that is friendly but professional.
Use 2–4 short paragraphs and end with a CTA to read the article or contact the agency.
Do not add emojis."""
    )

    # Parse thread tweets
    thread_tweets: list[str] = []
    try:
        parsed = json.loads(twitter_thread_raw)
        if isinstance(parsed, list) and len(parsed) == 5:
            thread_tweets = [str(t) for t in parsed]
    except json.JSONDecodeError:
        # Fallback: split by double newlines
        chunks = [c.strip() for c in twitter_thread_raw.split("\n\n") if c.strip()]
        thread_tweets = chunks[:5]
    thread_combined = "\n\n".join(thread_tweets)

    # Persist social posts
    created_posts = [
        SocialPost(
            blog_id=article_id,
            platform=SocialPlatform.LINKEDIN,
            content=linkedin_story.strip(),
            status=SocialStatus.READY,
        ),
        SocialPost(
            blog_id=article_id,
            platform=SocialPlatform.LINKEDIN,
            content=linkedin_value.strip(),
            status=SocialStatus.READY,
        ),
        SocialPost(
            blog_id=article_id,
            platform=SocialPlatform.TWITTER,
            content=thread_combined.strip(),
            status=SocialStatus.READY,
        ),
        SocialPost(
            blog_id=article_id,
            platform=SocialPlatform.TWITTER,
            content=twitter_short.strip(),
            status=SocialStatus.READY,
        ),
        SocialPost(
            blog_id=article_id,
            platform=SocialPlatform.INSTAGRAM,
            content=instagram_caption.strip(),
            status=SocialStatus.READY,
        ),
        SocialPost(
            blog_id=article_id,
            platform=SocialPlatform.FACEBOOK,
            content=facebook_post.strip(),
            status=SocialStatus.READY,
        ),
    ]

    for p in created_posts:
        session.add(p)
    session.commit()

    return SocialGenerated(
        blog_id=article_id,
        linkedin=SocialLinkedIn(
            storytelling=created_posts[0].content,
            value_driven=created_posts[1].content,
        ),
        twitter=SocialTwitter(
            thread_tweets=thread_tweets,
            thread_combined=created_posts[2].content,
            short=created_posts[3].content,
        ),
        instagram=SocialInstagram(caption=created_posts[4].content),
        facebook=SocialFacebook(post=created_posts[5].content),
    )

