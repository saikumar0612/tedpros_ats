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
import { HttpModule } from '@angular/http';

import { ApplyJobRoutingModule } from './apply-job-routing.module';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { JobDetailsComponent } from './job-details/job-details.component';

import { TopMenuModule } from '../top-menu/top-menu.module';
import { WishListComponent } from './wish-list/wish-list.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ShortlistJobsComponent } from './shortlist-jobs/shortlist-jobs.component';
import { SafehtmlModule } from '../../core/directivesmodule/safehtml.module';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { RepresentFormComponent } from './represent-form/represent-form.component';
import { CandidateConsentDocumentComponent } from './candidate-consent-document/candidate-consent-document.component';


@NgModule({
  declarations: [ApplyJobComponent, JobDetailsComponent, WishListComponent, AppliedJobsComponent, ShortlistJobsComponent, RepresentFormComponent, CandidateConsentDocumentComponent],
  imports: [
    CommonModule,
    ApplyJobRoutingModule,
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
    TopMenuModule,
    SafehtmlModule,
    SignaturePadModule
  ],
  exports: [
    SafehtmlModule
  ]
})
export class ApplyJobModule { }
