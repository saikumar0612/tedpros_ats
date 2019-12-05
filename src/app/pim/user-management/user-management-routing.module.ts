import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserJobDetailsComponent } from './user-job-details/user-job-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UserSalaryDetailsComponent } from './user-salary-details/user-salary-details.component';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { UserReportsComponent } from './user-reports/user-reports.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';
import { ViewOfferLetterComponent } from './view-offer-letter/view-offer-letter.component';
import { AddOfferletterComponent } from './add-offerletter/add-offerletter.component';
import { UserOfferletterComponent } from './user-offerletter/user-offerletter.component';
import { OfferLettersListComponent } from './offer-letters-list/offer-letters-list.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'usersView', component: UserListComponent },
      { path: 'userJobDetails/:id', component: UserJobDetailsComponent },
      { path: 'view-user-profile/:id', component: ViewProfileComponent },
      { path: 'userSalarydetails/:id', component: UserSalaryDetailsComponent },
      { path: 'user-offerLetters/:id', component: OfferLettersListComponent },
      { path: 'edit-offerLetter/:id/:typeId', component: OfferLetterComponent },
      { path: 'view-offerLetter/:id/:typeId', component: ViewOfferLetterComponent },
      { path: 'add-offerLetter/:id/:typeId', component: AddOfferletterComponent },
      { path: 'user-offerletter', component: UserOfferletterComponent },
      { path: 'userReports', component: UserReportsComponent},
      { path: '', redirectTo: 'usersView', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
