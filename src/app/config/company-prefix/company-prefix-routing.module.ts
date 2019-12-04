import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyPrefixComponent } from "./company-prefix/company-prefix.component";
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'companyPrefix', component: CompanyPrefixComponent },
      { path: '', redirectTo: 'companyPrefix', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyPrefixRoutingModule { }
