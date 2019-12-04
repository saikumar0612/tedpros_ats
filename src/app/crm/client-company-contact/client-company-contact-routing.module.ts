import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ViewContactsComponent } from './view-contacts/view-contacts.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'company-contacts', component: ContactsComponent },
      { path: 'add-company-contact', component: AddContactsComponent },
      { path: 'view-company-contact/:id', component: ViewContactsComponent },
      { path: 'edit-company-contact/:id', component: EditContactComponent },
      { path: '', redirectTo: 'company-contacts', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientCompanyContactRoutingModule { }
