export const THEME_STORAGE_KEY = 'vark-ui-theme';

export const themeNames = ['light', 'dark', 'system'] as const;

export type ThemeName = (typeof themeNames)[number];
export type ResolvedThemeName = Exclude<ThemeName, 'system'>;
