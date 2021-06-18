import { Injectable } from '@angular/core';
import { extend as _extend } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public _selectedEnvironment: Object = {};
  private _config: Object = {
    root: 'api',
    origin: window.location.origin
  }
  private _devConfig: Object = {
    root: 'assets/json',
    useJson: true
  }
  constructor() {
    this.getEnvironment();
   }

   public getEnvironment(): Object {
    let host = window.location.host;
    _extend(this._selectedEnvironment, this._config);
    if (host.match('localhost')) {
      _extend(this._selectedEnvironment, this._devConfig);
    }
    return this._selectedEnvironment;
   }
   
   public get(key: string): any {
    return this._selectedEnvironment[key];
   }

}
