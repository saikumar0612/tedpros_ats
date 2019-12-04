import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AssignProjectComponent } from './assign-project.component';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../../core/services';
import { RouterTestingModule } from '@angular/router/testing';
import { UserServiceStub } from 'src/app/mocks/UserServiceStub';
import { AuthServiceStub } from 'src/app/mocks/AuthServiceStub';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { UserService } from '../../../core/services/user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

describe('AssignProjectComponent', () => {
  let component: AssignProjectComponent;
  let fixture: ComponentFixture<AssignProjectComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const authSutb = new AuthServiceStub();
  const companyId = 'SMC7032';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignProjectComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: AuthenticationService, useValue: authSutb }
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgMultiSelectDropDownModule.forRoot(),
        HttpModule,
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProjectComponent);
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

  /*
      * Author: G S Pavan Kumar
      * Created: 03rd August 2019
      * Comment: Start of code coverage
  */

  it('#cancel', fakeAsync(() => {
    spyOn(authSutb, 'cancel');
    component.cancel();
    tick();
    expect(authSutb.cancel).toHaveBeenCalled();
  }));

  it('#closePopup', fakeAsync(() => {
    component.isShowPopup = true;
    component.error = '';
    component.closePopup();
    tick();
    expect(component.isShowPopup).toBe(false);
    expect(component.error).toEqual('');
  }));

  // ngOnInit
  it('#ngOnInit', fakeAsync(() => {
    let usersData = [];
    usersData = [{ 'id': '1', 'username': 'admin', 'reporting_to': 0, 'fullname': '', 'first_name': 'David', 'last_name': 'Smith', 'middle_name': null, 'email': 'pavan.basolutions@gmail.com', 'status': '1', 'roles': [{ 'id': '1', 'roleName': 'Admin' }], 'employeeType': { 'id': '5', 'employeeType': 'Employee' }, 'userType': { 'id': '3', 'name': 'employee', 'typeName': 'Employee' }, 'jobTitle': { 'id': '1', 'job_title': 'unit testing' } }, { 'id': 'SMU1002', 'username': 'SMU1002', 'reporting_to': { 'id': 'SMU1002', 'fname': 'James', 'lname': 'Smith' }, 'fullname': '', 'first_name': 'James', 'last_name': 'Smith', 'middle_name': 'T', 'email': 'tester.basolutions@gmail.com', 'status': '1', 'roles': [{ 'id': '2', 'roleName': 'Recruiter' }, { 'id': '3', 'roleName': 'Employee' }], 'employeeType': { 'id': '1', 'employeeType': 'projleadceo' }, 'userType': { 'id': '3', 'name': 'employee', 'typeName': 'Employee' }, 'jobTitle': null }, { 'id': 'SMU1004', 'username': 'SMU1004', 'reporting_to': { 'id': '1', 'fname': 'David', 'lname': 'Smith' }, 'fullname': '', 'first_name': 'Mike', 'last_name': 'Jones', 'middle_name': '', 'email': 'pavankumargarimella91@gmail.com', 'status': '1', 'roles': [{ 'id': '3', 'roleName': 'Employee' }], 'employeeType': { 'id': '1', 'employeeType': 'projleadceo' }, 'userType': { 'id': '3', 'name': 'employee', 'typeName': 'Employee' }, 'jobTitle': null }, { 'id': 'SMU1005', 'username': 'SMU1005', 'reporting_to': { 'id': '1', 'fname': 'David', 'lname': 'Smith' }, 'fullname': '', 'first_name': 'gorge', 'last_name': 'relex', 'middle_name': 'joe', 'email': 'jorge@gmail.com', 'status': '1', 'roles': [{ 'id': '1', 'roleName': 'Admin' }, { 'id': '2', 'roleName': 'Recruiter' }], 'employeeType': { 'id': '1', 'employeeType': 'projleadceo' }, 'userType': { 'id': '1', 'name': 'client_employee', 'typeName': 'Client Employee' }, 'jobTitle': null }, { 'id': 'SMU1011', 'username': 'SMU1011', 'reporting_to': { 'id': 'SMU1002', 'fname': 'James', 'lname': 'Smith' }, 'fullname': '', 'first_name': 'Amarendra', 'last_name': 'Kotipalli', 'middle_name': 'kotipalli', 'email': 'amarendara@gmail.com', 'status': '1', 'roles': [{ 'id': '2', 'roleName': 'Recruiter' }, { 'id': '3', 'roleName': 'Employee' }], 'employeeType': { 'id': '5', 'employeeType': 'Employee' }, 'userType': { 'id': '3', 'name': 'employee', 'typeName': 'Employee' }, 'jobTitle': null }, { 'id': 'SMU1012', 'username': 'SMU1012', 'reporting_to': { 'id': 'SMU1011', 'fname': 'Amarendra', 'lname': 'Kotipalli' }, 'fullname': '', 'first_name': 'Sharmistha', 'last_name': 'Biswas', 'middle_name': '', 'email': 'sharmistha.basolutions@gmail.com', 'status': '1', 'roles': [{ 'id': '3', 'roleName': 'Employee' }], 'employeeType': { 'id': '5', 'employeeType': 'Employee' }, 'userType': { 'id': '3', 'name': 'employee', 'typeName': 'Employee' }, 'jobTitle': null }, { 'id': 'SMU1013', 'username': 'SMU1013', 'reporting_to': { 'id': 'SMU1011', 'fname': 'Amarendra', 'lname': 'Kotipalli' }, 'fullname': '', 'first_name': 'Amy', 'last_name': 'Jackson', 'middle_name': '', 'email': 'amar.basolutions@gmail.com', 'status': '1', 'roles': [{ 'id': '1', 'roleName': 'Admin' }], 'employeeType': { 'id': '5', 'employeeType': 'Employee' }, 'userType': { 'id': '3', 'name': 'employee', 'typeName': 'Employee' }, 'jobTitle': null }, { 'id': 'SMU1014', 'username': 'SMU1014', 'reporting_to': { 'id': 'SMU1012', 'fname': 'Sharmistha', 'lname': 'Biswas' }, 'fullname': '', 'first_name': 'Saigeeta', 'last_name': 'Konchada', 'middle_name': 'VenkataSuvarchala', 'email': 'geeta.basolutions@gmail.com', 'status': '1', 'roles': [{ 'id': '3', 'roleName': 'Employee' }], 'employeeType': { 'id': '5', 'employeeType': 'Employee' }, 'userType': { 'id': '3', 'name': 'employee', 'typeName': 'Employee' }, 'jobTitle': null }, { 'id': 'SMU1018', 'username': 'SMU1018', 'reporting_to': 0, 'fullname': '', 'first_name': 'Frank', 'last_name': 'Daniel', 'middle_name': '', 'email': 'evie_1256@gmail.com', 'status': '1', 'roles': [{ 'id': '3', 'roleName': 'Employee' }], 'employeeType': { 'id': '6', 'employeeType': 'Vendor Employee' }, 'userType': { 'id': '2', 'name': 'vendor_employee', 'typeName': 'Vendor Employee' }, 'jobTitle': null }, { 'id': 'SMU1019', 'username': 'SMU1019', 'reporting_to': 0, 'fullname': '', 'first_name': 'Peter', 'last_name': 'Ethan', 'middle_name': '', 'email': 'basolutionsa@gmail.com', 'status': '1', 'roles': [{ 'id': '3', 'roleName': 'Employee' }], 'employeeType': { 'id': '6', 'employeeType': 'Vendor Employee' }, 'userType': { 'id': '2', 'name': 'vendor_employee', 'typeName': 'Vendor Employee' }, 'jobTitle': null }, { 'id': 'SMU1018', 'username': 'SMU1018', 'reporting_to': 0, 'fullname': '', 'first_name': 'Frank', 'last_name': 'Daniel', 'middle_name': '', 'email': 'evie_1256@gmail.com', 'status': '1', 'roles': [{ 'id': '3', 'roleName': 'Employee' }], 'employeeType': { 'id': '6', 'employeeType': 'Vendor Employee' }, 'userType': { 'id': '2', 'name': 'vendor_employee', 'typeName': 'Vendor Employee' }, 'jobTitle': null }, { 'id': 'SMU1019', 'username': 'SMU1019', 'reporting_to': { 'id': 'SMU1018', 'fname': 'Frank', 'lname': 'Daniel' }, 'fullname': '', 'first_name': 'Peter', 'last_name': 'Ethan', 'middle_name': '', 'email': 'basolutionsa@gmail.com', 'status': '1', 'roles': [{ 'id': '3', 'roleName': 'Employee' }], 'employeeType': { 'id': '2', 'employeeType': 'Marketing Executive' }, 'userType': { 'id': '1', 'name': 'client_employee', 'typeName': 'Client Employee' }, 'jobTitle': null }, { 'id': 'SMU1022', 'username': 'SMU1022', 'reporting_to': { 'id': 'SMU1002', 'fname': 'James', 'lname': 'Smith' }, 'fullname': '', 'first_name': 'sujatha', 'last_name': 'p', 'middle_name': '', 'email': 'sujatha.basolutions@gmail.com', 'status': '1', 'roles': [{ 'id': '2', 'roleName': 'Recruiter' }, { 'id': '3', 'roleName': 'Employee' }], 'employeeType': { 'id': '5', 'employeeType': 'Employee' }, 'userType': { 'id': '3', 'name': 'employee', 'typeName': 'Employee' }, 'jobTitle': null }, { 'id': 'SMU1023', 'username': 'SMU1023', 'reporting_to': { 'id': 'SMU1002', 'fname': 'James', 'lname': 'Smith' }, 'fullname': '', 'first_name': 'Pavan', 'last_name': 'Garimella', 'middle_name': 'Kumar', 'email': 'amar_kotipalli1981@yahoo.co.in', 'status': '1', 'roles': [{ 'id': '1', 'roleName': 'Admin' }, { 'id': '2', 'roleName': 'Recruiter' }], 'employeeType': { 'id': '1', 'employeeType': 'projleadceo' }, 'userType': { 'id': '3', 'name': 'employee', 'typeName': 'Employee' }, 'jobTitle': null }, { 'id': 'SMU1024', 'username': 'SMU1024', 'reporting_to': { 'id': 'SMU1022', 'fname': 'sujatha', 'lname': 'p' }, 'fullname': '', 'first_name': 'Fidel', 'last_name': 'Martin', 'middle_name': '', 'email': 'pavan@basolutions.in', 'status': '1', 'roles': [{ 'id': '3', 'roleName': 'Employee' }], 'employeeType': { 'id': '5', 'employeeType': 'Employee' }, 'userType': { 'id': '3', 'name': 'employee', 'typeName': 'Employee' }, 'jobTitle': { 'id': '11', 'job_title': 'Web Developers' } }, { 'id': 'SMU1026', 'username': 'SMU1026', 'reporting_to': { 'id': 'SMU1019', 'fname': 'Peter', 'lname': 'Ethan' }, 'fullname': '', 'first_name': 'Juan', 'last_name': 'Carlos', 'middle_name': '', 'email': 'laxman.basolutions@gmail.com', 'status': '1', 'roles': [{ 'id': '3', 'roleName': 'Employee' }], 'employeeType': { 'id': '3', 'employeeType': 'PMO' }, 'userType': { 'id': '3', 'name': 'employee', 'typeName': 'Employee' }, 'jobTitle': null }];
    usersData.forEach(obj => {
      obj.fullname = (obj.first_name + ' ' + obj.last_name);
    });
    console.log(usersData);
    tick();
    component.ngOnInit();
    tick();
    expect(component.users).toEqual(usersData);
  }));

  // activites
  it('#activites', fakeAsync(() => {
    component.isShowPopup = true;
    component.error = '';
    component.activites('PRJ0006');
    tick();
    expect(component.isShowPopup).toBe(true);
    expect(component.error).toEqual('');
  }));

  // assignProject
  it('#assignProject', fakeAsync(() => {
    const myFrm: NgForm = new NgForm([], []);
    component.isShowPopup = false;
    component.error = '';
    component.assignProject(myFrm);
    tick();
    expect(component.isShowPopup).toBe(true);
    expect(component.message).toEqual('Project assigned successfully');
    expect(component.error).toEqual(null);

    // component.assignProject();
    // tick();
    // expect(component.isShowPopup).toBe(true);
    // expect(component.message).toEqual(null);
    // expect(component.error).toEqual(null);
  }));

  // closePopup
  it('#closePopup', fakeAsync(() => {
    component.isShowPopup = true;
    component.closePopup();
    tick();
    expect(component.isShowPopup).toBe(false);
  }));

  // cancel
  it('#cancel', fakeAsync(() => {
    spyOn(authSutb, 'cancel');
    component.cancel();
    tick();
    expect(authSutb.cancel).toHaveBeenCalled();
  }));

  /*
      * Author: G S Pavan Kumar
      * Created: 03rd August 2019
      * Comment: Start of code coverage
  */
});
