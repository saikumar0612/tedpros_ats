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
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { EditCandidateComponent } from './edit-candidate/edit-candidate.component';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';
import { ResumeComponent } from './resume/resume.component';
import { Resume1Component } from './resume1/resume1.component';
import { Resume2Component } from './resume2/resume2.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CandidateRoutingModule } from './candidate-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UploadCandidatedocumentsComponent } from './upload-candidatedocuments/upload-candidatedocuments.component';

@NgModule({
  imports: [
    CommonModule,
    CandidateRoutingModule,
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
    //adding in date picker module --suresh-- on 08-07-2019 start 
    OwlDateTimeModule,
    OwlNativeDateTimeModule
    // adding in date picker --suresh-- on 08-07-2019 end 
  ],
  declarations: [
    AddCandidateComponent,
    CandidateListComponent,
    EditCandidateComponent,
    ViewCandidateComponent,
    ResumeComponent,
    Resume1Component,
    Resume2Component,
    UploadCandidatedocumentsComponent
  ]
})
export class CandidateModule { }
