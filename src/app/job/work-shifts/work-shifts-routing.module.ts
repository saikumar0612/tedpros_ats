import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWorkshiftComponent } from './add-workshift/add-workshift.component';
import { WorkshiftsComponent } from './workshifts/workshifts.component';
import { EditWorkshiftComponent } from './edit-workshift/edit-workshift.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'work-shifts', component: WorkshiftsComponent },
      { path: 'add-work-shifts', component: AddWorkshiftComponent },
      { path: 'edit-work-shifts/:id', component: EditWorkshiftComponent },
      { path: '', redirectTo: 'work-shifts', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkShiftsRoutingModule { }
