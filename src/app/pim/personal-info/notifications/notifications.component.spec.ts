import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
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

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  const AuthService = new AuthServiceStub();
  const superService = new SuperServiceStub();
  const locationStub = new LocationStub();
  const alertData = [{
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsComponent],
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
    fixture = TestBed.createComponent(NotificationsComponent);
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

  it('#getDetails', fakeAsync(() => {
    component.getDetails();
    tick();
    expect(component.alertDetails).toEqual(alertData);
  }));

  it('#getDocumentAlertDetails', fakeAsync(() => {
    component.getDocumentAlertDetails();
    tick();
    expect(component.loading).toBe(false);
  }));

  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.loading).toBe(false);
  }));

  it('#updateDetails', fakeAsync(() => {
    component.updateDetails('1', '');
    tick();
    expect(component.licenseData.recordId).toEqual('1');
  }));

  it('#closePopup', fakeAsync(() => {
    component.closePopup();
    tick();
    expect(component.isShowDetails).toBe(false);
  }));

  it('#showDetails', fakeAsync(() => {
    component.showDetails('1', '');
    tick();
    expect(component.isShowModal).toBe(true);
  }));

  it('#showDetails', fakeAsync(() => {
    component.isShowModal = false;
    component.closeModal();
    tick();
    expect(component.isShowModal).toBe(true);
  }));

  it('#changeRead', fakeAsync(() => {
    component.changeRead('1', '');
    tick();
    expect(component.isShowModal).toBe(false);
  }));

  it('#changeDocReadValue', fakeAsync(() => {
    component.changeDocReadValue('1', '', '');
    tick();
    expect(component.showModal).toBe(false);
  }));

  it('#showPopup', fakeAsync(() => {
    component.showPopup('1', '', '');
    tick();
    expect(component.showModal).toBe(true);
  }));

  it('#close', fakeAsync(() => {
    component.showModal = true;
    component.close();
    tick();
    expect(component.showModal).toBe(false);
  }));

  it('#onselect', fakeAsync(() => {
    component.onselect('');
    tick();
    expect(component.loading).toBe(false);
  }));

  it('#onChange', fakeAsync(() => {
    component.onChange('', '');
    tick();
    expect(component.isShowModal).toBe(false);
  }));

  it('#dateValidate', fakeAsync(() => {
    const date1 = new Date('Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)');
    const date2 = new Date('Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)');
    component.licenseData.issued = date1;
    component.licenseData.expiry = date2;
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('Please select a valid expiry target date');
    component.licenseData.issued = date1;
    component.licenseData.expiry = date2;
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('');
  }));

  it('#dateValidate1', fakeAsync(() => {
    component.workData.expiryDate = 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.start = 'Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.dateValidate1();
    tick();
    expect(component.dateError1).toEqual('Please select a valid expiry target date');
    component.start = 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.workData.expiryDate = 'Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.dateValidate1();
    tick();
    expect(component.dateError1).toEqual('');
  }));

  it('#submit', fakeAsync(() => {
    component.submit();
    tick();
    expect(component.loading).toBe(false);
  }));

  it('#openi9DocUpload', fakeAsync(() => {
    component.openi9DocUpload();
    tick();
    expect(component.isi9Document).toBe(true);
  }));

  it('#openfw4DocUpload', fakeAsync(() => {
    component.openfw4DocUpload();
    tick();
    expect(component.isfw4Document).toBe(true);
  }));

  it('#opensw4DocUpload', fakeAsync(() => {
    component.opensw4DocUpload();
    tick();
    expect(component.issw4Document).toBe(true);
  }));

  it('#openWorkDocUpload', fakeAsync(() => {
    component.openWorkDocUpload();
    tick();
    expect(component.isWorkDocument).toBe(true);
  }));

  it('#closeDocUploadModal', fakeAsync(() => {
    component.closeDocUploadModal('i9Doc');
    tick();
    expect(component.isi9Document).toBe(false);
    component.closeDocUploadModal('fw4Doc');
    tick();
    expect(component.isfw4Document).toBe(false);
    component.closeDocUploadModal('sw4Doc');
    tick();
    expect(component.issw4Document).toBe(false);
    component.closeDocUploadModal('workDoc');
    tick();
    expect(component.isWorkDocument).toBe(false);
  }));
});
