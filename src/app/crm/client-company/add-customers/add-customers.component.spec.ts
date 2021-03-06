import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddCustomersComponent } from './add-customers.component';
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

describe('AddCustomersComponent', () => {
  let component: AddCustomersComponent;
  let fixture: ComponentFixture<AddCustomersComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const myFrm: NgForm = new NgForm([], []);
  const industries = [
    {
      id: '1',
      name: 'Information Technology'
    },
    {
      id: '2',
      name: 'Manufacturing'
    },
    {
      id: '3',
      name: 'Aerospace industry'
    },
    {
      id: '4',
      name: 'Agriculture'
    },
    {
      id: '5',
      name: 'Chemical industry'
    },
    {
      id: '6',
      name: 'Pharmaceutical industry'
    },
    {
      id: '7',
      name: 'Construction industry'
    },
    {
      id: '8',
      name: 'Education industry'
    },
    {
      id: '9',
      name: 'Electrical power industry'
    },
    {
      id: '10',
      name: 'Financial services industry'
    },
    {
      id: '11',
      name: 'Food industry'
    },
    {
      id: '12',
      name: 'Health care industry'
    }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCustomersComponent],
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
    fixture = TestBed.createComponent(AddCustomersComponent);
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

  it('#close', fakeAsync(() => {
    component.close();
    tick();
    expect(component.uploaded).toBe(true);
  }));

  it('#fileOverBase', fakeAsync(() => {
    component.fileOverBase(true);
    tick();
    expect(component.hasBaseDropZoneOver).toBe(true);
  }));

  it('#fileOverAnother', fakeAsync(() => {
    component.fileOverAnother(true);
    tick();
    expect(component.hasAnotherDropZoneOver).toBe(true);
  }));

  it('#getindustries', fakeAsync(() => {
    component.getindustries();
    tick();
    expect(component.loading).toBe(false);
  }));

  it('#addcomp', fakeAsync(() => {
    component.addcomp();
    tick();
    expect(component.companypopup).toBe(true);
  }));

  it('#closecompPopup', fakeAsync(() => {
    component.companypopup = true;
    component.closecompPopup();
    tick();
    expect(component.companypopup).toBe(false);
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

  it('#getAddress', fakeAsync(() => {
    component.cusData.address.zipCode = '25259';
    component.getAddress();
    tick();
    expect(component.cusData.countryId).toEqual('231');
  }));

  it('#addindustry', fakeAsync(() => {
    component.addindustry('', myFrm);
    tick();
    expect(component.contactError).toEqual('Fill required Fileds');

    component.addindustry('IT', myFrm);
    tick();
    expect(component.contactError).toEqual('');
    expect(component.data.statusCode.code).toEqual('200');
  }));

  it('#addCom', fakeAsync(() => {

    component.addCom(myFrm);
    tick();
    expect(component.message).toEqual('Client added successfully');
  }));

  it('#closePopup', fakeAsync(() => {
    component.closePopup();
    tick();
    expect(component.message).toEqual('');
  }));

  it('#setname', fakeAsync(() => {
    spyOn(component, 'setname').and.callThrough();
    component.setname('1');
    tick();
    expect(component.setname).toHaveBeenCalled();
  }));

  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.industries).toEqual(industries);
  }));

  it('#cancel', fakeAsync(() => {
    spyOn(locationStub, 'back');
    component.cancel();
    tick();
    expect(locationStub.back).toHaveBeenCalled();
  }));

  it('#fillCountry', fakeAsync(() => {
    component.fillCountry();
    tick();
    expect(component.cusData.countryId).toEqual('231');
  }));

  it('#formReset', fakeAsync(() => {
    component.formReset(myFrm);
    tick();
    expect(component.cusData.countryId).toEqual('231');
  }));

  it('#addContact', fakeAsync(() => {
    component.contacts = [];
    component.addContact(myFrm, '1', '', 'Req gather');
    tick();
    expect(component.addContactError).toEqual(null);
    component.contacts = [{
      userId: '1',
      name: 'David Smith',
      description: 'Req gather'
    }];
    component.addContact(myFrm, '1', '', 'Req gather');
    tick();
    expect(component.addContactError).toEqual('Duplicate data cannot be added');

    component.addContact(myFrm, '', '', 'Req gather');
    tick();
    expect(component.addContactError).toEqual('Select any user');

    component.addContact(myFrm, '1', '', '');
    tick();
    expect(component.addContactError).toEqual('Write a description');
  }));

  it('#removeContact', fakeAsync(() => {
    component.contacts = [{
      userId: '1',
      name: 'David Smith',
      description: 'Req gather'
    }];
    const contact = {
      userId: '1',
      name: 'David Smith',
      description: 'Req gather'
    };
    component.removeContact(contact);
    tick();
    expect(component.contacts).toEqual([]);
  }));
});
