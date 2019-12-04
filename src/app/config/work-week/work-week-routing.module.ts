import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkWeekComponent } from './work-week/work-week.component';
import { EditWorkWeekComponent } from './work-week/edit-work-week/edit-work-week.component'
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'work-week', component: WorkWeekComponent },
      { path: 'edit-work-week', component: EditWorkWeekComponent },
      { path: '', redirectTo: 'work-week', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkWeekRoutingModule { }
