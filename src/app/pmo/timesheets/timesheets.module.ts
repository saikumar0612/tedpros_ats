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
import { EditEmpTimesheetComponent } from './edit-emp-timesheet/edit-emp-timesheet.component';
import { EmployeeTimesheetsComponent } from './employee-timesheets/employee-timesheets.component';
import { CreateMyTimesheetComponent } from './my-timesheets/create-my-timesheet/create-my-timesheet.component';
import { EditMyTimesheetsComponent } from './my-timesheets/edit-my-timesheets/edit-my-timesheets.component';
import { MyTimesheetsComponent } from './my-timesheets/my-timesheets/my-timesheets.component';
import { ViewMyWeekTimesheetComponent } from './my-timesheets/view-my-week-timesheet/view-my-week-timesheet.component';
import { ViewMytimesheetComponent } from './my-timesheets/view-mytimesheet/view-mytimesheet.component';
import { ProjectSheetComponent } from './project-sheet/project-sheet.component';
import { ProjectTimesheetComponent } from './project-timesheet/project-timesheet.component';
import { ViewEmpTimesheetsComponent } from './view-emp-timesheets/view-emp-timesheets.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { TimesheetsRoutingModule } from './timesheets-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeReportComponent } from './my-timesheets/employee-report/employee-report.component';
 
@NgModule({
  imports: [
    CommonModule,
    TimesheetsRoutingModule,
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
    OwlDateTimeModule, OwlNativeDateTimeModule
  ],
  declarations: [
    ViewEmpTimesheetsComponent,
    ProjectTimesheetComponent,
    EditEmpTimesheetComponent,
    EmployeeTimesheetsComponent,
    CreateMyTimesheetComponent,
    EditMyTimesheetsComponent,
    MyTimesheetsComponent,
    ViewMyWeekTimesheetComponent,
    ViewMytimesheetComponent,
    ProjectSheetComponent,
    EmployeeReportComponent
  ]
})
export class TimesheetsModule { }
