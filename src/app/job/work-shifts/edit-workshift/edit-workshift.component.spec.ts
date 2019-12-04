import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditWorkshiftComponent } from './edit-workshift.component';
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

describe('EditWorkshiftComponent', () => {
  let component: EditWorkshiftComponent;
  let fixture: ComponentFixture<EditWorkshiftComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditWorkshiftComponent],
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
    fixture = TestBed.createComponent(EditWorkshiftComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#checkName', fakeAsync(() => {
    component.checkName();
    tick();
    expect(component.name.statusCode.code).toEqual('200');
  }));

  it('#getShiftData', fakeAsync(() => {
    component.getShiftData();
    tick();
    expect(component.loading).toBe(false);
  }));

  it('#timediff', fakeAsync(() => {
    component.timediff();
    tick();
    expect(component.loading).toBe(false);
  }));


  it('#cancel', fakeAsync(() => {
    spyOn(component, 'cancel');
    component.cancel();
    tick();
    expect(component.cancel).toHaveBeenCalled();
  }));

  it('#closePopup', fakeAsync(() => {
    component.isFailure = true;
    component.closePopup();
    tick();
    expect(component.isFailure).toBe(false);
  }));

  it('#close', fakeAsync(() => {
    component.isSuccess = true;
    component.close();
    expect(component.isSuccess).toBe(false);
  }));


  it('#add', fakeAsync(() => {
    component.isSuccess = false;
    const addApplyFrm: NgForm = new NgForm([], []);
    component.add(addApplyFrm);
    tick();
    expect(component.isSuccess).toBe(false);
  }));

  it('#editShift', fakeAsync(() => {
    const myFrm: NgForm = new NgForm([], []);
    component.editShift(myFrm);
    tick();
    expect(component.shift.statusCode.code).toEqual('200');
    expect(component.isSuccess).toBe(true);

  }));


  it('#ngOnInit', fakeAsync(() => {
    component.loading = true;
    component.ngOnInit();
    tick();
    expect(component.loading).toBe(false);
  }));

});
