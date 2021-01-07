#
# CS3099 Group A3
#

SHELL:=/bin/bash

.PHONY: help
help:
	@echo "Commands:"
	@echo "    start    Start the application"
	@echo "    stop     Stop the application"
	@echo "    reset    Reset the application's data files"
	@echo "    logs     Output the log files from the application"

ifeq ($(shell which podman),)
ifeq ($(shell which docker-compose),)
	$(error Requires Podman or docker-compose to be installed)
else
include docker.Makefile
endif
else
include podman.Makefile
endif

.PHONY: restart
restart: stop start
