import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EmploymentStatusComponent } from './employment-status.component';

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

describe('EmploymentStatusComponent', () => {
  let component: EmploymentStatusComponent;
  let fixture: ComponentFixture<EmploymentStatusComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmploymentStatusComponent],
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
    fixture = TestBed.createComponent(EmploymentStatusComponent);
    component = fixture.componentInstance;


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("#ngOnInit", fakeAsync(() => {

    component.ngOnInit();
    tick();
    userServiceStub.getEmpStatus().pipe(map(response => {
      component.empstatus = response.json().data;
      component.filterData = component.empstatus;
    }));
    // expect(component.loading).toBe(false);
    expect(component.availableRecords).toEqual(component.empstatus.length);


  }));

  it("#closePopup", fakeAsync(() => {

    component.isShowPopup = true;
    component.closePopup();
    tick();
    expect(component.isShowPopup).toBe(false);

  }));

  it("#showJobDetails", fakeAsync(() => {

    component.showJobDetails("1");
    tick();
    expect(component.isShowPopup).toBe(true);

  }));

  it('#search', fakeAsync(() => {
    component.empstatus = [];
    let term = null;
    let key = null;
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.empstatus.length);

    term = 'testTerm';
    key = 'name';
    component.search(term, key);
    tick();
    component.empstatus = [];
    expect(component.filterData.length).toEqual(component.empstatus.length);
  }));


});
