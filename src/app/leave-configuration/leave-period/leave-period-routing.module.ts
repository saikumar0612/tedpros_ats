import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditLeavePeriodComponent } from './leave-period/edit-leave-period/edit-leave-period.component';
import { LeavePeriodComponent } from './leave-period/leave-period.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'leave-period', component: LeavePeriodComponent },
      { path: 'edit-leave-period/:id', component: EditLeavePeriodComponent },
      { path: '', redirectTo: 'leave-period', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavePeriodRoutingModule { }
