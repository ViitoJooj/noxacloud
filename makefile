run-dev:
	docker compose -f infra/compose/docker-compose.yaml --env-file .env up -d
	air & cd www && npm run dev

run-test:
	test -d tests/api/.venv || python3 -m venv tests/api/.venv
	tests/api/.venv/bin/pip install -q -r tests/api/requirements.txt
	tests/api/.venv/bin/python tests/api/main.py

run-build:
	go build -o ./tmp/main ./cmd/api
