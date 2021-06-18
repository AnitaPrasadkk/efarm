import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import * as COMPONENTS from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeoLocationService } from '../services/geo-location.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const components: any = [
  COMPONENTS.DashboardComponent,
  COMPONENTS.ProfileComponent,
  COMPONENTS.ItemComponent,
  COMPONENTS.ItemInfoComponent
];
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgbModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDh9r4zcLbdIfiY7xo9yzPU75gVOXVu82U',
      libraries: ['places']
    })
  ],
  providers: [GeoLocationService]
})
export class DashboardModule { }
