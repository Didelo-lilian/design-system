# Local entry points: `make check` runs the same checks as CI.
.PHONY: check

check:
	npm ci
	npm run check
	gitleaks git --redact --no-banner
