FROM python:3.12-slim-bookworm

# WeasyPrint 62.x system dependencies (Bookworm / Debian 12)
# gdk-pixbuf NOT needed — WeasyPrint 52+ uses Pillow (pure Python) for images
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpango-1.0-0 \
    libpangoft2-1.0-0 \
    libpangocairo-1.0-0 \
    libharfbuzz0b \
    libfontconfig1 \
    libcairo2 \
    libffi-dev \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
