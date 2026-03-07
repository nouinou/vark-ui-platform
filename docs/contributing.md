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

## Local commands
```bash
nx serve vark
nx build vark
```
