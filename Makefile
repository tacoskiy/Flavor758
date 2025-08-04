.PHONY: build up down mkmigrate migrate

build: 
	docker-compose up --build --remove-orphans
up: 
	docker-compose up -d

down:
	docker-compose down

mkmigrate:
	docker-compose exec backend python manage.py makemigrations

migrate:
	docker-compose exec backend python manage.py migrate