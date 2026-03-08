# ADR 0002: Dialog component contract (Angular CDK)

## Context

We need a flagship UI platform component that demonstrates platform ownership: accessibility, predictable behavior, and reusable contracts.
A dialog is a high-signal component because it forces correct focus management, keyboard behavior, layering, and theming.

## Decision

- Component name: **Dialog**
- Implementation: **Angular CDK Overlay + Portal + FocusTrap**
- Consumer proof: `apps/vark` will open the dialog from a “Create ticket” action (used later for E2E tests).

## Naming: Dialog vs Modal

- **Dialog** is the accessible, standards-aligned term (WAI-ARIA uses “dialog”).
- “Modal” describes the _state_ (modal vs non-modal), not the component.
- This component will be modal by default (aria-modal, focus trap).
- API can expose a `modal` boolean if we later need non-modal behavior.

**Public name:** `Dialog` (library + docs)  
**Common alias (optional):** “Modal dialog” in docs text, not in code identifiers.

## Minimum contract (must-have behavior)

### Keyboard & Focus

- Opening:
  - Focus moves into the dialog.
  - Default: focus the first focusable element.
  - If provided, focus the element marked as initial focus (e.g. `[data-autofocus]`).
- Trapping:
  - Tab/Shift+Tab stays within the dialog (focus trap).
- Closing:
  - `Escape` closes the dialog unless `disableClose = true`.
  - Backdrop click closes unless `disableClose = true`.
- Restoring:
  - On close, focus returns to the trigger element that opened the dialog.

### ARIA

- Use `role="dialog"` (or `alertdialog` for destructive confirmations later).
- Set `aria-modal="true"` when modal.
- Support:
  - `aria-labelledby` (title id)
  - `aria-describedby` (description/body id)

### Overlay & Layout

- Render via CDK Overlay attached to the document (not in-flow).
- Backdrop is present for modal dialogs.
- Scroll is locked while dialog is open (body scroll lock via CDK scroll strategy).
- Sizing:
  - Provide a small set of sizes (e.g. `sm | md | lg`) mapped to tokens.

### Stacking (minimum)

- If multiple dialogs are opened:
  - Only the topmost dialog is interactive (focus trap on topmost).
  - `Escape` closes only the topmost.
  - Backdrop applies to the topmost (no “double backdrops” unless explicitly decided later).

## Consumer proof plan (adoption proof)

Goal: prove the Dialog contract works in a real consumer flow (not only in isolation).

### Where

Consumer app: `apps/vark` (homepage is enough for now).

### Flow: “Create Ticket” Dialog

**Trigger**

- Primary button: “Create ticket” (this is the focus-return target).

**Dialog contents**

- Title: “Create ticket”
- Fields:
  - Title (required)
  - Description (optional)
- Actions:
  - Cancel
  - Create

**Ticket list**

- In-memory list below the button
- After successful Create, dialog closes and the new ticket appears at the top

### Proof behaviors (mapped to the contract)

1. Open dialog → focus lands inside dialog
2. Tab/Shift+Tab cycles inside (no escape)
3. ESC closes → focus returns to “Create ticket”
4. Backdrop click closes (unless disableClose)
5. ARIA inspection:
   - role="dialog"
   - aria-modal="true"
   - aria-labelledby points to the title element id
   - aria-describedby points to the content id
6. Theme switching while dialog open:
   - switching Light/Dark/System keeps dialog readable and focus trap stable
7. (Later) stacking:
   - open a nested confirmation dialog → only topmost closes on ESC

## Verification plan (later)

- Unit/component coverage targets:
  - focus moves inside on open
  - focus returns to trigger on close
  - disableClose prevents ESC/backdrop close
- E2E (Playwright later):
  - Create Ticket opens dialog, tab cycles within, ESC closes, theme switching does not break it

## Non-goals (for MVP)

- Drawers / sheets
- Complex animation choreography (basic transitions only, token-driven)
- Advanced nested focus edge cases beyond “topmost wins”
- Draggable/resizable dialogs

## Consequences / Tradeoffs

- CDK reduces risk and avoids reinventing focus/overlay behavior.
- Slightly more boilerplate than hand-rolled modals, but much more predictable and maintainable.
