import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMembershipComponent } from './add-membership/add-membership.component';
import { EditMembershipComponent } from './edit-membership/edit-membership.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'memberships', component: MembershipsComponent },
      { path: 'add-membership', component: AddMembershipComponent },
      { path: 'edit-membership/:id', component: EditMembershipComponent },
      { path: '', redirectTo: 'memberships', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipsRoutingModule { }
