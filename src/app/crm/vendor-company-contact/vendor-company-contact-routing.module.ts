import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVendorContactComponent } from './add-vendor-contact/add-vendor-contact.component';
import { EditVendorContactComponent } from './edit-vendor-contact/edit-vendor-contact.component';
import { VendorContactsComponent } from './vendor-contacts/vendor-contacts.component';
import { ViewVendorContactComponent } from './view-vendor-contact/view-vendor-contact.component';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'vendors-contacts', component: VendorContactsComponent },
      { path: 'add-vendor-contact', component: AddVendorContactComponent },
      { path: 'view-vendor-contact/:id', component: ViewVendorContactComponent },
      { path: 'edit-vendor-contact/:id', component: EditVendorContactComponent },
      { path: '', redirectTo: 'vendors-contacts', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorCompanyContactRoutingModule { }
