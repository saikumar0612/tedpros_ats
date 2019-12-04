import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { CompanieslistComponent } from './companieslist.component';
import { RouterStub } from 'src/app/mocks/RouterStub';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { UserService, AuthenticationService } from 'src/app/core/services';
import { ExcelService } from 'src/app/core/services/excell-export.service';
import { ExcelServiceStub } from 'src/app/mocks/ExcelServiceStub';
import { EventEmittorStub } from 'src/app/mocks/EventEmittorStub';
import { EventEmitterService } from 'src/app/core/services/event-emitter.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DataTableModule } from 'angular-6-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChartsModule } from 'ng2-charts';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { RouterTestingModule } from '@angular/router/testing';

describe('CompanieslistComponent', () => {
  let component: CompanieslistComponent;
  let fixture: ComponentFixture<CompanieslistComponent>;
  const userServiceStub = new UserServiceStub();
  const excelService = new ExcelServiceStub();
  const eventEmittorStub = new EventEmittorStub();
  let location: LocationStub;
  let router: Router;
  let routes = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanieslistComponent ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: ExcelService, useValue: excelService },
        { provide: EventEmitterService, useValue: eventEmittorStub }
      ],
      imports: [
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
        OwlDateTimeModule, OwlNativeDateTimeModule,
        ImageCropperModule,
        ChartsModule,
        CKEditorModule,
        SharedModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanieslistComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    //start code coverage modification done by IT022 01-08-19
    localStorage.setItem('currentUser', JSON.stringify({
      'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IlNNVTEwMDQiLCJ1c2VybmFtZSI6IlNNVTEwMDQiLCJpYXQiOjE1NjI5OTgyNjQsImV4cCI6MTU2MzAxNjI2NH0.cc_Q193HCzMtMnJeshODAVWvQ-X6AceMtDp0t6SsAeU',
      'email': 'pavankumargarimella91@gmail.com',
      'id': 'SMU1004',
      'flag': null,
      'empType': {
        'id': '14',
        'employeeType': 'Recruiter'
      },
      'userType': {
        'id': '3',
        'name': 'employee',
        'typeName': 'Employee'
      },
      'first_name': 'Mike',
      'last_name': 'Jones',
      'middle_name': '',
      'permission': {
        'createWorkShifts': true,
        'createAssignLeave': false,
        'createCandidates': true,
        'createCompanyInfo': true,
        'createCustomers': false,
        'createEducation': true,
        'createEmployeestatus': true,
        'createHolidays': true,
        'createJobCategorie': true,
        'createJobTitle': true,
        'createLanguages': true,
        'createLicenses': true,
        'createMemberships': true,
        'createPayGrade': true,
        'createProjects': true,
        'createSkills': true,
        'createTerminationReasons': true,
        'createTimesheets': true,
        'createUser': false,
        'createRole': true,
        'updateWorkShifts': true,
        'updateCandidates': true,
        'updateCustomers': false,
        'updateEducation': true,
        'updateEmployeestatus': true,
        'updateHolidays': true,
        'updateJobCategorie': true,
        'updateJobTitle': true,
        'updateLanguages': true,
        'updateLicenses': true,
        'updateMemberships': true,
        'createActivity': false,
        'updateActivity': false,
        'updatePayGrade': true,
        'updateProjects': true,
        'updateSkills': true,
        'activities': false,
        'getActivity': false,
        'updateTerminationReasons': true,
        'updateTimesheets': true,
        'updateUser': false,
        'updateRole': true,
        'readWorkShifts': true,
        'readAssignLeave': false,
        'readCandidates': true,
        'readCustomers': false,
        'readEducation': true,
        'readEmployeestatus': true,
        'readEmployeeTimesheets': true,
        'readHolidays': true,
        'readJobTitle': true,
        'readLanguages': true,
        'readLicenses': true,
        'readMemberships': true,
        'readPayGrade': true,
        'readProjects': true,
        'readSkills': true,
        'readTerminationReasons': true,
        'readUser': true,
        'readConfiguration': true,
        'createPermission': false,
        'readPermission': false,
        'updatePermission': false,
        'updatePrefix': false,
        'createBranch': true,
        'updateBranch': true,
        'readSettings': true,
        'createJob': true,
        'updateJob': true,
        'readJob': true,
        'readRole': true,
        'updateClientCompany': false,
        'createClientCompany': false,
        'readClientCompany': false,
        'readVendorCompany': true,
        'readClientContacts': true,
        'updateClientContacts': true,
        'createClientContacts': true,
        'readVendorContacts': true,
        'readTimesheets': true,
        'viewTimesheet': true,
        'readJobDetails': true,
        'updateJobDetails': true,
        'readSalaryComponent': true,
        'createSalaryComponent': true,
        'updateSalaryComponent': true,
        'readKpi': true,
        'createKpi': true,
        'updateKpi': true,
        'readTracker': true,
        'createTracker': true,
        'updateTracker': false,
        'readReview': true,
        'createReview': true,
        'updateReview': true,
        'createEmployeeType': true,
        'createLeave': true,
        'updateLeave': true,
        'readLeave': true,
        'readOrganizationalKpi': true,
        'updateOrganizationalKpi': false,
        'readTermsConditions': true,
        'updateTermsConditions': true,
        'createTermsConditions': true,
        'createUserApplyLeave': true,
        'updateUserApplyLeave': true,
        'addEntitlements': true,
        'readEntitlements': true,
        'updateEmployeeType': true,
        'readEmployeeType': true,
        'updateVendorCompany': true,
        'createVendorCompany': true,
        'createVendorContacts': true,
        'updateVendorContacts': true,
        'readJobCategorie': true,
        'readEmployeeReviews': true,
        'readSupervisorReviews': true,
        'createOrganizationalKpi': true
      },
      'submenuPermission': {
        'clientCompany': true,
        'vendorCompany': true,
        'clientCompanyContact': true,
        'vendorCompanyContact': true,
        'jobPosting': true,
        'candidates': true,
        'projects': true,
        'assignProjects': true,
        'myTimesheets': true,
        'employeeTimesheet': true,
        'kPIs': true,
        'manageReviews': true,
        'myReviews': true,
        'employeeReviews': true,
        'leavePeriod': true,
        'leaveType': true,
        'entitlements': true,
        'reports': true,
        'leaveList': true,
        'assignLeave': true,
        'applyLeave': true,
        'myEntitlements': true
      },
      'fieldPermission': {
        'readdob': false,
        'updatedob': false,
        'createdob': false,
        'readssn': false,
        'createssn': false,
        'updatessn': false,
        'readInternalNotes': false,
        'createInternalNotes': false,
        'updateInternalNotes': false,
        'readJobInternalNotes': false,
        'createJobInternalNotes': false,
        'updateJobInternalNotes': false
      }
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    expect(component.loading).toBe(false);
    tick();
    expect(component.filterData).toEqual(component.customers);
    expect(component.availableRecords).toEqual(component.filterData.length);
  }));

  it('#search', fakeAsync(() => {
    component.customers = [];
    let term = null;
    let key = null;
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.customers.length);

    term = 'testTerm';
    key = 'companyName';
    component.customers = [{companyName:'testTerm'}];
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.customers.length);

    term = 'testTerm';
    key = 'owner.name';
    component.customers = [{owner:{name:'testTerm'}}];
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.customers.length);

    term = 'testTerm';
    key = 'billingContact';
    component.customers = [{billingContact:'testTerm'}];
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.customers.length);

    term = 'testTerm';
    key = 'phoneNumber';
    component.customers = [{phoneNumber:'testTerm'}];
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.customers.length);

    term = 'testTerm';
    key = 'cityName';
    component.customers = [{cityName:'testTerm'}];
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.customers.length);

  }));

});
