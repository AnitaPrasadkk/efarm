import { Component, OnInit, ViewChild } from '@angular/core';
import { AjaxService, UtilityService } from 'src/app/shared/services';
import { get as _get, groupBy as _groupBy, extend as _extend } from 'lodash';
import { UserList, NotificationType, ModalResponseType } from '../../models/dashboard';
import { AuthRes } from 'src/app/auth/models/auth';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemInfoComponent } from '../item-info/item-info.component';
import { ItemComponent } from '../item/item.component';
import { CONSTANTS } from 'src/app/shared/constants/constants';
import { CommonModalComponent } from 'src/app/shared/components';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
actionType: string;
itemObj: UserList;
activeModal: NgbActiveModal;
@ViewChild('itemInfo', {static: false}) itemInfo: ItemInfoComponent;
@ViewChild('itemPreview', {static: false}) itemPreview: ItemComponent;
  constructor(private modalService: NgbModal,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile(true);
  }

  actionItems(actionType: string, item?: UserList): void {
    this.actionType = actionType;
    this.itemObj = item;
    if (actionType === 'add') {
      this.itemObj = null;
    }
    const component: any = this.actionType === 'view' ? this.itemPreview : this.itemInfo;
    this.activeModal = this.modalService.open(component);
  }
  onActionSuccess(value: ModalResponseType): void {
    if (value.isSuccess) {
      const successObj: Object = _extend({}, CONSTANTS.CRUD_CONSTANTS[value.actionType], {
        isSuccess: true
      });
      const modalRef = this.modalService.open(CommonModalComponent, { centered: true });
      modalRef.componentInstance.errorObj = successObj;
    }
    this.activeModal.close();
  }

}
