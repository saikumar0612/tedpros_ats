import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrganizationKpiComponent } from './add-organization-kpi/add-organization-kpi.component';
import { EditOrganizationKpiComponent } from './edit-organization-kpi/edit-organization-kpi.component';
import { OrganizationKpisComponent } from './organization-kpis/organization-kpis.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'add-organization-kpis', component: AddOrganizationKpiComponent },
      { path: 'edit-organization-kpi/:id', component: EditOrganizationKpiComponent },
      { path: 'organization-kpi', component: OrganizationKpisComponent },
      { path: '', redirectTo: 'organization-kpi', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationKpiRoutingModule { }
