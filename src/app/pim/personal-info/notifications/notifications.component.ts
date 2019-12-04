import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services';
import { Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  private bodyText: string;
  jobs;
  filterData:any=[{
    department:{}
  }];
  alertDetails=[];
  docalertDetails:any={
    i9AlertDetails:'',
    federalw4AlertDetails:'',
    statew4AlertDetails:'',
    workAuthAlertDetails:''
  };
  alertvalue={
    alert:''
  }
  alertInfo={
    alert:'',
    type:''
  }
  details:any;
  userData:any = {};
  singleJob:any;
  isShowDetails:boolean = false;
  isShowPopup = false;
  headers:any;
  options:any;
  start;
  loading = false;
  licenseset=[];
  dateError1;
  singleDetail:any={
    type:'',
    id:'',
    certificateName:'',
    license:{
      id:'',
      name:''
    },
    issued:'',
    expiry:'',
    number:'',
    alert:''
  };
  licenseData:any={}
  alertData={
    alert:''
  };
  dateError;
  alert:any={
    markAsRead:''
  }
  value:any={};
  workData = {
    workyear: '',
    comment: '',
    expiryDate:'',
    alert:''
  };
  i9Data: any = {
    comment: '',
    expiryDate:'',
    i9year:'',
    alert:''
  };
  w4Data: any = {
    comment: '',
    expiryDate:'',
    w4year:'',
    alert:''
  };
  statew4Data: any = {
    comment: '',
    expiryDate:'',
    w4year:'',
    alert:''
  };
  statew4;
  federalw4;
  workauth=[];
  data = [];
  work: any = [];
  dropdownSettings = {};
  isShowModal = false;
  showModal = false;
  isi9Document = false;
  isfw4Document = false;
  issw4Document = false;
  isWorkDocument = false;
  
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken:any;
  userPermissions: any;
  
  // url:any = 'http://localhost/tedpros_services/';

  constructor(public http:Http, private router: Router, public service:UserService, private eventEmitterService: EventEmitterService ) {
    this.headers = new Headers({'Token': this.userToken});
    this.options = new RequestOptions({ headers: this.headers });
    this.userToken = this.currentUser.token;
    this.userPermissions = this.currentUser.permission;
    this.getDetails();
    this.getDocumentAlertDetails();

    this.statew4 = 'state';
    this.federalw4 = 'federal';

    // get work authorization list
    this.service.getWorkAuth()
    .subscribe(response => {
      this.workauth = response.json().data;
      this.loading = false;
    },
    error => {
      console.log(error);
    });    

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      'closeDropDownOnSelection': true
    };
    
  }

  //get alerts list
  getDetails(){
    this.loading = true;
    this.service.getAlertDetails()
    .subscribe(response => {
      this.alertDetails = response.json().data;
      },
      error => {
        console.log(error);
      })
  }

  //get document alerts list
  getDocumentAlertDetails(){
    this.service.getDocumentAlertDetails()
    .subscribe(response => {
      this.docalertDetails = response.json().data;
      this.loading = false;
      },
      error => {
        console.log(error);
      })
  }

  ngOnInit() {    

    // get license info
    this.service.getLicenses()
    .subscribe(response => {
      this.licenseset = response.json().data;
      this.loading = false;
    },
    error => {
      console.log(error);
    });

    // i9 documents
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      if (this.i9Data.alert) {
        this.alert = 1;
      } else {
        this.alert = 0;
      }
      form.append('comment', this.i9Data.comment);
      form.append('year', this.i9Data.i9year);
      form.append('alert', this.alert);
      form.append('expiryDate', new DatePipe('en-US').transform (this.i9Data.expiryDate, 'yyyy-MM-dd'));
    };

    // federal w4 documents
    this.uploader1.onBuildItemForm = (fileItem: any, form: any) => {
      if (this.w4Data.alert) {
        this.alert = 1;
      } else {
        this.alert = 0;
      }
      form.append('comment', this.w4Data.comment);
      form.append('year', this.w4Data.w4year);
      form.append('type', this.federalw4);
      form.append('alert', this.alert);
      form.append('expiryDate', new DatePipe('en-US').transform (this.w4Data.expiryDate, 'yyyy-MM-dd'));
    };

    // state w4 documents
    this.uploader3.onBuildItemForm = (fileItem: any, form: any) => {      
      if (this.statew4Data.alert) {
        this.alert = 1;
      } else {
        this.alert = 0;
      }
      form.append('comment', this.statew4Data.comment);
      form.append('year', this.statew4Data.w4year);
      form.append('type', this.statew4);
      form.append('alert', this.alert);
      form.append('expiryDate', new DatePipe('en-US').transform (this.statew4Data.expiryDate, 'yyyy-MM-dd'));
    };

    // work auth documents
    this.uploader2.onBuildItemForm = (fileItem: any, form: any) => {
      this.data.forEach(type => {
        this.work.push(type.id);
      });
      if (this.workData.alert) {
        this.alert = 1;
      } else {
        this.alert = 0;
      }
      form.append('workType', this.work);
      form.append('comment', this.workData.comment);
      form.append('year', this.workData.workyear);
      form.append('alert', this.alert);
      form.append('expiryDate', new DatePipe('en-US').transform (this.workData.expiryDate, 'yyyy-MM-dd'));
    };


  }

  updateDetails(recordId, type){
    this.singleDetail = this.alertDetails.filter(x => x.id == recordId)[0];
    // console.log(this.singleDetail);
    this.licenseData.type = this.singleDetail.type;
    this.licenseData.recordId = this.singleDetail.id;
    this.licenseData.alert = this.singleDetail.alert;
    this.licenseData.certificateName = this.singleDetail.certificateName;
    if(this.singleDetail.license){      
      this.licenseData.license = this.singleDetail.license.id;
    }
    this.licenseData.number = this.singleDetail.number;
    this.licenseData.issued = new Date(this.singleDetail.issued_date);
    this.licenseData.expiry = new Date(this.singleDetail.expiry_date);
    this.isShowPopup = true;
    this.isShowDetails = true;
  }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
    this.isShowDetails = false; 
  }

  showDetails(id,values) {
    this.value.id = id;
    this.value.isRead = values.currentTarget.checked;
    this.isShowModal = true;
  }

  closeModal() {
    this.isShowModal = !this.isShowModal;
  }

  //on change mark as read
  changeRead(id,values){
    this.value.isRead = values;
    this.service.changeRead(id, this.value)
    .subscribe(response => {
      this.details = response.json(); 
      this.getDetails();
      this.eventEmitterService.onUserAlertRefresh();
      this.isShowModal = false;
    },
    error => {
      console.log(error);
    })
  }

  //document on change mark as read
  changeDocReadValue(id,values,type){
    this.value.isRead = values;
    this.value.type = type;
    console.log(this.value);
    this.service.changeDocReadValue(id, this.value)
    .subscribe(response => {
      this.details = response.json(); 
      this.getDetails();
      this.getDocumentAlertDetails();
      this.eventEmitterService.onUserAlertRefresh();
      this.showModal = false;
    },
    error => {
      console.log(error);
    })
  }


  //update i9 mark as read
  showPopup(id,values,type) {
    this.value.id = id;
    this.value.isRead = values.currentTarget.checked;
    this.value.type = type;
    this.showModal = true;
    console.log(this.value)
  }

  close() {
    this.showModal = !this.showModal;
  }

  onselect(id){
    this.alertvalue.alert = "false";
    this.service.updateAlert(id, this.alertvalue)
    .subscribe(response => {
      this.details = response.json().data;    
      this.loading = true;
      this.getDetails();
      this.getDocumentAlertDetails();
      this.eventEmitterService.onUserAlertRefresh();
      this.loading = false;
    },
    error => {
      console.log(error);
    })
  }

  //on change alert toggle for documents
  onChange(id, type){
    this.alertInfo.alert = "false";
    this.alertInfo.type = type;
    this.service.updateAlertData(id, this.alertInfo)
    .subscribe(res => {
      this.details = res.json(); 
      this.getDetails();
      this.getDocumentAlertDetails();
      this.eventEmitterService.onUserAlertRefresh();
      this.isShowModal = false;
    },
    error => {
      console.log(error);
    })
  }

  //validate date
  dateValidate() {
    if (this.licenseData.issued >= this.licenseData.expiry) {
      this.dateError = 'Please select a valid expiry target date';
    }
    else{
      this.dateError = "";
    }
  }


  dateValidate1(){
    this.start = new Date(Date.now());
    if (this.workData.expiryDate < this.start) {
      this.dateError1 = 'Please select a valid expiry date';
    }
    else{
      this.dateError1 = "";  
    }
  }

  //submit record
  submit(){
    if (this.licenseData.alert) {
      this.licenseData.alert = "1";
    } else {
      this.licenseData.alert = "0";
    }
    this.licenseData.issued = new DatePipe('en-US').transform(this.licenseData.issued, 'yyyy-MM-dd');
    this.licenseData.expiry = new DatePipe('en-US').transform(this.licenseData.expiry, 'yyyy-MM-dd');
    // this.http.post('http://service.tedpros.com/notification/updateDetails?recordId='+this.licenseData.recordId, this.licenseData, this.options)
    this.service.updateDetails(this.licenseData.recordId, this.licenseData)
    .subscribe(response => {
      this.details = response.json().data;
      this.loading = true;
      this.getDetails();
      this.eventEmitterService.onUserAlertRefresh();
      this.isShowPopup = !this.isShowPopup;
      this.isShowDetails = false; 
      this.loading = false;
    },
    error => {
      console.log(error);
    })

  }

  //open modal for i9 document upload
  openi9DocUpload(){
    this.isi9Document = true;
  }

  //open modal for federal w4 document upload
  openfw4DocUpload(){
    this.isfw4Document = true;
  }

  //open modal for state w4 document upload
  opensw4DocUpload(){
    this.issw4Document = true;
  }

  //open modal for work auth document upload
  openWorkDocUpload(){
    this.isWorkDocument = true;
  }

  closeDocUploadModal(type){
    if(type === "i9Doc"){
      this.isi9Document = false;
    }
    else if(type === "fw4Doc"){
      this.isfw4Document = false;
    }
    else if(type === "sw4Doc"){
      this.issw4Document = false;
    }
    else if(type === "workDoc"){
      this.isWorkDocument = false;
    }
  }

  // i9 document upload start
  public uploader: FileUploader = new FileUploader({
    url: this.service.getUploadI9(),
    itemAlias: 'i9doc',
    headers: [{ name: 'Token', value: this.userToken }]
  });

  // federal w4 document upload
  public uploader1: FileUploader = new FileUploader({
    url: this.service.getUploadFederalW4(),
    itemAlias: 'w4doc',
    headers: [{ name: 'Token', value: this.userToken }]
  });

  // state w4 document upload
  public uploader3: FileUploader = new FileUploader({
    url: this.service.getUploadStateW4(),
    itemAlias: 'statew4',
    headers: [{ name: 'Token', value: this.userToken }]
  });

  // work document upload
  public uploader2: FileUploader = new FileUploader({
    url: this.service.getUploadWork(),
    itemAlias: 'workauth',
    parametersBeforeFiles: true,
    headers: [{ name: 'Token', value: this.userToken }]
  });
}
