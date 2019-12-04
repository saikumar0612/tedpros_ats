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
import { SharedModule } from '../../shared/shared.module';

import { PrerequisiteRoutingModule } from './prerequisite-routing.module';
import { PrerequisitesComponent } from './prerequisites/prerequisites.component';
import { AddPrerequisiteDocComponent } from './add-prerequisite-doc/add-prerequisite-doc.component';
import { EditPrerequisiteDocComponent } from './edit-prerequisite-doc/edit-prerequisite-doc.component';
import { ViewPrerequisiteDocComponent } from './view-prerequisite-doc/view-prerequisite-doc.component';


@NgModule({
  declarations: [PrerequisitesComponent, AddPrerequisiteDocComponent, EditPrerequisiteDocComponent, ViewPrerequisiteDocComponent],
  imports: [
    CommonModule,
    PrerequisiteRoutingModule, 
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
    SharedModule
  ]
})
export class PrerequisiteModule { }
