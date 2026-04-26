import asyncio
import os
from typing import List
import aiohttp

REVALIDATE_SECRET = os.getenv("REVALIDATE_SECRET")
MANSAH_URL = os.getenv("MANSAH_URL", "https://mansah.vercel.app")
AGENCY_URL = os.getenv("AGENCY_URL", "")

async def trigger_revalidation(paths: List[str]):
    """
    Déclenche la revalidation ISR sur les frontends configurés.
    Fire-and-forget : ne bloque jamais, log les erreurs.
    """
    if not REVALIDATE_SECRET:
        print("Warning: REVALIDATE_SECRET not configured, skipping revalidation")
        return

    frontend_urls = []
    if MANSAH_URL:
        frontend_urls.append(MANSAH_URL)
    if AGENCY_URL:
        frontend_urls.append(AGENCY_URL)

    if not frontend_urls:
        print("Warning: No frontend URLs configured for revalidation")
        return

    async def revalidate_frontend(url: str):
        try:
            async with aiohttp.ClientSession() as session:
                payload = {
                    "secret": REVALIDATE_SECRET,
                    "paths": paths
                }
                async with session.post(
                    f"{url}/api/revalidate",
                    json=payload,
                    timeout=aiohttp.ClientTimeout(total=5)
                ) as response:
                    if response.status == 200:
                        print(f"Revalidation triggered for {url}: {paths}")
                    else:
                        print(f"Revalidation failed for {url}: HTTP {response.status}")
        except Exception as e:
            print(f"Revalidation error for {url}: {e}")

    # Fire-and-forget : lance toutes les revalidations en parallèle
    tasks = [revalidate_frontend(url) for url in frontend_urls]
    asyncio.create_task(asyncio.gather(*tasks, return_exceptions=True))