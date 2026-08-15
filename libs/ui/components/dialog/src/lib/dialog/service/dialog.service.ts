import { ComponentRef, Injectable, TemplateRef, Type } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { DialogRef } from '../ref/dialog.ref';
import { Dialog } from '../dialog';
import { DialogConfig, resolveDialogConfig } from '../types/dialog.types';

export type DialogContent<TContext = unknown> = Type<unknown> | TemplateRef<TContext>;

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private readonly overlay: Overlay) {}

  open<TContext = unknown, TResult = unknown>(
    componentOrTemplate: DialogContent<TContext>,
    config?: DialogConfig,
  ): DialogRef<TResult> {
    const resolvedConfig = resolveDialogConfig(config);
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    const dialogRef = new DialogRef<TResult>(overlayRef);
    const containerRef: ComponentRef<Dialog> = overlayRef.attach(new ComponentPortal(Dialog));

    containerRef.setInput('content', componentOrTemplate);
    containerRef.setInput('disableClose', resolvedConfig.disableClose);
    containerRef.setInput('size', resolvedConfig.size);
    containerRef.setInput('ariaLabelledBy', resolvedConfig.ariaLabelledBy);
    containerRef.setInput('ariaDescribedBy', resolvedConfig.ariaDescribedBy);

    return dialogRef;
  }
}
