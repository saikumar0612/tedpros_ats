import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferLetterRoutingModule } from './offer-letter-routing.module';

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
import { OfferletterComponent } from './offerletter/offerletter.component';
import { AddOfferLetterTemplateComponent } from './add-offer-letter-template/add-offer-letter-template.component';
import { ViewOfferLetterTemplateComponent } from './view-offer-letter-template/view-offer-letter-template.component';
import { AddOfferletterTypeComponent } from './add-offerletter-type/add-offerletter-type.component';

@NgModule({
  declarations: [OfferletterComponent, AddOfferLetterTemplateComponent, ViewOfferLetterTemplateComponent, AddOfferletterTypeComponent],
  imports: [
    
    OfferLetterRoutingModule,
    CommonModule,    
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
export class OfferLetterModule { }
