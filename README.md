# vark-ui-platform

Nx monorepo that hosts:

- **Vark UI** (Design System / UI platform): tokens, theming runtime, and reusable UI components
- **Vark** (consumer app): a ticket-management shell used to prove adoption and smoke-test the platform

This repo is intentionally built to demonstrate **frontend platform ownership**: consistent design tokens, runtime theming, reusable components, and (next) enforceable quality gates and testing.

---

## Quickstart

```bash
npm install
nx serve vark
```

Build:

```bash
nx build vark
```

---

## What’s inside

### Consumer app

- `apps/vark`  
  Consumer app that uses the platform and includes:
  - Theme switcher (Light / Dark / System)
  - Tokens preview section (swatches) to visually verify the token contract

### UI Platform (Design System)

- `libs/ui/tokens`  
  CSS variable tokens + themes. The app loads the token bundle globally.
- `libs/ui/theme`  
  Small runtime that applies and persists the theme mode (`light | dark | system`) using `data-theme`.
- `libs/ui/components/*`  
  Reusable UI component libraries (e.g. button, link) + an aggregator export.

---

## Platform signals (what this repo is proving)

Already implemented:

- **Token contract via CSS variables** (not hardcoded values)
- **Runtime theming** (light/dark/system) without rebuild
- **Real consumer adoption** (app consumes tokens + theme + components)
- **Smoke-test UI** (tokens preview) to validate theme + tokens quickly
- Nx **module boundaries** and tags (architecture enforcement)
- CI quality gates (affected lint/typecheck/build) + `nx affected`

Planned next (coming weeks):

- Playwright E2E flows that protect releases
- Storybook documentation conventions for the Design System
- Accessibility-first flagship component (Dialog) implementation + tests

---

## CI

CI runs affected lint/typecheck/format checks and affected builds on PRs.  
See `docs/ci.md` for details and how to reproduce locally.

---

## Decisions

See `docs/decisions/` for Architecture Decision Records (ADRs), starting with:

- `docs/decisions/0001-platform-goals.md`
- `docs/decisions/0002-dialog-contract.md`
- `docs/decisions/0003-module-boundaries.md`

---

## Notes on scope

The consumer app is **not a full Jira clone**. It exists to:

- validate component APIs and token usage in real UI flows
- provide a place for realistic E2E tests later
- demonstrate platform adoption
