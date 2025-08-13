.PHONY: build up down start stop restart logs logs-app logs-mysql shell-app shell-mysql clean migration-run migration-revert

# Build all services
build:
	docker compose build

# Start all services in detached mode
up:
	docker compose up -d

# Stop and remove all services
down:
	docker compose down

# Start services (attached mode)
start:
	docker compose up

# Stop services
stop:
	docker compose stop

# Restart services
restart:
	docker compose restart

# View logs for all services
logs:
	docker compose logs -f

# View logs for app service only
logs-app:
	docker compose logs -f app

# View logs for mysql service only
logs-mysql:
	docker compose logs -f mysql

# Shell into app container
shell-app:
	docker compose exec app sh

# Shell into mysql container
shell-mysql:
	docker compose exec mysql mysql -u tandat -p12345678 houzez_dev

# Clean up (remove containers, networks, volumes)
clean:
	docker compose down -v
	docker system prune -f

# Run database migrations
migration-run:
	docker compose exec app npm run migration:run

# Revert database migrations
migration-revert:
	docker compose exec app npm run migration:revert

# Quick setup (build and start)
setup: build up

# Development workflow
dev: down build up logs

