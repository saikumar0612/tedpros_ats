import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LayoutComponent } from "./../shared/layout/layout.component";
import { CalendareventsComponent} from "./calendarevents/calendarevents.component"
import { from } from 'rxjs';
import { CompanieslistComponent } from './companieslist/companieslist.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'calendar', component:  CalendareventsComponent},
      { path: 'companies', component:CompanieslistComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
