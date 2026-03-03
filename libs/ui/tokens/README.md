# tokens

Shared SCSS design tokens for the UI layer.

Usage from app or feature styles:

```scss
@use 'tokens' as tokens;
```

Example:

```scss
.card {
  padding: tokens.$space-4;
  border-radius: tokens.$radius-lg;
  box-shadow: tokens.$shadow-sm;
  background: tokens.$color-surface;
}
```
