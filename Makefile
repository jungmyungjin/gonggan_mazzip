YML_FILE = ./deployment/docker-compose.yml

OPT = -f $(YML_FILE)

all: build_up

init:
	export JWT_SECRET_KEY=ggmz_jwt_secret_key
	./deployment/tools/init.sh

build_up: 
	docker-compose $(OPT) up --build

up :
	docker-compose $(OPT) up

down:
	docker-compose $(OPT) down

build:
	docker-compose $(OPT) build --no-cache

clean:
	./deployment/tools/clean.sh

ps:
	docker-compose $(OPT) ps

re: down clean build_up

.PHONY: up down ps