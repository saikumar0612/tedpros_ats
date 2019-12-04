import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { AddEmploymentStatusComponent } from './add-employment-status/add-employment-status.component';
import { EditEmploymentStatusComponent } from './edit-employment-status/edit-employment-status.component';
import { EmploymentStatusComponent } from './employment-status/employment-status.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'employment-status', component: EmploymentStatusComponent },
      { path: 'add-employment-status', component: AddEmploymentStatusComponent },
      { path: 'edit-employment-status/:id', component: EditEmploymentStatusComponent },
      { path: '', redirectTo: 'employment-status', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeStatusRoutingModule { }
