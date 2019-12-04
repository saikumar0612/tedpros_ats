import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { FileUploader } from 'ng2-file-upload';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { DatePipe, Location } from '@angular/common';
import { PatternsService } from '../../../core/services/patterns.service';


// const URL = 'http://service.tedpros.com/upload/uploadProfilePic/';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  log
  logger:any={};
  isShowPopup;
  message;
  error;
  isShowPopup1
  message1;
  error1;

  imageChangedEvent: any = '';
  croppedImage: any = {};
  image:any;

  personalInfo: any = {
    statusCode: {},
    data:{
      nationality:{
        id:"",
        name:"",
      },
      licenseExpDate:'',
      dob:''
    }
  };  
  data:{
    nationality:{
      id:"",
      name:"",
    }
    userId:""
  };
  picturedata: any = {
    statusCode: {},
    data: {},
  };
  viewDetails: any = {};
  info: any = {};
  url: any;
  URL;
  display = false;
  index;
  location: string;
  countries;
  loading;
  licenseExp;
  // patterns
  //  companyNamePattern = '^[a-z0-9_-]{8,50}$';
  contactPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailIdPattern = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z.]{2,4}$)';
  ssnPattern = '^\d{3}-?\d{2}-?\d{4}$';
  errormsg;

todayDate1;
todayDate2;
licenseExpError = '';
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userFieldPermissions = this.currentUser.fieldPermission;
  dateError = ' ';
  today;
  indexofDependents;
  doberror;
  checkdate;
  differenceInHours;
  diffInDays;
  age;
  linkedInPattern;
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, public service: UserService,private eventEmitterService: EventEmitterService, private pattern: PatternsService) {
    this.linkedInPattern = this.pattern.linkedInPattern;

    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='View Personal Info';
    this.logger.comment='View Personal Info';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      this.eventEmitterService.onRecentActivityRefresh(); 
    });

    // get countries list
    this.service.getCountries()
    .subscribe(response => {
      this.countries = response.json().data;
      this.loading = false;
    },
    error => {
      console.log(error);
    });

    this.getProfilePicture();
    this.getPersonalInfo();    
  }

    // get personal details
    getPersonalInfo(){
      this.service.getPersonalInfo()
      .subscribe(response => {
        this.personalInfo = response.json();
        this.data = this.personalInfo.data;
        //  changes --suresh-- 08-23-2019 start
        if(this.personalInfo.data.licenseExpDate === '0000-00-00'){
          this.personalInfo.data.licenseExpDate ="";
        }
        //  changes --suresh-- 08-23-2019 end
      },
      error => {
        console.log(error);
      });
    }

  // get profile picture details
  getProfilePicture(){
    this.service.getPersonalPicture()
    .subscribe(response => {
      const picturedetails = response.json();
      this.picturedata = picturedetails.data;
    },
    error => {
      console.log(error);
    });
  }

  resetForm(addPersonalFrm:NgForm){
    // addPersonalFrm.resetForm();
    // addPersonalFrm.controls.userId.setValue(this.data.userId);
    // this.personalInfo.data.userId = this.data.userId;
    this.personalInfo.data.firstName = "";
    this.personalInfo.data.middleName = "";
    this.personalInfo.data.lastName = "";
    this.personalInfo.data.contact = "";
    this.personalInfo.data.driverLicenseNo = "";
    this.personalInfo.data.licenseExpDate = "";
    this.personalInfo.data.bloodGroup = "";
    this.personalInfo.data.maritalStatus = "";
    this.personalInfo.data.gender = "";
    this.personalInfo.data.nationality.id = "";
    this.personalInfo.data.dob = "";
    this.personalInfo.data.smoker = "";
    this.personalInfo.data.ssn = "";
    this.personalInfo.data.summary = "";
  }

  // crop image
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // image crop
  imageCropped(event: ImageCroppedEvent) {
    this.image = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  //  changes --suresh-- 08-23-2019 start
  dateOfBirthValidation(){
    this.doberror="";
    this.errormsg = "";
    this.checkdate= new Date();
    this.differenceInHours = Date.parse(this.checkdate) - Date.parse(this.personalInfo.data.dob);
    this.diffInDays = this.differenceInHours / 1000 / 60 / 60 / 24;
    this.age=this.diffInDays/365;
    if(this.age<14){
      this.doberror="Employee Below the Age 14 are not eligible";
    }
   
  } 
   //  changes --suresh-- 08-23-2019 end
  // saikumar 19/08/2019 started here 
 
  
  dateValidate() {
    this.dateError = '';
    this.errormsg = '';
    this.today = new Date();    
    console.log(this.today);
    if (this.personalInfo.data.dob >= this.today) {
    this.dateError = 'Please select valid date';
    console.log('1' + this.dateError);
    } else {
    this.dateError = '';
    
    }
  }

  // saikumar 19/08/2019 ended here

  ngOnInit() {
    if (this.eventEmitterService.pictureVar === undefined) {
      this.eventEmitterService.pictureVar = this.eventEmitterService.
      invokeUserProfilePicRefresh.subscribe((name: string) => {
        this.getProfilePicture();
      });
    }
  }

  onNavigate(location) {
    this.router.navigate([location]);
  }

  cancel() {
    this.router.navigate(['myInfo']);
  }

  editInfo() {
    this.display = true;
  }

  back() {
    this.display = false;
    this.getPersonalInfo();
  }
  // edit personal info
  editPersonalInfo() {
    this.licenseExpError = '';
    this.todayDate1 = new Date(); 
    this.todayDate2 =  new DatePipe('en-US').transform(this.todayDate1, 'MM-dd-yyyy'); 
    console.log(this.todayDate2);
    if ( this.personalInfo.data.licenseExpDate && (this.personalInfo.data.licenseExpDate < this.todayDate1)) {
      this.licenseExpError = 'Please select valid License Expiry Date';
      // console.log(this.licenseExpError);
    }
    else if(this.doberror){
      this.errormsg = "Employee Below the Age 14 are not eligible";
    } 
    else {
    this.licenseExpError = '';
    
    this.licenseExp = new DatePipe('en-US').transform(this.personalInfo.data.licenseExpDate, 'yyyy-MM-dd');
    this.personalInfo.data.dob = new DatePipe('en-US').transform(this.personalInfo.data.dob, 'yyyy-MM-dd');

    this.personalInfo.data.licenseExpDate = this.licenseExp; 
    const today = new Date();
    const todayDate = new DatePipe('en-US').transform(today, 'yyyy-MM-dd');
    if (this.personalInfo.data.dob >= todayDate) {
      this.errormsg = 'Please select a valid Date Of Birth';
      console.log(this.errormsg);
    }else{
      this.service.editPersonalInfo(this.personalInfo.data)
      .subscribe(response => {
        this.info = response.json();
        if (this.info.statusCode.code === '200') {
          this.message1 = this.info.data;
          this.isShowPopup1 = true;
        }
        else {
          this.error1 = this.info.errorMessages;
          this.loading = false;
          this.isShowPopup1 = true;
        }
      },
      error => {
        console.log(error);
      });
    }
    }

   
  }


  // uploadProfilePic
  uploadPic() {
    this.croppedImage.croppedImage = this.image;
    // console.log(this.croppedImage);
    this.service.uploadProfilePic(this.croppedImage)
    .subscribe(response => {
      this.info = response.json();
      if (this.info.statusCode.code === '200') {
        this.eventEmitterService.onUserProfilePicRefresh(); 
        this.eventEmitterService.onUserPictureRefresh(); 
        this.message = this.info.data;
        this.isShowPopup = true;
      }
      else {
        this.error = this.info.errorMessages;
        this.loading = false;
        this.isShowPopup = true;
      }
    },
    error => {
      console.log(error);
    });
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }
  closePopup1() {
    this.isShowPopup1 = !this.isShowPopup1;
  }

}
