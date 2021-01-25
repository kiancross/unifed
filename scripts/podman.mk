#
# CS3099 Group A3
#

SHELL:=/bin/bash

CONFIG_PATH:=configs/config.env
KUBE_PATH:=configs/kube-deployment.yml
POD_NAME:=unifed

PODMAN_COMMAND:=cd .. && podman

ifneq ($(shell podman --version | awk '{print $$3}'),2.1.1)
define n


endef
$(error $n Requires Podman version 2.1.1. See $n https://github.com/kiancross/unifed/wiki/Installation#step-3---setup-a-container-service $n)
endif

.PHONY: start
start: yarn-install unifed-backend-internal unifed-backend-federation unifed-frontend reset
	@# Podman doesn't support passing an environment file :(
	$(PODMAN_COMMAND) play kube <(source ./$(CONFIG_PATH); \
		variable_names=$$(grep -v '^\s*#.*$$' $(CONFIG_PATH) | grep -v '^\s*$$' | cut -f1 -d=); \
		variable_literals=$$(echo "$${variable_names}" | awk '{printf "$${"$$1"} " }'); \
  	export $${variable_names}; \
 		envsubst "$${variable_literals}" < $(KUBE_PATH))

.PHONY: reset
reset:
	if $(PODMAN_COMMAND) pod exists $(POD_NAME); then \
		$(PODMAN_COMMAND) pod rm -f "$(POD_NAME)"; \
	fi

.PHONY: stop
stop:
	$(PODMAN_COMMAND) pod stop "$(POD_NAME)"

.PHONY: logs
logs:
	@$(PODMAN_COMMAND) logs -n $$($(PODMAN_COMMAND) ps | \
		grep "localhost/unifed-.*unifed-.*" | awk '{print $$1}') | \
		awk '{ \
					if ($$1 == "unifed-frontend") {printf "\033[0;31m"}; \
					if ($$1 == "unifed-backend-internal") {printf "\033[0;34m"}; \
					if ($$1 == "unifed-backend-federation") {printf "\033[0;32m"}; \
		      printf $$1 "\033[0m"; $$1 = ""; print $$0 \
				}'

.PHONY: devdb
devdb:
	@id=$$(podman ps -q --filter name=unifed-mongo\$$); \
	if [ -z "$$id" ]; then \
		>&2 echo "The mongodb container is not running"; \
		exit 1; \
	else \
		username=$$(grep MONGO_ADMIN_USERNAME ../configs/config.env | cut -d '=' -f2); \
		password=$$(grep MONGO_ADMIN_PASSWORD ../configs/config.env | cut -d '=' -f2); \
		podman exec -i $$id /usr/bin/mongo admin -u "$$username" -p "$$password" --eval "$$(cat ../configs/mongo-dev.js)"; \
	fi;

.PHONY: train
train:
	@echo "Training is not supported on Podman"

.PHONY: train-build
train-build:
	@echo "Training is not supported on Podman"

.PHONY: yarn-install
yarn-install:
	yarn install

.PHONY: unifed-backend-internal
unifed-backend-internal:
	$(PODMAN_COMMAND) build -f configs/backend-internal.dockerfile -t unifed-backend-internal .

.PHONY: unifed-backend-federation
unifed-backend-federation:
	$(PODMAN_COMMAND) build -f configs/backend-federation.dockerfile -t unifed-backend-federation .

.PHONY: unifed-frontend
unifed-frontend:
	$(PODMAN_COMMAND) build -f configs/frontend.dockerfile -t unifed-frontend .
