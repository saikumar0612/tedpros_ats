import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserJobDetailsComponent } from './user-job-details.component';
import { AuthenticationService } from '../../../core/services';
import { SuperService } from '../../../core/services/super.service';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AuthServiceStub } from '../../../mocks/AuthServiceStub';
import { SuperServiceStub } from '../../../mocks/SuperServiceStub';
import { LocationStub } from '../../../mocks/LocationStub';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChartsModule } from 'ng2-charts';
import { RouterTestingModule } from '@angular/router/testing';
import { map } from 'rxjs/operators';
import { DataTableModule } from 'angular-6-datatable';

describe('UserSalaryDetailsComponent', () => {
  let component: UserJobDetailsComponent;
  let fixture: ComponentFixture<UserJobDetailsComponent>;
  const AuthService = new AuthServiceStub();
  const superService = new SuperServiceStub();
  const locationStub = new LocationStub();
  const category = {
    id: '1',
    name: 'marketer executives',
    jobTitle: [
      {
        id: '2',
        jobTitle: 'Computer Hardware Engineers',
        jobDescription: 'Computer Hardware Engineers',
        jobNote: null
      },
      {
        id: '3',
        jobTitle: 'Computer and Information Systems Managers',
        jobDescription: 'Computer and Information Systems Managers',
        jobNote: null
      },
      {
        id: '4',
        jobTitle: 'Computer Science Teachers',
        jobDescription: 'Computer Science Teachers, Postsecondary',
        jobNote: null
      },
      {
        id: '5',
        jobTitle: 'Computer and Information Research Scientists',
        jobDescription: 'Computer and Information Research Scientists',
        jobNote: null
      },
      {
        id: '6',
        jobTitle: 'Computer Systems Analysts',
        jobDescription: 'Computer Systems Analysts',
        jobNote: null
      },
      {
        id: '7',
        jobTitle: 'Information Security Analysts',
        jobDescription: 'Information Security Analysts',
        jobNote: null
      },
      {
        id: '8',
        jobTitle: 'Computer Programmers',
        jobDescription: 'Computer Programmers',
        jobNote: null
      },
      {
        id: '9',
        jobTitle: 'Software Developers, Applications',
        jobDescription: 'Software Developers, Applications',
        jobNote: null
      },
      {
        id: '10',
        jobTitle: 'Software Developers, Systems Software',
        jobDescription: 'Software Developers, Systems Software',
        jobNote: null
      },
      {
        id: '11',
        jobTitle: 'Web Developers',
        jobDescription: 'Web Developers',
        jobNote: null
      },
      {
        id: '12',
        jobTitle: 'Database Administrators',
        jobDescription: 'Database Administrators',
        jobNote: null
      },
      {
        id: '13',
        jobTitle: 'Network and Computer Systems Administrators',
        jobDescription: 'Network and Computer Systems Administrators',
        jobNote: null
      },
      {
        id: '14',
        jobTitle: 'Computer Network Architects',
        jobDescription: 'Computer Network Architects',
        jobNote: null
      },
      {
        id: '15',
        jobTitle: 'Computer User Support Specialists',
        jobDescription: 'Computer User Support Specialists',
        jobNote: null
      },
      {
        id: '16',
        jobTitle: 'Computer Network Support Specialists',
        jobDescription: 'Computer Network Support Specialists',
        jobNote: null
      },
      {
        id: '17',
        jobTitle: 'Computer Occupations, All Other',
        jobDescription: 'Computer Occupations, All Other',
        jobNote: null
      },
      {
        id: '18',
        jobTitle: 'COMPUTER AND INFORMATION SYSTEMS MANAGER',
        jobDescription: 'COMPUTER AND INFORMATIONS',
        jobNote: null
      },
      {
        id: '32',
        jobTitle: 'perform tester',
        jobDescription: 'COMPUTER AND INFORMATION SYSTEMS MANAGER',
        jobNote: 'this is for information technology'
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserJobDetailsComponent],
      providers: [
        { provide: AuthenticationService, useValue: AuthService },
        { provide: SuperService, useValue: superService },
        { provide: Location, useValue: locationStub }
      ],
      imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        FileUploadModule,
        NgMultiSelectDropDownModule.forRoot(),
        ArchwizardModule,
        CustomFormsModule,
        OwlDateTimeModule, OwlNativeDateTimeModule,
        ImageCropperModule,
        ChartsModule,
        RouterTestingModule, DataTableModule

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJobDetailsComponent);
    component = fixture.componentInstance;
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.loading).toBe(false);
  }));

  it('#onItemSelect', fakeAsync(() => {
    component.onItemSelect('1');
    tick();
    expect(component.catTitles).toEqual(category);
  }));

  it('#onCategorySelect', fakeAsync(() => {
    component.onCategorySelect('1');
    tick();
    expect(component.catTitles).toEqual(category);
  }));

  it('#editUser', fakeAsync(() => {
    const date1 = 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)';
    const date2 = 'Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.startDate = date2;
    component.endDate = date1;
    component.editUser();
    tick();
    expect(component.contractError).toEqual('Contract startDate should\'nt exceed contract endDate');

    component.startDate = date1;
    component.endDate = date2;
    component.editUser();
    tick();
    expect(component.contractError).toEqual('');
  }));

  it('#addUser', fakeAsync(() => {
    const date1 = 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)';
    const date2 = 'Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.jobInfo.jobTitle.id = '';
    component.addUser();
    tick();
    expect(component.jobTitleError).toBe(true);

    component.contractStartDate = date2;
    component.contractEndDate = date1;
    component.addUser();
    tick();
    expect(component.contractError).toEqual('Contract startDate should\'nt exceed contract endDate');

    component.contractStartDate = date1;
    component.contractEndDate = date2;
    component.addUser();
    tick();
    expect(component.contractError).toEqual('');
  }));

  it('#cancel', fakeAsync(() => {
    component.cancel();
    tick();
    expect(component.displayContact).toBe(false);
  }));

  it('#move', fakeAsync(() => {
    spyOn(component, 'move');
    component.move();
    tick();
    expect(component.move).toHaveBeenCalled();
  }));

  it('#closePopup', fakeAsync(() => {
    component.isFailure = true;
    component.closePopup();
    tick();
    expect(component.isFailure).toBe(false);
  }));

  it('#close', fakeAsync(() => {
    component.success = true;
    component.close();
    tick();
    expect(component.success).toBe(false);
  }));

  it('#editContact', fakeAsync(() => {
    component.editContact();
    tick();
    expect(component.displayContact).toBe(true);
  }));

  it('#backContact', fakeAsync(() => {
    component.backContact();
    tick();
    expect(component.displayContact).toBe(false);
  }));
});
// Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)
// Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)