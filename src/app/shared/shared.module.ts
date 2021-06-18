import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent, SpinnerComponent, CommonModalComponent, ConfirmModalComponent } from './components';
import { SafePipe } from './pipes/safe-html.pipe';
const components = [
  NotFoundComponent,
  SpinnerComponent,
  CommonModalComponent,
  ConfirmModalComponent
];
@NgModule({
  declarations: [
    ...components,
    SafePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components,
    SafePipe
  ],
  entryComponents: [
    CommonModalComponent
  ]
})
export class SharedModule { }
