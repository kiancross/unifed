#
# CS3099 Group A3
#

SHELL:=/bin/bash

DOCKER_COMPOSE_COMMAND:=cd .. && docker-compose \
	--env-file configs/config.env \
  -f configs/docker-compose.yml \
  --project-directory .

.PHONY: start
start:
	yarn install
	$(DOCKER_COMPOSE_COMMAND) up --build -d

.PHONY: stop
stop:
	$(DOCKER_COMPOSE_COMMAND) stop

.PHONY: reset
reset:
	$(DOCKER_COMPOSE_COMMAND) down --remove-orphans --volumes

.PHONY: logs
logs:
	$(DOCKER_COMPOSE_COMMAND) logs
