from __future__ import annotations

import asyncio
import json
import uuid
from typing import Any, cast, List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.models.database import get_session
from app.models.portfolio import Article, SocialPost, SocialPlatform, SocialStatus, User
from app.schemas.portfolio import SocialGenerated, SocialLinkedIn, SocialTwitter, SocialInstagram, SocialFacebook
from app.api.routers.auth import get_current_admin
from app.services.ai_service import get_ai_client

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

    try:
        ai = await get_ai_client(session)

        base_context = f"""
You are generating social media copy for a B2B agency.
Do NOT use emojis unless explicitly requested.

Blog title: "{article.title}"
Summary: "{article.excerpt}"
Content: {json.dumps(article.content)}
""".strip()

        tasks = [
            ai.generate_text(base_context + "\n\nCreate a LinkedIn post in a storytelling tone aimed at agency buyers.\nUse a strong hook in the first line, 2–3 short paragraphs, and a clear CTA to contact the agency.\nDo not add emojis."),
            ai.generate_text(base_context + "\n\nCreate a LinkedIn post that is value-driven and educational.\nUse bullet-like short sentences (each on a new line) and end with a CTA to read the full article or contact the agency.\nDo not add emojis."),
            ai.generate_text(base_context + "\n\nCreate a Twitter/X thread with exactly 5 short tweets.\nReturn the result as a valid JSON array of 5 strings, where each string is one tweet.\nTweets should have strong hooks, be concise, and end the last tweet with a clear CTA to read the article or contact the agency.\nDo not add emojis. Output ONLY the JSON array, nothing else."),
            ai.generate_text(base_context + "\n\nCreate a single, short, punchy tweet (max 240 characters) that teases the article and ends with a clear CTA.\nDo not add emojis."),
            ai.generate_text(base_context + "\n\nCreate an Instagram caption optimized for saves and shares.\nUse short lines, strong hook at the top, and end with a clear CTA to check the link in bio or contact the agency.\nDo not add emojis."),
            ai.generate_text(base_context + "\n\nCreate a Facebook post that is friendly but professional.\nUse 2–4 short paragraphs and end with a CTA to read the article or contact the agency.\nDo not add emojis.")
        ]
        
        results = cast(Any, await asyncio.gather(*tasks))
        linkedin_story = str(results[0])
        linkedin_value = str(results[1])
        twitter_thread_raw = str(results[2])
        twitter_short = str(results[3])
        instagram_caption = str(results[4])
        facebook_post = str(results[5])
    except Exception as e:
        print(f"AI Generation failed: {e}")
        # Return dummy content when AI is not configured or generation fails
        return SocialGenerated(
            blog_id=article_id,
            linkedin=SocialLinkedIn(
                storytelling=f"Check out our latest article: {article.title}\n\n{article.excerpt}\n\nRead more: [link]",
                value_driven=f"Learn about: {article.title}\n\nKey insights:\n- Point 1\n- Point 2\n- Point 3\n\nContact us for more info.",
            ),
            twitter=SocialTwitter(
                thread_tweets=[
                    f"Thread: {article.title}",
                    article.excerpt[:100] + "...",
                    "Key takeaway 1",
                    "Key takeaway 2",
                    "Read the full article [link]",
                ],
                thread_combined=f"Thread: {article.title}\n\n{article.excerpt[:100]}...\n\nKey takeaway 1\nKey takeaway 2\n\nRead the full article [link]",
                short=f"Just published: {article.title} [link]",
            ),
            instagram=SocialInstagram(
                caption=f"📈 {article.title}\n\n{article.excerpt[:150]}...\n\nLink in bio 🔗"
            ),
            facebook=SocialFacebook(
                post=f"Check out our latest insights: {article.title}\n\n{article.excerpt}\n\nRead the full article here: [link]"
            ),
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
        thread_tweets = list(chunks)[:5]  # type: ignore
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

