import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OfferLetterComponent } from './offer-letter.component';
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
import { DataTableModule } from 'angular-6-datatable';
import { CKEditorModule } from 'ng2-ckeditor';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { AuthServiceStub } from '../../../mocks/AuthServiceStub';
import { of } from 'rxjs';

describe('OfferLetterComponent', () => {
  let component: OfferLetterComponent;
  let fixture: ComponentFixture<OfferLetterComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  const authServiceStub = new AuthServiceStub();
  const activatedRouteStub = new ActivatedRouteStub();
  let currentUser:any;
  localStorage.setItem('settings', JSON.stringify({
    statusCode:{code:"200",message:"ok"},errorMessages:null,data:{"themeColor":"#1ABC9C","siteFav":"bafavicon.png","siteLogo":"logo.png","themeClass":"color2","title":"BASolutions"}
  }));
  const result = JSON.parse(localStorage.getItem('settings'));
  const data = {
    "digital": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZgAAABmCAYAAAD21IeIAAAPZ0lEQVR4Xu2daehtVRnGH6OuEVmZplLBTSuKCioqGrHCsCDDgjK0otLIog+WCErz3PVLA8GljLJAMfKDNnwoKpooKzXrQxGSNpJZkY2URQMPdy99fdvjOXuf/zl7/xZcrp6z9hp+a5393Het9b7rMJEgAAEIQAACExA4bIIyKRICEIAABCAgBIZJAAEIQAACkxBAYCbBSqEQgAAEIIDAMAcgAAEIQGASAgjMJFgpFAIQgAAEEBjmAAQgAAEITEIAgZkEK4VCAAIQgAACwxyAAAQgAIFJCCAwk2ClUAhAAAIQQGCYAxCAAAQgMAkBBGYSrBQKAQhAAAIIDHMAAhCAAAQmIYDATIKVQiEAAQhAAIFhDkAAAhCAwCQEEJhJsFIoBCAAAQggMMwBCEAAAhCYhAACMwlWCoUABCAAAQSGOQABCEAAApMQQGAmwUqhEIAABCCAwDAHIAABCEBgEgIIzCRYKRQCEIAABBAY5gAEIAABCExCAIGZBOtWFvo0SedJuknSpZK+upWtpFEQgMBsCCAwsxnK1o68QNIBSSdUuc6V9L5ldJ1eQgACe0UAgdkr8pur92JJL6up7iWSLtlcM6gJAhBYGgEEZt4j/ilJtl7qkpfInj7v7tM7CEBgLwkgMHtJf9q6vQT22lSFRcV7MU6/lnS/aZtA6RCAwJIJIDDzHH1bLbZeSrpc0sHqs/tUH/5R0pHz7D69ggAEtoEAArMNozBuG2yhvEHSM0KxXgqz9XKrpH3V5/+UdPi4VVMaBCAAgdsJIDDzmw1fknRS1a3fVZbLW6v//2/q7vGSfjY/BPQIAhDYBgIITP0oeBnpZElnSDpR0t8lvUvSB7Zh0DraEEXksqoP5RGLyf4ay2YHukUTIQCBXSOAwPz/iPlf+y+V9ICawfQy08u3+F/9H5V0ZtVuO1RaIKNDpf/7qaFf7svHd23S0l4IQGA3CCAwdxwnOyLe0GPo/FJ+25YJjYXxLaHtT5J0VeqL223xLMl9KMtnPbpNFghAAAL9CSAwd2TV5jdSR9XHgLdh2czW1tWSjq4aeZoknxzLKYuQ256PMvefPeSEAAQg0EIAgbkdTn75er/iPZJurqyVRzZw3IZlpuit32aV5D5+LfjF8EOBAAQgMCoBBOYQzntVQSDvGujmF7XDrfgFHTfJnd3+JM/bw+CRLwohXy6SdHbLDPER5q+E7xGYUX9OFAYBCEQCCMwhGhYPWwEl+XjvMTVTxUL0/rSP4Wy2dh5dic0mZ5iXxn4g6R5VpV3jicBscnSoCwILJ9D1QloCHovGdenU2Cclnd7S+SslnZq+92e2ZDaZYjsulHRBR+WPqvpasmHBbHK0qAsCCyOAwBza5I6h620R+EXclmw5+MhvXi67VtJzJf1qA/PI9VxR1fOJhojJdc2IfjIIzAYGiiogsFQCCIz002S92AqxZdCV8nJTyf9DSY/oenjN7211ud3+2yJhsfFeUJ+0KYF5jKQjqgZ5CZGIAX1GhzwQmBGBpQvMuqeqfMqsbllqav+SsjT2p0oc+4qLp250thxi+bRNe4utHThfJekuko6qyew2+k9x7IyiY6txSB9m9BOkKxCYL4ElC0y0AsoIl6CQQ0Y8Ry4uz/owgF+cDtfiIJNjpXggoa+1FeuOArOqEHqJ0IJiy8niYpZjpO9L8h/75/hvEgQgsMMEliww2XoZ+q95v1jfKMlLQW0v2H9LemdlOcSwLatMm7hJv6qTpIXvnKryIQLjuh0FwKJSF0Znlf40PWNx8ak8EgQgsMMEliowddbLkMjCWZz6TAGHbbE188E+mWvy+KXuMo6T9OnqRb9KUTFe2cckndVSiOu0GA0RlT9L+p6k6yvfIhfvvZhnS/pXz/2pdfq3ChOegQAEJiCwVIHJAjHkX/KriEscOodwcSiXIckvejtI+m9HFnjoGnsW0YJ5h6Q3p4ZYfH0E20tx5fbLprZ6D8j7Qd5PsXU2xEKzRZQtP9fnvZhS5hBG5IUABLaMwBIFJlsvPx+w5OPlsGvSGPrq4Y9Uewbl2HDXMA8RNLfX4uIXsl/ofgmvsz8RBTLu4Zwi6bxqaao4buZ+mJVFxALgNnAyrGuk+R4CCyawRIGJ/4L30A+JJZatl3IVsV+6FoJb0lzyUs+Nkl5XM8ceLulHHXPPZVq0iiWxyqZ+riL24U2SHlgtgTXtI1nUfPLLf9YRtgX/zOg6BJZJYGkC4yUm+4+UNMR68TO2JOKyUeaXL/Ty/3tvp+6k2TclPaVj2vmFXoJsDj2E0FR03yU+i6NFpY9P0DJ/PfQaAhBoJbA0gcn3oQw9lmyL5fkV0TqHymwdOeuR1b7CAUnnp9Eo39UNUmzrUGfKpkG3lWJhe1hDhr9I+rakV7L8xZsDAhBYl8CSBCZbL6ucVPLVySXi8k8kPTgNQAzfUr4qIvYQST9O+Zv2YqJQeYnK+y/r7nc4JI6XxO5dM2ksYK4Ta2XdXxTPQwACtxFYksDE5a1VXtp5j6VOoOr2YaKVlC2osoQWp2SO7LzuvouX9Oy/4nJzMgd/jrDwUoAABEYnsBSByXHDhpziKtBzJOKmMmKsLz9rh8GyOd5m4ThvrmNVZ8rSZlsrX5fkAwU5/aHa4CdEy+g/KwqEAARMYCkCk60XL5cNfbFmcWiyLOxMeOcwvboOApTN+3xtgA8gWHCGtjPO7M9Iek7DVP+CpGfxM4AABCAwFYElCExfYehinE9fRcskPvtLSfcPH2THyrwEZgHxZv+6BxBy+x9fbdjHz38v6ejqgw9JenVXp/keAhCAwKoEliAwMRz/OvefZAFoCi1Tdwz4CZK+Uw2SLRXvvdwzDJpPmMWozKss4eU5UNcOH0x4UJVx6Am6VecYz0EAAgslMHeByZeJNVkdfYY/RiHuWl58b3KuzIKRb8S0FVMcHVcJwZ/bf3jl9e+/S3q9pHeH/0dg+ow6eSAAgZUJzFlgckiYdR0VLQLF6ui69dJ+JB8Oo5IFJgtfHMAhkQWaBj4fyXa+cyVZ+Eqa89iv/IPgQQhAYDwCc37J5CWiIdGSM+F8/Lhrqa1LYJpuw+wqt+/I530nHxj4bhVRwGUclPSavoWRDwIQgMAqBOYqMNl6WXdPY+jx4byRn62nOn8Zj986IhjHP4vrlyWdFDJYgOzHQ4IABCAwGYG5Ckz0hB/juG+2CBy80nW0pb9JuluV4ReS9qfMvojsTuGzdUUwFp/3i66W9Lgqg6M/nzDyLZuTTVAKhgAEdpfAHAUm7z+MsaeRLYI+3vX/kFQ22b8o6eQwTXIb7Zxpp8h1fF7iLIz7Rf78hsqp0v/9DUkn7u6UpeUQgMCuEJijwMTjxEOjJTeNWw5i2XUCK++xZJHLFobrHWsssnj9VtIxoWN9rgnYlflLOyEAgS0mMNZLbVu6mF+uXULQt91ZENqiILvMLEgxf96fKW0YayyyuEWBuVTSi/t2mnwQgAAE1iEw1kttnTaM+WwOcd915W/fuvM9L13cYv54pDkfPoj1d5XZt61NAubnz5R0cd+CyAcBCEBgHQJjvdTWacNYz05lvbh9MYBllw9Mbkc8EFC3NFb6/1hJ144Ao+kI9LckPXmE8ikCAhCAQC8CcxKYaL2sctdLE7B8RLnLV6UpekC2LG6WdGyo9L6Sbuo1au2Zmo5Any3pohHKpwgIQAACvQjMRWCy1bBOSJgMLlsEXSH04zXH5ZBB3Uv/krAfcr0kX0g2VspXBthyOkvSjWNVQDkQgAAEugjMRWCmsl7ML1skbf4qWUiKGPkaYkc3LsnLZi+U5CCYTtcEP5WuMevzvW/OLIL1V0lH9HmIPBCAAATGJDAHgcnWy1je8IVz9oFp86upu43SFo0jOpdknxRHNP68pGdWH36u5d6WVcbbVpdPst1d0isk2YIhQQACENgogTkITLRe1g1oWQc/b8y3HX2ObXFUZFs0Ocy/jwn7uLCDYTpmmZP3RrxHQoIABCAwGwK7LjBT7r2UQc4C02YhRQ96HzSwRXNLmC1FdPxRvGXTdVi4SBCAAARmQ2DXBWYqv5c4wHnDvIlZjlfmpTSn6HcST7chMLP5GdERCECgjsAuC8yUfi9NAtMWeiZ779vS8WenhsLiAYHPSjql+m7sPRhmOwQgAIE9J7DLAhM337t8U1YFPcQHps57Py+vRYG5Kpwi8ymzJ67aSJ6DAAQgsI0EdlVgcsiVsWKO5THKPjBNQtbkvZ83+OMhhHiKrJws28Y5QpsgAAEIrERgVwVmE9aLgeZjx01Olk3e+/nzKFCxDw4R41AxJAhAAAKzIbCLArMp68WDnH1gmpws67z3/XxeYvNnhXm8VhmBmc1Pio5AAAKFwC4KTLQqptp7KXz6CEz23s++OLdK2hemXAljk8vexbHglwQBCECgkcAuvtQcEPK4qkdj3FbZNj2ubDkFVp6r8973cyXFsC3+rERXjo6WWDD8SCEAgdkR2DWBif/qt9A4AvGUqe0UWKk3ilB0pGwSoGLhcEx5ypGjbAhAYM8J7JrAHJB0fkXtQkkXTEywj8BER8y6awLyEpr3a7xMxjHliQeP4iEAgb0lsGsC45e1w847OrCtmalT1x5Mnfe+jybnFA8B+DtfoXxQ0ulVxssknTF1ZygfAhCAwCYJ7JrAbJKN6+oSmOznYuFwPLKc8nFlP+e9m5LargDYdJ+pDwIQgMAoBBCYdoxtfiz5uHTbLZrZETPXOpWj6CiThEIgAAEIrEIAgWmn1ubJP+SeGNeSY5XFmn0/jL35SRCAAARmQwCBWU1g7EDpaMi2YkpqWh6LNeS9GH93uaTTZjOj6AgEIACBigACM0xgnNtCcp0kL3uV1LY8FmuwIFlk9lcf/qba6OfGSX6SEIDA7AggMO1Dmo8YO7fjkZ2THhuyh2Lrx3s7dhb1MWsLDgkCEIDA7AggMN1Dmi8cy080BcDsLpkcEIAABGZMAIHpHtw2gfEFZLZI6o4md5dMDghAAAIzJoDAdA9um8AMWRrrrokcEIAABGZEAIHpHswmgem7sd9dAzkgAAEIzJAAAtM9qE0Cc7wkX5NMggAEIACBGgIITPe0qBMYNva7uZEDAhBYOAEEpnsCZIFxSH77wLCx382OHBCAwIIJIDDdg58FhsCU3czIAQEIQOC2++FB0UzA3vbHVl//R9JRWC9MFwhAAALdBLBguhk5rP7bJe2rPO/r7nvpLoUcEIAABBZGAIFZ2IDTXQhAAAKbIoDAbIo09UAAAhBYGAEEZmEDTnchAAEIbIrA/wARspGFhnCt1gAAAABJRU5ErkJggg=="
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfferLetterComponent],
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
        SharedModule,
        CKEditorModule,
        SignaturePadModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferLetterComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    localStorage.setItem('currentUser', JSON.stringify({
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTY0NjM0NTUxLCJleHAiOjE1NjQ2NTI1NTF9.gNsDldeY4OeFA91fBmE0n4CXOSEeJ_GbjS5fgr6twB4',
      email: 'pavan.basolutions@gmail.com',
      id: '1',
      flag: null,
      empType: {
        id: '5',
        employeeType: 'Employee'
      },
      userType: {
        id: '3',
        name: 'employee',
        typeName: 'Employee'
      },
      first_name: 'Davidsvids',
      last_name: 'jackson',
      middle_name: 'james',
      isAdmin: true,
      Adminrole: true,
      permission: {
        createWorkShifts: true,
        createAssignLeave: false,
        createCandidates: true,
        createCompanyInfo: true,
        createCustomers: false,
        createEducation: true,
        createEmployeestatus: true,
        createHolidays: true,
        createJobCategorie: true,
        createJobTitle: true,
        createLanguages: true,
        createLicenses: true,
        createMemberships: true,
        createPayGrade: true,
        createProjects: true,
        createSkills: true,
        createTerminationReasons: true,
        createTimesheets: true,
        createUser: true,
        createRole: true,
        updateWorkShifts: true,
        updateCandidates: true,
        updateCustomers: false,
        updateEducation: true,
        updateEmployeestatus: true,
        updateHolidays: true,
        updateJobCategorie: true,
        updateJobTitle: true,
        updateLanguages: true,
        updateLicenses: true,
        updateMemberships: true,
        createActivity: false,
        updateActivity: false,
        updatePayGrade: true,
        updateProjects: true,
        updateSkills: true,
        activities: false,
        getActivity: false,
        updateTerminationReasons: true,
        updateTimesheets: true,
        updateUser: true,
        updateRole: true,
        readWorkShifts: true,
        readAssignLeave: false,
        readCandidates: true,
        readCustomers: false,
        readEducation: true,
        readEmployeestatus: true,
        readEmployeeTimesheets: true,
        readHolidays: true,
        readJobTitle: true,
        readLanguages: true,
        readLicenses: true,
        readMemberships: true,
        readPayGrade: true,
        readProjects: true,
        readSkills: true,
        readTerminationReasons: true,
        readUser: true,
        readConfiguration: true,
        createPermission: false,
        readPermission: false,
        updatePermission: true,
        updatePrefix: true,
        createBranch: true,
        updateBranch: true,
        readSettings: true,
        createJob: true,
        updateJob: true,
        readJob: true,
        readRole: true,
        updateClientCompany: true,
        createClientCompany: true,
        readClientCompany: true,
        readVendorCompany: true,
        readClientContacts: true,
        updateClientContacts: true,
        createClientContacts: true,
        readVendorContacts: true,
        readTimesheets: true,
        viewTimesheet: true,
        readJobDetails: true,
        updateJobDetails: true,
        readSalaryComponent: true,
        createSalaryComponent: true,
        updateSalaryComponent: true,
        readKpi: true,
        createKpi: true,
        updateKpi: true,
        readTracker: true,
        createTracker: true,
        updateTracker: true,
        readReview: true,
        createReview: true,
        updateReview: true,
        createEmployeeType: true,
        createLeave: true,
        updateLeave: true,
        readLeave: true,
        readOrganizationalKpi: true,
        updateOrganizationalKpi: true,
        readTermsConditions: true,
        updateTermsConditions: true,
        createTermsConditions: true,
        createUserApplyLeave: true,
        updateUserApplyLeave: true,
        addEntitlements: true,
        readEntitlements: true,
        updateEmployeeType: true,
        readEmployeeType: true,
        updateVendorCompany: true,
        createVendorCompany: true,
        createVendorContacts: true,
        updateVendorContacts: true,
        readJobCategorie: true,
        readEmployeeReviews: true,
        readSupervisorReviews: true,
        createOrganizationalKpi: false,
        readUserReports: true
      },
      submenuPermission: {
        clientCompany: true,
        vendorCompany: true,
        clientCompanyContact: true,
        vendorCompanyContact: true,
        jobPosting: true,
        candidates: true,
        projects: true,
        assignProjects: true,
        myTimesheets: true,
        employeeTimesheet: true,
        kPIs: true,
        manageReviews: true,
        myReviews: true,
        employeeReviews: true,
        leavePeriod: true,
        leaveType: true,
        entitlements: true,
        reports: true,
        leaveList: true,
        assignLeave: true,
        applyLeave: true,
        myEntitlements: true
      },
      fieldPermission: {
        readdob: true,
        updatedob: true,
        createdob: true,
        readssn: true,
        createssn: true,
        updatessn: true,
        readInternalNotes: true,
        createInternalNotes: true,
        updateInternalNotes: true,
        readJobInternalNotes: true,
        createJobInternalNotes: true,
        updateJobInternalNotes: true
      }
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', fakeAsync(() => {
    component.logoUrl = authServiceStub.getBaseUrl() + '/frontend/logos/' + result.data.siteLogo;
    component.ngOnInit();
    tick();
    activatedRouteStub.params.subscribe(res => console.log(res));
  }));

  it('#getDigitalKey - 400 response', () => {
    spyOn(userServiceStub,'getDigitalKey').and.returnValues(of({
      json: function() {
        return {
          statusCode: {
            code: '400',
            message: 'error'
        },
        errorMessages: 'error',
        data: null
      }
    }}));
    component.getDigitalKey();
    expect(component.digitalKeystatus).toBe(false);
  });
  
  it('#getUserDigitalKey', fakeAsync(() => {
    component.getUserDigitalKey('1');
    tick();
    expect(component.userDigitalKeystatus).toBe(false);
  }));

  it('#getUserDigitalKey - 200 response', () => {
    spyOn(userServiceStub,'getDigitalKeyById').withArgs('1').and.returnValues(of({
      json: function() {
        return {
          statusCode: {
            code: '200',
            message: 'ok'
          },
          errorMessages: null,
          data: {
            id:'1',
            user_id:'1',
            digitalKey:'',
            createdOn:'2019-09-11 18:26:15',
            updatedOn:'2019-09-25 16:53:24'
          }
        }
      }
    }));
    component.getUserDigitalKey('1');
    expect(component.userDigitalKeystatus).toBe(true);
  });
  
  it('#generateOfferLetter', fakeAsync(() => {
    component.offerData = false;
    component.responseStatus = true;
    component.generateOfferLetter();
    tick();
    expect(component.offerData).toBe(true);
    expect(component.responseStatus).toBe(false);
  }));
  
  it('#uploadSignature', fakeAsync(() => {
    component.uploadSignature();
    tick();
    expect(component.offerData).toBe(true);
    expect(component.responseStatus).toBe(false);
    expect(component.uploadhrsignature).toBe(true);
    expect(component.signaturePad).toBe(true);
  }));
  
  it('#editSignature', fakeAsync(() => {
    component.editSignature();
    tick();
    expect(component.offerData).toBe(true);
    expect(component.responseStatus).toBe(false);
    expect(component.digitalKeystatus).toBe(false);
    expect(component.signaturePad).toBe(true);
  }));
  
  it('#uploadImage', fakeAsync(() => {
    component.uploadImage();
    tick();
    expect(component.offerData).toBe(true);
    expect(component.digitalKeystatus).toBe(false);
    expect(component.signaturePad).toBe(false);
  }));
  
  it('#continue', fakeAsync(() => {
    component.continue();
    tick();
    expect(component.offerData).toBe(true);
    expect(component.uploadhrsignature).toBe(false);
    expect(component.isSuccess).toBe(true);
  }));
  
  it('#cancel', fakeAsync(() => {
    spyOn(locationStub, 'back');
    component.cancel();
    expect(locationStub.back).toHaveBeenCalled();
  }));
  
  it('#imagepopup', fakeAsync(() => {
    component.imagepopup();
    tick();
    expect(component.imagePopSuccess).toBe(false);
    expect(component.error).toBe(false);
    expect(component.imagePop).toBe(false);
  }));
  
  it('#goBack', fakeAsync(() => {
    component.goBack();
    tick();
    expect(component.digitalKeystatus).toBe(true);
  }));
  
  it('#close', fakeAsync(() => {
    component.close();
    tick();
    expect(component.isSuccess).toBe(false);
    expect(component.isFailure).toBe(false);
    expect(component.loading).toBe(false);
    expect(component.offerData).toBe(false);
    expect(component.error).toBe('');
    expect(component.responseStatus).toBe(false);
    expect(component.uploadhrsignature).toBe(false);
  }));
  
  it('#tryagain', fakeAsync(() => {
    component.tryagain();
    tick();
    expect(component.imagePop).toBe(false);
    expect(component.offerData).toBe(true);
    expect(component.responseStatus).toBe(false);
    expect(component.uploadhrsignature).toBe(true);
    expect(component.error).toBe('');
    expect(component.signaturePad).toBe(true);
  }));

  it('#addimage', fakeAsync(() => {
    component.addimage();
    tick();
    userServiceStub.addDigitalKey(data)
      .pipe(map(response => {
        component.result = response.json();
      }))
    tick();
  }));
  
  it('#showImage', fakeAsync(() => {
    component.showImage(data);
    tick();
  }));
  
  it('#fileChangeEvent', fakeAsync(() => {
    component.fileChangeEvent(event);
    tick();
  }));
  
  it('#fileOverBase', fakeAsync(() => {
    component.fileOverBase(event);
    tick();
  }));
  
  it('#fileOverAnother', fakeAsync(() => {
    component.fileOverAnother(event);
    tick();
  }));

});
