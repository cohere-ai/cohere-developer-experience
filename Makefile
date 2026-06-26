.PHONY: install dev

PNPM10 := npx -y pnpm@10
NODE24 := npx -y node@24

install:
	$(PNPM10) install --frozen-lockfile --filter .

dev:
	@# Temporary workaround for Fern preview bootstrap in pnpm workspaces.
	@tmp_dir=$$(mktemp -d); \
	trap 'rm -rf "$$tmp_dir"' EXIT INT TERM; \
	{ \
	  echo '#!/usr/bin/env bash'; \
	  echo 'if [ "$$1" = "i" ] && [ "$$2" = "esbuild" ]; then'; \
	  echo '  exec npx -y pnpm@10 i esbuild --workspace-root'; \
	  echo 'fi'; \
	  echo 'exec npx -y pnpm@10 "$$@"'; \
	} > "$$tmp_dir/pnpm"; \
	chmod +x "$$tmp_dir/pnpm"; \
	PATH="$$tmp_dir:$$PATH" $(NODE24) ./node_modules/fern-api/cli.cjs docs dev
