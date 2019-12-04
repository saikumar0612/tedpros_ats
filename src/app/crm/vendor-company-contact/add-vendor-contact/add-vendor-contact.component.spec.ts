import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddVendorContactComponent } from './add-vendor-contact.component';
import { UserService } from 'src/app/core/services';
import { Location } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { DataTableModule } from 'angular-6-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { map } from 'rxjs/operators';

describe('AddVendorContactComponent', () => {
  let component: AddVendorContactComponent;
  let fixture: ComponentFixture<AddVendorContactComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const myFrm: NgForm = new NgForm([], []);
  const vendorList = [
    {
      companyId: 'df132',
      companyName: 'A & B Company',
      logo: null,
      city: {
        id: '43228',
        name: 'Sacramento'
      },
      state: {
        id: '3924',
        name: 'California'
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: 'Ravi',
      phoneNumber: '9778646546',
      companyType: 'vendor',
      owner: {
        id: 'SMU1005',
        name: 'gorge relex'
      },
      status: '1'
    },
    {
      companyId: 'df136',
      companyName: 'A & B Solutions',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: ''
    },
    {
      companyId: 'V142',
      companyName: 'A O Smithes',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: '1'
    },
    {
      companyId: 'WBC1486',
      companyName: 'Airy Soft',
      logo: null,
      city: {
        id: '46035',
        name: 'Horsham'
      },
      state: {
        id: '3963',
        name: 'Pennsylvania'
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: 'Sam Billings',
      phoneNumber: '7177176565',
      companyType: 'vendor',
      owner: {
        id: '1',
        name: 'pavan basolutions'
      },
      status: '1'
    },
    {
      companyId: 'V139',
      companyName: 'Aloha Petroleum',
      logo: null,
      city: {
        id: '42772',
        name: 'Little Rock'
      },
      state: {
        id: '3922',
        name: 'Arkansas'
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: 'sajood',
      phoneNumber: '9630258741',
      companyType: 'vendor',
      owner: {
        id: 'SMU1004',
        name: 'Mike Jones'
      },
      status: '1'
    },
    {
      companyId: 'V144',
      companyName: 'Alohab Petroleum',
      logo: null,
      city: {
        id: '42772',
        name: 'Little Rock'
      },
      state: {
        id: '3922',
        name: 'Arkansas'
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: 'sajood',
      phoneNumber: '+152-6958695888',
      companyType: 'vendor',
      owner: {
        id: 'SMU1004',
        name: 'Mike Jones'
      },
      status: '1'
    },
    {
      companyId: 'V146',
      companyName: 'Alohabge Petroleum',
      logo: null,
      city: {
        id: '42772',
        name: 'Little Rock'
      },
      state: {
        id: '3922',
        name: 'Arkansas'
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: 'sajood',
      phoneNumber: '+152-6958695000',
      companyType: 'vendor',
      owner: {
        id: 'SMU1004',
        name: 'Mike Jones'
      },
      status: '1'
    },
    {
      companyId: 'V141',
      companyName: 'AO Smithes',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: '1'
    },
    {
      companyId: 'SMV2003',
      companyName: 'BASolutions',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: ''
    },
    {
      companyId: 'SMV2005',
      companyName: 'Cognizant',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '5569852100',
      companyType: 'vendor',
      owner: {
        id: 'SMU1005',
        name: 'gorge relex'
      },
      status: ''
    },
    {
      companyId: 'V145',
      companyName: 'Cognizantss',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: '1'
    },
    {
      companyId: 'V143',
      companyName: 'Color Solutions',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: '1'
    },
    {
      companyId: 'SMV2006',
      companyName: 'Deloitte',
      logo: null,
      city: {
        id: '46035',
        name: 'Horsham'
      },
      state: {
        id: '3963',
        name: 'Pennsylvania'
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: 'peter',
      phoneNumber: '7741000025',
      companyType: 'vendor',
      owner: {
        id: 'SMU1004',
        name: 'Mike Jones'
      },
      status: '2'
    },
    {
      companyId: 'SMI6001462',
      companyName: 'General Motors',
      logo: null,
      city: {
        id: '44301',
        name: 'Naperville'
      },
      state: {
        id: '3934',
        name: 'Illinois'
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: 'Mary Smith',
      phoneNumber: '+567-5645897892',
      companyType: 'vendor',
      owner: {
        id: '1',
        name: 'pavan basolutions'
      },
      status: '1'
    },
    {
      companyId: 'df134',
      companyName: 'General MotorsH MART',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: ''
    },
    {
      companyId: 'df133',
      companyName: 'H MART',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: ''
    },
    {
      companyId: 'df137',
      companyName: 'H Mart America',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: ''
    },
    {
      companyId: 'df135',
      companyName: 'H MART1',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: ''
    },
    {
      companyId: 'df138',
      companyName: 'Hart-1',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: ''
    },
    {
      companyId: 'V140',
      companyName: 'Hawaiian Telcom',
      logo: null,
      city: {
        id: '42670',
        name: 'Anchorage'
      },
      state: {
        id: '3920',
        name: 'Alaska'
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: 'Dheeraj',
      phoneNumber: '9958562365',
      companyType: 'vendor',
      owner: {
        id: 'SMU1002',
        name: 'James Smith'
      },
      status: '1'
    },
    {
      companyId: 'WBC1485',
      companyName: 'Medifast',
      logo: null,
      city: {
        id: '46022',
        name: 'Gwynedd'
      },
      state: {
        id: '3963',
        name: 'Pennsylvania'
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: 'peter',
      phoneNumber: '1032547850',
      companyType: 'vendor',
      owner: {
        id: 'SMU1018',
        name: 'Frank Daniel'
      },
      status: '2'
    },
    {
      companyId: 'V147',
      companyName: 'Philips',
      logo: '',
      city: {
        id: '44132',
        name: 'Aurora'
      },
      state: {
        id: '3934',
        name: 'Illinois'
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: 'Stephen',
      phoneNumber: '4564564649',
      companyType: 'vendor',
      owner: {
        id: 'S11295',
        name: 'tom peters'
      },
      status: '1'
    },
    {
      companyId: 'SMV2004',
      companyName: 'shanmug',
      logo: null,
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '0',
        name: null
      },
      country: {
        id: '231',
        name: 'United States'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: ''
    },
    {
      companyId: 'V148',
      companyName: 'Tedpro',
      logo: '',
      city: {
        id: '0',
        name: null
      },
      state: {
        id: '2',
        name: 'Andhra Pradesh'
      },
      country: {
        id: '101',
        name: 'India'
      },
      billingContact: '',
      phoneNumber: '',
      companyType: 'vendor',
      owner: {
        id: '',
        name: null
      },
      status: '1'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddVendorContactComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub }
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
    fixture = TestBed.createComponent(AddVendorContactComponent);
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

  it('#getCompanies', fakeAsync(() => {
    component.getCompanies();
    tick();
    expect(component.companies).toEqual(vendorList);
  }));

  it('#addcompany', fakeAsync(() => {
    component.addcompany('noreply@tejsoft.com', '231', '1234567890', 'Tej Soft');
    tick();
    expect(component.companypopup).toBe(true);

    component.addcompany('noreply@tejsoft.com', '231', '', 'Tej Soft');
    tick();
    expect(component.contactError).toEqual('Fill required Fileds');
  }));

  it('#addcomp', fakeAsync(() => {
    component.addcomp();
    tick();
    expect(component.companypopup).toBe(true);
  }));

  it('#closecompPopup', fakeAsync(() => {
    component.closecompPopup();
    tick();
    expect(component.contactError).toEqual('');
  }));

  it('#change', fakeAsync(() => {
    component.change('231');
    tick();
    expect(component.loading).toBe(false);
  }));

  it('#state', fakeAsync(() => {
    component.state('231');
    tick();
    expect(component.loading).toBe(false);
  }));

  it('#getcontacts', fakeAsync(() => {
    component.getcontacts('42');
    tick();
    expect(component.loading).toBe(false);
  }));

  it('#getAddress', fakeAsync(() => {
    component.cusData.address.zipCode = '25259';
    component.getAddress();
    tick();
    expect(component.cusData.countryId).toEqual('231');
  }));

  it('#checkContact', fakeAsync(() => {
    component.cusData.emailId = '';
    component.cusData.phoneNo = '';
    component.checkContact(myFrm);
    tick();
    expect(component.contPhError).toEqual('Phone number cannot be blank');
    component.cusData.emailId = 'noreply@tedpros.com';
    component.cusData.phoneNo = '';
    component.checkContact(myFrm);
    tick();
    expect(component.contPhError).toEqual('Phone number cannot be blank');
    component.cusData.emailId = '';
    component.cusData.phoneNo = '1234567890';
    component.checkContact(myFrm);
    tick();
    expect(component.contEmError).toEqual('Email cannot be blank');
    component.cusData.emailId = 'noreply@tedpros.com';
    component.cusData.phoneNo = '1234567890';
    component.checkContact(myFrm);
    tick();
    expect(component.contEmError).toEqual(null);
    expect(component.checker).toBe(true);
  }));

  it('#addCom', fakeAsync(() => {

    component.addCom(myFrm);
    tick();
    expect(component.message).toEqual('Client added successfully');
  }));

  it('#closePopup', fakeAsync(() => {
    component.isShowPopup = true;
    component.closePopup();
    tick();
    expect(component.companypopup).toBe(false);
  }));

  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.companies).toEqual(vendorList);
  }));

  it('#dateValidate', fakeAsync(() => {
    component.cusData.personalInfo.doBirth = 'Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)';
    // Sun Sep 22 2019 00:00:00 GMT+0530 (India Standard Time)
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('Candidates Below the Age 14 are not eligible');

    component.cusData.personalInfo.doBirth = 'Mon Feb 10 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('');
  }));

  it('#dateValidate1', fakeAsync(() => {
    component.cusData.personalInfo.doBirth = 'Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.cusData.personalInfo.anniversary = 'Sun Sep 22 2019 00:00:00 GMT+0530 (India Standard Time)';
    // Sun Sep 22 2019 00:00:00 GMT+0530 (India Standard Time)
    component.dateValidate1();
    tick();
    expect(component.dateError1).toEqual('Min Age Difference 14 yr from Date Of Birth');

    component.cusData.personalInfo.doBirth = 'Mon Feb 10 2019 00:00:00 GMT+0530 (India Standard Time)';
    component.cusData.personalInfo.anniversary = 'Thu Sep 22 2016 00:00:00 GMT+0530 (India Standard Time)';
    component.dateValidate1();
    tick();
    expect(component.dateError1).toEqual('');
  }));

  it('#cancel', fakeAsync(() => {
    spyOn(locationStub, 'back');
    component.cancel();
    tick();
    expect(locationStub.back).toHaveBeenCalled();
  }));
});
