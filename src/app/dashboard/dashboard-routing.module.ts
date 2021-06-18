import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as COMPONENTS from './components';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products',
        component: COMPONENTS.DashboardComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'profile',
        component: COMPONENTS.ProfileComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
