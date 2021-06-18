import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CONSTANTS } from 'src/app/shared/constants/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AjaxService, LocationObj, UtilityService } from 'src/app/shared/services';
import { get as _get, extend as _extend } from 'lodash';
import { AuthRes } from 'src/app/auth/models/auth';
import { addPostReq, UpdatePostReq, UserList, ModalResponseType } from '../../models/dashboard';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
itemInfoConstants: any;
itemInfoForm: FormGroup;
coordinates: LocationObj;
currentUser: AuthRes;
// onSuccess: boolean = false;
crudConstants: any;
@Input() modalRef: NgbModalRef;
@Output() itemUpdate = new EventEmitter<Object>();
@Input() actionType: string;
@Input() itemObj: UserList;
  constructor(private _fb: FormBuilder,
            private ajax: AjaxService,
            private util: UtilityService,
            private profileService: ProfileService) { }

  ngOnInit() {
    this.itemInfoConstants = CONSTANTS.ITEM_INFO;
    this.crudConstants = CONSTANTS.CRUD_CONSTANTS;
    this.coordinates = this.util.getLocation();
    this.currentUser = this.util.getUser();
    this.initForm();
  }
  
  initForm(): void {
    this.itemInfoForm = this._fb.group({
      type: [_get(this.itemObj, 'productType', ''), [Validators.required]],
      subType: [_get(this.itemObj, 'subType', ''), [Validators.required]],
      quantity: [_get(this.itemObj, 'quantity', ''), [Validators.required]],
      requestType: [_get(this.itemObj, 'postType', ''), [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.itemInfoForm.invalid) {
      return;
    }
    let req: addPostReq | UpdatePostReq = _extend({}, {
      latitude: String(_get(this.coordinates, 'latitude', '')),
      longitude: String(_get(this.coordinates, 'longitude', '')),
      userName: _get(this.currentUser, 'userName'),
      name: _get(this.currentUser, 'name')
    }, this.itemInfoForm.value);
    if (this.actionType !== 'add') {
      req.id = _get(this.itemObj, 'id', '');
    }
    let payload = {
      request: req
    };
    this.ajax.sendRequest(this.crudConstants[this.actionType].serviceName, payload).subscribe(data => {
      if (!!data) {
        this.emitSuccess(true);
        this.profileService.getProfile(true);
      } else {
        this.emitSuccess(false);
      }
    },
    err => {
      this.emitSuccess(false);
      console.log(err);
    });
  }

  emitSuccess(flag: boolean = false): void {
    const obj: ModalResponseType = {
      isSuccess: flag,
      actionType: this.actionType
    }
    this.itemUpdate.emit(obj);
    this.modalRef.close();
  }

}
