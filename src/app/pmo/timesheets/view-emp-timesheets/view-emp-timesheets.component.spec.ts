import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ViewEmpTimesheetsComponent } from './view-emp-timesheets.component';
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
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { map } from 'rxjs/operators';

describe('ViewEmpTimesheetsComponent', () => {
  let component: ViewEmpTimesheetsComponent;
  let fixture: ComponentFixture<ViewEmpTimesheetsComponent>;
  const userServiceStub = new UserServiceStub();
  const activatedRouteStub = new ActivatedRouteStub();
  const authStub = new AuthServiceStub();
  const emmitterStub = new EventEmittorStub();
  const locationStub = new LocationStub();
  const sheetData = {
    timesheetId: '8',
    totalHours: 56,
    description: 'ok',
    startDate: '2019-06-30',
    endDate: '2019-07-06',
    status: 'APPROVED',
    details: [
      {
        id: 'PRJ0002',
        name: 'Project Hanksong',
        activities: {
          id: '2',
          name: 'Tester',
          activityHours: 28,
          data: [
            {
              date: '2019-06-30',
              timesheet: {
                id: '75',
                hours: '4',
                description: 'test'
              }
            },
            {
              date: '2019-07-01',
              timesheet: {
                id: '76',
                hours: '4',
                description: 'test'
              }
            },
            {
              date: '2019-07-02',
              timesheet: {
                id: '77',
                hours: '4',
                description: 'test'
              }
            },
            {
              date: '2019-07-03',
              timesheet: {
                id: '78',
                hours: '4',
                description: 'test'
              }
            },
            {
              date: '2019-07-04',
              timesheet: {
                id: '79',
                hours: '4',
                description: 'test'
              }
            },
            {
              date: '2019-07-05',
              timesheet: {
                id: '80',
                hours: '4',
                description: 'test'
              }
            },
            {
              date: '2019-07-06',
              timesheet: {
                id: '81',
                hours: '4',
                description: 'test'
              }
            }
          ]
        }
      },
      {
        id: 'PRJ0002',
        name: 'Project Hanksong',
        activities: {
          id: '10',
          name: 'Testers',
          activityHours: 0,
          data: [
            {
              date: '2019-06-30',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-01',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-02',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-03',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-04',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-05',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-06',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            }
          ]
        }
      },
      {
        id: 'PRJ0002',
        name: 'Project Hanksong',
        activities: {
          id: '1',
          name: 'CICD',
          activityHours: 0,
          data: [
            {
              date: '2019-06-30',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-01',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-02',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-03',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-04',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-05',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-06',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            }
          ]
        }
      },
      {
        id: 'PRJ0001',
        name: 'SM Logics',
        activities: {
          id: '1',
          name: 'CICD',
          activityHours: 28,
          data: [
            {
              date: '2019-06-30',
              timesheet: {
                id: '82',
                hours: '4',
                description: 'integration and configuration of Jenkins'
              }
            },
            {
              date: '2019-07-01',
              timesheet: {
                id: '83',
                hours: '4',
                description: 'integration and configuration of Jenkins'
              }
            },
            {
              date: '2019-07-02',
              timesheet: {
                id: '84',
                hours: '4',
                description: 'integration and configuration of Jenkins'
              }
            },
            {
              date: '2019-07-03',
              timesheet: {
                id: '85',
                hours: '4',
                description: 'integration and configuration of Jenkins'
              }
            },
            {
              date: '2019-07-04',
              timesheet: {
                id: '86',
                hours: '4',
                description: 'integration and configuration of Jenkins'
              }
            },
            {
              date: '2019-07-05',
              timesheet: {
                id: '87',
                hours: '4',
                description: 'integration and configuration of Jenkins'
              }
            },
            {
              date: '2019-07-06',
              timesheet: {
                id: '88',
                hours: '4',
                description: 'integration and configuration of Jenkins'
              }
            }
          ]
        }
      },
      {
        id: 'PRJ0001',
        name: 'SM Logics',
        activities: {
          id: '8',
          name: 'Submit the project',
          activityHours: 0,
          data: [
            {
              date: '2019-06-30',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-01',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-02',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-03',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-04',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-05',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-06',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            }
          ]
        }
      },
      {
        id: 'PRJ0005',
        name: 'abby group',
        activities: {
          id: '6',
          name: 'Developing Project',
          activityHours: 0,
          data: [
            {
              date: '2019-06-30',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-01',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-02',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-03',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-04',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-05',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-06',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            }
          ]
        }
      },
      {
        id: 'PRJ0008',
        name: 'saldornment',
        activities: {
          id: '12',
          name: 'indeed',
          activityHours: 0,
          data: [
            {
              date: '2019-06-30',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-01',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-02',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-03',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-04',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-05',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            },
            {
              date: '2019-07-06',
              timesheet: {
                id: '',
                hours: '',
                description: ''
              }
            }
          ]
        }
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEmpTimesheetsComponent],
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
        NgMultiSelectDropDownModule.forRoot(),
        ArchwizardModule,
        CustomFormsModule,
        OwlDateTimeModule, OwlNativeDateTimeModule,
        ReactiveFormsModule,
        DataTableModule,
        NgbModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpTimesheetsComponent);
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

  it('#timesheetSubmit', fakeAsync(() => {
    component.timesheetSubmit('APPROVED');
    tick();
    expect(component.timesheetResponse.statusCode.code).toEqual('200');
  }));

  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.timesheetDetails).toEqual(sheetData);
  }));

  it('#openModal', fakeAsync(() => {
    component.openModal('modal', 'test');
    tick();
    expect(component.timeSheetSelected.description).toEqual('test');
  }));

  it('#closeModal', fakeAsync(() => {
    spyOn(component, 'closeModal');
    component.closeModal('modal');
    tick();
    expect(component.closeModal).toHaveBeenCalled();
  }));

  it('#closesubmit', fakeAsync(() => {
    spyOn(component, 'closesubmit');
    component.closesubmit();
    tick();
    expect(component.closesubmit).toHaveBeenCalled();
  }));

});
