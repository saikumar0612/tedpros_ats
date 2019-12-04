import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CandidateListComponent } from './candidate-list.component';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableModule } from 'angular-6-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../core/services';
import { AuthServiceStub } from 'src/app/mocks/AuthServiceStub';
import { UserService } from '../../../core/services/user.service';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { EventEmittorStub } from 'src/app/mocks/EventEmittorStub';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { Location } from '@angular/common';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { map } from 'rxjs/operators';

describe('CandidateListComponent', () => {
  let component: CandidateListComponent;
  let fixture: ComponentFixture<CandidateListComponent>;
  const userServiceStub = new UserServiceStub();
  const activatedRouteStub = new ActivatedRouteStub();
  const authStub = new AuthServiceStub();
  const emmitterStub = new EventEmittorStub();
  const locationStub = new LocationStub();



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateListComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: EventEmitterService, useValue: emmitterStub },
        { provide: AuthenticationService, useValue: authStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Location, useValue: locationStub }
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        DataTableModule,
        NgbModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListComponent);
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

  it('#search', fakeAsync(() => {
    userServiceStub.getCandidateList().pipe(map(res => {
      component.finalData = res.json().data;
    }));
    tick();
    let term = null;
    let key = null;
    component.search(term, key);
    tick();
    expect(component.filterData).toEqual(component.finalData);
    term = 'testTerm';
    key = 'name';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'cityName';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'stateName';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'phone';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'emailId';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'skills';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);

  }));

  // showpreview
  it('#showpreview', fakeAsync(() => {
    component.showpreview('1');
    tick();
    expect(component.preview).toBe(true);
  }));

  // closePopup
  it('#closePopup', fakeAsync(() => {
    component.preview = true;
    component.closePopup();
    tick();
    expect(component.preview).toBe(false);
  }));

  // ngOnInit
  it('#ngOnInit', fakeAsync(() => {
    component.availableRecords = 0;
    component.ngOnInit();
    tick();
    expect(component.availableRecords).toEqual(component.finalData.length);
  }));
});
