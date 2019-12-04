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
import { AddVendorContactComponent } from './add-vendor-contact/add-vendor-contact.component';
import { EditVendorContactComponent } from './edit-vendor-contact/edit-vendor-contact.component';
import { VendorContactsComponent } from './vendor-contacts/vendor-contacts.component';
import { ViewVendorContactComponent } from './view-vendor-contact/view-vendor-contact.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DirectivesmoduleModule } from '../../core/directivesmodule/directivesmodule.module';

import { VendorCompanyContactRoutingModule } from './vendor-company-contact-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VendorCompanyContactRoutingModule,
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
    AddVendorContactComponent,
    EditVendorContactComponent,
    VendorContactsComponent,
    ViewVendorContactComponent
  ]
})
export class VendorCompanyContactModule { }
