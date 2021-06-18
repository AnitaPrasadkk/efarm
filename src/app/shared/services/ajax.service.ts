import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { UtilityService as utils } from './utility.service';
import { SERVICE_CONSTANTS } from '../constants/service.constants';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from '../components';
import { CONSTANTS } from '../constants/constants';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators/map';
import { get as _get } from 'lodash';
export interface RequestParam {
  serviceName: string;
  operationName: string;
  method: string;
  model?: string;
}
export interface PayloadObj {
  headers: Object;
  body?: Object;
  opeartionName?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  constructor(private http: HttpClient,
              private config: ConfigService,
              private modalService: NgbModal) { }

  public sendRequest(serviceName: string, payload?: any, params?: any): Observable<any> {
    const serviceObj: RequestParam = SERVICE_CONSTANTS.REQUEST_PARAM[serviceName],

      storagedata = utils.getStorageData(serviceObj.operationName, true);
    if (!!storagedata) {
      return new Observable(storagedata);
    } else {
      const req: any = this.getReqObj(
        serviceName, payload, params
      );
      return this.http.request<any>(req.method, req.url, req.httpOptions).pipe(
        map((response) => {
          if (_get(response, 'response.status.statusCode') === '0000') {
            return response;
          }
          this.handleError(serviceObj);
        }),
        catchError((error) => {
          this.handleError(serviceObj);
          throw new Error("error")
        })
      );
    }

  }

  private handleError(serviceObj: RequestParam): void {
    if (!!serviceObj) {
    const errorObj: Object = CONSTANTS.ERROR_VALUES[serviceObj.operationName] ||
      CONSTANTS.ERROR_VALUES.GENERIC_ERROR;
      const modalRef = this.modalService.open(CommonModalComponent, { centered: true });
      modalRef.componentInstance.errorObj = errorObj;
    }
  }

  private getReqObj(servicename, payload, params) {
    const root: string = this.config.get('root'),
      serviceObj: RequestParam = SERVICE_CONSTANTS.REQUEST_PARAM[servicename],
      origin: string = this.config.get('origin');
    let useJson: boolean = this.config.get('useJson'),
      url: string,
      httpOptions = {
        headers: {
          'token': utils.getStorageData('token') || '',
          'service': serviceObj.operationName
        }, params

      }
    const method: string = serviceObj.method;
    if (payload) {
      httpOptions['body'] = payload;
    }
    if (!useJson) {
      url = `${origin}/${root}/${serviceObj.serviceName}/${serviceObj.operationName}`;
    } else {
      url = `${origin}/${root}/${serviceObj.operationName}.json`;
    }
    return {
      url, httpOptions, method
    }
  }
}
