import { Component, ViewChild, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UtilityService, AjaxService } from './shared/services';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from './shared/components';
import { CONSTANTS } from './shared/constants/constants';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { get as _get, each as _each } from 'lodash';
import { AuthData } from './auth/models/auth';
import { ProfileService } from './services/profile.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgbPopoverConfig]
})
export class AppComponent {
  userData: AuthData;
  loginUrl: string;
  subscriptions: Subscription[] = [];
  notifybell: HTMLElement;
  @ViewChild('sidenav', {static: false}) sidenavRef: MatSidenav;
  constructor(private _router: Router,
              private utilService: UtilityService,
              private modalService: NgbModal,
              private ajax: AjaxService,
              @Inject(DOCUMENT) private _document,
              private profileService: ProfileService,
              private popOverConfig: NgbPopoverConfig) {
                popOverConfig.placement = 'bottom-right';
                popOverConfig.popoverClass = 'notification-pop-up'
      
    }
  navigate(url: string, signOut: boolean=false): void { //check with Arun
    if (signOut) {
      const payload = {
        request: { 
          userName: _get(this.userData, 'userInfo.userName')
        }
      };
      this.ajax.sendRequest('LOGOUT', payload).subscribe(data => {
        this._document.cookie = `nickname=;Path=/; Expires=${new Date()};`;
        this.utilService.clearAllStorageData();
        const modalRef = this.modalService.open(CommonModalComponent, { centered: true });
        modalRef.componentInstance.errorObj = CONSTANTS.SIGN_OUT;
        this._router.navigate([url]);
      });
    } else {
      this._router.navigate([url]);
    }
    this.sidenavRef.close();
  }

  ngOnInit() {
    const routerSubscription = this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.utilService.chatOptions.open = false;
    });
    this.subscriptions.push(routerSubscription);
    const authSubscription = this.utilService.authData.subscribe((data: AuthData) => {
      this.userData = data;
      if (_get(this.userData, 'loggedIn', false)) {
        this.profileService.getProfile(true);
      }
    });
    this.utilService.setUser(this.utilService.getUser());
    this.subscriptions.push(authSubscription);
    const chatSubscription = this.utilService.enableChat.subscribe((data:boolean) => {
      var ele = this._document.querySelectorAll('iframe');
      if (ele.length) {
        _each(ele, el => {
          if (!!el) {
            el.remove();
          }
        });
      }
      this.utilService.chatOptions.enable = !!data;
      this.loginUrl = `/chat/chatIndex.html?fromEmail=${_get(this.userData, 'userInfo.userName')}&nickname=${_get(this.userData, 'userInfo.name')}`
    })
    this.subscriptions.push(chatSubscription);
  }
  ngOnDestroy() {
    this.subscriptions.map(v => v.unsubscribe());
  }
  pop(event, action: string) {
    const ele: HTMLElement = _get(event, 'target', null);
    if (!!ele && ele.classList.contains('notify-msg')) {
      event.target.style.backgroundColor = action == 'hover' ? '#0b8426' : '#0b8426d9';
      event.target.style.transform = action == 'hover' ? 'scale(1.01)' : 'scale(1)';
    }
  }
  drag(event) {
    const style = window.getComputedStyle(event.target, null);
    if (!!event.dataTransfer) {
      event.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
    }
}
drop(event) {
  if (!!event.dataTransfer) {
    const offset = event.dataTransfer.getData("text/plain").split(',');
    const dm = document.getElementById('notificationBell');
    dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
  }
  event.preventDefault();
  return false;
}
allowDrop(event) {
  event.preventDefault();
  return false;
}
dragMove(e) {
  this.notifybell = this._document.getElementById('notificationBell');
  const touchLocation = e.targetTouches[0];
  // assign box new coordinates based on the touch.
  this.notifybell.style.left = touchLocation.pageX + 'px';
  this.notifybell.style.top = touchLocation.pageY + 'px';
}
dragEnd(e) {
  const x = parseInt(this.notifybell.style.left);
  const y = parseInt(this.notifybell.style.top);
}
}
