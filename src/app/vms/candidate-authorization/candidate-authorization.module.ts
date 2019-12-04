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
import { CandidateforgetComponent } from './candidateforget/candidateforget.component';
import { CandidateresetpassComponent } from './candidateresetpass/candidateresetpass.component';

import { CandidateAuthrizationRoutingModule } from './candidate-authorization-routing.module';
import { CandidateActivateComponent } from './candidate-activate/candidate-activate.component';
import { CandidateLoginRegisterComponent } from './candidate-login-register/candidate-login-register.component';
import { CareersComponent } from './careers/careers.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { SafehtmlModule } from '../../core/directivesmodule/safehtml.module';

@NgModule({
    imports: [
      CommonModule,
      CandidateAuthrizationRoutingModule,
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
      SafehtmlModule
    ],
    declarations: [
     CandidateforgetComponent,
     CandidateresetpassComponent,
     CandidateActivateComponent,
     CandidateLoginRegisterComponent,
     CareersComponent,
     JobdetailComponent
    ],
    exports:[
      SafehtmlModule
    ]
})
export class CandidateAuthrizationModule { }
