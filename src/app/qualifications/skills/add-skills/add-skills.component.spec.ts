
/*
      * Author: BAS-IT022
      * Purpose: Code coverage
      * Created: 01st Aug 2019
      * Comment: unit test cases 
  */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddSkillsComponent } from './add-skills.component';


import { UserService } from '../../../core/services';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { UserServiceStub } from '../../../mocks/UserServiceStub';
import { LocationStub } from '../../../mocks/LocationStub';
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
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { map } from 'rxjs/operators';
import { DataTableModule } from 'angular-6-datatable';

describe('AddSkillsComponent', () => {
  let component: AddSkillsComponent;
  let fixture: ComponentFixture<AddSkillsComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddSkillsComponent],
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

        NgMultiSelectDropDownModule.forRoot(),
        ArchwizardModule,
        CustomFormsModule,
        OwlDateTimeModule, OwlNativeDateTimeModule,
        ImageCropperModule,
        ChartsModule,
        RouterTestingModule, DataTableModule,
        SharedModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("#ngonint", fakeAsync(() => {
    component.ngOnInit();
    tick();

  }));
  it("#closePopup", fakeAsync(() => {

    component.isFailure = true;
    component.closePopup();
    tick();
    expect(component.isFailure).toBe(false);

  }));
  it("#close", fakeAsync(() => {

    component.isSuccess = true;
    component.close();
    tick();
    expect(component.isSuccess).toBe(false);

  }));

  it('#cancel', () => {
    spyOn(locationStub, 'back');
    component.cancel();
    expect(locationStub.back).toHaveBeenCalled();
  });
  it("#addSkill", fakeAsync(() => {
    const myFrm: NgForm = new NgForm([], []);
    component.addSkill(myFrm);
    tick();

    expect(component.skill.statusCode.code).toEqual("200");
    expect(component.isSuccess).toBe(true);

  }));

  // it('#addSkill failure case', () => {
  // //   spyOn(userServiceStub,'addSkills').and.thenReturn({status:'401', users:[]});
  // spyOn(userServiceStub, 'addSkills').and.returnValue(
  //   ()=>{ 
  //     return {
  //            statusCode: {code:"401",message: "ok"},
  //            errorMessages: null,
  //            data: {}}
  //           }


  //           );
  //  component.addSkill();
  // //  expect(this.users.status).toEqual(401);
  // expect(component.isFailure).toBe(true);
  //  })

});
