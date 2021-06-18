import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  public subsription: Subscription;
  public display: boolean = false;
  constructor(private spinner: SpinnerService,
              @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    this.initSubscription();
  }

  private initSubscription(): void {
    this.subsription = this.spinner.load()
      .subscribe(value => {
        this.display = value;
        this.handleScroll(value);
      });
  }
  public ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }
  handleScroll(flag: boolean = false): void {
    const ele: HTMLElement = this._document.querySelector('.root-container');
    if (!!ele) {
      ele.style.overflowY = flag ? 'hidden' : 'auto';
    }
  }
}
