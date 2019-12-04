import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeDocumentsComponent } from './office-documents/office-documents.component';
import { OfficeListComponent } from './office-list/office-list.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [

  {
    path: '', component: LayoutComponent, children: [
      { path: 'office-documents', component: OfficeListComponent },
      { path: 'add-office-document', component: OfficeDocumentsComponent },
      { path: '', redirectTo: 'office-documents', pathMatch: 'full' }
    ]
  
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeDocumentsRoutingModule { }
