import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddEmploymentStatusComponent } from './add-employment-status.component';

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

describe('AddEmploymentStatusComponent', () => {
  let component: AddEmploymentStatusComponent;
  let fixture: ComponentFixture<AddEmploymentStatusComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEmploymentStatusComponent],
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
    fixture = TestBed.createComponent(AddEmploymentStatusComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#cancel', fakeAsync(() => {
    spyOn(locationStub, 'back');
    component.cancel();
    expect(locationStub.back).toHaveBeenCalled();
  }));

  it('#closePopup', fakeAsync(() => {
    component.isFailure = true;
    component.closePopup();
    expect(component.isFailure).toBe(false);
  }));
  it('#addStatus', fakeAsync(() => {
    const myFrm: NgForm = new NgForm([], []);
    component.addStatus(myFrm);
    tick();
    expect(component.status.statusCode.code).toEqual('200');
    expect(component.isSuccess).toBe(true);

    // userServiceStub.addEmpStatus(component.statusData).pipe(map(response=>{
    //   component.status = response.json();

    //   if(expect(component.status.statusCode.code).toBe(200)){
    //     component.isSuccess = true;
    //   }
    //   else{
    //     component.isFailure = true;
    //   }
    // }),

    // )
  }));

  it("#close", fakeAsync(() => {

    component.isSuccess = true;
    component.close();
    expect(component.isSuccess).toBe(false);

  }));


  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
  }));


});
