import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { VendorsComponent } from './vendors/vendors.component';
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'vendors', component: VendorsComponent },
      { path: 'add-vendor', component: AddVendorComponent },
      { path: 'edit-vendor/:id', component: EditVendorComponent },
      { path: 'view-vendor/:id', component: ViewVendorComponent },
      { path: '', redirectTo: 'vendors', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorCompanyRoutingModule { }
