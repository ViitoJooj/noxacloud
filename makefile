run-dev:
	docker compose -f infra/compose/docker-compose.yaml --env-file .env up -d
	air & cd www && npm run dev

run-test:
	test -d tests/api/.venv || python3 -m venv tests/api/.venv
	tests/api/.venv/bin/pip install -q -r tests/api/requirements.txt
	tests/api/.venv/bin/python tests/api/main.py

run-build:
	go build -o ./tmp/main ./cmd/api

docker-restart:
	docker compose -f infra/compose/docker-compose.yaml --env-file .env down
	docker compose -f infra/compose/docker-compose.yaml --env-file .env up -d

.PHONY: sudo-clean database cache
sudo-clean:
	@targets="$(filter-out sudo-clean,$(MAKECMDGOALS))"; \
	if [ -z "$$targets" ]; then \
		echo "uso: make sudo-clean database|cache [database cache]"; \
		exit 1; \
	fi; \
	for target in $$targets; do \
		case "$$target" in \
			database) \
				if [ "$(confirm)" != "true" ]; then \
					echo "limpar o database apaga todos os dados: rode com confirm=true (ex: make sudo-clean database confirm=true)"; \
					exit 1; \
				fi; \
				echo "limpando banco de dados..."; \
				sudo docker compose -f infra/compose/docker-compose.yaml --env-file .env exec -T postgres \
					sh -c 'psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"' < scripts/db_truncate_all.sql; \
				;; \
			cache) \
				echo "limpando cache..."; \
				sudo docker compose -f infra/compose/docker-compose.yaml --env-file .env exec -T redis \
					sh -c 'redis-cli -a "$$REDIS_PASSWORD" FLUSHALL'; \
				;; \
			*) \
				echo "arg desconhecido: $$target (use database|cache)"; \
				exit 1; \
				;; \
		esac; \
	done

database cache:
	@: