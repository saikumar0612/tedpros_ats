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
import { AddJobsComponent } from './add-job/add-jobs.component';
import { EditJobsComponent } from './edit-job/edit-jobs.component';
import { JobsComponent } from './jobs/jobs.component';
import { ViewJobComponent } from './view-job/view-job.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DirectivesmoduleModule } from '../../core/directivesmodule/directivesmodule.module'
import { JobPostsRoutingModule } from './job-posts-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SignaturePadModule } from '@ng-plus/signature-pad';


@NgModule({
  imports: [
    CommonModule,
    JobPostsRoutingModule,
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
    DirectivesmoduleModule,
    FlatpickrModule.forRoot(),
    SignaturePadModule
  ],
  declarations: [
    AddJobsComponent,
    EditJobsComponent,
    JobsComponent,
    ViewJobComponent
  ]
})
export class JobPostsModule { }
