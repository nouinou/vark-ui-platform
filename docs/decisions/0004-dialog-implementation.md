# ADR 0004: Dialog implementation decisions

## Context

ADR 0002 defines the dialog contract and the intended Angular CDK direction.
This note records implementation decisions taken while building the first working dialog path.

## Decisions So Far

### 1. Runtime foundation

- We will implement the dialog using **Angular CDK Overlay**.
- `@angular/cdk` was added to the workspace as a dependency.
- The current installed version is `@angular/cdk@20.2.14`, which is the latest published `20.x` line available on npm.

### 2. Public service shape

- `DialogService.open(componentOrTemplate, config?)` remains the public entry point.
- The service accepts either:
  - an Angular component type
  - an Angular `TemplateRef`

### 3. Rendering strategy

- `DialogService.open(...)` now creates a real CDK overlay instead of returning a pure stub.
- The overlay is configured to:
  - render with a backdrop
  - be centered on screen
  - block body scroll with the CDK block scroll strategy

### 4. Container strategy

- We will use a **dialog shell/container component** as the first thing attached to the overlay.
- The shell is responsible for:
  - `role="dialog"`
  - `aria-modal="true"`
  - size hooks
  - rendering either a component or a template payload

Reason:

- This keeps overlay plumbing inside the service and structural dialog concerns inside one shell component.
- It gives us one place for future focus management, close handling, sizing, and styling.

### 5. Dialog lifecycle ownership

- `DialogRef` owns dialog closure.
- `DialogRef.close(result?)` is responsible for:
  - emitting the closed result
  - completing the closed stream
  - disposing the live `OverlayRef`

- If the overlay is disposed externally, `DialogRef` also transitions to a closed state.
- `afterClosed()` is currently observable-based and replayable to late subscribers.
- The close transition is funneled through one internal path so explicit close and external overlay disposal cannot diverge.

Reason:

- We want one place to own close semantics.
- Future close triggers such as backdrop click and `Escape` should call `dialogRef.close()`, not duplicate teardown logic.

### 6. First consumer integration strategy

- The first adoption path in `apps/vark` uses an **existing app template** as dialog content.
- We are not starting with dynamic dialog body components in the consumer app.
- The create-ticket form now lives in an `ng-template` and is opened through `DialogService`.

Reason:

- This is the fastest path to prove the service and overlay work in a real flow.
- It avoids adding more abstraction than necessary before the overlay lifecycle is stable.

### 7. Active dialog config contract

- The dialog config is now resolved once per `open(...)` call through a normalization step.
- The currently active config fields are:
  - `disableClose`
  - `size`
  - `ariaLabelledBy`
  - `ariaDescribedBy`

- Current defaults:
  - `disableClose: false`
  - `size: 'md'`

- `disableClose` is part of the resolved dialog state now, even though close-prevention behavior is still implemented in the next step.
- `size` is treated as an explicit shell concern and maps to panel size classes.

Reason:

- We want config to be a real contract, not an ad hoc bag of optional values.
- The service should resolve defaults once and pass a stable shape through the dialog path.

### 8. Token direction for overlays

- We will keep overlay tokens minimal and shared, not dialog-specific at the global token layer.
- The current shared overlay semantics are:
  - `--color-overlay-backdrop`
  - `--surface-overlay`
  - `--shadow-overlay`

- The dialog component may map these into local component hooks such as:
  - `--vark-dialog-backdrop-color`
  - `--vark-dialog-panel-surface`
  - `--vark-dialog-panel-shadow`

### 9. Global overlay styles

- CDK overlay structural styles must be loaded globally, because the overlay container renders under `document.body`, not inside a component host.
- For now, the app imports `@angular/cdk/overlay-prebuilt.css` in its global stylesheet to enable runtime behavior.

Long-term decision:

- When `libs/ui/components` becomes independently consumable, the preferred packaging model is:
  - provide a library-owned global stylesheet entry
  - document that consuming apps import it once
  - later improve installation with schematics

- We do **not** want overlay infrastructure styles hidden inside a component-local stylesheet.

## Current Status

Implemented:

- CDK dependency added
- `DialogService.open(...)` creates an overlay
- overlay shell component renders attached content
- body scroll is blocked while the overlay is open
- `DialogRef.close()` disposes the live overlay
- `apps/vark` opens the existing create-ticket UI as dialog content

Not implemented yet:

- backdrop click close
- `Escape` close
- focus management and focus restore

## Next Decisions To Record Here

- whether `afterClosed()` should stay observable-first or move to a dual observable/signal contract
- how focus trap and focus restore are implemented
- how sizing and panel classes should be formalized
