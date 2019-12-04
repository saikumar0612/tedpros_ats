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
import { AddBranchComponent } from './add-branch/add-branch.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';
import { ViewBranchComponent } from './view-branch/view-branch.component';
import { BranchesComponent } from './branches/branches.component';

import { ClientBranchRoutingModule } from './client-branch-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DirectivesmoduleModule } from '../../core/directivesmodule/directivesmodule.module';
import { from } from 'rxjs';



@NgModule({
  imports: [
    CommonModule,
    ClientBranchRoutingModule,
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
  declarations: [AddBranchComponent, EditBranchComponent, ViewBranchComponent, BranchesComponent]
})
export class ClientBranchModule { }
