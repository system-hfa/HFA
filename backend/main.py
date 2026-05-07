from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.routes import auth, events, analyses, actions, credits

app = FastAPI(
    title="HFA - Human Factor Analysis API",
    version="0.1.0",
    docs_url="/docs" if settings.APP_ENV == "development" else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(events.router)
app.include_router(analyses.router)
app.include_router(actions.router)
app.include_router(credits.router)


@app.get("/health")
def health_check():
    return {"status": "ok", "env": settings.APP_ENV}
