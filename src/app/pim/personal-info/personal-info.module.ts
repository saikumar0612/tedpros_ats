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
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { DependentsInfoComponent } from './dependents-info/dependents-info.component';
import { DocumentsInfoComponent } from './documents-info/documents-info.component';
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
import { DirectivesmoduleModule } from '../../core/directivesmodule/directivesmodule.module'
import { PersonalInfoRoutingModule } from './personal-info-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { OfferletterInfoComponent } from './offerletter-info/offerletter-info.component';

@NgModule({
  imports: [
    CommonModule,
    PersonalInfoRoutingModule,
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DirectivesmoduleModule
  ],
  declarations: [
    MyInfoComponent,
    PersonalInfoComponent,
    ContactInfoComponent,
    ProfessionalInfoComponent,
    DependentsInfoComponent,
    MyresumeComponent,
    ViewMyresumeComponent,
    DocumentsInfoComponent,
    QualificationsComponent,
    ViewMyresume1Component,
    ViewMyresume2Component,
    NotificationsComponent,
    PersonalSettingsComponent,
    PersonalInfoComponent,
    ViewPersonalInfoComponent,
    OfferletterInfoComponent
  ]
})
export class PersonalInfoModule { }
