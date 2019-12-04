import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferletterComponent } from './offerletter/offerletter.component';
import { AddOfferLetterTemplateComponent } from './add-offer-letter-template/add-offer-letter-template.component';
import { ViewOfferLetterTemplateComponent } from './view-offer-letter-template/view-offer-letter-template.component';
import { AddOfferletterTypeComponent } from './add-offerletter-type/add-offerletter-type.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'offer-letter', component:OfferletterComponent  },
      { path: 'add-offer-letter-template/:id', component: AddOfferLetterTemplateComponent },
      { path: 'view-offer-letter-template/:id', component: ViewOfferLetterTemplateComponent },
      { path: 'add-offer-letter-type', component: AddOfferletterTypeComponent },
      { path: '', redirectTo: 'offer-letter', pathMatch: 'full' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferLetterRoutingModule { }
