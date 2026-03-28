# Contributing

This repo is structured like a UI platform repo: small PRs, clear contracts, and enforceable conventions.

## Branching

- feature branches: `feat/<area>-<short-desc>`
- fixes: `fix/<area>-<short-desc>`

## PR expectations

For non-trivial changes:

- Explain the problem and the decision
- Include a test plan (how you validated it)
- Include screenshots for UI changes (when relevant)

## Token rules

- Token contract is CSS variables.
- Do not introduce hardcoded colors/spacing/radius/typography in components or apps.
- Add new tokens in `libs/ui/tokens/src/lib/*` and ensure both themes define semantic tokens.

## Theme rules

- Theme mode is `light | dark | system`.
- Theme is applied via `data-theme` on the root element.
- System mode must follow OS preference.

## Component rules

- Components must consume tokens via `var(--...)`.
- Prefer small, focused libraries under `libs/ui/components/<name>`.
- Keep component APIs stable; record breaking decisions as ADRs.

### E2E selector rules (Playwright)
- Use `data-testid` as the primary selector for E2E tests.
- Do **not** select by CSS classes; classes change for styling and refactors.
- Avoid `nth()` and deep DOM traversal; prefer stable container test IDs.
- Use text selectors only for truly stable, user-facing copy (and keep it minimal).
- Prefer `page.getByTestId()` + `expect(...).toBeVisible()` / `toHaveText()` (Playwright auto-waits).
- Never use `waitForTimeout`; wait on UI state via `expect` or `locator` conditions.
- Test IDs should be on semantic “anchors” (header, panels, key buttons), not on every div.
- Keep test IDs consistent and descriptive: `app-header`, `theme-switcher`, `btn-theme-dark`, `tokens-grid`.

## Local commands

```bash
nx serve vark
nx build vark
```
