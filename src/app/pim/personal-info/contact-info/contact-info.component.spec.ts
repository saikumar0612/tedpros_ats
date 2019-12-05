import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ContactInfoComponent } from './contact-info.component';
import { AuthenticationService, UserService } from '../../../core/services';
import { SuperService } from '../../../core/services/super.service';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AuthServiceStub } from '../../../mocks/AuthServiceStub';
import { UserServiceStub } from '../../../mocks/UserServiceStub';

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
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { map } from 'rxjs/operators';
import { DataTableModule } from 'angular-6-datatable';

describe('ContactInfoComponent', () => {
  let component: ContactInfoComponent;
  let fixture: ComponentFixture<ContactInfoComponent>;
  const AuthService = new AuthServiceStub();
  const superService = new SuperServiceStub();
  const locationStub = new LocationStub();
  const userStub = new UserServiceStub();
  const contactInfo = {
    homeTelephone: '3369856985',
    workTelephone: '7896854896',
    otherEmail: 'brocks@gmail.com',
    addressLine1: '65-124, Arizona',
    addressLine2: 'Arizona2',
    street: 'Arizonas',
    city: {
      id: '47643',
      name: 'Clifton'
    },
    state: {
      id: '3953',
      name: 'New Jersey'
    },
    zip: '25260',
    country: {
      id: '231',
      name: 'United States'
    }
  };
  const emergencylist = [
    {
      name: 'Simon Jackson',
      dob: '1995-01-10',
      relation: 4,
      relationname: 'Brother',
      email: 'simon@jackson.com',
      contact: '7183140027'
    },
    {
      name: 'Sharmistha Biswas',
      dob: '1990-11-21',
      relation: '8',
      relationname: 'Daughter',
      email: '',
      contact: '8297047433'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactInfoComponent],
      providers: [
        { provide: AuthenticationService, useValue: AuthService },
        { provide: SuperService, useValue: superService },
        { provide: UserService, useValue: userStub },
        // { provide: Router, useValue: route },
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
    fixture = TestBed.createComponent(ContactInfoComponent);
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

  it('#contactInformation', fakeAsync(() => {
    component.contactInformation();
    tick();
    expect(component.contactInfo).toEqual(contactInfo);
  }));

  it('#getEmergencyInformation', fakeAsync(() => {
    component.getEmergencyInformation();
    tick();
    expect(component.emergencylist1).toEqual(emergencylist);
  }));

  it('#change', fakeAsync(() => {
    spyOn(component, 'change');
    component.change('');
    tick();
    expect(component.change).toHaveBeenCalled();
  }));

  it('#getCity', fakeAsync(() => {
    spyOn(component, 'getCity');
    component.getCity('');
    tick();
    expect(component.getCity).toHaveBeenCalled();
  }));

  it('#dateOfBirthValidation', fakeAsync(() => {
    component.checkdate = new Date();
    component.emergencylist.dob = 'Wed Nov 14 2018 00:00:00 GMT+0530 (India Standard Time)';
    component.dateOfBirthValidation();
    tick();
    expect(component.doberror).toEqual('Employee Below the Age 14 are not eligible');
  }));

  it('#getAddress', fakeAsync(() => {

    component.contactInfo.zip = '25259';
    component.getAddress();
    tick();
    expect(component.contactInfo.city.id).toEqual('47684');
  }));

  it('#getAddress1', fakeAsync(() => {
    component.contactDetails.zip = '25259';
    component.getAddress1();
    tick();
    expect(component.contactDetails.city.id).toEqual('47684');
  }));

  it('#editEmergency', fakeAsync(() => {
    const emergencyInfo = {
      name: 'Simon Jackson',
      dob: '1995-01-10',
      relation: 4,
      relationname: 'Brother',
      email: 'simon@jackson.com',
      contact: '7183140027'
    };
    component.editEmergency(emergencyInfo);
    tick();
    expect(component.indexofcontactDetails).toEqual(-1);
  }));

  it('#ngOnInit', fakeAsync(() => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    tick();
    expect(component.ngOnInit).toHaveBeenCalled();
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

  it('#editContact', fakeAsync(() => {
    component.editContact();
    tick();
    expect(component.displayContact).toBe(true);
  }));

  it('#editEmergencyInfo', fakeAsync(() => {
    component.editEmergencyInfo();
    tick();
    expect(component.displayEmergency).toBe(true);
  }));

  it('#backContact', fakeAsync(() => {
    component.backContact();
    tick();
    expect(component.displayContact).toBe(false);
  }));

  it('#backEmergencyContact', fakeAsync(() => {
    const myFrm: NgForm = new NgForm([], []);
    component.backEmergencyContact(myFrm);
    tick();
    expect(component.displayEmergency).toBe(false);
  }));

  it('#editContactInfo', fakeAsync(() => {
    component.editContactInfo();
    tick();
    expect(component.info.statusCode.code).toEqual('200');
  }));

  it('#resetForm', fakeAsync(() => {
    const myFrm: NgForm = new NgForm([], []);
    component.resetForm(myFrm);
    tick();
    expect(component.contactInfo.country.id).toEqual('231');
  }));

  it('#reset', fakeAsync(() => {
    const myFrm: NgForm = new NgForm([], []);
    component.reset();
    tick();
    expect(component.contactDetails.country.id).toEqual('231');
  }));

  it('#addContactInfo', fakeAsync(() => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    component.addContactInfo();
    tick();
    expect(component.info.statusCode.code).toEqual('200');
    expect(routerstub.navigate).toHaveBeenCalled();
  }));


  it('#addEmergency', fakeAsync(() => {
    component.addEmergency();
    tick();
    expect(component.info.statusCode.code).toEqual('200');
  }));

  it('#closePopup1', fakeAsync(() => {
    component.isShowPopup1 = true;
    component.closePopup1();
    tick();
    expect(component.isShowPopup1).toBe(false);
  }));

  it('#removeEmergency', fakeAsync(() => {
    const emergencyInfo = {
      name: 'Simon Jackson',
      dob: '1995-01-10',
      relation: 4,
      relationname: 'Brother',
      email: 'simon@jackson.com',
      contact: '7183140027'
    };
    const emergencyList = [{
      name: 'Simon Jackson',
      dob: '1995-01-10',
      relation: 4,
      relationname: 'Brother',
      email: 'simon@jackson.com',
      contact: '7183140027'
    }];
    component.removeEmergency(emergencyInfo);
    tick();
    expect(component.emergencylist1).toEqual(emergencyList);
  }));

  // insertEmergency(addUser: NgForm, name, relation, relationname, contact, email, dob)

  it('#insertEmergency', fakeAsync(() => {
    const myFrm: NgForm = new NgForm([], []);
    component.indexofcontactDetails = 0;
    component.emergencylist1 = [{
      name: 'Sharmistha Biswas',
      dob: '1990-11-21',
      relation: '8',
      relationname: 'Daughter',
      email: '',
      contact: '8297047433'
    }];
    component.insertEmergency(myFrm, 'Simon Jackson', 4, 'Brother', '7183140027', 'simon@jackson.com',
      'Wed Nov 14 2018 00:00:00 GMT+0530 (India Standard Time)');
    tick();
    expect(component.indexofcontactDetails).toBe(null);

    component.indexofcontactDetails = null;
    const emergencyInfo = {
      name: 'Simon Jackson',
      dob: '1995-01-10',
      relation: 4,
      relationname: 'Brother',
      email: 'simon@jackson.com',
      contact: '7183140027'
    };
    component.emergencylist1 = [{
      name: 'Simon Jackson',
      dob: '1995-01-10',
      relation: 4,
      relationname: 'Brother',
      email: 'simon@jackson.com',
      contact: '7183140027'
    }];
    component.insertEmergency(myFrm, 'Simon Jackson', 4, 'Brother', '7183140027', 'simon@jackson.com',
      'Wed Nov 14 2018 00:00:00 GMT+0530 (India Standard Time)');
    tick();
    expect(component.errormsg).toEqual('Duplicate data cannot be added');
  }));

  it('#closePopup', fakeAsync(() => {
    component.isShowPopup = true;
    component.closePopup();
    tick();
    expect(component.isShowPopup).toBe(false);
  }));
});
