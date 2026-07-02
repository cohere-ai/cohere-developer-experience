.PHONY: install build dev run stop

PNPM10 := npx -y pnpm@10
NODE24 := npx -y node@24
FERN_PGID_FILE := .fern-docs-dev.pgid

install:
	$(PNPM10) install --frozen-lockfile --filter .

build:
	@$(PNPM10) run clean
	$(PNPM10) install --frozen-lockfile --filter .

stop:
	@echo "Stopping Fern's next server..."
	@if [ -f "$(FERN_PGID_FILE)" ]; then \
		pgid=$$(cat "$(FERN_PGID_FILE)"); \
		kill -TERM -$$pgid 2>/dev/null || true; \
		sleep 1; \
		kill -KILL -$$pgid 2>/dev/null || true; \
		rm -f "$(FERN_PGID_FILE)"; \
	fi
	@echo "Clearing fern cache..."
	@time rm -rf ~/.fern/app-preview || true
	@echo "Done."

dev: stop build
	@bash -lc 'set -e; \
		tmp_dir=$$(mktemp -d); \
		cleaned=0; \
		cleanup(){ \
			[ "$$cleaned" -eq 1 ] && return; cleaned=1; \
			if [ -f "$(FERN_PGID_FILE)" ]; then \
				pgid=$$(cat "$(FERN_PGID_FILE)"); \
				kill -TERM -$$pgid 2>/dev/null || true; \
				sleep 1; \
				kill -KILL -$$pgid 2>/dev/null || true; \
				rm -f "$(FERN_PGID_FILE)"; \
			fi; \
			rm -rf "$$tmp_dir"; \
		}; \
		trap "cleanup; exit 0" INT TERM; \
		trap "cleanup" EXIT; \
		{ \
			echo "#!/usr/bin/env bash"; \
			echo "if [ \"\$$1\" = \"i\" ] && [ \"\$$2\" = \"esbuild\" ]; then"; \
			echo "  exec npx -y pnpm@10 i esbuild --workspace-root"; \
			echo "fi"; \
			echo "exec npx -y pnpm@10 \"\$$@\""; \
		} > "$$tmp_dir/pnpm"; \
		chmod +x "$$tmp_dir/pnpm"; \
		set -m; \
		PATH="$$tmp_dir:$$PATH" $(NODE24) ./node_modules/fern-api/cli.cjs docs dev & \
		pid=$$!; \
		pgid=$$(ps -o pgid= -p $$pid | tr -d " "); \
		echo $$pgid > "$(FERN_PGID_FILE)"; \
				status=0; \
		wait $$pid || status=$$?; \
		if [ "$$status" -eq 130 ] || [ "$$status" -eq 143 ]; then \
			exit 0; \
		fi; \
		exit "$$status"'

run:
	@make dev