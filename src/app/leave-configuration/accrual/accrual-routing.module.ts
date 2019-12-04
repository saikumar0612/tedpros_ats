import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAccrualComponent } from './add-accrual/add-accrual.component';
import { EditAccrualComponent } from './edit-accrual/edit-accrual.component';
import { ViewAccrualComponent } from './view-accrual/view-accrual.component';
import { AccrualListComponent } from './accrual-list/accrual-list.component';
import { LayoutComponent } from '../../shared/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'add-accrual', component: AddAccrualComponent },
      { path: 'edit-accrual/:id', component: EditAccrualComponent },
      { path: 'view-accrual/:id', component: ViewAccrualComponent },
      { path: 'accruals', component: AccrualListComponent },
      { path: '', redirectTo: 'accrual', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccrualRoutingModule { }
