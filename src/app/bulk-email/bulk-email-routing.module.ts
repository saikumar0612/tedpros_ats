/* 
Author : BASIT022
comment: bulk Emailing
date: 08-08-19
*/



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulkEmailComponent } from './bulk-email/bulk-email.component';
import { LayoutComponent } from "./../shared/layout/layout.component";
const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'bulkEmail', component: BulkEmailComponent },
      { path: '', redirectTo: 'bulkEmail', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkEmailRoutingModule { }
