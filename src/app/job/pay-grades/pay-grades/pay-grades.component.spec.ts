import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PayGradesComponent } from './pay-grades.component';
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

describe('PayGradesComponent', () => {
  let component: PayGradesComponent;
  let fixture: ComponentFixture<PayGradesComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayGradesComponent],
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
    fixture = TestBed.createComponent(PayGradesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    userServiceStub.getPayGrades().pipe(map(res => {
      component.paygrades = res.json().data;
      component.filterData = component.paygrades;
    }))
    expect(component.availableRecords).toEqual(component.filterData.length);
  }));

  it('#closePopup', fakeAsync(() => {
    component.isShowPopup = true;
    component.closePopup();
    tick();
    expect(component.isShowPopup).toBe(false);
  }));

  it("#showJobDetails", fakeAsync(() => {
    component.showJobDetails('1');
    expect(component.isShowPopup).toBe(true);
  }))

  it("#search", fakeAsync(() => {
    component.paygrades = [];
    let term = null;
    let key = null;
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.paygrades.length);


    term = 'testTerm';
    key = 'name';
    component.search(term, key);
    tick();
    component.paygrades = [];
    expect(component.filterData.length).toEqual(component.paygrades.length);

    key = 'min_salary';
    component.search(term, key);
    tick();
    component.paygrades = [];
    expect(component.filterData.length).toEqual(component.paygrades.length);

    key = 'max_salary';
    component.search(term, key);
    tick();
    component.paygrades = [];
    expect(component.filterData.length).toEqual(component.paygrades.length);



  }));



});
