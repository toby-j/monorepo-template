FROM node:24-alpine AS frontend
ARG VITE_MODE

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node ./frontend/ ./frontend

USER node

WORKDIR /home/node/app/frontend

RUN npm ci --ignore-scripts && \
    npm run build -- --mode=$VITE_MODE

FROM python:3.11-alpine
ENV SERVICE_NAME="monorepo-template"

# Install UV
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

RUN apk add --no-cache --virtual .build-deps \
    build-base \
    libffi-dev \
    openssl-dev \
    gcc \
    musl-dev \
    python3-dev \
    rust \
    cargo \
    curl \
    libpq \
    postgresql-dev

COPY backend /usr/src/app/backend

RUN uv sync --project /usr/src/app/backend

COPY --from=frontend /home/node/app/static  /usr/src/app/static/
WORKDIR /usr/src/app/backend

EXPOSE 80

ENV PYTHONPATH=/usr/src/app/backend

ENV PATH="/usr/src/app/backend/.venv/bin:$PATH"

RUN adduser -D $SERVICE_NAME && chown -R $SERVICE_NAME:$SERVICE_NAME /usr/src/app
USER $SERVICE_NAME

CMD ["fastapi", "run", "main.py", "--port", "80"]