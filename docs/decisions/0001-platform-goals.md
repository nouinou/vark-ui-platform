# ADR 0001: vark-ui-platform goals and structure

## Context
I want a public repository that demonstrates **frontend platform / UI platform engineering** rather than “ticket finishing”.
Most public repos show components, but they do not prove:
- adoption in a real consumer app
- enforceable architecture constraints
- quality gates and testing discipline
- runtime theming and token contracts

## Decision
Create an Nx monorepo with:
- `apps/vark`: consumer application (ticket-management shell) used to prove adoption and validate the platform
- `libs/ui/tokens`: CSS variable design tokens + themes
- `libs/ui/theme`: theme runtime (`light | dark | system`) that applies theme via `data-theme`
- `libs/ui/components/*`: UI component libraries (button, link, etc.), plus an aggregator export

## Goals
This repo must demonstrate platform ownership signals:
1. **Design tokens as a contract**
   - Tokens are exposed as CSS variables
   - Consumers use `var(--token)` instead of hardcoded values
2. **Runtime theming**
   - Light/Dark/System switching without rebuild
   - Theme is persisted and applied early (before app bootstrap)
3. **Adoption proof**
   - Consumer app uses tokens/theme/components in real UI
4. **Architecture enforcement (next)**
   - Nx tags + module boundary rules to prevent coupling (UI must not depend on product)
5. **Quality gates (next)**
   - CI runs lint/typecheck/tests/build/e2e (with nx affected/caching)
6. **Testing discipline (next)**
   - Playwright flows covering real user behavior in the consumer app
7. **Documentation (next)**
   - Storybook conventions that document component contracts and accessibility behavior

## Non-goals (scope control)
- Building a full Jira clone
- Microfrontends in phase 1 (unless justified by a real scaling story)
- Heavy token tooling pipeline before the component APIs stabilize

## Consequences / Tradeoffs
- More upfront structure than a typical demo repo, but clearer ownership and scalability
- Requires discipline: boundaries and “no hardcoded values” must be enforced
- Some “platform features” (CI gates, affected, Storybook) are intentionally staged after the foundation is stable
