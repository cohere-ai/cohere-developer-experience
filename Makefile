.PHONY: install dev

PNPM := npx -y pnpm@8
NODE24 := npx -y node@24

install:
	$(PNPM) install

dev:
	$(PNPM) run compile
	$(NODE24) ./node_modules/fern-api/cli.cjs docs dev
