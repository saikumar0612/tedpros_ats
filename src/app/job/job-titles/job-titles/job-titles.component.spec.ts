import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { JobTitlesComponent } from './job-titles.component';
import { UserService } from 'src/app/core/services';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
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
import { RouterTestingModule } from '@angular/router/testing';
import { map } from 'rxjs/operators';

describe('JobTitlesComponent', () => {
  let component: JobTitlesComponent;
  let fixture: ComponentFixture<JobTitlesComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobTitlesComponent],
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
    fixture = TestBed.createComponent(JobTitlesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("ngOnInit", fakeAsync(() => {
    component.ngOnInit();
    tick();
    userServiceStub.getJobCategories().pipe(map(res => {
      component.jobs = res.json();
      component.filterData = component.jobs;
    }));
    expect(component.availableRecords).toEqual(component.filterData.length);
  }));
  it("#closePopup", fakeAsync(() => {
    component.isShowPopup = true;
    component.closePopup();
    tick();
    expect(component.isShowPopup).toBe(false);
    expect(component.isShowDetails).toBe(false);

  }));
  it("#showUserDetails", fakeAsync(() => {
    component.jobs = [{ 'id': '1', 'name': 'projleadceo' },
    { 'id': '2', 'name': 'Marketing Executive' },
    { 'id': '3', 'name': 'PMO' }, { 'id': '4', 'name': 'Compliance (USCIS)' },
    { 'id': '5', 'name': 'Employee' },
    { 'id': '6', 'name': 'Vendor Employee' },
    { 'id': '7', 'name': 'client employee' },
    { 'id': '8', 'name': 'business' }, { 'id': '9', 'name': 'marketing' },
    { 'id': '10', 'name': 'CFO' }, { 'id': '11', 'name': 'CEO' },
    { 'id': '12', 'name': 'dfgh' }, { 'id': '13', 'name': 'mrketceo' }];

    component.showUserDetails("1");
    tick();
    expect(component.isShowPopup).toBe(true);
    expect(component.isShowDetails).toBe(true);

  }));
  it("#search", fakeAsync(() => {
    component.jobs = [];
    let term = null;
    let key = null;
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.jobs.length);


    term = 'testTerm';
    key = 'job_title';
    component.search(term, key);
    tick();
    component.jobs = [];
    expect(component.filterData.length).toEqual(component.jobs.length);

    key = 'department';
    component.search(term, key);
    tick();
    component.jobs = [];
    expect(component.filterData.length).toEqual(component.jobs.length);

    key = 'minimumEdu';
    component.search(term, key);
    tick();
    component.jobs = [];
    expect(component.filterData.length).toEqual(component.jobs.length);

    key = 'job_description';
    component.search(term, key);
    tick();
    component.jobs = [];
    expect(component.filterData.length).toEqual(component.jobs.length);

    key = 'note';
    component.search(term, key);
    tick();
    component.jobs = [];
    expect(component.filterData.length).toEqual(component.jobs.length);


  }));



});
