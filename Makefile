.PHONY: build up

build: 
	docker-compose up --build --remove-orphans
up: 
	docker-compose up -d