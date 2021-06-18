import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as COMPONENTS from './components';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-in',
        component: COMPONENTS.SignInComponent,
      },
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
