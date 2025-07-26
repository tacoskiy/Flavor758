FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

RUN apt-get update && apt-get install -y gcc

COPY django/requirements.txt ./
RUN pip install -r requirements.txt

COPY django_app/ ./