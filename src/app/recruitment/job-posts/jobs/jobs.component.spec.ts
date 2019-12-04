import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { JobsComponent } from './jobs.component';
import { AddJobsComponent } from '../add-job/add-jobs.component';
import { Http, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableModule } from 'angular-6-datatable';
import { AuthenticationService } from '../../../core/services';
import { AuthServiceStub } from 'src/app/mocks/AuthServiceStub';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { EventEmittorStub } from 'src/app/mocks/EventEmittorStub';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { map } from 'rxjs/operators';
import { RouterStub } from 'src/app/mocks/RouterStub';



describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  const userServiceStub = new UserServiceStub();
  const activatedRouteStub = new ActivatedRouteStub();
  const authStub = new AuthServiceStub();
  const emmitterStub = new EventEmittorStub();

  let routerStub = new RouterStub();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobsComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: EventEmitterService, useValue: emmitterStub },
        { provide: AuthenticationService, useValue: authStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        DatePipe,
        AddJobsComponent
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        DataTableModule

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsComponent);
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

  // ngOnInit Completed
  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.loading).toBe(false);
  }));
  // copyJob(jobCode) Completed
  it('#copyJob', fakeAsync(() => {
    spyOn(routerStub, 'navigate');
    component.copyJob('SMLJB0015');
    tick();
    expect(localStorage.getItem('jobDetails')).toEqual('SMLJB0015');
    expect(routerStub.navigate).toHaveBeenCalled();
  }));
  // getJobList Completed
  it('#getJobList', fakeAsync(() => {
    userServiceStub.getJobsList().pipe(map(res => {
      component.finalData = res.json().data;
    }));
    component.getJobList();
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
  }));
  // Search Completed
  it('#search', fakeAsync(() => {
    userServiceStub.getJobsList().pipe(map(res => {
      component.finalData = res.json().data;
    }));
    tick();
    let term = null;
    let key = null;
    component.search(term, key);
    tick();
    expect(component.filterData).toEqual(component.finalData);
    term = 'testTerm';
    key = 'internalCode';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'jobCode';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'job.name';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'company.name';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'recruiter.firstName';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'datePosted';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);
    key = 'company.owner.firstName';
    component.search(term, key);
    tick();
    expect(component.availableRecords).toEqual(component.filterData.length);

  }));
  // sendLink Completed
  it('#sendLink', fakeAsync(() => {
    component.sendLink();
    tick();
    expect(component.loading).toBe(false);
    expect(component.isShowPopup).toBe(true);
  }));
  // closePopup Completed
  it('#closePopup', fakeAsync(() => {
    component.isShowPopup = true;
    component.closePopup();
    tick();
    expect(component.isShowPopup).toBe(false);
  }));
  // applyJob Completed
  it('#applyJob', fakeAsync(() => {
    component.applyJob('1', 'test@nomail.com', '1', '');
    tick();
    expect(component.loading).toBe(false);
  }));
  // editJob Completed
  it('#editJob', fakeAsync(() => {
    component.editJob();
    tick();
    expect(component.loading).toBe(false);
    expect(component.jobRes.data).toEqual('Data updated successfully');
  }));
  // closeModal3 Completed
  it('#closeModal3', fakeAsync(() => {
    component.selectCandidate = true;
    component.closeModal3();
    tick();
    expect(component.selectCandidate).toBe(false);
  }));
  // closeModal1 Completed
  it('#closeModal1', fakeAsync(() => {
    component.assignRecruiter = true;
    component.closeModal1();
    tick();
    expect(component.assignRecruiter).toBe(false);
  }));
  // closeModel2 Completed
  it('#closeModel2', fakeAsync(() => {
    component.jobApplyLink = true;
    component.closeModel2();
    tick();
    expect(component.jobApplyLink).toBe(false);
  }));
  // candidateSelect
  it('#candidateSelect', fakeAsync(() => {
    const id = 'applyModal';
    component.candidateSelect(id, 'SMLJB0015');
    tick();
    expect(component.selectCandidate).toBe(true);
    expect(component.candidatesAvailable).toEqual(2);
    expect(component.internalCode).toEqual('SMLJB0015');
  }));
  // recruiterAssign
  it('#recruiterAssign', fakeAsync(() => {
    const id = 'modal';
    component.recruiterAssign(id, 'SMLJB0015');
    tick();
    expect(component.assignRecruiter).toBe(true);
    expect(component.internalCode).toEqual('SMLJB0015');
  }));
  // linksend
  it('#linksend', fakeAsync(() => {
    const id = 'linkmodal';
    component.linksend(id, 'SMLJB0015');
    tick();
    expect(component.jobApplyLink).toBe(true);
    expect(component.internalCode).toEqual('SMLJB0015');
  }));

  // send candidate resume to client
  
  it('#sendResumeToClient', fakeAsync(() => {
    component.sendResumeToClient('SMLJB0048','4');
    tick();
    expect(component.sendresumeToClient).toBe(true);
  }));


});
