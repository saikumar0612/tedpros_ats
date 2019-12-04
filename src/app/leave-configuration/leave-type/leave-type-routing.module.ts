import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLeaveTypeComponent } from './add-leave-type/add-leave-type.component';
import { EditLeaveTypeComponent } from './edit-leave-type/edit-leave-type.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'leave-type', component: LeaveTypeComponent },
      { path: 'add-leave-type', component: AddLeaveTypeComponent },
      { path: 'edit-leave-type/:id', component: EditLeaveTypeComponent },
      { path: '', redirectTo: 'leave-type', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveTypeRoutingModule { }
