import { Injectable, TemplateRef, Type } from '@angular/core';

import { DialogRef } from '../ref/dialog.ref';
import { DialogConfig } from '../types/dialog.types';

export type DialogContent<TContext = unknown> = Type<unknown> | TemplateRef<TContext>;

@Injectable()
export class DialogService {
  open<TContext = unknown, TResult = unknown>(
    componentOrTemplate: DialogContent<TContext>,
    config?: DialogConfig,
  ): DialogRef<TResult> {
    void componentOrTemplate;
    void config;

    return new DialogRef<TResult>();
  }
}
