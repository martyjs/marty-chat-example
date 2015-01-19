BIN = ./node_modules/.bin

.PHONY: bootstrap test;

SRC = $(shell find ./app ./test -type f -name '*.js')

test:
	@$(BIN)/mocha

bootstrap: package.json
	@npm install