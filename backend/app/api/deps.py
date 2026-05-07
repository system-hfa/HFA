from fastapi import Header, HTTPException
from supabase import Client
from app.database import get_supabase_client


async def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token inválido")
    token = authorization.split(" ")[1]
    client = get_supabase_client()
    try:
        user = client.auth.get_user(token)
        return user
    except Exception:
        raise HTTPException(status_code=401, detail="Não autorizado")
