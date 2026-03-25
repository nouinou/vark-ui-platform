# CI workflow (vark-ui-platform)

This repo uses Nx **affected** checks as CI quality gates.
The goal is fast feedback: run lint/typecheck/build only for projects impacted by a change.

---

## What CI runs

On every Pull Request and on pushes to `main`, CI runs:

1. Install dependencies

```bash
npm ci
```

2. Affected quality gate (lint + typecheck + formatting check)

```bash
npm run check:affected
```

3. Affected build gate

```bash
npm run build:affected
```

---

## How affected is calculated in CI

GitHub Actions sets two environment variables for Nx:

- `NX_BASE`: the baseline commit (what you are comparing against)
- `NX_HEAD`: the head commit (the commit being tested)

### Pull requests

- `NX_BASE` = PR base SHA (target branch commit)
- `NX_HEAD` = PR head SHA (PR branch commit)

### Push to main

- `NX_BASE` = previous SHA (`github.event.before`)
- `NX_HEAD` = current SHA (`github.sha`)

To help with debugging, CI prints `NX_BASE/NX_HEAD` and the affected project list via:

```bash
npx nx show projects --affected --base=$NX_BASE --head=$NX_HEAD
```

---

## How to reproduce CI locally

### A) CI mode (committed changes only)

If you want to reproduce exactly what CI sees (committed diff only), set `NX_BASE/NX_HEAD` and run the same commands.

Example (compare `origin/main` to your current `HEAD`):

```bash
export NX_BASE=origin/main
export NX_HEAD=HEAD

npm run check:affected
npm run build:affected
```

Notes:

- Ensure `origin/main` exists locally:

```bash
git fetch origin main
```

### B) Local development mode (includes uncommitted changes)

While coding, you usually want checks to include your working tree changes.

Use:

```bash
npm run check:affected:local
```

This runs:

- `nx affected -t lint --uncommitted`
- `nx affected -t typecheck --uncommitted`
- formatting check for changed files

---

## Troubleshooting

### “No tasks were run”

This can be valid. Nx runs tasks only for **affected projects**.
Common causes:

- Your changes are only in docs/root files that do not belong to a project
- There is no diff between `NX_BASE` and `NX_HEAD`

Debug in CI or locally:

```bash
npx nx show projects --affected --base=$NX_BASE --head=$NX_HEAD
```

### Nx tool availability in CI

Use `npx nx ...` (not `nx ...`) because GitHub runners don’t have Nx installed globally.

---

## Notes

- Docs-only PRs may result in “no tasks were run”. That is acceptable and keeps CI fast.
- Playwright E2E gates are introduced later.
