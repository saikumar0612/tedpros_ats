import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ResumeComponent } from './resume.component';
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
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { ArchwizardModule } from 'angular-archwizard';
import { map } from 'rxjs/operators';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;
  const userServiceStub = new UserServiceStub();
  const activatedRouteStub = new ActivatedRouteStub();
  const authStub = new AuthServiceStub();
  const emmitterStub = new EventEmittorStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: EventEmitterService, useValue: emmitterStub },
        { provide: AuthenticationService, useValue: authStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Location, useValue: locationStub },
        DatePipe,
        jspdf,
        html2canvas
        // FileUploader
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        DataTableModule,
        NgbModule,
        ArchwizardModule,
        OwlDateTimeModule, OwlNativeDateTimeModule
        // FileUploader
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeComponent);
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

  /*
      * Author: G S Pavan Kumar
      * Created: 04th August 2019
      * Comment: start of code coverage
  */

  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    activatedRouteStub.paramMap.subscribe(res => console.log(res));
    expect(component.logger.actionTitle).toEqual('Edit Candidate');
  }));

  // Cancel
  it('#cancel', fakeAsync(() => {
    spyOn(locationStub, 'back');
    component.cancel();
    tick();
    expect(locationStub.back).toHaveBeenCalled();
  }));

  // closePopup
  it('#closePopup', fakeAsync(() => {
    spyOn(locationStub, 'back');
    component.closePopup();
    tick();
    expect(locationStub.back).toHaveBeenCalled();
  }));
  /*
      * Author: G S Pavan Kumar
      * Created: 04th August 2019
      * Comment: end of code coverage
  */
});
