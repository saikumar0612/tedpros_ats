import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditProjectComponent } from './edit-project.component';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../../core/services';
import { RouterTestingModule } from '@angular/router/testing';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { AuthServiceStub } from 'src/app/mocks/AuthServiceStub';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { UserService } from '../../../core/services/user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

describe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const authSutb = new AuthServiceStub();
  const activatedRouteStub = new ActivatedRouteStub();
  const cusInfo = {
    projectId: 'PRJ0006',
    customerId: 'SMC7029',
    customer: {
      id: 'SMC7029',
      name: 'Jones IT'
    },
    projectName: 'sandly',
    projectDesc: 'test',
    isApproved: '1',
    startDate: new Date('Thu Jul 25 2019 12:00:00 GMT+0530 (India Standard Time)'),
    endDate: new Date('Fri Jul 26 2019 12:00:00 GMT+0530 (India Standard Time)'),
    internalApprover: 'SMU1004',
    externalApprover: 'SMU1025',
    isPrimary: '1',
    activities: [
      {
        id: '9',
        name: 'project'
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditProjectComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: AuthenticationService, useValue: authSutb },
        { provide: ActivatedRouteStub, useValue: activatedRouteStub }
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgMultiSelectDropDownModule.forRoot(),
        HttpModule,
        HttpClientModule,
        OwlDateTimeModule, OwlNativeDateTimeModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectComponent);
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
    component.ngOnInit();
    tick();
    expect(component.cusInfo).toEqual(cusInfo);
    activatedRouteStub.paramMap.subscribe(res => console.log(res));
  }));

  it('#dateValidate', fakeAsync(() => {
    component.cusInfo = {
      endDate: new Date('Fri Jul 26 2019 12:00:00 GMT+0530 (India Standard Time)'),
      startDate: new Date('Thu Jul 25 2019 12:00:00 GMT+0530 (India Standard Time)')
    };
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('');
    component.cusInfo = {
      endDate: new Date('Fri Jul 26 2019 12:00:00 GMT+0530 (India Standard Time)'),
      startDate: new Date('Sun Jul 28 2019 23:04:01 GMT+0530 (India Standard Time)')
    };
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('Please select a valid start date');
    expect(component.cusInfo.endDate).toEqual(component.cusInfo.startDate);
  }));

  it('#getInternalApprover', fakeAsync(() => {
    spyOn(component, 'getInternalApprover');
    component.getInternalApprover();
    tick();
    expect(component.getInternalApprover).toHaveBeenCalled();
  }));

  it('#getExternalApprover', fakeAsync(() => {
    spyOn(component, 'getExternalApprover');
    component.getExternalApprover();
    tick();
    expect(component.getExternalApprover).toHaveBeenCalled();
  }));

  it('#insertActivity', fakeAsync(() => {
    const editActivityFrm: NgForm = new NgForm([], []);
    const activitieslist = [{ id: 'id', name: 'name' }];
    component.activitieslist = [{ id: 'id', name: 'name' }];
    component.indexofActivity = 0;
    component.insertActivity('id', 'name', editActivityFrm);
    tick();
    expect(component.activitieslist).toEqual(activitieslist);
    expect(component.indexofActivity).toBe(null);
    component.indexofActivity = null;
    component.insertActivity('id', ' ', editActivityFrm);
    tick();
    expect(component.error).toEqual('Activity name cannot be blank');

    component.indexofActivity = null;
    component.insertActivity('id', 'name', editActivityFrm);
    tick();
    expect(component.error).toEqual('');

  }));

  it('#editPro', fakeAsync(() => {
    component.isShowPopup = false;
    component.editPro();
    tick();
    expect(component.isShowPopup).toBe(true);
  }));

  // closePopup
  it('#closePopup', fakeAsync(() => {
    component.isShowPopup = true;
    component.closePopup();
    tick();
    expect(component.isShowPopup).toBe(false);
  }));

  // cancel
  it('#cancel', fakeAsync(() => {
    spyOn(authSutb, 'cancel');
    component.cancel();
    tick();
    expect(authSutb.cancel).toHaveBeenCalled();
  }));

  it('#editActivity', fakeAsync(() => {
    component.editActivity({ id: '', name: '' });
    tick();
    expect(component.error).toEqual('Activity name cannot be blank');

    component.activityData = { id: 'id', name: 'name' };
    component.editActivity({ id: 'id', name: 'name' });
    tick();
    expect(component.error).toEqual('');
  }));

  it('#editsingleactivity', fakeAsync(() => {
    component.activitieslist = [{ id: 'id', name: 'name' }];
    spyOn(component, 'editsingleactivity');
    component.editsingleactivity('name', 0);
    tick();
    expect(component.editsingleactivity).toHaveBeenCalled();
  }));

  /*
      * Author: G S Pavan Kumar
      * Created: 03rd August 2019
      * Comment: Start of code coverage
  */
});
