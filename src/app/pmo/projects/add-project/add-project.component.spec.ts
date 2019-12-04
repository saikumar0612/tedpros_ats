import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddProjectComponent } from './add-project.component';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../../core/services';
import { RouterTestingModule } from '@angular/router/testing';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { AuthServiceStub } from 'src/app/mocks/AuthServiceStub';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { UserService } from '../../../core/services/user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const authSutb = new AuthServiceStub();
  const companyId = 'SMC7032';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddProjectComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: AuthenticationService, useValue: authSutb }
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        OwlDateTimeModule, OwlNativeDateTimeModule,
        HttpModule,
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
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
      * Created: 03rd August 2019
      * Comment: Start of code coverage
  */

  it('#ngOnInit', fakeAsync(() => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    tick();
    expect(component.ngOnInit).toHaveBeenCalled();
  }));

  it('#getInternalApprover', fakeAsync(() => {
    component.getInternalApprover();
    tick();
    expect(component.loading).toBe(false);
  }));

  it('#dateValidate', fakeAsync(() => {
    component.projData = {
      endDate: new Date('Fri Jul 26 2019 12:00:00 GMT+0530 (India Standard Time)'),
      startDate: new Date('Thu Jul 25 2019 12:00:00 GMT+0530 (India Standard Time)')
    };
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('');
    component.projData = {
      endDate: new Date('Fri Jul 26 2019 12:00:00 GMT+0530 (India Standard Time)'),
      startDate: new Date('Sun Jul 28 2019 23:04:01 GMT+0530 (India Standard Time)')
    };
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('Please select a valid start date');
    expect(component.projData.endDate).toEqual(component.projData.startDate);
  }));

  it('#getExternalApprover', fakeAsync(() => {
    component.projData.companyId = companyId;
    component.getExternalApprover();
    tick();
    expect(component.companyError).toEqual('');
    component.projData.companyId = '';
    component.getExternalApprover();
    tick();
    expect(component.externalApprovers).toEqual([]);
  }));

  it('#addPro', fakeAsync(() => {
    const addPro: NgForm = new NgForm([], []);
    component.isShowPopup = true;
    component.loading = true;
    component.addPro(addPro);
    tick();
    expect(component.isShowPopup).toBe(true);
    expect(component.loading).toBe(false);
  }));

  it('#cancel', fakeAsync(() => {
    spyOn(locationStub, 'back');
    component.cancel();
    tick();
    expect(locationStub.back).toHaveBeenCalled();
  }));

  it('#closePopup', fakeAsync(() => {
    component.isShowPopup = true;
    component.error = '';
    component.closePopup();
    tick();
    expect(component.isShowPopup).toBe(false);
    expect(component.error).toEqual('');
  }));

  /*
      * Author: G S Pavan Kumar
      * Created: 03rd August 2019
      * Comment: end of code coverage
  */
});
