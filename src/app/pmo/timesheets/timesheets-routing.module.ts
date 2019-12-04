import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { LayoutComponent } from '../../shared/layout/layout.component';

// Added BY BASIT003 to display employee wise project reports
import { EmployeeReportComponent } from './my-timesheets/employee-report/employee-report.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'emp-timesheets', component: EmployeeTimesheetsComponent },
      { path: 'project-sheets', component: ProjectSheetComponent },
      { path: 'project-timesheets/:id', component: ProjectTimesheetComponent },
      { path: 'view-emp-timesheets/:id', component: ViewEmpTimesheetsComponent },
      { path: 'edit-emp-timesheets', component: EditEmpTimesheetComponent },
      { path: 'my-timesheets', component: MyTimesheetsComponent },
      { path: 'edit-my-timesheets/:id', component: EditMyTimesheetsComponent },
      { path: 'create-my-timesheet', component: CreateMyTimesheetComponent },
      { path: 'view-timesheet', component: ViewMytimesheetComponent },
      { path: 'view-week-timesheet', component: ViewMyWeekTimesheetComponent },
      // Added BY BASIT003 to display employee wise project reports
      { path: 'employee-report', component: EmployeeReportComponent },
      { path: '', redirectTo: 'emp-timesheets', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetsRoutingModule { }
