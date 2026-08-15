import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, ReplaySubject } from 'rxjs';

export class DialogRef<TResult = unknown> {
  private closed = false;
  private readonly closedSubject$ = new ReplaySubject<TResult | undefined>(1);

  constructor(private readonly overlayRef: OverlayRef) {
    this.overlayRef.detachments().subscribe(() => {
      this.finalizeClose();
    });
  }

  close(result?: TResult): void {
    this.finalizeClose(result);
    this.overlayRef.dispose();
  }

  afterClosed(): Observable<TResult | undefined> {
    return this.closedSubject$.asObservable();
  }

  private finalizeClose(result?: TResult): void {
    if (this.closed) {
      return;
    }

    this.closed = true;
    this.closedSubject$.next(result);
    this.closedSubject$.complete();
  }
}
