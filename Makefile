.PHONY: install dev

PNPM := npx -y pnpm@10
NODE24 := npx -y node@24

install:
	$(PNPM) install --frozen-lockfile

dev:
	$(PNPM) run --if-present compile
	$(NODE24) ./node_modules/fern-api/cli.cjs docs dev
