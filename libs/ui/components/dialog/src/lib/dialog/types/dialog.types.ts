export type DialogSize = 'sm' | 'md' | 'lg';
export type DialogConfig = {
  readonly disableClose?: boolean;
  readonly size?: DialogSize;
  readonly ariaLabelledBy?: string;
  readonly ariaDescribedBy?: string;
};

export type ResolvedDialogConfig = {
  readonly disableClose: boolean;
  readonly size: DialogSize;
  readonly ariaLabelledBy?: string;
  readonly ariaDescribedBy?: string;
};

export const DEFAULT_DIALOG_CONFIG: ResolvedDialogConfig = {
  disableClose: false,
  size: 'md',
};

export function resolveDialogConfig(config?: DialogConfig): ResolvedDialogConfig {
  return {
    ...DEFAULT_DIALOG_CONFIG,
    ...config,
  };
}
