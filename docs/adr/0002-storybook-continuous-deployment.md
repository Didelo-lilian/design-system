# 2. Storybook is deployed on every merge to main

Date: 2026-10-23 · Status: accepted; the approval is dropped for image updates by [infra ADR 0009](https://github.com/Didelo-lilian/infra/blob/main/docs/adr/0009-deploy-app-updates-without-approval.md)

## Context

Storybook is the documentation of the design system, served at https://ds.didelo.fr from the VPS managed by the [`infra`](https://github.com/Didelo-lilian/infra) repository. The npm package follows releases, but the documentation should show `main` as soon as it is merged. The VPS runs Docker Compose stacks deployed by the `Server` workflow of `infra`, behind an approval on the `production` environment.

## Decision

- Each push to `main` builds an image (Storybook static build served by nginx-unprivileged on port 8080) and pushes it to `ghcr.io/didelo-lilian/design-system` with two tags: `main`, which moves, and `sha-<7 characters>`, which identifies the build.
- The stack in `infra` runs `:main` and pulls it on every deploy. `infra` pins its other images to exact versions; this one is the exception because its content is ours and changes with every merge, so pinning would need a pull request in `infra` per merge. The `sha-` tag allows pinning in an emergency.
- Once the image is pushed, the workflow starts the `Deploy app` workflow of `infra` (`workflow_dispatch`, `stack=ds`) with a token of the `didelo-release` GitHub App, since `GITHUB_TOKEN` cannot act on another repository. It only restarts the stack on the new image, so it needs no approval; the `Server` workflow, which changes the server configuration, keeps the approval on `production`.
- A `docker build` runs on every pull request, so a broken Dockerfile is found before merge.

## Alternatives

- **Dependabot on `infra`**: it proposes version bumps, not a moving tag, and a pull request per merge is the cost this decision avoids.
- **An updater container on the VPS** (Watchtower-like): it needs the Docker socket, which is root on the host, for a small gain.

## Consequences

- The site follows `main` within a minute or two of the merge.
- The App needs `actions: write` on `infra`, and the GHCR package must be public so the VPS pulls without credentials.
- `:main` is not reproducible; the exact build is identified by its `sha-` tag.
- This trigger is temporary: once the self-hosted runner pool exists, the deployment will run on the VPS itself and replace the cross-repository call.
