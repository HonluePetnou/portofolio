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
    if not article:
        raise HTTPException(status_code=404, detail="Article not found.")

    try:
        ai = await get_ai_client(session)

        base_context = f"""
Tu es le Community Manager de Soluty, une agence B2B de premier plan.
Ta mission est de rédiger des posts pour les réseaux sociaux afin de promouvoir un nouvel article de blog.
Les posts doivent impérativement tourner autour de la thématique centrale de l'article, apporter de la valeur et avoir un ton direct, professionnel et accrocheur.
L'objectif est de générer du trafic vers l'article ou d'encourager la prise de contact avec l'agence.

Titre de l'article : "{article.title}"
Résumé : "{article.excerpt}"
Contenu : {json.dumps(article.content)}
""".strip()

        tasks = [
            # LinkedIn Post 1
            ai.generate_text(base_context + "\n\nRédige un post LinkedIn (Post 1/2) sous forme de Storytelling ou Retour d'expérience. Accroche forte (sans dire 'Dans cet article'), paragraphes aérés, et un Call-to-Action clair à la fin. Ton pro, direct, pas de hashtags abusifs. Pas d'émojis sauf si très pertinents."),
            # LinkedIn Post 2
            ai.generate_text(base_context + "\n\nRédige un post LinkedIn (Post 2/2) orienté 'Valeur & Éducation'. Utilise des phrases courtes ou des bullet points pour distiller les conseils de l'article. Termine par une question engageante et un CTA. Pas d'émojis sauf si très pertinents."),
            # Twitter / X Thread
            ai.generate_text(base_context + "\n\nRédige un Thread Twitter/X (3 à 5 tweets maximum). Le premier tweet doit être un gros 'Hook' (une accroche choc). Les suivants distillent le contenu. Le dernier contient le CTA. Renvoie STRICTEMENT un tableau JSON de chaînes de caractères (ex: [\"Tweet 1\", \"Tweet 2\"]). Aucun autre texte ou markdown autour du JSON !"),
            # Twitter / X Short
            ai.generate_text(base_context + "\n\nRédige un seul tweet punchy (max 240 caractères) pour teaser l'article. Il doit générer de la curiosité avec un CTA clair."),
            # Instagram
            ai.generate_text(base_context + "\n\nRédige une légende Instagram optimisée pour l'engagement. Des lignes courtes, une accroche visuelle, et un CTA 'lien en bio'. Utilise des hashtags pertinents."),
            # Facebook
            ai.generate_text(base_context + "\n\nRédige un post Facebook B2B, amical mais professionnel (Post 1/1). 2 à 4 paragraphes courts. Met en avant le bénéfice direct pour le lecteur s'il lit l'article. Termine par un CTA. Pas d'émojis abusifs.")
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

