import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
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

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const activatedRouteStub = new ActivatedRouteStub();

  const userData = [
    {
      "id": "1",
      "username": "admin",
      "reporting_to": 0,
      "first_name": "David",
      "last_name": "Smith",
      "middle_name": null,
      "email": "pavan.basolutions@gmail.com",
      "status": "0",
      "roles": [
        {
          "id": "1",
          "roleName": "Admin"
        }
      ],
      "employeeType": {
        "id": "5",
        "employeeType": "Employee"
      },
      "userType": {
        "id": "3",
        "name": "employee",
        "typeName": "Employee"
      },
      "jobTitle": {
        "id": "1",
        "job_title": "unit testing"
      }
    },
    {
      "id": "SMU1002",
      "username": "SMU1002",
      "reporting_to": {
        "id": "SMU1002",
        "fname": "James",
        "lname": "Smith"
      },
      "first_name": "James",
      "last_name": "Smith",
      "middle_name": "T",
      "email": "tester.basolutions@gmail.com",
      "status": "1",
      "roles": [
        {
          "id": "2",
          "roleName": "Recruiter"
        },
        {
          "id": "3",
          "roleName": "Employee"
        }
      ],
      "employeeType": {
        "id": "14",
        "employeeType": "Recruiter"
      },
      "userType": {
        "id": "3",
        "name": "employee",
        "typeName": "Employee"
      },
      "jobTitle": null
    }];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
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
    fixture = TestBed.createComponent(UsersListComponent);
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

  it('#ngOnInit', fakeAsync(() => {
    component.users = userData;
    component.ngOnInit();
    tick();
    expect(component.loading).toBe(false);
    expect(component.availableRecords).toEqual(component.users.length);
  }));

  it('#showUserDetails', fakeAsync(() => {
    component.users = userData;
    component.showUserDetails('SMU1002');
    tick();
    expect(component.singleUser.status).toEqual('1');
    expect(component.isShowPopup).toBe(true);
    expect(component.isShowUser).toBe(true);

    component.showUserDetails('1');
    tick();
    expect(component.singleUser.status).toEqual('0');
    expect(component.isShowPopup).toBe(true);
    expect(component.isShowUser).toBe(true);
  }));

  it('#addRoletoUser', () => {
    component.addRoletoUser();
    expect(component.loading).toBe(false);
    expect(component.rolesUpdateStatus).toBe(true);
  });

  it('#closePopup', () => {
    component.isShowPopup = true;
    expect(component.isShowPopup).toBe(true);
    component.closePopup();
    expect(component.isShowPopup).toBe(false);
    expect(component.isManageRoles).toBe(false);
    expect(component.isShowUser).toBe(false);
  });

  it('#search', fakeAsync(() => {
    component.users = userData;
    let term = null;
    let key = null;
    component.search(term, key);
    tick();
    expect(component.filterData).toEqual(component.userData);
    term = 'testTerm';
    key = 'employeeName';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'username';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'empType';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'roles';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'status';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);

  }));
});
