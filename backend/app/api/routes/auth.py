from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.database import get_supabase_client, get_supabase_admin

router = APIRouter(prefix="/auth", tags=["auth"])


class RegisterInput(BaseModel):
    email: EmailStr
    password: str
    company_name: str
    slug: str


class LoginInput(BaseModel):
    email: EmailStr
    password: str


@router.post("/register")
async def register(data: RegisterInput):
    admin = get_supabase_admin()
    # Cria tenant
    tenant = admin.table("tenants").insert({
        "name": data.company_name,
        "slug": data.slug,
        "plan": "trial",
        "credits_balance": 3
    }).execute()

    if not tenant.data:
        raise HTTPException(400, "Erro ao criar empresa")

    tenant_id = tenant.data[0]["id"]

    # Cria usuário no Supabase Auth
    client = get_supabase_client()
    client.auth.sign_up({
        "email": data.email,
        "password": data.password,
        "options": {
            "data": {
                "tenant_id": tenant_id,
                "role": "admin"
            }
        }
    })

    # Cria registro na tabela users
    admin.table("users").insert({
        "tenant_id": tenant_id,
        "email": data.email,
        "full_name": data.email.split("@")[0],
        "role": "admin"
    }).execute()

    return {"message": "Conta criada com sucesso", "tenant_id": tenant_id}


@router.post("/login")
async def login(data: LoginInput):
    client = get_supabase_client()
    result = client.auth.sign_in_with_password({
        "email": data.email,
        "password": data.password
    })
    return {
        "access_token": result.session.access_token,
        "user": result.user.email
    }
