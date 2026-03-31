export type DialogSize = 'sm' | 'md' | 'lg';
export type DialogConfig = {
  disableClose?: boolean;
  size?: DialogSize;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
};
