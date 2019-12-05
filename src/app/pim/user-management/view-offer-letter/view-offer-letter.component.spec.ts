import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ViewOfferLetterComponent } from './view-offer-letter.component';
import { UserService } from '../../../core/services';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { UserServiceStub } from '../../../mocks/UserServiceStub';
import { LocationStub } from '../../../mocks/LocationStub';
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
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { CKEditorModule } from 'ng2-ckeditor';
import { map } from 'rxjs/operators';
import { AuthServiceStub } from '../../../mocks/AuthServiceStub';
import { Router } from '@angular/router';

describe('ViewOfferLetterComponent', () => {
  let component: ViewOfferLetterComponent;
  let fixture: ComponentFixture<ViewOfferLetterComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const activatedRouteStub = new ActivatedRouteStub();
  const authServiceStub = new AuthServiceStub();
  let currentUser:any;
  localStorage.setItem('settings', JSON.stringify({
    statusCode:{code:"200",message:"ok"},errorMessages:null,data:{"themeColor":"#1ABC9C","siteFav":"bafavicon.png","siteLogo":"logo.png","themeClass":"color2","title":"BASolutions"}
  }));
  const result = JSON.parse(localStorage.getItem('settings'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOfferLetterComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
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
        SharedModule,
        CKEditorModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOfferLetterComponent);
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

  it('#ngOnInit', fakeAsync(() => {
    component.logoUrl = authServiceStub.getBaseUrl() + '/frontend/logos/' + result.data.siteLogo;
    component.ngOnInit();
    tick();
    activatedRouteStub.params.subscribe(res => console.log(res));
  }));

  it('#getOfferLetterTemplates', fakeAsync(() => {
    component.getOfferLetterTemplates();
    tick();
    userServiceStub.getOfferLetterTemplates()
    .pipe(map(response => {
      component.types = response.json().data;
    }))
  }));

  it('#getUserOfferLetter', fakeAsync(() => {
    component.getUserOfferLetter();
    tick();
  }));

  it('#getDigitalKey', fakeAsync(() => {
    component.getUserOfferLetter();
    tick();
    userServiceStub.getDigitalKey()
    .pipe(map(response => {
      component.gethrdigitalKey = response.json();
    }))
  }));

  it('#getUserDigitalKey', fakeAsync(() => {
    component.getUserDigitalKey('1');
    tick();
    userServiceStub.getDigitalKeyById('1')
    .pipe(map(response => {
      component.getuserDigitalKey = response.json();
    }))
  }));

  it('#addOfferLetter', fakeAsync(() => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    component.addOfferLetter('1');
    tick();
    expect(routerstub.navigate).toHaveBeenCalled();
  }));

  it('#back', fakeAsync(() => {
    spyOn(locationStub, 'back');
    component.back();
    tick();
    expect(locationStub.back).toHaveBeenCalled();
  }));

});
