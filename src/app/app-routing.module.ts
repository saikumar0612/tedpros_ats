
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AuthGuard } from './core/guards';

const routes: Routes = [
  { path: 'authorization', loadChildren: './authorization/authorization.module#AuthorizationModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
  // uam
  { path: 'users', loadChildren: './uam/users/users.module#UsersModule', canActivate: [AuthGuard] },
  { path: 'user-roles', loadChildren: './uam/user-roles/user-roles.module#UserRolesModule', canActivate: [AuthGuard] },
  // config
  { path: 'manage-branch', loadChildren: './config/manage-branch/manage-branch.module#ManageBranchModule', canActivate: [AuthGuard] },
  { path: 'companyInfo', loadChildren: './config/company-info/company-info.module#CompanyInfoModule', canActivate: [AuthGuard] },
  { path: 'companyPrefix', loadChildren: './config/company-prefix/company-prefix.module#CompanyPrefixModule', canActivate: [AuthGuard] },
  { path: 'work-week', loadChildren: './config/work-week/work-week.module#WorkWeekModule', canActivate: [AuthGuard] },
  { path: 'holidays', loadChildren: './config/holiday/holiday.module#HolidayModule', canActivate: [AuthGuard] },
  { path: 'theme-settings', loadChildren: './config/theme-settings/theme-settings.module#ThemeSettingsModule', canActivate: [AuthGuard] },
  // employee handbook
  { path: 'organization-kpis', loadChildren: './employee-handbook/organization-kpi/organization-kpi.module#OrganizationKpiModule', canActivate: [AuthGuard] },
  { path: 'terminating-resons', loadChildren: './employee-handbook/terminating-reason/terminating-reason.module#TerminatingReasonModule', canActivate: [AuthGuard] },
  { path: 'terms&conditions', loadChildren: './employee-handbook/terms-conditions/terms-conditions.module#TermsConditionsModule', canActivate: [AuthGuard] },
  { path: 'office-documents', loadChildren: './employee-handbook/office-documents/office-documents.module#OfficeDocumentsModule', canActivate: [AuthGuard] },
  { path: 'orgChart', loadChildren: './employee-handbook/organization-chart/organization-chart.module#OrganizationChartModule', canActivate: [AuthGuard] },
  { path: 'prerequisites', loadChildren: './employee-handbook/prerequisite/prerequisite.module#PrerequisiteModule', canActivate: [AuthGuard] },
  { path: 'question', loadChildren: './employee-handbook/question/question.module#QuestionModule', canActivate: [AuthGuard] },
  

  // start modification done by BASIT022 on 13-08-19
  // offer letter
  { path: 'offer-letter', loadChildren: './employee-handbook/offer-letter/offer-letter.module#OfferLetterModule', canActivate: [AuthGuard] },

  // end modification done by BASIT022 on 13-08-19


  // crm
  { path: 'customers', loadChildren: './crm/client-company/client-company.module#ClientCompanyModule', canActivate: [AuthGuard] },
  { path: 'client-branch', loadChildren: './crm/client-branch/client-branch.module#ClientBranchModule', canActivate: [AuthGuard] },
  { path: 'company-contacts', loadChildren: './crm/client-company-contact/client-company-contact.module#ClientCompanyContactModule', canActivate: [AuthGuard] },
  { path: 'vendors', loadChildren: './crm/vendor-company/vendor-company.module#VendorCompanyModule', canActivate: [AuthGuard] },
  { path: 'vendors-contacts', loadChildren: './crm/vendor-company-contact/vendor-company-contact.module#VendorCompanyContactModule', canActivate: [AuthGuard] },
  // job
  { path: 'job-categories', loadChildren: './job/departments/departments.module#DepartmentsModule', canActivate: [AuthGuard] },
  { path: 'job-titles', loadChildren: './job/job-titles/job-titles.module#JobTitlesModule', canActivate: [AuthGuard] },
  { path: 'pay-grades', loadChildren: './job/pay-grades/pay-grades.module#PayGradesModule', canActivate: [AuthGuard] },
  { path: 'employment-status', loadChildren: './job/employee-status/employee-status.module#EmployeeStatusModule', canActivate: [AuthGuard] },
  { path: 'employee-type', loadChildren: './job/employee-type/employee-type.module#EmployeeTypeModule', canActivate: [AuthGuard] },
  { path: 'work-shifts', loadChildren: './job/work-shifts/work-shifts.module#WorkShiftsModule', canActivate: [AuthGuard] },
  // qualifications
  { path: 'skills', loadChildren: './qualifications/skills/skills.module#SkillsModule', canActivate: [AuthGuard] },
  { path: 'education', loadChildren: './qualifications/education/education.module#EducationModule', canActivate: [AuthGuard] },
  { path: 'licenses', loadChildren: './qualifications/licenses/licenses.module#LicensesModule', canActivate: [AuthGuard] },
  { path: 'languages', loadChildren: './qualifications/languages/languages.module#LanguagesModule', canActivate: [AuthGuard] },
  { path: 'memberships', loadChildren: './qualifications/memberships/memberships.module#MembershipsModule', canActivate: [AuthGuard] },
  // recruitment
  { path: 'candidate', loadChildren: './recruitment/candidate/candidate.module#CandidateModule', canActivate: [AuthGuard] },
  { path: 'jobs', loadChildren: './recruitment/job-posts/job-posts.module#JobPostsModule', canActivate: [AuthGuard] },
  // pim
  { path: 'usersView', loadChildren: './pim/user-management/user-management.module#UserManagementModule', canActivate: [AuthGuard] },
  { path: 'myInfo', loadChildren: './pim/personal-info/personal-info.module#PersonalInfoModule', canActivate: [AuthGuard] },
  // pmo
  { path: 'projects', loadChildren: './pmo/projects/projects.module#ProjectsModule', canActivate: [AuthGuard] },
  { path: 'timesheets', loadChildren: './pmo/timesheets/timesheets.module#TimesheetsModule', canActivate: [AuthGuard] },
  // performance
  { path: 'kpis', loadChildren: './performance/configure/configure.module#ConfigureModule', canActivate: [AuthGuard] },
  { path: 'reviews', loadChildren: './performance/reviews/reviews.module#ReviewsModule', canActivate: [AuthGuard] },
  // leaves
  { path: 'leaves', loadChildren: './leaves/leaves.module#LeavesModule', canActivate: [AuthGuard] },
  // leave configurations
  { path: 'entitlements', loadChildren: './leave-configuration/entitlements/entitlements.module#EntitlementsModule', canActivate: [AuthGuard] },
  { path: 'accrual', loadChildren: './leave-configuration/accrual/accrual.module#AccrualModule', canActivate: [AuthGuard] },
  { path: 'leave-period', loadChildren: './leave-configuration/leave-period/leave-period.module#LeavePeriodModule', canActivate: [AuthGuard] },
  { path: 'leave-type', loadChildren: './leave-configuration/leave-type/leave-type.module#LeaveTypeModule', canActivate: [AuthGuard] },
  { path: 'reports', loadChildren: './leave-configuration/reports/reports.module#ReportsModule', canActivate: [AuthGuard] },
  { path: 'leave-list', loadChildren: './leave-configuration/leave-list/leave-list.module#LeaveListModule', canActivate: [AuthGuard] },
  { path: 'assign-leave', loadChildren: './leave-configuration/assign-leave/assign-leave.module#AssignLeaveModule', canActivate: [AuthGuard] },
  // vms
  { path: 'vms', loadChildren: './vms/candidate-authorization/candidate-authorization.module#CandidateAuthrizationModule' },
  { path: 'profile', loadChildren: './vms/candidate-profile/candidate-profile.module#CandidateProfileModule' },
  { path: 'resume', loadChildren: './vms/candidate-resume/candidate-resume.module#CandidateResumeModule' },
  { path: 'job', loadChildren: './vms/apply-job/apply-job.module#ApplyJobModule' },


  //start modification done by BASIT022 on 08-08-19
  //bulkEmailing  
  { path: 'bulk-email', loadChildren: './bulk-email/bulk-email.module#BulkEmailModule', canActivate: [AuthGuard] },

  //end modification done by BASIT022 on 08-08-19

  { path: '', redirectTo: 'authorization', pathMatch: 'full' },
  { path: '**', redirectTo: 'authorization' },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
