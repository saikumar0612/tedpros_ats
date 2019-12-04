import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddKpiComponent } from './add-kpi/add-kpi.component';
import { EditKpiComponent } from './edit-kpi/edit-kpi.component';
import { KipsComponent } from './kips/kips.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'kpis', component: KipsComponent },
      { path: 'add-kpi', component: AddKpiComponent },
      { path: 'edit-kpi/:id', component: EditKpiComponent },
      { path: '', redirectTo: 'kpis', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigureRoutingModule { }
