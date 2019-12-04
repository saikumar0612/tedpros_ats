/*
      * Author: BAS-IT022
      * Purpose: Code coverage
      * Created: 01st Aug 2019
      * Comment: unit test cases 
  */

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CompanyInfoComponent } from './company-info.component';


import { RouterStub } from 'src/app/mocks/RouterStub';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';

import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { UserService, AuthenticationService } from 'src/app/core/services';
import { ExcelService } from 'src/app/core/services/excell-export.service';
import { ExcelServiceStub } from 'src/app/mocks/ExcelServiceStub';
import { EventEmittorStub } from 'src/app/mocks/EventEmittorStub';
import { EventEmitterService } from 'src/app/core/services/event-emitter.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DataTableModule } from 'angular-6-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChartsModule } from 'ng2-charts';
import { CKEditorModule } from 'ng2-ckeditor';
import { Http, HttpModule } from '@angular/http';
import { SharedModule } from '../../../shared/shared.module';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { RouterTestingModule } from '@angular/router/testing';
import { map } from 'rxjs/operators';
describe('CompanyInfoComponent', () => {
  let component: CompanyInfoComponent;
  let fixture: ComponentFixture<CompanyInfoComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();

  let location: LocationStub;
  let router: RouterTestingModule;
  let routes = [];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyInfoComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub }
      ],
      imports: [
        HttpModule,
        HttpClientModule,
        RouterTestingModule,
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
        SharedModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoComponent);
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


  it('#closePopup', () => {

    component.popup = true;
    component.success = null;
    component.keyupgrade = null;
    component.errormsg = null;
    component.closePopup();
    expect(component.popup).toBe(false);
  });
  it('#closePopup1', () => {
    component.popup1 = true;
    component.success = null;
    component.keyupgrade = null;
    component.errormsg = null;
    component.closePopup1();
    expect(component.popup1).toBe(false);
  });
  it('#closeKeyPopup', () => {

    component.keypopup = true;
    component.success = null;
    component.keyupgrade = null;
    component.errormsg = null;
    component.closeKeyPopup();
    expect(component.keypopup).toBe(false);
  });
  it('#enterKey', fakeAsync(() => {
    component.keypopup = true;
    component.success = null;
    component.keyupgrade = null;
    component.errormsg = null;
    component.enterKey();
    expect(component.keypopup).toBe(true);
  }));




  it('#ngOnInit', fakeAsync(() => {
    //  component.currentUser.isAdmin=true;

    component.ngOnInit();
    tick();
    userServiceStub.viewCompnayInfo().pipe(map(res => {
      component.compnayInfo = res.json();
    }));
    userServiceStub.getPersonalInfo().pipe(map(res => {
      component.personalData = res.json();
    }));
    expect(component.loading).toBe(false);
  }));

  it('#sendMail', fakeAsync(() => {

    // component.mailData= {"email":"basolutionsa@gmail.com", "adminEmail":"pavan.basolutions@gmail.com"};
    component.sendMail();
    tick();
    expect(component.success).toEqual('Your request as successfully send please check your mail for the further process');
    expect(component.errormsg).toBeNull();
    expect(component.loading).toBe(false);
    expect(component.popup1).toBe(true);

    // component.mailData= {email:"", adminEmail:"pavan.basolutions@gmail.com"};
    // component.sendMail();
    // tick();
    // expect(component.success).toEqual('');
    // expect(component.errormsg).toEqual('Invalid arguments');
    // expect(component.popup1).toBe(true);

    // component.mailData= {email:"basolutionsaa@gmail.com", adminEmail:"pavan.basolutions@gmail.com"};
    // component.sendMail();
    // tick();
    // expect(component.success).toEqual('');
    // expect(component.errormsg).toEqual('User not found or Contact to Tedpros');

    // expect(component.popup1).toBe(true);



  }));


  it('#submitKey', fakeAsync(() => {
    const keyFrm: NgForm = new NgForm([], []);
    component.keyData = {
      email: 'basolutionsa@gmail.com',
      adminEmail: 'pavan.basolutions@gmail.com',
      accessToken: 'JGCOWNGR2ZGCHS5J'
    };

    component.submitKey(keyFrm);
    tick();
    expect(component.keyupgrade).toEqual('Are you want to upgrade your application ?');
    expect(component.popup1).toBe(true);

    //   component.keyData= {
    //     email:'basolutionsa@gmail.com',
    //     adminEmail:'pavan.basolutions@gmail.com',
    //     accessToken:'JGCOWNGR2ZGCHS5J'
    //   };
    //   component.submitKey(keyFrm);
    //   tick();
    //  expect(component.errormsg).toEqual('Invaid Access Key or Invalid information');
    //  expect(component.popup1).toBe(true);


  }))


  it('#upgrade', fakeAsync(() => {
    component.upgrade();
    tick();

  }));

});
