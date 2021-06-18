import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService as utils } from '../../shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  nextUrl: string;

  constructor(private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const hasAuthToken = utils.getStorageData('token');

    if (!!hasAuthToken && hasAuthToken!== 'null') {
      return true;
    }
    let navigate: string = 'auth/sign-in';
    this.nextUrl = state.url;
    this._router.navigate([navigate]);
    return false;
  }
}
