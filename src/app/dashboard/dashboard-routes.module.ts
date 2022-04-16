import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { dashboard_routes } from './dashboard.routes';

const rutasHijas:Routes = [
  { path: '', component: DashboardComponent, children: dashboard_routes, 
  
    // canActivate: [ AuthGuard ] 
  },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutasHijas)
  ]
})
export class DashboardRoutesModule { }
