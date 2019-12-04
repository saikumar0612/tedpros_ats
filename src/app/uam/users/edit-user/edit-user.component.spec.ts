import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { EditUserComponent } from './edit-user.component';
import { UserService } from 'src/app/core/services';
import { RouterTestingModule } from '@angular/router/testing';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { DataTableModule } from 'angular-6-datatable';
import { NgMultiSelectDropDownModule, MultiSelectComponent } from 'ng-multiselect-dropdown';
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
import { ChangeDetectorRef } from '@angular/core';
export class ChangeDetectorRefTest implements ChangeDetectorRef {
  markForCheck(): void {
    throw new Error('Method not implemented.');
  } detach(): void {
    throw new Error('Method not implemented.');
  }
  detectChanges(): void {
    throw new Error('Method not implemented.');
  }
  checkNoChanges(): void {
    throw new Error('Method not implemented.');
  }
  reattach(): void {
    throw new Error('Method not implemented.');
  }
}
let cd = new ChangeDetectorRefTest();
describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const activatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ChangeDetectorRef, useClass: ChangeDetectorRef }
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
    fixture = TestBed.createComponent(EditUserComponent);
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
    component = fixture.componentInstance;
    component.multiSelect = new MultiSelectComponent(cd);
    component.multiSelect.defaultSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'role_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getUserInfo', () => {
    component.getUserInfo(1);
    expect(component.loading).toBe(false);
    component.filteredROles = [{ id: '2', roleName: 'Recruiter' }, { id: '3', roleName: 'Employee' }];
    expect(component.filteredROles[0].roleName).toEqual('Recruiter');
  });

  it('#cancel', () => {
    spyOn(locationStub, 'back');
    component.cancel();
    expect(locationStub.back).toHaveBeenCalled();
  });

  it('#editUser', fakeAsync(() => {
    component.filteredROles = [{ id: '2', roleName: 'Recruiter' }, { id: '3', roleName: 'Employee' }];
    component.error = '';
    component.userData = {
      userType: {
        id: '',
        typeName: ''
      },
      employeeType: {
        id: '',
        name: ''
      },
      reporting_to: { id: '' },
      roles: [{ id: '2', roleName: 'Recruiter' }, { id: '3', roleName: 'Employee' }]
    };
    component.filterUdata = {
      userId: '1',
      email: '',
      reporting: '',
      userType: { id: '' },
      employeeType: { id: '', employeeType: '' },
      status: '',
      firstName: '',
      lastName: '',
      middleName: '',
      roles: []
    };
    component.editUser();
    tick();
    expect(component.loading).toBe(false);
    expect(component.error).toEqual('');
    expect(component.isShowPopup).toBe(true);

    component.filteredROles = [];
    component.editUser();
    tick();
    expect(component.error).toEqual('Atleast one role must be assigned to user');
    expect(component.loading).toBe(false);
    expect(component.isShowPopup).toBe(true);
    component.filteredROles = [{ id: '2', roleName: 'Recruiter' }];
    component.editUser();
    tick();
    expect(component.userData.roles[0]).toEqual(component.filteredROles[0].id);
    expect(component.isShowPopup).toBe(true);
  }));

  it('#ngOnInit', fakeAsync(() => {
    component.userData = {
      userType: {
        id: '',
        typeName: ''
      },
      employeeType: {
        id: '',
        name: ''
      },
      reporting_to: { id: '' },
      roles: [{ id: '2', roleName: 'Recruiter' }, { id: '3', roleName: 'Employee' }]
    };
    component.userId = 1;
    component.selRoles = [];
    tick();
    component.ngOnInit();
    tick();
    expect(component.loading).toBe(false);
    expect(component.userId).toEqual(1);
    expect(component.dropdownSettings.allowSearchFilter).toBe(true);
    activatedRouteStub.params.subscribe(res => console.log(res));
  }));

  it('#closePopup', () => {
    component.isShowPopup = false;
    expect(component.isShowPopup).toBe(false);
    component.closePopup();
    expect(component.isShowPopup).toBe(true);
  });

  it('#closeError', () => {
    // component.error = '';
    // expect(component.error).toBe('');
    component.closeError();
    expect(component.error).toBe('');
  });
});
