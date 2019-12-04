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
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { CustomersComponent } from './customer/customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

import { ClientCompanyRoutingModule } from './client-company-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DirectivesmoduleModule } from '../../core/directivesmodule/directivesmodule.module'
import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    ClientCompanyRoutingModule,
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
    DirectivesmoduleModule
  ],
  declarations: [
    AddCustomersComponent,
    CustomersComponent,
    EditCustomerComponent,
    ViewCustomerComponent
  ]
})
export class ClientCompanyModule { }
