import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { TransferComponent } from './transfer/transfer.component';
import { LayoutComponent } from '../../shared/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'add-user', component: AddUserComponent },
      { path: 'users-list', component: UsersListComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'transfer/:id', component: TransferComponent },
      { path: '', redirectTo: 'users-list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
