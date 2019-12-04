import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditRolePermissionsComponent } from './edit-role-permissions.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { Location } from '@angular/common';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { UserService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { map } from 'rxjs/operators';

describe('EditRolePermissionsComponent', () => {
  let component: EditRolePermissionsComponent;
  let fixture: ComponentFixture<EditRolePermissionsComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const activatedRouteStub = new ActivatedRouteStub();
  const masterRole = {
    'id': '2',
    'categoryName': 'Manage branches',
    'description': '',
    'permissions': [
      {
        'id': '182',
        'displayName': 'Create Branch',
        'permissionName': 'createBranch',
        'permission': 'create',
        'description': 'Create Branch',
        'status': true
      },
      {
        'id': '183',
        'displayName': 'Update Branch',
        'permissionName': 'updateBranch',
        'permission': 'update',
        'description': 'Update Branch Info',
        'status': true
      },
      {
        'id': '312',
        'displayName': 'Read Branch',
        'permissionName': 'ReadBranch',
        'permission': 'read',
        'description': 'Read Branch',
        'status': false
      }
    ]
  };
  const masterRoles = [{
    'id': '2',
    'categoryName': 'Manage branches',
    'description': '',
    'permissions': [
      {
        'id': '182',
        'displayName': 'Create Branch',
        'permissionName': 'createBranch',
        'permission': 'create',
        'description': 'Create Branch',
        'status': true
      },
      {
        'id': '183',
        'displayName': 'Update Branch',
        'permissionName': 'updateBranch',
        'permission': 'update',
        'description': 'Update Branch Info',
        'status': true
      },
      {
        'id': '312',
        'displayName': 'Read Branch',
        'permissionName': 'ReadBranch',
        'permission': 'read',
        'description': 'Read Branch',
        'status': false
      }
    ]
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditRolePermissionsComponent],
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
        SharedModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRolePermissionsComponent);
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

  it('#ngOnInit', () => {
    component.roleId = 1;
    component.ngOnInit();
    // tick();
    expect(component.loading).toBe(false);
    expect(component.roleId).toEqual(1);
  });

  it('#cancel', () => {
    spyOn(locationStub, 'back');
    component.cancel();
    expect(locationStub.back).toHaveBeenCalled();
  });

  it('#updateRole', fakeAsync(() => {
    component.updateRole();
    tick();
    expect(component.roleInfo.status).toEqual('1');
    expect(component.loading).toBe(false);
    expect(component.popup).toBe(true);
  }));

  it('#closePopup', fakeAsync(() => {
    component.popup = false;
    component.closePopup();
    tick();
    expect(component.popup).toBe(true);
  }));

  it('#closeErrorPopup', fakeAsync(() => {
    component.errorpopup = false;
    component.closeErrorPopup();
    tick();
    expect(component.errorpopup).toBe(true);
  }));

  it('#triggerSelectAll', fakeAsync(() => {
    const event = {
      target: {
        checked: true
      }
    };
    component.masterRoles = masterRoles;
    component.triggerSelectAll(event);
    tick();
    expect(component.selectCategoryChkBox['2']).toBe(true);
  }));

  it('#checkIndividualPermission', fakeAsync(() => {
    component.selectAll = true;

    let event = {
      target: {
        checked: false
      }
    };
    component.checkIndividualPermission(event, masterRoles);
    tick();
    expect(component.selectAllChkBox).toBe(false);
    expect(component.selectCategoryChkBox['2']).toBe(false);

    event = {
      target: {
        checked: true
      }
    };
    component.checkIndividualPermission(event, masterRole);
    tick();
    expect(component.selectAll).toBe(true);
  }));
});
