import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEntitlementsComponent } from './add-entitlements/add-entitlements.component';
import { EditEntitlementsComponent } from './edit-entitlements/edit-entitlements.component';
import { EntitlementsComponent } from './entitlements/entitlements.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'entitlements', component: EntitlementsComponent },
      { path: 'add-entitlements', component: AddEntitlementsComponent },
      { path: 'edit-entitlements/:id', component: EditEntitlementsComponent },
      { path: '', redirectTo: 'entitlements', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitlementsRoutingModule { }
