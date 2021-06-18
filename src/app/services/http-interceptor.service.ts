import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { SpinnerService } from './spinner.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private _excludedOperations: string[] = [];
  constructor(private spinner: SpinnerService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let reqObj = req.headers['headers'];
    let operationName = req.url.split('/').pop() || null;
    if (this._excludedOperations.indexOf(operationName) !== -1) {
      return next.handle(req);
    }
    this.spinner.show();
    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
      },
      () => { })
    );
  }

}
