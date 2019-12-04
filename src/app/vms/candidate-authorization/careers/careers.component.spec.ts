import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CareersComponent } from './careers.component';
import { AuthenticationService } from '../../../core/services';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthServiceStub } from 'src/app/mocks/AuthServiceStub';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { Location } from '@angular/common';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { VmsServiceStub } from 'src/app/mocks/VmsServiceStub';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { EventEmittorStub } from 'src/app/mocks/EventEmittorStub';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule, MultiSelectComponent } from 'ng-multiselect-dropdown';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DataTableModule } from 'angular-6-datatable';
import { ChartsModule } from 'ng2-charts';
import { ImageCropperModule } from 'ngx-image-cropper';

describe('CareersComponent', () => {
  let component: CareersComponent;
  let fixture: ComponentFixture<CareersComponent>;
  const AuthService = new AuthServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareersComponent ],
      providers: [
        { provide: AuthenticationService, useValue: AuthService },
        { provide: Location, useValue: locationStub }
      ],
      imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,

        NgMultiSelectDropDownModule.forRoot(),
        ArchwizardModule,
        CustomFormsModule,
        OwlDateTimeModule, OwlNativeDateTimeModule,
        ImageCropperModule,
        ChartsModule,
        RouterTestingModule, DataTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareersComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    localStorage.setItem('settings', JSON.stringify({
      statusCode: {
        code: '200',
        message: 'ok'
      },
      errorMessages: null,
      data: {
        themeColor: '#E74C3C',
        siteFav: 'bafavicon.png',
        siteLogo: 'logo.png',
        themeClass: 'color6',
        title: 'BASolutions'
      }
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', fakeAsync(()=>{
    component.ngOnInit();
    tick();
    
  }));

  it('#readMore', fakeAsync(()=>{
    component.jobPopup = false;
    component.readMore();
    tick();
    expect(component.jobPopup).toBe(true);
  }));

  it('#applyPopup', fakeAsync(()=>{
    component.isSuccess = false;
    component.applyPopup();
    tick();
    expect(component.isSuccess).toBe(true);
  }));

  it('#closePopup', fakeAsync(()=>{
    component.isSuccess = false;
    component.closePopup();
    tick();
    expect(component.isSuccess).toBe(true);
  }));
});
