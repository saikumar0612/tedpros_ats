import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { LayoutComponent } from "../../shared/layout/layout.component";


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'orgChart', component: OrgChartComponent },
      { path: '', redirectTo: 'orgChart', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationChartRoutingModule { }
