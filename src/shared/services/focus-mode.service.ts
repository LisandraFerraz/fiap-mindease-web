import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FocusModeService {
  private readonly isfocusMode = signal(true);
  readonly focusOn = this.isfocusMode.asReadonly();

  public activate() {
    this.isfocusMode.update(() => true);
  }

  public deactivate() {
    this.isfocusMode.update(() => false);
  }
}
