.PHONY: install dev

PNPM10 := npx -y pnpm@10
NODE24 := npx -y node@24

install:
	$(PNPM10) install --frozen-lockfile

dev:
	$(PNPM10) run --if-present compile
	$(NODE24) ./node_modules/fern-api/cli.cjs docs dev
