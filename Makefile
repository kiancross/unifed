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
checks: lint test

.PHONY: test
test:
	cd backend && yarn test
	cd frontend && yarn test

.PHONY: lint
lint:
	cd backend && yarn lint
	cd frontend && yarn lint

.PHONY: clean
clean:
	cd backend && yarn clean
	cd frontend && yarn clean
	rm -rf {.,backend,frontend}/node_modules
