from app.config import settings


def call_ai(system: str, user: str) -> str:
    provider = settings.AI_PROVIDER.lower()

    if provider == "anthropic":
        return _call_anthropic(system, user)
    elif provider == "openai":
        return _call_openai(system, user)
    elif provider == "google":
        return _call_google(system, user)
    elif provider == "groq":
        return _call_groq(system, user)
    else:
        raise ValueError(f"Provider desconhecido: {provider}. Use: anthropic, openai, google, groq")


def _call_anthropic(system: str, user: str) -> str:
    from anthropic import Anthropic
    client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
    response = client.messages.create(
        model=settings.ANTHROPIC_MODEL,
        max_tokens=4096,
        system=system,
        messages=[{"role": "user", "content": user}]
    )
    return response.content[0].text


def _call_openai(system: str, user: str) -> str:
    from openai import OpenAI
    client = OpenAI(api_key=settings.OPENAI_API_KEY)
    response = client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user}
        ],
        max_tokens=4096
    )
    return response.choices[0].message.content


def _call_google(system: str, user: str) -> str:
    import google.generativeai as genai
    genai.configure(api_key=settings.GOOGLE_API_KEY)
    model = genai.GenerativeModel(
        model_name=settings.GOOGLE_MODEL,
        system_instruction=system
    )
    response = model.generate_content(user)
    return response.text


def _call_groq(system: str, user: str) -> str:
    from groq import Groq
    client = Groq(api_key=settings.GROQ_API_KEY)
    response = client.chat.completions.create(
        model=settings.GROQ_MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user}
        ],
        max_tokens=4096
    )
    return response.choices[0].message.content
