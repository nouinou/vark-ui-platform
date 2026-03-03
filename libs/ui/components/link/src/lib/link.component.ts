import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type LinkVariant = 'inline' | 'button' | 'button-secondary';
export type LinkSize = 'md' | 'lg';

@Component({
  selector: 'vark-link',
  standalone: true,
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"variant-" + variant() + " size-" + size()',
  },
})
export class LinkComponent {
  readonly href = input.required<string>();
  readonly variant = input<LinkVariant>('inline');
  readonly size = input<LinkSize>('md');
  readonly disabled = input(false);
  readonly target = input<string | null>(null);
  readonly rel = input<string | null>(null);
}
