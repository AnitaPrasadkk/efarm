import { Injectable, Inject } from '@angular/core';
import { get as _get } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { AuthRes, AuthData } from 'src/app/auth/models/auth';

export interface SessionData {
  key: string;
  value: any;
  ignoreStringfy?: boolean;
}
export const storageMechanism: any[] = [
  localStorage,
  sessionStorage
]

export interface LocationObj {
  latitude: number;
  longitude: number;
  zoom?: number;
  draggable?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  
  public authData = new BehaviorSubject<AuthData>(null);
  public enableChat = new BehaviorSubject<boolean>(null);
  public chatOptions = {
    enable: false,
    open: false,
    minimize: false
  }
  
  constructor() { }
  
  public static setStorageData(sessionData: SessionData, storageType: number = 1): void {
    if (!sessionData) {
      throw new Error('Invalid session update');
    }
    sessionData.value = typeof sessionData.value === 'string' || sessionData.ignoreStringfy
    ? sessionData.value
    : JSON.stringify(sessionData.value);
    storageMechanism[storageType].setItem(sessionData.key, sessionData.value);
  }

  public static getStorageData(key: string, parse: boolean = false, storageType: number = 1): any {
    const sessionData: SessionData = { key, value: '' };
    if (!key) {
      return false;
    }
    sessionData.value = storageMechanism[storageType].getItem(key);
    if (parse) {
      sessionData.value = JSON.parse(sessionData.value || null);
    }
    return sessionData.value;
  }

  public static clearStorageData(key: string, storageType: number = 1): void {
    if (!key) {
      throw new Error('Invalid key');
    }
    storageMechanism[storageType].removeItem(key);
  }

  public clearAllStorageData(storageType: number = 1): void {
    storageMechanism[storageType].clear();
    this.chatOptions = {
      enable: false,
      open: false,
      minimize: false
    }
    this.authData.next(null);
    this.enableChat.next(null);
  }

  public  setUser(data: AuthRes): void {
    const token: string = _get(data, 'token', null);
    const val: AuthData = {
      userInfo: data,
      loggedIn: !!(_get(data, 'token', false))
    }
    UtilityService.setStorageData({key: 'token', value: token});
    UtilityService.setStorageData({key: 'user', value: data});
    this.authData.next(val);
    this.enableChat.next(!!token);
  }

  public  setLocation(data: LocationObj): void {
    if (!!data) {
      UtilityService.setStorageData({key: 'location', value: JSON.stringify(data)});
    }
  }

  public getLocation(): LocationObj {
    return UtilityService.getStorageData('location', true);
  }

  public getUser(): AuthRes {
    return UtilityService.getStorageData('user', true);
  }
}
