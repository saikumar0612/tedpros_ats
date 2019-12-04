import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DocumentsInfoComponent } from './documents-info.component';
import { AuthenticationService } from '../../../core/services';
import { SuperService } from '../../../core/services/super.service';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AuthServiceStub } from '../../../mocks/AuthServiceStub';
import { SuperServiceStub } from '../../../mocks/SuperServiceStub';
import { LocationStub } from '../../../mocks/LocationStub';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
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

describe('DocumentsInfoComponent', () => {
  let component: DocumentsInfoComponent;
  let fixture: ComponentFixture<DocumentsInfoComponent>;
  const AuthService = new AuthServiceStub();
  const superService = new SuperServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsInfoComponent],
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
    fixture = TestBed.createComponent(DocumentsInfoComponent);
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

  it('#geti9Docs', fakeAsync(() => {
    component.geti9Docs();
    tick();
    expect(component.length).toEqual(5);
  }));

  it('#getWorkDocs', fakeAsync(() => {
    component.geti9Docs();
    tick();
    expect(component.length1).toEqual(1);
  }));

  it('#getw4Docs', fakeAsync(() => {
    component.geti9Docs();
    tick();
    expect(component.length3).toEqual(1);
  }));

  it('#fileOverBase', fakeAsync(() => {
    component.fileOverBase(false);
    tick();
    expect(component.hasBaseDropZoneOver).toBe(false);
  }));

  it('#fileOverAnother', fakeAsync(() => {
    component.fileOverAnother(false);
    tick();
    expect(component.hasAnotherDropZoneOver).toBe(false);
  }));

  it('#showUserDetails', fakeAsync(() => {
    component.showUserDetails('2');
    tick();
    expect(component.isShowPopup).toBe(true);
  }));

  it('#closePopup', fakeAsync(() => {
    component.closePopup();
    tick();
    expect(component.isShowDetails).toBe(false);
  }));

  it('#showDetails', fakeAsync(() => {
    component.showDetails('8');
    tick();
    expect(component.isShowModal).toBe(true);
  }));

  it('#closeModal', fakeAsync(() => {
    component.closeModal();
    tick();
    expect(component.isDetails).toBe(false);
  }));

  it('#deletework', fakeAsync(() => {
    component.deletework('8');
    tick();
    expect(component.isDetails1).toBe(true);
  }));

  it('#close', fakeAsync(() => {
    component.close();
    tick();
    expect(component.isDetails1).toBe(false);
  }));

  it('#move', fakeAsync(() => {
    spyOn(component, 'move');
    component.move();
    tick();
    expect(component.move).toHaveBeenCalled();
  }));

  it('#closeIsSuccess', fakeAsync(() => {
    spyOn(component, 'closeIsSuccess');
    component.closeIsSuccess();
    tick();
    expect(component.closeIsSuccess).toHaveBeenCalled();
  }));

  it('#editi9Doc', fakeAsync(() => {
    let doc = {
      'id': '21',
      'document': '11568030055.pdf',
      'year': '2045',
      'expiryDate': '2019-09-09',
      'alert': false,
      'comment': ''
    };
    const newDate = new DatePipe('en-US').transform(doc.expiryDate, 'yyyy-MM-dd');
    component.editi9Doc(doc);
    tick();
    expect(component.editi9.id).toEqual('21');
    expect(component.editi9.expiryDate).toEqual(newDate);
    doc = {
      'id': '21',
      'document': '11568030055.pdf',
      'year': '2045',
      'expiryDate': '',
      'alert': false,
      'comment': ''
    };
    component.editi9Doc(doc);
    tick();
    expect(component.editi9.id).toEqual('21');
    expect(component.editi9.expiryDate).toEqual('');
  }));

  it('#i9Validate', fakeAsync(() => {
    component.editi9.expiryDate = new DatePipe('en-US').transform('Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');
    component.currentDate = new DatePipe('en-US').transform('Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');

    component.i9Validate();
    tick();
    expect(component.i9Error).toEqual('Please select a valid expiry date');

    component.currentDate = new DatePipe('en-US').transform('Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');
    component.editi9.expiryDate = new DatePipe('en-US').transform('Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');

    component.i9Validate();
    tick();
    expect(component.i9Error).toEqual('');
  }));

  it('#updatei9Doc', fakeAsync(() => {
    component.editi9.alert = true;
    component.i9Error = 'Please select a valid expiry date';
    component.updatei9Doc();
    tick();
    expect(component.editi9.alert).toEqual(1);
    component.editi9.alert = false;
    component.i9Error = 'Please select a valid expiry date';
    component.updatei9Doc();
    tick();
    expect(component.editi9.alert).toEqual(-1);

    component.editi9.alert = true;
    component.i9Error = '';
    component.updatei9Doc();
    tick();
    expect(component.i9Info.statusCode.code).toEqual('200');
    expect(component.editi9.alert).toEqual(1);
  }));

  it('#delete', fakeAsync(() => {
    component.delete('21');
    tick();
    expect(component.i9Info.statusCode.code).toEqual('200');
  }));

  it('#deletedoc', fakeAsync(() => {
    component.deletedoc('1');
    tick();
    expect(component.workInfo.statusCode.code).toEqual('200');
  }));

  it('#deletew4', fakeAsync(() => {
    component.deletew4('8');
    tick();
    expect(component.w4Info.statusCode.code).toEqual('200');
  }));

  it('#w4Validate', fakeAsync(() => {
    component.editi9.expiryDate = new DatePipe('en-US').transform('Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');
    component.currentDate = new DatePipe('en-US').transform('Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');

    component.w4Validate();
    tick();
    expect(component.w4Error).toEqual('Please select a valid expiry date');

    component.currentDate = new DatePipe('en-US').transform('Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');
    component.editi9.expiryDate = new DatePipe('en-US').transform('Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');

    component.w4Validate();
    tick();
    expect(component.w4Error).toEqual('');
  }));

  it('#editi9Doc', fakeAsync(() => {
    let doc = {
      'id': '1',
      'document': '11565083050.pdf',
      'type': 'federal',
      'year': '2008',
      'expiryDate': '2020-02-07',
      'alert': true,
      'comment': ''
    };
    const newDate = new DatePipe('en-US').transform(doc.expiryDate, 'yyyy-MM-dd');
    component.editFederal(doc);
    tick();
    expect(component.editfw4.id).toEqual('21');
    expect(component.editfw4.expiryDate).toEqual(newDate);
    doc = {
      'id': '1',
      'document': '11565083050.pdf',
      'type': 'federal',
      'year': '2008',
      'expiryDate': '',
      'alert': true,
      'comment': ''
    };
    component.editFederal(doc);
    tick();
    expect(component.editfw4.id).toEqual('21');
    expect(component.editfw4.expiryDate).toEqual('');
  }));

  it('#updatefw4Doc', fakeAsync(() => {
    component.editfw4.alert = true;
    component.w4Error = 'Please select a valid expiry date';
    component.updatefw4Doc();
    tick();
    expect(component.editfw4.alert).toEqual(1);
    component.editfw4.alert = false;
    component.w4Error = 'Please select a valid expiry date';
    component.updatefw4Doc();
    tick();
    expect(component.editfw4.alert).toEqual(-1);

    component.editfw4.alert = true;
    component.w4Error = '';
    component.updatefw4Doc();
    tick();
    expect(component.fw4Info.statusCode.code).toEqual('200');
    expect(component.editfw4.alert).toEqual(1);
  }));

  it('#editState', fakeAsync(() => {
    let doc = {
      'id': '8',
      'document': '11565793846.pdf',
      'type': 'state',
      'year': '2016',
      'expiryDate': 'Wed Aug 02 2034 00:00:00 GMT+053',
      'alert': true,
      'comment': ''
    };
    component.editState(doc);
    tick();
    expect(component.editsw4.expiryDate).toEqual(new Date(doc.expiryDate));


    doc = {
      'id': '8',
      'document': '11565793846.pdf',
      'type': 'state',
      'year': '2016',
      'expiryDate': '',
      'alert': true,
      'comment': ''
    };
    component.editState(doc);
    tick();
    expect(component.editsw4.expiryDate).toEqual('');
  }));

  it('#stateValidate', fakeAsync(() => {
    component.editsw4.expiryDate = new DatePipe('en-US').transform('Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');
    component.currentDate = new DatePipe('en-US').transform('Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');

    component.stateValidate();
    tick();
    expect(component.stateError).toEqual('Please select a valid expiry date');

    component.currentDate = new DatePipe('en-US').transform('Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');
    component.editsw4.expiryDate = new DatePipe('en-US').transform('Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');

    component.stateValidate();
    tick();
    expect(component.stateError).toEqual('');
  }));

  it('#updatesw4Doc', fakeAsync(() => {
    component.editsw4.alert = true;
    component.stateError = 'Please select a valid expiry date';
    component.updatesw4Doc();
    tick();
    expect(component.editsw4.alert).toEqual(1);
    component.editsw4.alert = false;
    component.stateError = 'Please select a valid expiry date';
    component.updatesw4Doc();
    tick();
    expect(component.editsw4.alert).toEqual(-1);

    component.editsw4.alert = true;
    component.stateError = '';
    component.updatesw4Doc();
    tick();
    expect(component.w4Info.statusCode.code).toEqual('200');
    expect(component.editsw4.alert).toEqual(1);
  }));

  it('#editWorkDoc', fakeAsync(() => {
    let doc = {
      'id': '8',
      'document': '11565793846.pdf',
      'type': 'state',
      'year': '2016',
      'expiryDate': 'Wed Aug 02 2034 00:00:00 GMT+053',
      'alert': true,
      'comment': ''
    };
    component.editWorkDoc(doc);
    tick();
    expect(component.editWorkAuth.expiryDate).toEqual(new Date(doc.expiryDate));


    doc = {
      'id': '8',
      'document': '11565793846.pdf',
      'type': 'state',
      'year': '2016',
      'expiryDate': '',
      'alert': true,
      'comment': ''
    };
    component.editWorkDoc(doc);
    tick();
    expect(component.editWorkAuth.expiryDate).toEqual('');
  }));

  it('#updateWorkDoc', fakeAsync(() => {
    component.editWorkAuth.alert = true;
    component.dateError = 'Please select a valid expiry date';
    component.updateWorkDoc();
    tick();
    expect(component.editWorkAuth.alert).toEqual(1);
    component.editWorkAuth.alert = false;
    component.dateError = 'Please select a valid expiry date';
    component.updateWorkDoc();
    tick();
    expect(component.editWorkAuth.alert).toEqual(-1);

    component.editWorkAuth.alert = true;
    component.dateError = '';
    component.updateWorkDoc();
    tick();
    expect(component.w4Info.statusCode.code).toEqual('200');
    expect(component.editWorkAuth.alert).toEqual(1);
  }));

  it('#updateValidate', fakeAsync(() => {
    const date1 = 'Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)';
    const date2 = 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.editWorkAuth.expiryDate = new DatePipe('en-US').transform(date1, 'yyyy-MM-dd');
    component.currentDate = new DatePipe('en-US').transform(date2, 'yyyy-MM-dd');

    component.updateValidate();
    tick();
    expect(component.dateError).toEqual('Please select a valid expiry date');

    component.currentDate = new DatePipe('en-US').transform(date1, 'yyyy-MM-dd');
    component.editWorkAuth.expiryDate = new DatePipe('en-US').transform(date2, 'yyyy-MM-dd');

    component.updateValidate();
    tick();
    expect(component.dateError).toEqual('');
  }));

  it('#ngOnInit', fakeAsync(() => {
    component.i9Data = {
      'id': '21',
      'document': '11568030055.pdf',
      'year': '2045',
      'expiryDate': '2019-09-09',
      'alert': false,
      'comment': ''
    };
    component.ngOnInit();
    tick();
    expect(component.alert).toEqual(-1);
    component.i9Data = {
      'id': '21',
      'document': '11568030055.pdf',
      'year': '2045',
      'expiryDate': '2019-09-09',
      'alert': true,
      'comment': ''
    };
    component.ngOnInit();
    tick();
    expect(component.alert).toEqual(1);
  }));

  it('#dateValidate', fakeAsync(() => {
    const date1 = 'Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)';
    const date2 = 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.i9Data.expiryDate = new DatePipe('en-US').transform(date1, 'yyyy-MM-dd');
    component.start = new DatePipe('en-US').transform(date2, 'yyyy-MM-dd');

    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('Please select a valid expiry date');

    component.start = new DatePipe('en-US').transform(date1, 'yyyy-MM-dd');
    component.i9Data.expiryDate = new DatePipe('en-US').transform(date2, 'yyyy-MM-dd');

    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('');
  }));

  it('#dateValidate1', fakeAsync(() => {
    const date1 = 'Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)';
    const date2 = 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.workData.expiryDate = new DatePipe('en-US').transform(date1, 'yyyy-MM-dd');
    component.start = new DatePipe('en-US').transform(date2, 'yyyy-MM-dd');

    component.dateValidate1();
    tick();
    expect(component.dateError1).toEqual('Please select a valid expiry date');

    component.start = new DatePipe('en-US').transform(date1, 'yyyy-MM-dd');
    component.workData.expiryDate = new DatePipe('en-US').transform(date2, 'yyyy-MM-dd');

    component.dateValidate1();
    tick();
    expect(component.dateError1).toEqual('');
  }));

  it('#dateValidate2', fakeAsync(() => {
    const date1 = 'Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)';
    const date2 = 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.w4Data.expiryDate = new DatePipe('en-US').transform(date1, 'yyyy-MM-dd');
    component.start = new DatePipe('en-US').transform(date2, 'yyyy-MM-dd');

    component.dateValidate2();
    tick();
    expect(component.dateError2).toEqual('Please select a valid expiry date');

    component.start = new DatePipe('en-US').transform(date1, 'yyyy-MM-dd');
    component.w4Data.expiryDate = new DatePipe('en-US').transform(date2, 'yyyy-MM-dd');

    component.dateValidate2();
    tick();
    expect(component.dateError2).toEqual('');
  }));

  it('#dateValidate3', fakeAsync(() => {
    const date1 = 'Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)';
    const date2 = 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.statew4Data.expiryDate = new DatePipe('en-US').transform(date1, 'yyyy-MM-dd');
    component.start = new DatePipe('en-US').transform(date2, 'yyyy-MM-dd');

    component.dateValidate3();
    tick();
    expect(component.dateError3).toEqual('Please select a valid expiry date');

    component.start = new DatePipe('en-US').transform(date1, 'yyyy-MM-dd');
    component.statew4Data.expiryDate = new DatePipe('en-US').transform(date2, 'yyyy-MM-dd');

    component.dateValidate3();
    tick();
    expect(component.dateError3).toEqual('');
  }));

  it('#onNavigate', fakeAsync(() => {
    spyOn(component, 'onNavigate');
    component.onNavigate('');
    tick();
    expect(component.onNavigate).toHaveBeenCalled();
  }));

  it('#cancel', fakeAsync(() => {
    spyOn(component, 'cancel');
    component.cancel();
    tick();
    expect(component.cancel).toHaveBeenCalled();
  }));

  it('#editDocument', fakeAsync(() => {
    component.editDocument();
    tick();
    expect(component.displayDocument).toBe(true);
  }));

  it('#backDocument', fakeAsync(() => {
    component.backDocument();
    tick();
    expect(component.displayDocument).toBe(false);
  }));

  it('#editw4', fakeAsync(() => {
    component.editw4();
    tick();
    expect(component.displayw4).toBe(true);
  }));

  it('#backw4', fakeAsync(() => {
    component.backw4();
    tick();
    expect(component.displayw4).toBe(false);
  }));

  it('#editstatew4', fakeAsync(() => {
    component.editstatew4();
    tick();
    expect(component.displaystatew4).toBe(true);
  }));

  it('#backstatew4', fakeAsync(() => {
    component.backstatew4();
    tick();
    expect(component.displaystatew4).toBe(false);
  }));

  it('#editWork', fakeAsync(() => {
    component.editWork();
    tick();
    expect(component.displayWork).toBe(true);
  }));

  it('#backWork', fakeAsync(() => {
    component.backWork();
    tick();
    expect(component.displayWork).toBe(false);
  }));

  it('#increaseShow', fakeAsync(() => {
    component.show = 0;
    component.increaseShow();
    tick();
    expect(component.show).toEqual(1);
  }));

  it('#decreaseShow', fakeAsync(() => {
    component.decreaseShow();
    tick();
    expect(component.show).toEqual(3);
  }));

  it('#increaseShow1', fakeAsync(() => {
    component.show1 = 0;
    component.increaseShow1();
    tick();
    expect(component.show1).toEqual(1);
  }));

  it('#decreaseShow1', fakeAsync(() => {
    component.decreaseShow1();
    tick();
    expect(component.show1).toEqual(3);
  }));

  it('#increaseShow2', fakeAsync(() => {
    component.show2 = 0;
    component.increaseShow2();
    tick();
    expect(component.show2).toEqual(1);
  }));

  it('#decreaseShow2', fakeAsync(() => {
    component.decreaseShow2();
    tick();
    expect(component.show2).toEqual(3);
  }));

  it('#increaseShow3', fakeAsync(() => {
    component.show3 = 0;
    component.increaseShow3();
    tick();
    expect(component.show3).toEqual(1);
  }));

  it('#decreaseShow3', fakeAsync(() => {
    component.decreaseShow3();
    tick();
    expect(component.show3).toEqual(3);
  }));
});
