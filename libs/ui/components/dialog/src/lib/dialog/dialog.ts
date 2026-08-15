import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, TemplateRef, Type } from '@angular/core';

import { DialogSize } from './types/dialog.types';

@Component({
  selector: 'vark-dialog',
  standalone: true,
  imports: [NgComponentOutlet, NgTemplateOutlet],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  readonly content = input<Type<unknown> | TemplateRef<unknown> | null>(null);
  readonly disableClose = input(false);
  readonly size = input<DialogSize>('md');
  readonly ariaLabelledBy = input<string | undefined>(undefined);
  readonly ariaDescribedBy = input<string | undefined>(undefined);

  protected get componentContent(): Type<unknown> | null {
    const content = this.content();

    return content instanceof TemplateRef ? null : content;
  }

  protected get templateContent(): TemplateRef<unknown> | null {
    const content = this.content();

    return content instanceof TemplateRef ? content : null;
  }

  protected get isDisableClose(): boolean {
    return this.disableClose();
  }
}
