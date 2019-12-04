import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { CustomersComponent } from './customer/customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'customers', component: CustomersComponent },
      { path: 'add-customer', component: AddCustomersComponent },
      { path: 'edit-customer/:id', component: EditCustomerComponent },
      { path: 'view-customer/:id', component: ViewCustomerComponent },
      { path: '', redirectTo: 'customers', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientCompanyRoutingModule { }
