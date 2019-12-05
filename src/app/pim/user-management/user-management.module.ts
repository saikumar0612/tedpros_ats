import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DataTableModule } from 'angular-6-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChartsModule } from 'ng2-charts';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpModule } from '@angular/http';
import { ProgressBarModule } from "angular-progress-bar";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { UserJobDetailsComponent } from './user-job-details/user-job-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UserSalaryDetailsComponent } from './user-salary-details/user-salary-details.component';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserReportsComponent } from './user-reports/user-reports.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';
import { ViewOfferLetterComponent } from './view-offer-letter/view-offer-letter.component';
import { AddOfferletterComponent } from './add-offerletter/add-offerletter.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { UserOfferletterComponent } from './user-offerletter/user-offerletter.component';
import { OfferLettersListComponent } from './offer-letters-list/offer-letters-list.component';

@NgModule({
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    HttpModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    DataTableModule,
    NgMultiSelectDropDownModule.forRoot(),
    ArchwizardModule,
    CustomFormsModule,
    DateRangePickerModule,
    ImageCropperModule,
    ChartsModule,
    CKEditorModule,
    SharedModule,
    ProgressBarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SignaturePadModule
  ],
  declarations: [
    UserJobDetailsComponent,
    UserListComponent,
    ViewProfileComponent,
    UserSalaryDetailsComponent,
    UserReportsComponent,
    OfferLetterComponent,
    ViewOfferLetterComponent,
    AddOfferletterComponent,
    UserOfferletterComponent,
    OfferLettersListComponent
  ]
})
export class UserManagementModule { }
