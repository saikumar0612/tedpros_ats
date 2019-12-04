import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditJobCategoriesComponent } from './edit-job-categories.component';

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

describe('EditJobCategoriesComponent', () => {
  let component: EditJobCategoriesComponent;
  let fixture: ComponentFixture<EditJobCategoriesComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobCategoriesComponent ],
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
    fixture = TestBed.createComponent(EditJobCategoriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#cancel',()=>{
    spyOn(locationStub, 'back');
    component.cancel();
    expect(locationStub.back).toHaveBeenCalled(); 
  });

  it('#closePopup',()=>{
    component.isFailure = true;
    component.closePopup();
    expect(component.isFailure).toBe(false);
  });

  it('#close',()=>{
    component.isSuccess = true;
    component.close();
    expect(component.isSuccess).toBe(false);
  });
  // .pipe(map(response =>{
  //   const result = response.json();

  it('#ngOnInit',fakeAsync(()=>{

    component.catInfo={ id: '', name: '' };
    component.catInfo.id = 1;
    component.ngOnInit();
    tick();

    userServiceStub.getJobCategory(component.catInfo.id).pipe(map(res => {
      // component.compnayInfo = res.json();
      component.data = res.json().data;
      component.catInfo = component.data[0];
    }));

  }));

  it('#editCat',fakeAsync(()=>{
     
    component.editCat();
    tick();


    expect(component.data.statusCode.code).toEqual('200');
    expect(component.isSuccess).toBe(true);
    userServiceStub.editCategory(component.catData).pipe(map(res =>{
      component.data = res.json();
    }));
    
  }));

});
