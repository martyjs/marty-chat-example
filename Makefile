BIN = ./node_modules/.bin

.PHONY: start bootstrap test;

SRC = $(shell find ./app ./test -type f -name '*.js')

start:
	@$(BIN)/grunt

test:
	@$(BIN)/mocha

bootstrap: package.json
	@npm install