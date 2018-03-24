.PHONY: test
test:
	docker-compose run --rm dev go test -cover ./...

.PHONY: start
start:
	docker-compose up -d server eventbus

.PHONY: stop
stop:
	docker-compose stop server eventbus

.PHONY: build
build:
	docker-compose run --rm dev go build -o ./bin/backend

