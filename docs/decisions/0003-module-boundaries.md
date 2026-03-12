# ADR 0003: Nx module boundaries and affected workflow

## Context
This repo is a UI platform monorepo. Without enforced boundaries, it is easy for the codebase to drift into tight coupling:
- UI/platform libraries importing from the consumer app
- accidental circular dependencies
- unclear ownership and hard-to-reason-about changes
- slower CI because changes “touch everything”

We want the opposite: predictable architecture, clear ownership, and scalable enforcement.

## Decision
We enforce architecture constraints using:
1) **Nx project tags** (`scope:*`, `type:*`, optional `layer:*`)
2) ESLint rule: **`@nx/enforce-module-boundaries`** (PR-blocking)
3) Nx **affected** workflow to run checks only for impacted projects

## Project inventory (current)
Projects currently in the workspace:
- `ui-tokens`
- `ui-theme`
- `ui-components` (aggregator/facade for UI exports)
- `ui-components-button`
- `ui-components-link`
- `vark` (consumer app)
- `vark-e2e` (Playwright E2E)

## Tag scheme
### Scopes
- `scope:ui` → UI platform libraries (tokens, theme, components)
- `scope:app` → consumer application (`vark`) and E2E (`vark-e2e`)

### Types
- `type:tokens` → `ui-tokens`
- `type:theme` → `ui-theme`
- `type:ui` → `ui-components`, `ui-components-button`, `ui-components-link`
- `type:app` → `vark`
- `type:e2e` → `vark-e2e`

### Layer (optional)
- `layer:primitive` → primitives like button/link (optional; used only for documentation and future rules)

## Dependency rules (enforced)
### Scope rules (primary)
- ✅ `scope:app` may depend on `scope:ui`
- ✅ `scope:app` may depend on `scope:app`
- ❌ `scope:ui` must not depend on `scope:app`

This prevents platform code from importing application-specific logic.

### Type rules (additional constraints)
These rules keep platform layers clean and reduce accidental coupling:
- `type:tokens` may only depend on `type:tokens` (tokens should be a leaf)
- `type:theme` may depend on `type:tokens` and `type:theme`

(Components can depend on tokens and theme by scope. If you extend type constraints later, ensure they do not conflict with scope rules.)

## Examples

### Allowed imports
Consumer app consuming platform libs:
```ts
import { initTheme, setTheme } from '@vark/ui-theme';
import { ButtonComponent } from '@vark/ui-components';
```

Platform components consuming tokens/theme:
```ts
/* CSS uses var(--token) values from ui-tokens */
```

### Forbidden imports
Platform libs importing app code:
```ts
// ❌ Not allowed: UI platform depends on app
import { Something } from '../../../../../apps/vark/src/app/...';
```

## Affected workflow (checks only what changed)
This repo uses npm scripts to run Nx affected targets using `origin/main` as the baseline.

Recommended scripts:
- `npm run check:affected` (lint + typecheck + format check)
- `npm run lint:affected`
- `npm run typecheck:affected`
- `npm run build:affected`
- `npm run test:affected`

Notes:
- `--base=origin/main --head=HEAD` is for committed changes (CI/PR use).
- For local development, you can use `--uncommitted` modes.

See `docs/affected.md` for the full command reference.

## Consequences / Tradeoffs
- Architecture rules introduce some upfront discipline, but prevent long-term drift.
- Changes become safer and easier to review (clear “who can depend on whom”).
- CI can scale using affected + caching, instead of running everything for every change.
