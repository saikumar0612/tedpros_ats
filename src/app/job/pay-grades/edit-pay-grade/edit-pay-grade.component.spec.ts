import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditPayGradeComponent } from './edit-pay-grade.component';

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

describe('EditPayGradeComponent', () => {
  let component: EditPayGradeComponent;
  let fixture: ComponentFixture<EditPayGradeComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPayGradeComponent],
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
    fixture = TestBed.createComponent(EditPayGradeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', fakeAsync(() => {
    component.payInfo.id = 1;
    component.ngOnInit();
    tick();

    userServiceStub.editPayGrades(component.payInfo.id).pipe(map(res => {
      component.data = res.json();
      component.payInfo = component.data;
    }));

    userServiceStub.getPaySalaryId(component.payInfo.id).pipe(map(res => {
      component.salaryDetails = res.json();
    }));
  }));

  it('#add', fakeAsync(() => {
    component.add();
    tick();
    component.display = true;
  }));

  it('#closePopup', fakeAsync(() => {
    component.isFailure = true;
    component.closePopup();
    tick();
    expect(component.isFailure).toBe(false);
  }));

  it('#closePopup1', fakeAsync(() => {
    component.isFailure1 = true;
    component.isSuccess1 = true;
    component.closePopup1();
    tick();
    expect(component.isFailure1).toBe(false);
    expect(component.isSuccess1).toBe(true);
  }));

  it('#close', fakeAsync(() => {
    component.isSuccess = true;
    component.close();
    tick();
    expect(component.isSuccess).toBe(false);
  }));

  it('#closemsg', fakeAsync(() => {
    component.isSuccess1 = true;
    component.closemsg();
    tick();
    expect(component.isSuccess1).toBe(false);
  }));

  it('#addSalary', fakeAsync(() => {
    component.addSalary();
    tick();
    expect(component.pay.statusCode.code).toEqual("200");
    expect(component.isSuccess1).toBe(true);
  }));

  it('#editPay', fakeAsync(() => {
    component.editPay();
    tick();
    expect(component.pay.statusCode.code).toEqual("200");
    expect(component.isSuccess).toBe(true);
  }));




});
