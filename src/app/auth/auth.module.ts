import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import * as COMPONENTS from './components';
import { AuthRoutingModule } from './auth-routing.module';
const components: any = [
  COMPONENTS.SignInComponent
];
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
