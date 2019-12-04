import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddWorkshiftComponent } from './add-workshift.component';

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

describe('AddWorkshiftComponent', () => {
  let component: AddWorkshiftComponent;
  let fixture: ComponentFixture<AddWorkshiftComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddWorkshiftComponent],
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
    fixture = TestBed.createComponent(AddWorkshiftComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#checkName', fakeAsync(() => {
    component.loading = true;
    component.checkName();
    tick();

    userServiceStub.getShiftName(component.shiftData.shiftName).pipe(map(res => {
      component.name = res.json();
      component.loading = false;
    }));
    expect(component.name.statusCode.code).toEqual('200');
    expect(component.nameError).toBe(true);
    expect(component.loading).toBe(true);

  }));

  it('#timediff', fakeAsync(() => {
    component.timediff();
    tick();
  }));

  it('#ngOnInit', fakeAsync(() => {
    component.loading = true;
    component.ngOnInit();
    tick()
    component.timediff();
    tick()
    userServiceStub.getUsersList().pipe(map(res => {
      component.users = res.json();

      component.users.forEach(obj => {
        obj.fullname = (obj.first_name + " " + obj.last_name);
      });

    }));
    component.loading = false;
    component.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'fullname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      "closeDropDownOnSelection": true
    }
  }));

  it('#cancel', fakeAsync(() => {
    spyOn(locationStub, 'back');
    component.cancel();
    tick();
    expect(locationStub.back).toHaveBeenCalled();
  }));

  it('#closePopup', fakeAsync(() => {
    component.isFailure = true;
    component.closePopup();
    tick();
    expect(component.isFailure).toBe(false);
  }));

  it('#close', fakeAsync(() => {
    const myFrm: NgForm = new NgForm([], []);
    component.isSuccess = true;
    component.close(myFrm);
    expect(component.isSuccess).toBe(false);
    component.shiftData = {}
  }));
  it('#addShift', fakeAsync(() => {
    component.addShift();
    tick();
    expect(component.shift.statusCode.code).toEqual("200");
    expect(component.isSuccess).toBe(true);

  }));

  it('#add', fakeAsync(() => {
    component.isSuccess = false;
    let addApplyFrm: NgForm = new NgForm([], []);
    component.add(addApplyFrm);
    tick();
    expect(component.isSuccess).toBe(false);
  }));



});
