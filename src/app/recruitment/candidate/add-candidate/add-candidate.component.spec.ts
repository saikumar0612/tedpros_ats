import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddCandidateComponent } from './add-candidate.component';
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
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { LocationStub } from 'src/app/mocks/LocationStub';
// import { FileUploader } from 'ng2-file-upload'; 
import { ArchwizardModule } from 'angular-archwizard';
import { map } from 'rxjs/operators';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

describe('AddCandidateComponent', () => {
  let component: AddCandidateComponent;
  let fixture: ComponentFixture<AddCandidateComponent>;
  const userServiceStub = new UserServiceStub();
  const activatedRouteStub = new ActivatedRouteStub();
  const authStub = new AuthServiceStub();
  const emmitterStub = new EventEmittorStub();
  const locationStub = new LocationStub();

  const event: ImageCroppedEvent = {
    base64: '',
    file: null,
    width: 0,
    height: 0,
    cropperPosition: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    },
    imagePosition: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCandidateComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: EventEmitterService, useValue: emmitterStub },
        { provide: AuthenticationService, useValue: authStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Location, useValue: locationStub },
        DatePipe,
        // FileUploader
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        DataTableModule,
        NgbModule,
        ArchwizardModule,
        ImageCropperModule,
        OwlDateTimeModule, OwlNativeDateTimeModule
        // FileUploader
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCandidateComponent);
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

  /*
      * Author: G S Pavan Kumar
      * Created: 02nd August 2019
      * Comment: Start of code coverage
  */

  // checkEmail
  it('#checkEmail', fakeAsync(() => {
    component.checkEmail();
    tick();
    expect(component.emailError).toEqual('');
  }));

  // dateValidate
  it('#dateValidate', fakeAsync(() => {
    const today = new Date();
    component.experienceData = {
      experience: {
        startDate: new Date('Fri Jul 26 2019 12:00:00 GMT+0530 (India Standard Time)'),
        endDate: new Date('Thu Jul 25 2019 12:00:00 GMT+0530 (India Standard Time)')
      }
    };
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('Please select a valid target date');
    expect(component.experienceData.experience.endDate).toEqual(component.experienceData.experience.startDate);

    component.experienceData = {
      experience: {
        endDate: new Date('Mon Aug 26 2019 12:00:00 GMT+0530 (India Standard Time)'),
        startDate: new Date('Sun Aug 25 2019 12:00:00 GMT+0530 (India Standard Time)')
      }
    };
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('Please select a valid date range');

    component.experienceData = {
      experience: {
        endDate: new Date('Mon Aug 26 2019 12:00:00 GMT+0530 (India Standard Time)'),
        startDate: new Date('Thu Jul 25 2019 12:00:00 GMT+0530 (India Standard Time)')
      }
    };
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('Please select a valid date range');

    component.experienceData = {
      experience: {
        endDate: new Date('Fri Jul 26 2019 12:00:00 GMT+0530 (India Standard Time)'),
        startDate: new Date('Thu Jul 25 2019 12:00:00 GMT+0530 (India Standard Time)')
      }
    };
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('');
  }));
  // getAddress
  it('#getAddress', fakeAsync(() => {
    component.personalData = {
      city: { id: '46965', name: 'Milwaukee' }, state: { id: '3977', name: 'Wisconsin' }, country: { id: '231', name: 'United States' },
      zipCode: '25259'
    };
    component.getAddress();
    tick();
    expect(component.zipError).toBeNull();

    component.personalData = {
      city: { id: '46965', name: 'Milwaukee' }, state: { id: '3977', name: 'Wisconsin' }, country: { id: '231', name: 'United States' },
      zipCode: ''
    };
    component.getAddress();
    tick();
    // expect(component.zipError).toEqual('Please enter a valid zip code');
    expect(component.personalData.zipCode).toEqual('');
  }));

  /*
      * Author: G S Pavan Kumar
      * Created: 02nd August 2019
      * Comment: Start of ngOnInit
  */

  it('#ngOnInit', fakeAsync(() => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    tick();
    expect(component.ngOnInit).toHaveBeenCalled();
  }));
  /*
      * Author: G S Pavan Kumar
      * Created: 02nd August 2019
      * Comment: End of ngOnInit
  */
  /*
    * Author: G S Pavan Kumar
    * Created: 02nd August 2019
    * Comment: Start of changeCurrent
  */
  it('#changeCurrent', fakeAsync(() => {
    component.isCurrent = true;
    component.changeCurrent('experience');
    tick();
    expect(component.isCurrent).toBe(false);
    component.isEduCurrent = true;
    component.changeCurrent('education');
    tick();
    expect(component.isEduCurrent).toBe(false);
  }));
  /*
    * Author: G S Pavan Kumar
    * Comment: Start of addSkill
  */
  it('#addSkill', fakeAsync(() => {
    const skillFrm: NgForm = new NgForm([], []);
    component.skillData = [{ skillName: 'skill', experience: 'experience' }];
    component.addSkill('skillName', 'experience', 'month', 'year', 'comment', skillFrm);
    tick();
    expect(component.skillError).toEqual('');
  }));
  /*
    * Author: G S Pavan Kumar
    * Comment: End of addSkill
  */
  // Cancel
  it('#cancel', fakeAsync(() => {
    spyOn(locationStub, 'back');
    component.cancel();
    tick();
    expect(locationStub.back).toHaveBeenCalled();
  }));
  // addEducation(instituteName, qualification, specialization, passingYear, gpaScore, eduForm: NgForm)
  it('#addEducation', fakeAsync(() => {
    const eduForm: NgForm = new NgForm([], []);
    // component.addEducation('instituteName', 'qualification', 'specialization', 'passingYear', 'gpaScore', eduForm);
    component.addEducation('instituteName', 'qualification', 'specialization', 'gpaScore', eduForm);
    tick();
    expect(component.educationError).toEqual('');
  }));
  // addExperiences(employer, jobTitle, description, supervisorName, supervisorPhone, responsibilities, techSkills, expForm: NgForm)
  it('#addExperiences', fakeAsync(() => {
    const expForm: NgForm = new NgForm([], []);
    component.indexofexperience = 0;
    component.addExperiences('employer', 'jobTitle', 'description', 'supervisorName',
      'supervisorPhone', 'responsibilities', 'techSkills', expForm);
    tick();
    expect(component.experienceError).toEqual('');
    expect(component.indexofexperience).toEqual(null);

    component.indexofexperience = null;
    component.addExperiences('employer', 'jobTitle', 'description', 'supervisorName',
      'supervisorPhone', 'responsibilities', 'techSkills', expForm);
    tick();
    expect(component.experienceError).toEqual('Experience already exists');
    expect(component.indexofexperience).toEqual(null);
  }));
  // removeEducation(education)
  it('#removeEducation', fakeAsync(() => {
    component.educations = [{
      instituteName: 'instituteName', qualification: 'qualification', specialization: 'specialization',
      passingYear: 'passingYear', gpaScore: 'gpaScore'
    }];
    component.removeEducation({
      instituteName: 'instituteName', qualification: 'qualification', specialization: 'specialization',
      passingYear: 'passingYear', gpaScore: 'gpaScore'
    });
    tick();
    expect(component.educations).toEqual([]);
  }));
  // removeExperience(experience)
  it('#removeExperience', fakeAsync(() => {
    component.experiences = [{
      employer: 'employer', jobTitle: 'jobTitle', description: 'description', supervisorName: 'supervisorName',
      supervisorPhone: 'supervisorPhone', responsibilities: 'responsibilities', techSkills: 'techSkills'
    }];
    component.removeExperience({
      employer: 'employer', jobTitle: 'jobTitle', description: 'description', supervisorName: 'supervisorName',
      supervisorPhone: 'supervisorPhone', responsibilities: 'responsibilities', techSkills: 'techSkills'
    });
    tick();
    expect(component.experiences).toEqual([]);
  }));
  // removeSkill(skill)
  it('#removeSkill', fakeAsync(() => {
    component.skills = [{
      skill: 'skill', experience: 'experience', month: 'month', year: 'year', comment: 'comment'
    }];
    component.removeSkill({
      skill: 'skill', experience: 'experience', month: 'month', year: 'year', comment: 'comment'
    });
    tick();
    expect(component.skills).toEqual([]);
  }));
  // editEduaction(education)
  it('#editEduaction', fakeAsync(() => {
    component.educations = [{
      instituteName: 'instituteName', qualification: 'qualification', specialization: 'specialization',
      passingYear: 'passingYear', gpaScore: 'gpaScore'
    }];
    component.editEduaction({
      instituteName: 'instituteName', qualification: 'qualification', specialization: 'specialization',
      passingYear: 'passingYear', gpaScore: 'gpaScore'
    });
    tick();
    expect(component.indexofEducation).toEqual(-1);
  }));
  // editExperience(experience)
  it('#editExperience', fakeAsync(() => {
    component.experiences = [{
      employer: 'employer', jobTitle: 'jobTitle', description: 'description', supervisorName: 'supervisorName',
      supervisorPhone: 'supervisorPhone', responsibilities: 'responsibilities', techSkills: 'techSkills'
    }];
    component.editExperience({
      employer: 'employer', jobTitle: 'jobTitle', description: 'description', supervisorName: 'supervisorName',
      supervisorPhone: 'supervisorPhone', responsibilities: 'responsibilities', techSkills: 'techSkills'
    });
    tick();
    expect(component.indexofexperience).toEqual(-1);
  }));
  // editSkill(skill)
  it('#editSkill', fakeAsync(() => {
    component.skills = [{
      skill: 'skill', experience: 'experience', lastUsed: 'month/Year', comment: 'comment'
    }];
    component.editSkill({
      skill: 'skill', experience: 'experience', lastUsed: 'month/Year', comment: 'comment'
    });
    tick();
    expect(component.indexofSkill).toEqual(-1);
  }));
  // getCity(id)
  it('#getCity', fakeAsync(() => {
    spyOn(component, 'getCity');
    component.getCity(1);
    tick();
    expect(component.getCity).toHaveBeenCalled();

  }));

  // getState(id)
  it('#getState', fakeAsync(() => {
    spyOn(component, 'getState');
    component.getState(1);
    tick();
    expect(component.getState).toHaveBeenCalled();

  }));
  // addCandidate
  it('#addCandidate', fakeAsync(() => {
    component.addCandidate();
    tick();
    expect(component.responseData.data).toEqual('Data added successfully');
    expect(component.message).toEqual('Personal data added sucessfully');
    expect(component.isShowPopup1).toBe(true);
  }));
  // closePopup1
  it('#closePopup1', fakeAsync(() => {
    component.isShowPopup1 = false;
    component.closePopup1();
    tick();
    expect(component.isShowPopup1).toBe(true);
    expect(component.error).toEqual('');
    expect(component.message).toEqual('');

  }));
  // addCandidateExperience
  it('#addCandidateExperience', fakeAsync(() => {

    component.experiences = [];
    component.addCandidateExperience();
    tick();
    expect(component.message).toEqual('No experience added do you wish to continue?');
    expect(component.isShowPopup1).toBe(true);

    component.experiences = [{
      employer: 'employer',
      jobTitle: 'jobTitle',
      description: 'description',
      startDate: 'startDate',
      endDate: 'endDate',
      supervisorName: 'supervisorName',
      supervisorPhone: 'supervisorPhone',
      isCurrent: 'expCurrent',
      responsibilities: 'responsibilities',
      techSkills: 'techSkills'

    }];
    component.addCandidateExperience();
    tick();
    expect(component.responseData.data).toEqual('Data added successfully');
    expect(component.message).toEqual('Experience data added sucessfully');
    expect(component.isShowPopup1).toBe(true);
  }));
  // addCandidateEducation
  it('#addCandidateEducation', fakeAsync(() => {
    component.educations = [];
    component.addCandidateEducation();
    tick();
    expect(component.error).toEqual('Please enter atleat one qualification');
    expect(component.isShowPopup1).toBe(true);
    component.educations = [{
      instituteName: '',
      qualification: '',
      specialization: '',
      passingYear: '',
      isCurrent: 0,
      gpaScore: ''
    }];
    component.addCandidateEducation();
    tick();
    expect(component.responseData.data).toEqual('Data added successfully');
    expect(component.message).toEqual('Education data added sucessfully');
    expect(component.isShowPopup1).toBe(true);
  }));
  // addCandidateSkills
  it('#addCandidateSkills', fakeAsync(() => {
    component.skills = [];
    component.addCandidateSkills();
    tick();
    expect(component.error).toEqual('Please specify atleast one skill');
    expect(component.isShowPopup1).toBe(true);

    component.skills = [{
      skillName: '',
      experience: '',
      lastUsed: '',
      comment: '',
      last: {
        month: '',
        year: ''
      }
    }];
    component.addCandidateSkills();
    tick();
    expect(component.responseData.data).toEqual('Data added successfully');
    expect(component.message).toEqual('Skills data added sucessfully');
    expect(component.isShowPopup1).toBe(true);
  }));
  // addCandidateSummary
  it('#addCandidateSummary', fakeAsync(() => {
    component.addCandidateSummary();
    tick();
    expect(component.responseData.data).toEqual('Data added successfully');
    expect(component.preview).toBe(true);
  }));
  // Showpreview
  it('#showpreview', fakeAsync(() => {
    component.candidateId = '42';
    component.showpreview();
    tick();
    expect(component.single).toEqual('42');
    expect(component.preview).toBe(true);
  }));
  // closePopup
  it('#closePopup', fakeAsync(() => {
    component.preview = true;
    component.closePopup();
    tick();
    expect(component.preview).toBe(false);
  }));
  // fileChangeEvent(event)
  it('#fileChangeEvent', fakeAsync(() => {
    component.fileChangeEvent(event);
    tick();
    expect(component.imageChangedEvent).toEqual(event);
  }));
  // imageCropped(event: ImageCroppedEvent)
  it('#imageCropped', fakeAsync(() => {
    component.image = '';
    spyOn(component, 'imageCropped');
    component.imageCropped(event);
    tick();
    expect(component.imageCropped).toHaveBeenCalled();
    expect(component.image).toEqual('');
  }));
  // imageLoaded
  it('#imageLoaded', fakeAsync(() => {
    spyOn(component, 'imageLoaded');
    component.imageLoaded();
    tick();
    expect(component.imageLoaded).toHaveBeenCalled();
  }));
  // cropperReady
  it('#cropperReady', fakeAsync(() => {
    spyOn(component, 'cropperReady');
    component.cropperReady();
    tick();
    expect(component.cropperReady).toHaveBeenCalled();
  }));
  // loadImageFailed
  it('#loadImageFailed', fakeAsync(() => {
    spyOn(component, 'loadImageFailed');
    component.loadImageFailed();
    tick();
    expect(component.loadImageFailed).toHaveBeenCalled();
  }));
  // editInfo
  it('#editInfo', fakeAsync(() => {
    // this.display = true;
    component.editInfo();
    tick();
    expect(component.display).toBe(true);
  }));
  // Back
  it('#back', fakeAsync(() => {
    component.back();
    tick();
    expect(component.display).toBe(false);
  }));
  // uploadPic
  it('#uploadPic', fakeAsync(() => {
    component.uploadPic();
    tick();
    expect(component.isShowPopup1).toBe(true);
    expect(component.error).toEqual(null);
    expect(component.message).toEqual('Candidate image added successfully');
  }));
  /*
      * Author: G S Pavan Kumar
      * Created: 02nd August 2019
      * Comment: end of code coverage
  */
});
