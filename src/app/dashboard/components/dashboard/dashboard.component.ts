import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { get as _get, extend as _extend, map as _map, groupBy as _groupBy } from 'lodash';
import { UserList, CoOrdinatesMarker, ModalResponseType } from '../../models/dashboard';
import { AjaxService, UtilityService } from 'src/app/shared/services';
import { AuthRes } from 'src/app/auth/models/auth';
import { CONSTANTS } from 'src/app/shared/constants/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from 'src/app/shared/components';
import { MapsAPILoader } from '@agm/core';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
coordinates: CoOrdinatesMarker;
currentUser: AuthRes;
users: UserList[] = [];
markerConfig: any;
searchOptions: any;
searchForm: FormGroup;
activeModal: NgbActiveModal;
productDetails: UserList;
searching: boolean = false;
geoCoder;
fbShareUrl: string = encodeURIComponent(window.location.href);

@ViewChild('search', {static: false})
public searchElementRef: ElementRef;

  constructor(private ajax: AjaxService,
              private util: UtilityService,
              private _fb: FormBuilder,
              private modalService: NgbModal,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) { }

  ngOnInit() {
    this.markerConfig = CONSTANTS.MARKER_CONFIG;
    this.searchOptions = CONSTANTS.ITEM_INFO;
    this.currentUser = this.util.getUser();
    this.initSearchForm();
    this.getCurrentLocation();
    // this.mapsAPILoader.load().then(() => {
    //   this.getCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;
 
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,
    //     {
    //       types: ["address"]
    //   });
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
 
    //       //set latitude, longitude and zoom
    //       const position: any = {
    //         coords: {
    //           latitude: _get(place, 'geometry.location.lat()'),
    //           longitude: _get(place, 'geometry.location.lng()')
    //         }
    //       }
    //       this.updateUserLocation(position);
    //     });
    //   });
    // });
  }
  clickedUser(user: UserList, content: any) {
    this.productDetails = user;
    this.activeModal = this.modalService.open(content);
  }
  initSearchForm(): void {
    this.searchForm = this._fb.group({
      type: ['', [Validators.required]],
      subType: ['', [Validators.required]]
    });
  }
 mapClicked($event) {
  this.updateUserLocation($event);
 }
 updateUserLocation(position) {
   if (!!position) {
    this.coordinates = {
      latitude : _get(position, 'coords.latitude') || _get(position, 'coords.lat') || CONSTANTS.MARKER_CONFIG.DEFAULT_COORD.latitude ,
      longitude: _get(position, 'coords.longitude') || _get(position, 'coords.lng') || CONSTANTS.MARKER_CONFIG.DEFAULT_COORD.longitude,
      draggable: true,
      zoom: 12
    }
    this.util.setLocation(this.coordinates);
    this.getProducts('GET_ITEMS_LIST');
   }
 }
 getProducts(serviceName: string): void {
  let payload = {
    request: {
      userName: _get(this.currentUser, 'userName'),
      latitude: String(_get(this.coordinates, 'latitude', '')),
      longitude: String(_get(this.coordinates, 'longitude', '')),
      type: serviceName === 'SEARCH_POSTS' ? _get(this.searchForm, 'value.type') : '',
      subType: serviceName === 'SEARCH_POSTS' ? _get(this.searchForm, 'value.subType') : ''
    }
  };
  if (serviceName === 'GET_ITEMS_LIST') {
    this.searchPost(true);
  }
  this.ajax.sendRequest(serviceName, payload).subscribe(data => {
    if (!!data) {
      this.users = _map(_get(data, 'response.details', []), val => {
        const postGrps = Object.keys(_groupBy(val, 'postType', {}));
        let userLevelPostType = postGrps[0];
        if (postGrps.length > 1) {
          userLevelPostType = 'both';
        }
        val['userLevelPostType'] = userLevelPostType;
        return val;
      }
        );
      // this.searchForm.reset();
    }
  }, err => this.users = []);
 }
 notifyUser(user: UserList): void {
  let payload = {
    request: {
      postedUserName: _get(this.currentUser, 'userName'),
      receiverUserName: _get(user, 'userName'),
      latitude: String(_get(this.coordinates, 'latitude', '')),
      longitude: String(_get(this.coordinates, 'longitude', '')),
      submittedDate: new Date()
    }
  }
  this.ajax.sendRequest('NOTIFICATION', payload).subscribe(data => {
    if (!!data) {
      const errorObj: Object = _extend({}, CONSTANTS.NOTIFICATION, {
        isSuccess: true
      });
      const modalRef = this.modalService.open(CommonModalComponent, { centered: true });
      modalRef.componentInstance.errorObj = errorObj;
    }
  });
 }
 addPost(content): void {
  this.activeModal = this.modalService.open(content);
 }
 postPublished(value: ModalResponseType): void {
  if (value.isSuccess) {
    const successObj: Object = _extend({}, CONSTANTS.CRUD_CONSTANTS[value.actionType], {
      isSuccess: true
    });
    const modalRef = this.modalService.open(CommonModalComponent, { centered: true });
    modalRef.componentInstance.errorObj = successObj;
    this.getProducts('GET_ITEMS_LIST');
  }
   this.activeModal.close();
 }
 getCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.updateUserLocation(position);
    });
  }
}
 
 markerDragEnd($event) {
   this.updateUserLocation($event);
 }

 searchPost(flag?: boolean): void {
    this.searching = flag ? false : !this.searching;
    this.searchForm.reset();
 }
}