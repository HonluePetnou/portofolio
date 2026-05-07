from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
import httpx
import json
from .auth import get_current_user
from ...models.portfolio import User, Setting
from ...models.database import get_session
from ...core.encryption import decrypt_value

router = APIRouter(prefix="/ai", tags=["AI Tools"])

class AIGenerateRequest(BaseModel):
    prompt: str
    context_type: str = "article" # article, section, excerpt

@router.post("/generate")
async def generate_content(
    request: AIGenerateRequest,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Calls the Google Gemini API to generate content.
    """
    stmt = select(Setting).where(Setting.key == "AI_API_KEY")
    setting = session.exec(stmt).first()
    
    api_key = None
    if setting and setting.value:
        api_key = decrypt_value(setting.value)
    
    if not api_key:
        api_key = ""
        
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent"
    
    system_instruction = """
    You are an expert article writer. Generate a high-conversion article based on the prompt.
    You MUST output ONLY valid JSON without any markdown formatting, backticks, or extra text.
    The JSON must follow exactly this structure:
    {
        "title": "String",
        "excerpt": "String",
        "content": {
            "intro": "String",
            "sections": [
                {
                    "heading": "String",
                    "body": "String",
                    "image": ""
                }
            ]
        }
    }
    """
    
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": f"{system_instruction}\n\nPrompt: {request.prompt}"
                    }
                ]
            }
        ]
    }
    
    headers = {
        "Content-Type": "application/json",
        "X-goog-api-key": api_key
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload, timeout=60.0)
            response.raise_for_status()
            data = response.json()
            
            # Extract text from Gemini response
            generated_text = data["candidates"][0]["content"]["parts"][0]["text"]
            
            # Clean up potential markdown formatting
            generated_text = generated_text.strip()
            if generated_text.startswith("```json"):
                generated_text = generated_text[7:]
            if generated_text.startswith("```"):
                generated_text = generated_text[3:]
            if generated_text.endswith("```"):
                generated_text = generated_text[:-3]
                
            return json.loads(generated_text.strip())
            
    except Exception as e:
        print(f"Gemini API Error: {str(e)}")
        # Fallback to mock data if API fails
        prompt_text = request.prompt
        return {
            "title": f"Guide complet sur {prompt_text} : Expertise et Stratégie",
            "excerpt": f"Analyse approfondie de {prompt_text} pour les professionnels cherchant à se démarquer.",
            "content": {
                "intro": f"Pourquoi {prompt_text} est devenu le sujet incontournable cette année ? C'est ce que nous allons explorer dans ce dossier spécial.",
                "sections": [
                    {
                        "heading": "Les fondamentaux à maîtriser",
                        "body": f"Pour bien comprendre les enjeux de {prompt_text}, il faut d'abord revenir aux bases.",
                        "image": ""
                    }
                ]
            }
        }
