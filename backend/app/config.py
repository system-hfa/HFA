from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    APP_ENV: str = "development"
    APP_SECRET_KEY: str
    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str
    ANTHROPIC_API_KEY: str = ""
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    class Config:
        env_file = "../.env"


settings = Settings()
