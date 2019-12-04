import { async, ComponentFixture, TestBed, fakeAsync ,tick} from '@angular/core/testing';

import { JobCategoriesComponent } from './job-categories.component';

import { UserService } from 'src/app/core/services';
import { Location } from '@angular/common';
import {  HttpModule } from '@angular/http';
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

describe('JobCategoriesComponent', () => {
  let component: JobCategoriesComponent;
  let fixture: ComponentFixture<JobCategoriesComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCategoriesComponent ],
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
    fixture = TestBed.createComponent(JobCategoriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
  it('#ngOnInit',fakeAsync(()=>{
    component.ngOnInit();
    tick();

    userServiceStub.getJobCategories().pipe(map(res => {
      component.categories = res.json().data;
    }));
    expect(component.availableRecords).toEqual(component.filterData.length);
  }));

  it('#search',fakeAsync(()=>{
    component.categories=[];
    let term = null;
    let key = null;
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.categories.length);
    
    term = 'testTerm';
    key = 'name';
    component.search(term, key);
    tick();
    component.categories = [];
    expect(component.filterData.length).toEqual(component.categories.length);
  }));


  it('#showJobDetails',fakeAsync(()=>{
    component.isShowPopup = false;
    component.showJobDetails('2');
    tick();
    expect(component.isShowPopup).toBe(true);
    // expect(component.info.id).toEqual('2');
  }));

  it('#closePopup',fakeAsync(()=>{
    component.isShowPopup = true;
    component.closePopup();
    expect(component.isShowPopup).toBe(false);
  }));


});
