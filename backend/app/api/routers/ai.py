from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from .auth import get_current_user
from ...models.portfolio import User

router = APIRouter(prefix="/ai", tags=["AI Tools"])

class AIGenerateRequest(BaseModel):
    prompt: str
    context_type: str = "article" # article, section, excerpt

@router.post("/generate")
async def generate_content(
    request: AIGenerateRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Simulates an AI content generator for high-conversion articles.
    In a production environment, this would call an LLM API (OpenAI, Gemini).
    """
    prompt_text = request.prompt
    
    # High-quality mock responses based on keywords
    if any(k in prompt_text.lower() for k in ["conversion", "audit", "marketing", "site"]):
        return {
            "title": f"Comment optimiser votre {prompt_text} pour une conversion maximale",
            "excerpt": "Découvrez les stratégies psychologiques et techniques pour transformer votre présence en ligne en une machine à générer des leads qualifiés.",
            "content": {
                "intro": "Dans l'économie numérique d'aujourd'hui, avoir un site web ne suffit plus. La différence entre un site qui survit et un site qui domine réside dans sa capacité à capter l'attention et à la convertir en action. Cet article détaille les piliers d'une stratégie de conversion haute performance.",
                "sections": [
                    {
                        "heading": "Comprendre la psychologie du visiteur",
                        "body": "Chaque visiteur arrive avec une intention spécifique. Si votre proposition de valeur n'est pas claire dans les 3 premières secondes, vous avez déjà perdu. Nous analysons comment aligner votre message avec les besoins profonds de votre audience.",
                        "image": ""
                    },
                    {
                        "heading": "L'optimisation de l'expérience utilisateur (UX)",
                        "body": "L'UX n'est pas qu'une question de jolies couleurs. C'est une question de fluidité. Moins il y a de clics pour arriver à l'objectif, plus votre taux de conversion sera élevé. Simplifiez, clarifiez, convertissez.",
                        "image": ""
                    }
                ]
            }
        }
    
    return {
        "title": f"Guide complet sur {prompt_text} : Expertise et Stratégie",
        "excerpt": f"Analyse approfondie de {prompt_text} pour les professionnels cherchant à se démarquer dans un marché saturé.",
        "content": {
            "intro": f"Pourquoi {prompt_text} est devenu le sujet incontournable cette année ? C'est ce que nous allons explorer dans ce dossier spécial, où nous croisons analyses techniques et retours d'expérience terrain.",
            "sections": [
                {
                    "heading": "Les fondamentaux à maîtriser",
                    "body": f"Pour bien comprendre les enjeux de {prompt_text}, il faut d'abord revenir aux bases. Nous décortiquons ici les mécanismes essentiels qui font le succès de cette approche.",
                    "image": ""
                },
                {
                    "heading": "Vers une approche innovante",
                    "body": "L'avenir appartient à ceux qui osent bousculer les codes. Voici comment appliquer ces concepts pour obtenir des résultats tangibles et durables.",
                    "image": ""
                }
            ]
        }
    }
