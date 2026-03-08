# Architecture Decision Records (ADRs)

This folder contains architecture and platform decisions for `vark-ui-platform`.

Use ADRs to capture **why** we made a choice, not only **what** we changed.

## Index

| ADR | Title | Status |
| --- | --- | --- |
| [0001](./0001-platform-goals.md) | vark-ui-platform goals and structure | Accepted |
| [0002](./0002-dialog-contract.md) | Dialog component contract (Angular CDK) | Accepted |

## When to add an ADR

Add an ADR when a decision is:
- architectural (affects multiple projects/libraries)
- difficult to reverse
- likely to be debated again in future

Examples:
- token/theming contract changes
- component API contracts
- repo-level constraints (boundaries, CI policy)

## ADR naming convention

- Filename: `NNNN-short-kebab-title.md` (e.g. `0003-theme-contract-v2.md`)
- Header: `# ADR NNNN: <Title>`
- Keep these sections when possible:
  - Context
  - Decision
  - Consequences / Tradeoffs
  - (Optional) Alternatives considered

## Lifecycle

- **Accepted**: current decision in force
- **Superseded**: replaced by a newer ADR (link to replacement)
- **Deprecated**: no longer recommended, kept for historical context
