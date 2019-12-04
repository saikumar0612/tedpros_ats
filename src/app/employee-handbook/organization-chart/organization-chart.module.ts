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
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpModule } from '@angular/http';

import { OrganizationChartRoutingModule } from './organization-chart-routing.module';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [OrgChartComponent],
  imports: [
    CommonModule,
    OrganizationChartRoutingModule,
    SharedModule,
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
    CKEditorModule
  ]
})
export class OrganizationChartModule { }
