import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTermsConditionsComponent } from './add-terms-conditions/add-terms-conditions.component';
import { EdtiTermsConditionsComponent } from './edti-terms-conditions/edti-terms-conditions.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'add-terms&conditions', component: AddTermsConditionsComponent },
      { path: 'edit-terms&conditions', component: EdtiTermsConditionsComponent },
      { path: 'terms&conditions', component: TermsConditionsComponent },
      { path: '', redirectTo: 'terms&conditions', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsConditionsRoutingModule { }
