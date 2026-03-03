import { THEME_STORAGE_KEY, type ResolvedThemeName, type ThemeName } from './types';

function hasDom() {
  return typeof document !== 'undefined';
}

function hasWindow() {
  return typeof window !== 'undefined';
}

function resolveSystemTheme(): ResolvedThemeName {
  if (!hasWindow()) {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyThemeAttribute(theme: ResolvedThemeName) {
  if (!hasDom()) {
    return;
  }

  document.documentElement.dataset.theme = theme;
}

export function getStoredTheme(): ThemeName | null {
  if (!hasWindow()) {
    return null;
  }

  const theme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return theme === 'light' || theme === 'dark' || theme === 'system' ? theme : null;
}

export function getResolvedTheme(theme: ThemeName): ResolvedThemeName {
  return theme === 'system' ? resolveSystemTheme() : theme;
}

export function getActiveTheme(): ResolvedThemeName {
  if (!hasDom()) {
    return 'light';
  }

  const theme = document.documentElement.dataset.theme;
  return theme === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme: ThemeName) {
  const resolvedTheme = getResolvedTheme(theme);
  applyThemeAttribute(resolvedTheme);

  if (hasWindow()) {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  return resolvedTheme;
}

export function clearStoredTheme() {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.removeItem(THEME_STORAGE_KEY);
}

export function initTheme(defaultTheme: ThemeName = 'system') {
  const theme = getStoredTheme() ?? defaultTheme;
  return setTheme(theme);
}
