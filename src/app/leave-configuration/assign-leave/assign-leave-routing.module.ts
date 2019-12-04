import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignLeaveComponent } from './assign-leave/assign-leave.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'assign-leave', component: AssignLeaveComponent },
      { path: '', redirectTo: 'assign-leave', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignLeaveRoutingModule { }
