#
# CS3099 Group A3
#

SHELL:=/bin/bash

DOCKER_COMPOSE_COMMAND:=cd .. && docker-compose \
	--env-file configs/config.env \
  -f configs/docker-compose.yml \
  --project-directory .

TRAINING_IMAGE:=unifed-backend-ml

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

.PHONY: devdb
devdb:
	@id=$$($(DOCKER_COMPOSE_COMMAND) ps -q mongo); \
	if [ -z "$$(docker ps -q --filter id=$$id)" ]; then \
		>&2 echo "The mongodb container is not running"; \
		exit 1; \
	else \
		username=$$(grep MONGO_ADMIN_USERNAME ../configs/config.env | cut -d '=' -f2); \
		password=$$(grep MONGO_ADMIN_PASSWORD ../configs/config.env | cut -d '=' -f2); \
		docker exec -i $$id /usr/bin/mongo admin -u "$$username" -p "$$password" --eval "$$(cat ../configs/mongo-dev.js)"; \
	fi;

.PHONY: train
train:
	docker run \
	    -v "$$(pwd)/..:/usr/src/unifed" \
	    -w /usr/src/unifed \
	    --user $$(id -u):$$(id -g) \
	    --shm-size=1g \
	    --ulimit memlock=-1 \
	    --ulimit stack=67108864 \
	    --runtime=nvidia \
	    -d \
	    $(TRAINING_IMAGE) || \
	        printf "\n\nRun 'yarn container:train:build' first\n\n"

.PHONY: train-build
train-build:
	docker rm -f $(TRAINING_IMAGE)
	docker build -f ../configs/backend-ml.dockerfile -t $(TRAINING_IMAGE) ..
