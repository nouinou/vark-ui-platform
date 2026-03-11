# Nx affected workflow

This repo uses Nx’s **affected** workflow to run checks only for projects impacted by a change.
This is the foundation for fast CI (and later: caching + parallelization).

---

## Recommended workflow (use npm scripts)

### Affected quality checks (what changed vs `origin/main`)

- `npm run check:affected` → lint + typecheck + format (affected only)
- `npm run lint:affected`
- `npm run typecheck:affected`
- `npm run build:affected`
- `npm run test:affected`

for local checks, it's prefered to use `:local`

- `npm run check:affected`:local → lint + typecheck + format (affected only)
- `npm run lint:affected:local`
- `npm run typecheck:affected:local`
- `npm run build:affected:local`
- `npm run test:affected:local`

### Affected formatting

- `npm run format:affected` → format only changed files (Nx formatter + Prettier)
- `npm run format:affected:check` → check formatting only for changed files

---

## Full-repo commands (use sparingly)

Use these when you need a full sweep (e.g., before a major release or after refactors):

- `npm run check:all` → lint + typecheck for all projects
- `npm run lint:all`
- `npm run typecheck:all`
- `npm run format:all`
- `npm run format:check:all`
