import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TopMenuComponent } from './top-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthServiceStub } from 'src/app/mocks/AuthServiceStub';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { Location } from '@angular/common';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { UserService } from '../../core/services/user.service';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { EventEmitterService } from '../../core/services/event-emitter.service';
import { EventEmittorStub } from 'src/app/mocks/EventEmittorStub';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule, MultiSelectComponent } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

describe('TopMenuComponent', () => {
  let component: TopMenuComponent;
  let fixture: ComponentFixture<TopMenuComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const activatedRouteStub = new ActivatedRouteStub();
  const emmitterStub = new EventEmittorStub();
  const authStub = new AuthServiceStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopMenuComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: EventEmitterService, useValue: emmitterStub },
        { provide: AuthServiceStub, useValue: authStub }
      ],
      imports: [
        RouterTestingModule,
        HttpModule,
        HttpClientModule,
        NgbModule,
        NgMultiSelectDropDownModule.forRoot(),
        ArchwizardModule,
        CustomFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuComponent);
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

  it('#getDetails', fakeAsync(() => {
    component.alertDetails = [{
      id: '1',
      userId: '1',
      type: 'License',
      alert: true,
      markAsRead: false,
      expiry_date: '2019-07-28',
      issued_date: '2017-07-01',
      number: 'HIT5434',
      certificateName: '',
      license: {
        id: '2',
        name: '3-clause BSD License'
      },
      alertMessage: 'has expired.'
    },
    {
      id: '2',
      userId: '1',
      type: 'Certification',
      alert: true,
      markAsRead: false,
      expiry_date: '2019-07-28',
      issued_date: '2018-07-01',
      number: '4243235',
      certificateName: 'JAVA Sun Certificate',
      license: null,
      alertMessage: 'has expired.'
    }];
    component.getDetails();
    tick();
    expect(component.totalAlertCount).toEqual(2);
  }));

  it('#getDocumentAlertDetails', fakeAsync(() => {
    component.getDocumentAlertDetails();
    tick();
    expect(component.finalCount).toEqual(6);
  }));

  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.totalAlertCount).toEqual(0);
    expect(component.finalCount).toEqual(0);
  }));

  it('#appLogout', fakeAsync(() => {
    spyOn(authStub, 'logout');
    component.appLogout();
    tick();
    // expect(authStub.logout).toHaveBeenCalled();
  }));
});
