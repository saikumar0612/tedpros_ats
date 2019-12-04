import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeTypeComponent } from './add-employee-type/add-employee-type.component';
import { EditEmployeeTypeComponent} from './edit-employee-type/edit-employee-type.component';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'employee-type', component: EmployeeTypeComponent },
      { path: 'add-employee-type', component: AddEmployeeTypeComponent },
      { path: 'edit-employee-type/:id', component: EditEmployeeTypeComponent },
      { path: '', redirectTo: 'employee-type', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeTypeRoutingModule { }
