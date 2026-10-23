# Local entry points: `make check` runs the same checks as CI.
.PHONY: check

check:
	gitleaks git --redact --no-banner
