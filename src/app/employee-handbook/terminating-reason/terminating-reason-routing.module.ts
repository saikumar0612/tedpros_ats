import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTerminationComponent } from './add-termination/add-termination.component';
import { EditTerminatingReasonsComponent } from './edit-terminating-reasons/edit-terminating-reasons.component';
import { TerminatingListComponent } from './terminating-list/terminating-list.component'
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'terminating-resons', component: TerminatingListComponent },
      { path: 'add-terminating-resons', component: AddTerminationComponent },
      { path: 'edit-terminating/:id', component: EditTerminatingReasonsComponent },
      { path: '', redirectTo: 'terminating-resons', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminatingReasonRoutingModule { }
