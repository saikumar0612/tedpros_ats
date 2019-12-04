import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RoleActivityComponent } from './role-activity/role-activity.component';
import { EditRolePermissionsComponent } from './edit-role-permissions/edit-role-permissions.component';
import { LayoutComponent } from '../../shared/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'roles-list', component: RolesListComponent },
      { path: 'role-activity', component: RoleActivityComponent },
      { path: 'edit-role-permissions/:id', component: EditRolePermissionsComponent },
      { path: '', redirectTo: 'roles-list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRolesRoutingModule { }
