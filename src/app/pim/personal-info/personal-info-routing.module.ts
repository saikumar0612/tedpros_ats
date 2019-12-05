import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { ContactInfoComponent } from "./contact-info/contact-info.component";
import { DependentsInfoComponent } from './dependents-info/dependents-info.component';
import { DocumentsInfoComponent } from "./documents-info/documents-info.component";
import { MyInfoComponent } from './my-info/my-info.component';
import { MyresumeComponent } from './myResume/myresume/myresume.component';
import { ViewMyresumeComponent } from './myResume/view-myresume/view-myresume.component';
import { ViewMyresume1Component } from './myResume/view-myresume1/view-myresume1.component';
import { ViewMyresume2Component } from './myResume/view-myresume2/view-myresume2.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalSettingsComponent } from './personal-settings/personal-settings.component';
import { ProfessionalInfoComponent } from './professional-info/professional-info.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { ViewPersonalInfoComponent } from './view-personal-info/view-personal-info.component';
import { OfferletterInfoComponent } from './offerletter-info/offerletter-info.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'view-personalInfo', component: ViewPersonalInfoComponent },
      { path: 'myInfo', component: MyInfoComponent },
      { path: 'personalInfo', component: PersonalInfoComponent },
      { path: 'contactInfo', component: ContactInfoComponent },
      { path: 'salaryInfo', component: ProfessionalInfoComponent },
      { path: 'dependentInfo', component: DependentsInfoComponent },
      { path: 'documentInfo', component: DocumentsInfoComponent },
      { path: 'qualifications', component: QualificationsComponent },
      { path: 'personalSettings', component: PersonalSettingsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'my-resume', component: MyresumeComponent },
      { path: 'view-myresume', component: ViewMyresumeComponent },
      { path: 'view-myresume-1', component: ViewMyresume1Component },
      { path: 'view-myresume-2', component: ViewMyresume2Component },
      { path: 'offerletterInfo', component: OfferletterInfoComponent },
      { path: '', redirectTo: 'myInfo', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalInfoRoutingModule { }
