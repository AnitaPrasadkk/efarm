import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private displaySpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  public show(): void {
    this.displaySpinner.next(true);
  }

  public hide(): void {
    this.displaySpinner.next(false);
  }
  public load(): BehaviorSubject<boolean> {
    return this.displaySpinner;
  }
}
