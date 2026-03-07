# Summary
<!-- What does this PR change? Keep it short and concrete. -->

## Context / Problem
<!-- Why is this change needed? What pain, bug, or limitation does it address? -->

## Decision
<!-- What did you decide to do? If non-trivial, list options considered + why this option won. -->
- Option A:
- Option B:
- Chosen:

## Scope
<!-- What is explicitly in scope and out of scope for this PR? -->
- In scope:
- Out of scope:

## Risks
<!-- What could go wrong? Breaking changes? Migration impact? -->
-

## Test Plan
<!-- How did you validate? Be specific. -->
- [ ] `nx build vark`
- [ ] `nx test <project>`
- [ ] Manual verification:
  - [ ] Browser check
  - [ ] Theme switch (if relevant)
  - [ ] Tokens preview (if relevant)

## Screenshots / Recordings (UI changes)
<!-- Before/After screenshots or a short recording. -->

## Notes for Reviewers
<!-- Anything reviewers should focus on: API changes, accessibility, edge cases, follow-ups. -->

## Checklist
- [ ] No hardcoded design values outside tokens (colors/spacing/typography/radius)
- [ ] Follows token contract (`var(--...)` usage)
- [ ] No secrets/credentials committed
- [ ] Docs updated if needed (README/ADR/usage)
