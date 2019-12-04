import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { Location } from '@angular/common';
import { UserService } from 'src/app/core/services';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { DataTableModule } from 'angular-6-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { map } from 'rxjs/operators';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const activatedRouteStub = new ActivatedRouteStub();

  const projectList = [{
    "projectId": "PRJ0006",
    "customerId": "SMC7029",
    "projectName": "sandly",
    "projectDesc": "test",
    "isApproved": "1",
    "startDate": "2019-07-25T06:30:00.000Z",
    "endDate": "2019-07-26T06:30:00.000Z"
  },
  {
    "projectId": "PRJ0005",
    "customerId": "SMC7027",
    "projectName": "abby group",
    "projectDesc": "tesgt",
    "isApproved": "1",
    "startDate": "2019-07-25T06:30:00.000Z",
    "endDate": "2019-07-25T06:30:00.000Z"
  },
  {
    "projectId": "PRJ0004",
    "customerId": "SMC7030",
    "projectName": "abbys catering",
    "projectDesc": "test",
    "isApproved": "1",
    "startDate": "2019-07-25T06:30:00.000Z",
    "endDate": "2019-07-26T06:30:00.000Z"
  },
  {
    "projectId": "PRJ0003",
    "customerId": "SMC5013",
    "projectName": "Code Talkers",
    "projectDesc": " ",
    "isApproved": "1",
    "startDate": "2019-06-27T06:30:00.000Z",
    "endDate": "2019-06-29T06:30:00.000Z"
  },
  {
    "projectId": "PRJ0002",
    "customerId": "SMC5006",
    "projectName": "Project Hanksong",
    "projectDesc": "Business is the activity of making one's living or making money by producing or buying and selling products such as goods and services need quotation to verify Simply put, it is \"any activity or enterprise entered into for profit. It does not mean it is a ",
    "isApproved": "1",
    "startDate": "2019-06-20T06:30:00.000Z",
    "endDate": "2019-06-21T06:30:00.000Z"
  },
  {
    "projectId": "PRJ0001",
    "customerId": "SMC5003",
    "projectName": "Project Blue Book",
    "projectDesc": "If you don’t already know, then you probably don’t have the clearance. But for the sake of disclosure… Project Blue Book was the code name for the US Air Force investigations into UFO sightings. But you didn’t hear that from us.",
    "isApproved": "1",
    "startDate": "2019-06-19T06:30:00.000Z",
    "endDate": "2019-06-23T06:30:00.000Z"
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        DatePipe
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        FileUploadModule,
        DataTableModule,
        NgMultiSelectDropDownModule.forRoot(),
        ArchwizardModule,
        CustomFormsModule,
        OwlDateTimeModule, OwlNativeDateTimeModule,
        ImageCropperModule,
        ChartsModule,
        SharedModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    /*
        * Author: G S Pavan Kumar
        * Purpose: Code coverage
        * Created: 01th August 2019
        * Comment: Start of Added local storage and commented fixture.detectChanges
    */
    // fixture.detectChanges();
    localStorage.setItem('currentUser', JSON.stringify({
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTY0NjM0NTUxLCJleHAiOjE1NjQ2NTI1NTF9.gNsDldeY4OeFA91fBmE0n4CXOSEeJ_GbjS5fgr6twB4',
      email: 'pavan.basolutions@gmail.com',
      id: '1',
      flag: null,
      empType: {
        id: '5',
        employeeType: 'Employee'
      },
      userType: {
        id: '3',
        name: 'employee',
        typeName: 'Employee'
      },
      first_name: 'Davidsvids',
      last_name: 'jackson',
      middle_name: 'james',
      isAdmin: true,
      Adminrole: true,
      permission: {
        createWorkShifts: true,
        createAssignLeave: false,
        createCandidates: true,
        createCompanyInfo: true,
        createCustomers: false,
        createEducation: true,
        createEmployeestatus: true,
        createHolidays: true,
        createJobCategorie: true,
        createJobTitle: true,
        createLanguages: true,
        createLicenses: true,
        createMemberships: true,
        createPayGrade: true,
        createProjects: true,
        createSkills: true,
        createTerminationReasons: true,
        createTimesheets: true,
        createUser: true,
        createRole: true,
        updateWorkShifts: true,
        updateCandidates: true,
        updateCustomers: false,
        updateEducation: true,
        updateEmployeestatus: true,
        updateHolidays: true,
        updateJobCategorie: true,
        updateJobTitle: true,
        updateLanguages: true,
        updateLicenses: true,
        updateMemberships: true,
        createActivity: false,
        updateActivity: false,
        updatePayGrade: true,
        updateProjects: true,
        updateSkills: true,
        activities: false,
        getActivity: false,
        updateTerminationReasons: true,
        updateTimesheets: true,
        updateUser: true,
        updateRole: true,
        readWorkShifts: true,
        readAssignLeave: false,
        readCandidates: true,
        readCustomers: false,
        readEducation: true,
        readEmployeestatus: true,
        readEmployeeTimesheets: true,
        readHolidays: true,
        readJobTitle: true,
        readLanguages: true,
        readLicenses: true,
        readMemberships: true,
        readPayGrade: true,
        readProjects: true,
        readSkills: true,
        readTerminationReasons: true,
        readUser: true,
        readConfiguration: true,
        createPermission: false,
        readPermission: false,
        updatePermission: true,
        updatePrefix: true,
        createBranch: true,
        updateBranch: true,
        readSettings: true,
        createJob: true,
        updateJob: true,
        readJob: true,
        readRole: true,
        updateClientCompany: true,
        createClientCompany: true,
        readClientCompany: true,
        readVendorCompany: true,
        readClientContacts: true,
        updateClientContacts: true,
        createClientContacts: true,
        readVendorContacts: true,
        readTimesheets: true,
        viewTimesheet: true,
        readJobDetails: true,
        updateJobDetails: true,
        readSalaryComponent: true,
        createSalaryComponent: true,
        updateSalaryComponent: true,
        readKpi: true,
        createKpi: true,
        updateKpi: true,
        readTracker: true,
        createTracker: true,
        updateTracker: true,
        readReview: true,
        createReview: true,
        updateReview: true,
        createEmployeeType: true,
        createLeave: true,
        updateLeave: true,
        readLeave: true,
        readOrganizationalKpi: true,
        updateOrganizationalKpi: true,
        readTermsConditions: true,
        updateTermsConditions: true,
        createTermsConditions: true,
        createUserApplyLeave: true,
        updateUserApplyLeave: true,
        addEntitlements: true,
        readEntitlements: true,
        updateEmployeeType: true,
        readEmployeeType: true,
        updateVendorCompany: true,
        createVendorCompany: true,
        createVendorContacts: true,
        updateVendorContacts: true,
        readJobCategorie: true,
        readEmployeeReviews: true,
        readSupervisorReviews: true,
        createOrganizationalKpi: false,
        readUserReports: true
      },
      submenuPermission: {
        clientCompany: true,
        vendorCompany: true,
        clientCompanyContact: true,
        vendorCompanyContact: true,
        jobPosting: true,
        candidates: true,
        projects: true,
        assignProjects: true,
        myTimesheets: true,
        employeeTimesheet: true,
        kPIs: true,
        manageReviews: true,
        myReviews: true,
        employeeReviews: true,
        leavePeriod: true,
        leaveType: true,
        entitlements: true,
        reports: true,
        leaveList: true,
        assignLeave: true,
        applyLeave: true,
        myEntitlements: true
      },
      fieldPermission: {
        readdob: true,
        updatedob: true,
        createdob: true,
        readssn: true,
        createssn: true,
        updatessn: true,
        readInternalNotes: true,
        createInternalNotes: true,
        updateInternalNotes: true,
        readJobInternalNotes: true,
        createJobInternalNotes: true,
        updateJobInternalNotes: true
      }
    }));

    /*
        * Author: G S Pavan Kumar
        * Purpose: Code coverage
        * Created: 01th August 2019
        * Comment: End of Added local storage and commented fixture.detectChanges
    */
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
      * Author: G S Pavan Kumar
      * Created: 03rd August 2019
      * Comment: Start of code coverage
  */

  it('#search', fakeAsync(() => {
    component.projectLists = projectList;
    let term = null;
    let key = null;
    component.search(term, key);
    tick();
    expect(component.filterData).toEqual(component.projectLists);
    term = 'testTerm';
    key = 'projectId';
    component.search(term, key);
    tick();
    expect(component.filterData).toEqual([]);
    key = 'projectName';
    component.search(term, key);
    tick();
    expect(component.filterData).toEqual([]);
    key = 'startDate';
    component.search(term, key);
    tick();
    expect(component.filterData).toEqual([]);
    key = 'endDate';
    component.search(term, key);
    tick();
    expect(component.filterData).toEqual([]);

  }));

  // ngOnInit
  it('#ngOnInit', fakeAsync(() => {
    let i = 0;
    while (i < projectList.length) {
      projectList[i].startDate = new DatePipe('en-US').transform(projectList[i].startDate, 'MM/dd/yyyy');
      projectList[i].endDate = new DatePipe('en-US').transform(projectList[i].endDate, 'MM/dd/yyyy');
      i++;
    }
    component.ngOnInit();
    tick();
    expect(component.projectLists).toEqual(projectList);
  }));

  /*
      * Author: G S Pavan Kumar
      * Created: 03rd August 2019
      * Comment: end of code coverage
  */
});
