import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddJobsComponent } from './add-jobs.component';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableModule } from 'angular-6-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../core/services';
import { AuthServiceStub } from 'src/app/mocks/AuthServiceStub';
import { UserService } from '../../../core/services/user.service';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { EventEmittorStub } from 'src/app/mocks/EventEmittorStub';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { Location } from '@angular/common';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { CKEditorModule } from 'ng2-ckeditor';

import { map } from 'rxjs/operators';

describe('AddJobsComponent', () => {
  let component: AddJobsComponent;
  let fixture: ComponentFixture<AddJobsComponent>;
  const userServiceStub = new UserServiceStub();
  const activatedRouteStub = new ActivatedRouteStub();
  const authStub = new AuthServiceStub();
  const emmitterStub = new EventEmittorStub();
  const locationStub = new LocationStub();

  const companyId = 'SMC7030';
  const contactId = '42';
  const internalCode = 'SMLJB0015';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddJobsComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: EventEmitterService, useValue: emmitterStub },
        { provide: AuthenticationService, useValue: authStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Location, useValue: locationStub }
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        SharedModule,
        OwlNativeDateTimeModule,
        OwlDateTimeModule,
        NgMultiSelectDropDownModule.forRoot(),
        ArchwizardModule,
        CustomFormsModule,

        ReactiveFormsModule,
        DataTableModule,
        CKEditorModule,
        NgbModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobsComponent);
    component = fixture.componentInstance;
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // cancel
  it('#cancel', fakeAsync(() => {
    spyOn(locationStub, 'back');
    component.cancel();
    expect(locationStub.back).toHaveBeenCalled();
  }));

  // getJobDetails
  it('#getJobDetails', fakeAsync(() => {
    component.selAuth = [
      { id: '6', name: 'GC' },
      { id: '7', name: 'US Citizen' }
    ];
    component.getJobDetails(internalCode);
    tick();
    expect(component.jobData.internalCode).toEqual(internalCode);
    expect(component.publishRate).toBe(true);
  }));

  // onChange
  it('#onChange', fakeAsync(() => {
    spyOn(component, 'onChange');
    component.onChange(emmitterStub);
    tick();
    expect(component.onChange).toHaveBeenCalled();
  }));

  // checkPublishBill
  it('#checkPublishBill', fakeAsync(() => {
    component.publishRate = true;
    component.checkPublishBill();
    tick();
    expect(component.publishRate).toBe(false);
  }));

  // getCompanies
  it('#getCompanies', fakeAsync(() => {
    component.getCompanies();
    tick();
    expect(component.loading).toBe(false);
  }));

  // getCompanies
  it('#getcontacts', fakeAsync(() => {
    component.getcontacts(contactId, 1);
    tick();
    expect(component.loading).toBe(false);
  }));

  // getAddress
  it('#getAddress', fakeAsync(() => {
    component.jobData = {
      id: '12', company: 'SMC1001', internalCode: 'SMLJB0015', jobCode: 'J100566',
      contact: { id: '41', firstName: 'Head', lastName: 'Offices' }, job: 'Advance Java',
      datePosted: '2019-07-12', targetDate: '2019-07-27', priority: 'High', employmentType: 'Full Time',
      workAuthorisation: [{
        id: '6', name: 'GC'
      }, { id: '7', name: 'US Citizen' }],
      primarySkills: 'Java,angular', city: { id: '46965', name: 'Milwaukee' },
      state: {
        id: '3977', name: 'Wisconsin'
      }, country: {
        id: '231', name: 'United States'
      },
      zipCode: '25259', status: '1', jobStatus: '1', openings: '10', billRate: '150',
      recruiter: { userId: 'SMU1004', firstName: 'Mike', lastName: 'Jones' },
      recruiters: [{ userId: 'SMU1004', firstName: 'Mike', lastName: 'Jones' }],
      description: '', internalNotes: ' ', skill: [{ skillName: 'Java', experience: '10' }]
    };
    component.getAddress();
    tick();
    expect(component.zipError).toBeNull();
  }));

  // closecontPopup
  it('#closecontPopup', fakeAsync(() => {
    component.contactpopup = true;
    component.closecontPopup();
    tick();
    expect(component.contactpopup).toBe(false);
  }));

  // closecompPopup
  it('#closecompPopup', fakeAsync(() => {
    component.companypopup = true;
    component.closecompPopup();
    tick();
    expect(component.companypopup).toBe(false);
  }));

  // onItemSelect
  it('#onItemSelect', fakeAsync(() => {
    component.onItemSelect(internalCode);
    tick();
    expect(component.workautherror).toEqual('');
  }));

  // OnItemDeSelect
  it('#OnItemDeSelect', fakeAsync(() => {
    let item = { id: '6' };
    component.OnItemDeSelect(item);
    tick();
    expect(component.workautherror).toEqual('GC or US Citizen cannot be deselected');
    item = { id: '7' };
    component.OnItemDeSelect(item);
    tick();
    expect(component.workautherror).toEqual('GC or US Citizen cannot be deselected');
  }));

  // addSkill
  it('#addSkill', fakeAsync(() => {
    const addSkills: NgForm = new NgForm([], []);
    component.addSkill(addSkills, '', '', 'experience');
    tick();
    expect(component.skillBool).toEqual('Please specify valid skill');
    component.addSkill(addSkills, 'skill', 'name', 'experience');
    tick();
    expect(component.skillBool).toEqual('');
    component.skillData = [{ skillName: 'skill', experience: 'experience' }];
    component.addSkill(addSkills, 'skill', 'name', 'experience');
    tick();
    expect(component.skillBool).toEqual('Please specify valid skill');

  }));

  // removeSkill
  it('#removeSkill', fakeAsync(() => {
    const skill = { skillName: 'skill', experience: 'experience' };
    component.skillData = [{ skillName: 'skill', experience: 'experience' }];
    component.removeSkill(skill);
    tick();
    expect(component.skillData).toEqual([]);
  }));

  // addJob
  it('#addJob', fakeAsync(() => {
    const addJobFrm: NgForm = new NgForm([], []);
    component.selAuth = [];
    component.jobData = {
      id: '12', company: 'SMC1001', internalCode: 'SMLJB0015', jobCode: 'J100566',
      contact: { id: '41', firstName: 'Head', lastName: 'Offices' }, job: 'Advance Java',
      datePosted: '2019-07-12', targetDate: '2019-07-27', priority: 'High', employmentType: 'Full Time',
      workAuthorisation: [{
        id: '6', name: 'GC'
      }, { id: '7', name: 'US Citizen' }],
      primarySkills: 'Java,angular', city: { id: '46965', name: 'Milwaukee' },
      state: {
        id: '3977', name: 'Wisconsin'
      }, country: {
        id: '231', name: 'United States'
      },
      zipCode: '53225', status: '1', jobStatus: '1', openings: '10', billRate: '150',
      recruiter: { userId: 'SMU1004', firstName: 'Mike', lastName: 'Jones' },
      recruiters: [{ userId: 'SMU1004', firstName: 'Mike', lastName: 'Jones' }],
      description: '', internalNotes: ' ', skill: [{ skillName: 'Java', experience: '10' }]
    };
    component.addJob(addJobFrm);
    tick();
    expect(component.loading).toBe(false);
    expect(component.recError).toEqual('');
    component.selAuth = [
      { id: '6', name: 'GC' },
      { id: '7', name: 'US Citizen' }
    ];
    component.jobData = {
      id: '12', company: 'SMC1001', internalCode: 'SMLJB0015', jobCode: 'J100566',
      contact: { id: '41', firstName: 'Head', lastName: 'Offices' }, job: 'Advance Java',
      datePosted: '2019-07-12', targetDate: '2019-07-27', priority: 'High', employmentType: 'Full Time',
      workAuthorisation: [{
        id: '6', name: 'GC'
      }, { id: '7', name: 'US Citizen' }],
      primarySkills: 'Java,angular', city: { id: '46965', name: 'Milwaukee' },
      state: {
        id: '3977', name: 'Wisconsin'
      }, country: {
        id: '231', name: 'United States'
      },
      zipCode: '53225', status: '1', jobStatus: '1', openings: '10', billRate: '150',
      recruiter: {},
      recruiters: [],
      description: '', internalNotes: ' ', skill: [{ skillName: 'Java', experience: '10' }]
    };
    component.addJob(addJobFrm);
    tick();
    expect(component.isShowPopup).toBe(false);
    expect(component.recError).toEqual('Select a recruiter');
    // expect(component.loading).toBe(false);
    // expect(component.message).toEqual('Data added successfully');
  }));

  // closePopup
  it('#closePopup', fakeAsync(() => {
    component.isShowPopup = true;
    component.closePopup();
    tick();
    expect(component.isShowPopup).toBe(false);
  }));

  // addcomp
  it('#addcomp', fakeAsync(() => {
    component.addcomp();
    tick();
    expect(component.companypopup).toBe(true);
  }));

  // addcont
  it('#addcont', fakeAsync(() => {
    component.addcont(companyId);
    tick();
    expect(component.contactpopup).toBe(true);
  }));

  // reset
  it('#reset', fakeAsync(() => {
    const addJobFrm: NgForm = new NgForm([], []);
    const selAuth = [
      { id: '6', name: 'GC' },
      { id: '7', name: 'US Citizen' }
    ];
    component.reset(addJobFrm);
    tick();
    expect(localStorage.getItem('jobDetails')).toEqual('');
    expect(component.selAuth).toEqual(selAuth);
  }));

  // dateValidate
  it('#dateValidate', fakeAsync(() => {
    // component.jobData.datePosted = 'Fri Jul 26 2019 12:00:00 GMT+0530 (India Standard Time)';
    // component.jobData.targetDate = 'Thu Jul 25 2019 12:00:00 GMT+0530 (India Standard Time)';
    // component.dateValidate();
    // tick();
    // expect(component.dateError).toEqual('Please select a valid target date');
    // expect(component.jobData.targetDate).toEqual(component.jobData.datePosted);

    component.jobData.datePosted = 'Fri Jul 26 2019 12:00:00 GMT+0530 (India Standard Time)';
    component.jobData.targetDate = 'Sun Jul 28 2019 23:04:01 GMT+0530 (India Standard Time)';
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('');

  }));

  // addcontact
  it('#addcontact', fakeAsync(() => {
    const popupContact: NgForm = new NgForm([], []);
    component.contactpopup = true;
    component.addcontact('emailid', 'lastname', 'firstname', 'phnumber', popupContact);
    tick();
    expect(component.contactpopup).toBe(false);
    expect(component.contactpopupError).toEqual('');
  }));

  // addcompany
  it('#addcompany', fakeAsync(() => {
    const popupContact: NgForm = new NgForm([], []);
    component.companypopup = true;
    component.addcompany('emailId', 'countryid', 'primaryphone', 'companyname', popupContact);
    tick();
    expect(component.companypopup).toBe(false);
    expect(component.companypopupError).toEqual('');
  }));
});
