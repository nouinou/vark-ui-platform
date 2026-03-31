import { Subject, Observable } from 'rxjs';

export class DialogRef<TResult = unknown> {
  private readonly closedSubject$ = new Subject<TResult | undefined>();

  close(result?: TResult): void {
    this.closedSubject$.next(result);
    this.closedSubject$.complete();
  }

  afterClosed(): Observable<TResult | undefined> {
    return this.closedSubject$.asObservable();
  }
}
