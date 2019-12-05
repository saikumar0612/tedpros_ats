import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OfferLettersListComponent } from './offer-letters-list.component';
import { UserService } from '../../../core/services';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { UserServiceStub } from '../../../mocks/UserServiceStub';
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
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableModule } from 'angular-6-datatable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { of } from 'rxjs';

describe('OfferLettersListComponent', () => {
  let component: OfferLettersListComponent;
  let fixture: ComponentFixture<OfferLettersListComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const activatedRouteStub = new ActivatedRouteStub();
  let currentUser:any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferLettersListComponent ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub }
      ],
      imports: [
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
        RouterTestingModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferLettersListComponent);
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
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    activatedRouteStub.params.subscribe(res => console.log(res));
  }));

  it('#getUserOfferLetters', fakeAsync(() => {
    component.getUserOfferLetters('1');
    tick();
    userServiceStub.getUserOfferLetters('1')
      .pipe(map(response => {
        component.types = response.json().data;
      }))
    expect(component.filterData).toEqual(component.types.offerLetters);
    if(component.filterData){
      expect(component.availableRecords).toEqual(component.filterData.length);
    }    
  }));

  it('#addOfferLetter', fakeAsync(() => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    component.addOfferLetter('1');
    tick();
    component.url = "/usersView/add-offerLetter";
    expect(routerstub.navigate).toHaveBeenCalled();
  }));

  it('#editOfferLetter', fakeAsync(() => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    component.editOfferLetter('1');
    tick();
    component.url = "/usersView/edit-offerLetter";
    expect(routerstub.navigate).toHaveBeenCalled();
  }));

  it('#viewTemplate', fakeAsync(() => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    component.viewTemplate('1');
    tick();
    component.url = "/usersView/view-offerLetter";
    expect(routerstub.navigate).toHaveBeenCalled();
  }));

  it('#deleteTemplate', fakeAsync(() => {
    component.deleteTemplate('1');
    tick();
    expect(component.deleteId).toEqual('1');
    expect(component.deletePopup).toBe(true);
    expect(component.isConfirm).toBe(true);
  }));

  it('#delete', fakeAsync(() => {
    component.delete('1', '1');
    tick();
    userServiceStub.deleteUserOfferLetter('1', '1')
      .pipe(map(response => {
        component.deletedata = response.json();
      }))  
    expect(component.message).toEqual(component.deletedata.data);
    expect(component.isConfirm).toBe(false);
    expect(component.isSuccess).toBe(true);
  }));

  it('#delete - 400 response', () => {
    spyOn(userServiceStub,'deleteUserOfferLetter').withArgs('1','1').and.returnValues(of({
      json: function() {
        return {
          statusCode: {
              code: '400',
              message: 'error'
          },
          errorMessages: 'error',
          data: null
      }
    }}));
    component.delete('1','1');
    expect(component.isConfirm).toBe(false);
  });

  it('#closePopup', fakeAsync(() => {
    component.closePopup();
    tick();
    expect(component.deletePopup).toBe(false);
  }));

  it('#search', fakeAsync(() => {
    component.types.offerLetters = [];
    let term = null;
    let key = null;
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.types.offerLetters.length);

    term = 'testTerm';
    key = 'name';
    component.types.offerLetters = [{offerLetterName:'testTerm'}];
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.types.offerLetters.length);

  }));

});
