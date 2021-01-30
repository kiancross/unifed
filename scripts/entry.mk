#
# CS3099 Group A3
#

SHELL:=/bin/bash

.PHONY: help
help:
	@echo "Commands:"
	@echo "    start          Start the application"
	@echo "    stop           Stop the application"
	@echo "    reset          Reset the application's data files"
	@echo "    logs           Output the log files from the application"
	@echo "    train          Train an AI model"
	@echo "    train-build    Build the container used for AI model training"

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
