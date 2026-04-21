# Contributing

Thanks for contributing to AgentFace.

This repository is a `pnpm` workspace with four main packages:

- `packages/core`: deterministic config generation, URL serialization, SVG rendering
- `packages/react`: React wrapper
- `packages/vue`: Vue wrapper
- `packages/web`: playground app

## Development Environment

Recommended local environment:

- Node.js `20+`
- pnpm `10+`

Install dependencies:

```bash
pnpm install
```

Start the playground locally:

```bash
pnpm dev
```

Common validation commands:

```bash
pnpm typecheck
pnpm test
pnpm build
```

## Change Scope

Keep pull requests focused.

- Put rendering, config, and serialization changes in `packages/core`
- Put framework-specific integration changes in `packages/react` or `packages/vue`
- Put demo and playground UX changes in `packages/web`
- Update docs when public behavior, examples, or setup expectations change

## Pull Request Flow

1. Create a branch from `main`
2. Make the smallest change that solves one problem
3. Run the relevant local checks before opening a PR
4. Open a PR using the repository PR template
5. Wait for CI to pass before merge

Recommended branch name examples:

- `fix/url-deserialize`
- `feat/react-loading-mode`
- `docs/readme-assets`

## PR Expectations

Every PR should include:

- a clear summary of what changed
- the affected scope (`core`, `react`, `vue`, `web`, docs, or CI)
- validation notes with the commands you ran
- screenshots or SVG before/after output when UI or rendering changes are involved

Try to avoid:

- unrelated formatting changes
- mixed refactors and feature work in one PR
- silent breaking API changes

## Issues

Use the GitHub issue templates for:

- bug reports
- feature requests

If you report a bug, include a minimal reproduction whenever possible:

- seed
- config JSON
- query string
- code snippet
- screenshot

## Release Notes

If your change affects public API, rendering behavior, package output, or docs users rely on, call it out in the PR so it can be reflected in the next release.

