import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { CompanyInfoComponent } from "./company-info/company-info.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'companyInfo', component: CompanyInfoComponent },
      { path: '', redirectTo: 'companyInfo', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyInfoRoutingModule { }
