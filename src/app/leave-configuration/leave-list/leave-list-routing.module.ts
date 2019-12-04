import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'leave-list', component: LeaveListComponent },
      { path: '', redirectTo: 'leave-list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveListRoutingModule { }
