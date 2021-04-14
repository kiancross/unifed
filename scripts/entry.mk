#
# CS3099 Group A3
#

SHELL:=/bin/bash

# If podman is installed, we include podman.mk.
# If docker is installed, we include docker.mk.
# If neither are installed, we throw an error.
ifeq ($(shell which podman),)
ifeq ($(shell which docker-compose),)
	$(error Requires Podman or docker-compose to be installed)
else
include docker.mk
endif
else
include podman.mk
endif

.PHONY: restart
restart: stop start
