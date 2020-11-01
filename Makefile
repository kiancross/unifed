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
	@echo
	@echo "    checks   Run all checks"
	@echo "    test     Run all tests"
	@echo "    lint     Check code style"
	@echo "    clean    Clean build files"

ifeq ($(shell which podman),)
ifeq ($(shell which docker-compose),)
	$(error Requires Podman or docker-compose to be installed)
else
include Makefile.docker
endif
else
include Makefile.podman
endif

.PHONY: restart
restart: stop start

.PHONY: checks
checks: lint test build

.PHONY: test
test:
	yarn workspaces run test

.PHONY: lint
lint:
	yarn workspaces run lint

.PHONY: build
build:
	yarn workspaces run build

.PHONY: clean
clean:
	yarn workspaces run clean
	rm -rf node_modules packages/**/node_modules
