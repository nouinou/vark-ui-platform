# Nx affected workflow

This repo uses Nx's `affected` workflow to run checks only for projects impacted by a change.

## How affected works

Nx compares two git revisions:

- `base`: the starting commit
- `head`: the ending commit

From that diff, Nx determines which projects are affected and runs only the requested targets for those projects.

In this repo:

- branch-based scripts compare `origin/main...HEAD`
- `:local` scripts use `--uncommitted`

## Recommended local commands

Use these when you want to validate the current branch against `origin/main`.

- `npm run check:affected` -> lint + typecheck + format check for affected projects/files
- `npm run lint:affected`
- `npm run typecheck:affected`
- `npm run build:affected`
- `npm run test:affected`
- `npm run format:affected`
- `npm run format:affected:check`

Use these when you want to validate only uncommitted changes in your working tree.

- `npm run check:affected:local`
- `npm run lint:affected:local`
- `npm run typecheck:affected:local`
- `npm run build:affected:local`
- `npm run test:affected:local`
- `npm run format:affected:local`
- `npm run format:affected:check:local`

## Useful debug commands

When affected output is surprising, these commands are the first things to run:

- `git diff --name-only origin/main...HEAD`
- `npx nx show projects --affected --base=origin/main --head=HEAD`
- `npx nx affected -t lint --base=origin/main --head=HEAD`

If you want CI workflow details, document them separately in `docs/ci.md`.

## Full-repo commands

Use these sparingly when you need a full sweep instead of an affected run.

- `npm run check:all`
- `npm run lint:all`
- `npm run typecheck:all`
- `npm run format:all`
- `npm run format:check:all`
