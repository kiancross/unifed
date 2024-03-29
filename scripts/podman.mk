#
# Copyright (C) 2020 Kian Cross
#
# This file is part of Unifed.
#
# Unifed is free software: you can redistribute it and/or modify it
# under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Unifed is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
#

SHELL:=/bin/bash

CONFIG_PATH:=configs/config.env
KUBE_PATH:=configs/kube-deployment.yml
POD_NAME:=unifed

PODMAN_COMMAND:=cd .. && podman

# Check that the correct version of podman is installed.
# Old versions contain a bug and need manually upgrading.
ifneq ($(shell podman --version | awk '{print $$3}'),3.0.0-rc3)
define n


endef
$(error $n Requires Podman version 3.0.0-rc3. See $n https://kiancross.github.io/unifed/developers#step-4---setup-a-container-service $n)
endif

.PHONY: start
start: yarn-install unifed-backend-internal unifed-backend-federation unifed-frontend reset
	@# Podman doesn't support passing an environment file :(
	@# So we have to parse the values ourselves and use envsubst to
	@# add them to the kube-deployment.yml file.
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

# Prints the logs from the container. Also adds
# colour highlighting to the container name to
# make consistent with docker.
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

# See the comment in docker.mk. Very similar process,
# but using `podman exec` rather than `docker exec`.
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
	>&2 @echo "Training is not supported on Podman"

.PHONY: train-build
train-build:
	>&2 @echo "Training is not supported on Podman"

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
