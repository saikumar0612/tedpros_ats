import { async, ComponentFixture, TestBed ,fakeAsync,tick} from '@angular/core/testing';

import { EditJobTitlesComponent } from './edit-job-titles.component';
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

describe('EditJobTitlesComponent', () => {
  let component: EditJobTitlesComponent;
  let fixture: ComponentFixture<EditJobTitlesComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobTitlesComponent ],
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
    fixture = TestBed.createComponent(EditJobTitlesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', fakeAsync(()=>{
    component.ngOnInit();
    tick();
    userServiceStub.getJobCategories().pipe(map(res =>{
      component.departments = res.json();
      component.loading = false;
    }));

    component.jobInfo.id = 1 ;
    userServiceStub.getJobTitle(component.jobInfo.id).pipe(map(res =>{
      component.jobInfo= res.json();
    }));

  }));

  it('#editJob',fakeAsync(()=>{
    component.editJob();
    tick();

    expect(component.data.statusCode.code).toEqual("200");
    expect(component.isSuccess).toBe(true);
    
    // userServiceStub.editJobTitle(component.jobInfo).pipe(map(res=>{
    //   component.data = res.json();
    // }))
  }));

  it('#cancel',fakeAsync(()=>{
    spyOn(locationStub, 'back');
    component.cancel();
    tick();
    expect(locationStub.back).toHaveBeenCalled(); 
  }));

  it('#closePopup',fakeAsync(()=>{
    component.isFailure = true;
    component.closePopup();
    tick();
    expect(component.isFailure).toBe(false);
  }));

  it('#close',fakeAsync(()=>{
    component.isSuccess = true;
    component.close();
    tick();
    expect(component.isSuccess).toBe(false);
  }));


});
