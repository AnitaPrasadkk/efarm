import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserList } from '../../models/dashboard';
import { UtilityService } from 'src/app/shared/services';
import { CONSTANTS } from 'src/app/shared/constants/constants';
import { AuthRes } from 'src/app/auth/models/auth';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
@Input() productDetails: UserList;
@Input() modalRef: NgbModalRef;
@Input() showShareOpts: boolean = true;
@Output() notify = new EventEmitter<UserList>();
fbShareUrl: string = encodeURIComponent(window.location.href);
currentUser: AuthRes;
constObj: any;
  constructor(private util: UtilityService) { }

  ngOnInit() {
    this.constObj = CONSTANTS.ITEM_INFO;
    this.currentUser = this.util.getUser();
  }

  notifyUser(user: UserList): void {
    this.notify.emit(user);
    this.modalRef.close();
  }
}
