/*
       * Author: BAS-IT022
       * Purpose: Code coverage
       * Created: 03rd Aug 2019
       * Comment: unit test cases 
   */

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';


import { AuthenticationService } from '../../core/services';
import { SuperService } from './../../core/services/super.service'
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AuthServiceStub } from '../../mocks/AuthServiceStub';
import { SuperServiceStub } from '../../mocks/SuperServiceStub';
import { LocationStub } from '../../mocks/LocationStub';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChartsModule } from 'ng2-charts';
import { RouterTestingModule } from '@angular/router/testing';
import { map } from 'rxjs/operators';
import { DataTableModule } from 'angular-6-datatable';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const AuthService = new AuthServiceStub();
  const SuperService = new SuperServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthenticationService, useValue: AuthService },
        { provide: SuperService, useValue: SuperService },
        { provide: Location, useValue: locationStub }
      ],
      imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        FileUploadModule,

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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
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
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("#ngOnInit()", fakeAsync(() => {

    component.ngOnInit();
    tick();
    expect(component.logoUrl).toEqual("");
  }));


});
