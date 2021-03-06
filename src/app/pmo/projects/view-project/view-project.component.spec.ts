import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ViewProjectComponent } from './view-project.component';
import { Location } from '@angular/common';
import { UserService } from 'src/app/core/services';
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
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { map } from 'rxjs/operators';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';

describe('ViewProjectComponent', () => {
  let component: ViewProjectComponent;
  let fixture: ComponentFixture<ViewProjectComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const activatedRouteStub = new ActivatedRouteStub();
  const projectId = 'PRJ0006';
  const cusInfo = {
    projectId: 'PRJ0006',
    customer: {
      id: 'SMC7029',
      name: 'Jones IT'
    },
    projectName: 'sandly',
    projectDesc: 'test',
    isApproved: '1',
    startDate: '2019-07-25T06:30:00.000Z',
    endDate: '2019-07-26T06:30:00.000Z',
    internalApprover: {
      userId: 'SMU1004',
      firstName: 'Mike',
      lastName: 'Jones',
      emailId: 'pavankumargarimella91@gmail.com',
      phoneNo: ''
    },
    externalApprover: {
      id: 'SMU1025',
      first_name: 'Sharmistha',
      last_name: 'Biswas',
      middle_name: ''
    },
    isPrimary: '1',
    activities: [
      {
        id: '9',
        name: 'project'
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        DatePipe
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
    fixture = TestBed.createComponent(ViewProjectComponent);
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

  // ngOnInit
  it('#ngOnInit', fakeAsync(() => {
    component.cusInfo.id = projectId;
    component.ngOnInit();
    tick();
    expect(component.cusInfo).toEqual(cusInfo);
    activatedRouteStub.paramMap.subscribe(res => console.log(res));
  }));

  // activites
  it('#activites', fakeAsync(() => {
    const activitieslist = [{ id: '9', name: 'project' }];
    component.activites(projectId);
    tick();
    expect(component.activitieslist).toEqual(activitieslist);
  }));

  // addActivity
  it('#addActivity', fakeAsync(() => {
    component.activityData = {};
    const activitieslist = { id: 'id', name: 'name' };
    component.addActivity('id', 'name');
    tick();
    expect(component.activityData).toEqual(activitieslist);
  }));

  // cancel
  it('#cancel', fakeAsync(() => {
    spyOn(locationStub, 'back');
    component.cancel();
    tick();
    expect(locationStub.back).toHaveBeenCalled();
  }));

  // editActivity
  it('#editActivity', fakeAsync(() => {
    component.editActivity({ id: 'id', name: 'name' });
    tick();
    expect(component.activitieslist).toEqual([]);
  }));

  /*
      * Author: G S Pavan Kumar
      * Created: 03rd August 2019
      * Comment: end of code coverage
  */
});
