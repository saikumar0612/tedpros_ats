/*
       * Author: BAS-IT022
       * Purpose: Code coverage
       * Created: 03rd Aug 2019
       * Comment: unit test cases 
   */

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ActivateComponent } from './activate.component';

import { AuthenticationService } from '../../core/services';
import { SuperService } from './../../core/services/super.service';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AuthServiceStub } from '../../mocks/AuthServiceStub';
import { SuperServiceStub } from '../../mocks/SuperServiceStub';
import { LocationStub } from '../../mocks/LocationStub';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
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


describe('ActivateComponent', () => {
  let component: ActivateComponent;
  let fixture: ComponentFixture<ActivateComponent>;
  const AuthService = new AuthServiceStub();
  const superService = new SuperServiceStub();
  const locationStub = new LocationStub();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateComponent],
      providers: [
        { provide: AuthenticationService, useValue: AuthService },
        { provide: SuperService, useValue: superService },
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
    fixture = TestBed.createComponent(ActivateComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    localStorage.setItem('superUser', JSON.stringify({
      "success": true,
      "data": {
        "userId": 2,
        "firstName": "Pavan",
        "lastName": " ",
        "middleName": " "
      },
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xNjIuMjU0LjIwOS4xMzBcL2FwaVwvZ2V0Q3V0b3NtZXJUb2tlbiIsImlhdCI6MTU2NDgyMTk0OSwiZXhwIjoxNTY0ODI1NTQ5LCJuYmYiOjE1NjQ4MjE5NDksImp0aSI6IlFTdmFKQTB3SVlQdlp4RTAiLCJzdWIiOjIsInBydiI6ImY1MDI4YTRhNGI5MzQ3MzlmODA1MGUxNzQ0MDM4MDIyN2U0NjEzNjEifQ.KsQ09g7e5QrSLkuc2u4ZCft3IMLtKDe-BO_tUkEGGJ8"
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("#ngOnInit()", () => {

    component.ngOnInit();
    // tick();
    AuthService.getTheme()
      .subscribe(response => {
        const result = JSON.parse(localStorage.getItem('settings'));
        this.logoUrl = AuthService.getBaseUrl() + '/frontend/logos/' + result.data.siteLogo;
        component.themeData = component.logoUrl;
        // console.log(this.themeData.siteLogo);
        component.file1_input = component.themeData;
      });

    superService.ckeckInstallation().subscribe(response => {
    });

  });


  it("#activation", () => {
    component.user.id = "pavan.basolutions@gmail.com";
    component.activation();
  });




});
