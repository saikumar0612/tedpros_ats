import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { MyEntitlementsComponent } from './my-entitlements/my-entitlements.component';
import { MyRepoertsComponent } from './my-repoerts/my-repoerts.component';
import { MyleaveListComponent } from './myleave-list/myleave-list.component';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { LayoutComponent } from '../shared/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'apply-leave', component: ApplyLeaveComponent },
      { path: 'myleave-list', component: MyleaveListComponent },
      { path: 'my-entitlements', component: MyEntitlementsComponent },
      { path: 'my-reports', component: MyRepoertsComponent },
      { path: 'leave-list', component: LeaveListComponent },
      { path: '', redirectTo: 'apply-leave', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavesRoutingModule { }
