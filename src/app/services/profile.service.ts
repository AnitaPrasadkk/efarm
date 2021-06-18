import { Injectable } from '@angular/core';
import { AjaxService, UtilityService } from '../shared/services';
import { NotificationType, UserList } from '../dashboard/models/dashboard';
import { AuthRes } from '../auth/models/auth';
import { get as _get, groupBy as _groupBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  currentUser: AuthRes;
  itemObj: UserList;
  profilePosts: UserList[] = [];
  productDetails: UserList;
  notificationDetails: NotificationType;
  readNotificationCount: number = 0;
  constructor(private ajax: AjaxService,
    private util: UtilityService) { 
    }

  public getProfilePosts(): void {
    this.currentUser = this.util.getUser();
    const payload: any = {
      request: {
        'userName': _get(this.currentUser, 'userName')
      }
    };
    this.ajax.sendRequest('PROFILE_POSTS', payload).subscribe(data => {
      if (!!data) {
        this.processPosts(_get(data, 'response.details'));
      }
    });
  }
  public getProfile(forceFlag: boolean = false): void {
    if (forceFlag || !this.profilePosts || !this.profilePosts.length) {
      this.getProfilePosts();
    }
  }
  processPosts(data: UserList): void {
    if (!!data) {
      this.notificationDetails = _get(data, 'notificationDetails', []);
      this.profilePosts = _get(data, 'profileDetails', []);
      this.productDetails = _groupBy(this.profilePosts, 'postType');
    }
  }
}
