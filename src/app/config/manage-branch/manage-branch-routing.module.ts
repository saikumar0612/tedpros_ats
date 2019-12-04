import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { BranchesComponent } from './branches/branches.component';
import { AddBranchesComponent } from './add-branches/add-branches.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component'

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'branches', component: BranchesComponent },
      { path: 'add-branch', component: AddBranchesComponent },
      { path: 'edit-branch/:id', component: EditBranchComponent },
      { path: '', redirectTo: 'branches', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBranchRoutingModule { }
