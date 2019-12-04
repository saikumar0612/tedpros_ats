import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLicensesComponent } from './add-licenses/add-licenses.component';
import { EditLicensesComponent } from './edit-licenses/edit-licenses.component';
import { LicensesComponent } from './licenses/licenses.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'licenses', component: LicensesComponent },
      { path: 'add-licenses', component: AddLicensesComponent },
      { path: 'edit-licenses/:id', component: EditLicensesComponent },
      { path: '', redirectTo: 'licenses', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicensesRoutingModule { }
