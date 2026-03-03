# tokens

Shared CSS design tokens for the UI layer.

Include the token bundle as a global stylesheet:

```json
"styles": ["libs/ui/tokens/src/tokens.css"]
```

Example:

```css
.card {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  background: var(--color-surface);
}
```
