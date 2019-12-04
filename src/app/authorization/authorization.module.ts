import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateComponent } from "./activate/activate.component";
import { ActiveUserComponent } from "./active-user/active-user.component";
import { ActivationComponent } from "./activation/activation.component";
import { LoginComponent } from "./login/login.component";
import { ForgetComponent } from "./forget/forget.component";
import { RestpassComponent } from "./restpass/restpass.component";
import { LogoutComponent } from "./logout/logout.component";
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
import { UpgradeComponent } from './upgrade/upgrade.component';
import { UpgradationComponent } from './upgradation/upgradation.component';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { VerifyTokenComponent } from './verify-token/verify-token.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
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
    CKEditorModule
  ],
  declarations: [
    ActivateComponent,
    ActiveUserComponent,
    ActivationComponent,
    LoginComponent,
    ForgetComponent,
    RestpassComponent,
    LogoutComponent,
    UpgradeComponent,
    UpgradationComponent,
    VerifyTokenComponent
  ]
})
export class AuthorizationModule { }
