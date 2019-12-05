import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { DatePipe } from '@angular/common';

// const URL = '/api/';


@Component({
  selector: 'app-documents-info',
  templateUrl: './documents-info.component.html',
  styleUrls: ['./documents-info.component.css']
})
export class DocumentsInfoComponent implements OnInit {
  log
  logger: any = {};
  currentDate;
  date1 = new Date();
  show = 3;
  show1 = 3;
  show2 = 3;
  show3 = 3;
  displayWork = false;
  displayDocument = false;
  displayw4 = false;
  displaystatew4 = false;
  url: any;
  i9details: any;
  i9Info: any;
  w4details: any;
  w4Info: any;
  workDetails: any;
  workInfo;
  workauth;
  workdata = [];
  loading;
  data = [];
  workData = {
    workyear: '',
    comment: '',
    expiryDate: '',
    alert: ''
  };
  i9Data: any = {
    comment: '',
    expiryDate: '',
    i9year: '',
    alert: ''
  };
  w4Data: any = {
    comment: '',
    expiryDate: '',
    w4year: '',
    alert: ''
  };
  statew4Data: any = {
    comment: '',
    expiryDate: '',
    w4year: '',
    alert: ''
  };
  id;
  work: any = [];
  title = 'app';
  dropdownSettings = {};
  usersList = {};

  singleDoc: any;
  isShowDetails = false;
  isShowPopup = false;
  isSuccess = false;

  single: any;
  isShowModal = false;
  isDetails = false;

  singlework: any;
  isShow = false;
  isDetails1 = false;
  statew4;
  federalw4;
  federal = [];
  state = [];
  federaldata;
  length;
  length1;
  length2;
  length3;
  workAuthURL = '';
  i9URL = '';
  w4URL = '';
  statew4URL = '';
  yearPattern = '^\d{4}$';
  location: string;
  dateError;
  dateError1;
  dateError2;
  dateError3;
  start;
  display: any;
  displayFederalW4: any;
  displayStateW4: any;
  displayWorkAuth: any;
  editi9: any = {
    id: '',
    year: '',
    expiryDate: '',
    comment: '',
    alert: ''
  }
  editfw4: any = {
    id: '',
    year: '',
    expiryDate: '',
    comment: ''
  }
  editsw4: any = {
    id: '',
    year: '',
    expiryDate: '',
    comment: ''
  }
  editWorkAuth: any = {
    id: '',
    year: '',
    expiryDate: '',
    comment: '',
    type: {
      id: '',
      name: ''
    }
  }
  fw4Info: any;
  workAuthInfo: any;
  alert: any;
  i9Error;
  w4Error;
  stateError;
  // declared variable - sharmistha - 08-13-2019 - start  
  expiryDate: any;
  // declared variable - sharmistha - 08-13-2019 - end
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken: any;
  userPermissions: any;
  headers: any;
  options: any;
  uploader: any;
  uploader1: any;
  uploader2: any;
  uploader3: any;

  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, public service: UserService, private eventEmitterService: EventEmitterService) {
    console.log(this.currentUser.token);

    this.userPermissions = this.currentUser.permission;
    this.headers = new Headers({ 'Token': this.currentUser.token });
    this.options = new RequestOptions({ headers: this.headers });
    this.i9URL = this.service.getBaseUrl() + '/frontend/i9/';
    this.w4URL = this.service.getBaseUrl() + '/frontend/w4/';
    this.statew4URL = this.service.getBaseUrl() + '/frontend/statew4/';
    this.workAuthURL = this.service.getBaseUrl() + '/frontend/workauth/';


    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'View Documents Info';
    this.logger.comment = 'View Documents Info';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        // this.timerComponent.getusersactivity();
        // firstComponentFunction(){    
        this.eventEmitterService.onRecentActivityRefresh();
        // }  
      });
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

    this.usersList = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      'closeDropDownOnSelection': true
    };

    this.statew4 = 'state';
    this.federalw4 = 'federal';  // i9 document upload start
    this.uploader = new FileUploader({
      url: this.service.getUploadI9(),
      itemAlias: 'i9doc',
      headers: [{ name: 'Token', value: this.currentUser.token }]
    });

    // federal w4 document upload
    this.uploader1 = new FileUploader({
      url: this.service.getUploadFederalW4(),
      itemAlias: 'w4doc',
      headers: [{ name: 'Token', value: this.currentUser.token }]
    });

    // state w4 document upload
    this.uploader3 = new FileUploader({
      url: this.service.getUploadStateW4(),
      itemAlias: 'statew4',
      headers: [{ name: 'Token', value: this.currentUser.token }]
    });

    // work document upload
    this.uploader2 = new FileUploader({
      url: this.service.getUploadWork(),
      itemAlias: 'workauth',
      parametersBeforeFiles: true,
      headers: [{ name: 'Token', value: this.currentUser.token }]
    });




    //calling functions on load
    this.geti9Docs();
    this.getWorkDocs();
    this.getw4Docs();

  }







  //get i9 documents list
  geti9Docs() {
    this.service.upload()
      .subscribe(response => {
        console.log(response);
        this.i9details = response.json().data;
        if (this.i9details) {
          this.length = this.i9details.length;
        }
        // console.log(this.i9details);
      },
        error => {
          console.log(error);
        });
  }

  //get work authorization documents list
  getWorkDocs() {
    this.service.uploadWorkInfo()
      .subscribe(response => {
        this.workDetails = response.json().data;
        if (this.workDetails) {
          this.workdata = this.workDetails;
          this.length1 = this.workdata.length;
        }
        // console.log(this.workdata);
      },
        error => {
          console.log(error);
        });
  }

  //get w4 documents list
  getw4Docs() {
    this.service.uploadW4Info()
      .subscribe(response => {
        this.w4details = response.json().data;
        // console.log(this.w4details);
        if (this.w4details) {
          this.w4details.forEach(obj => {
            if (obj.type === 'federal') {
              this.federal.push(obj);
              this.federal = [...this.federal];
              this.length2 = this.federal.length;
            } else if (obj.type === 'state') {
              this.state.push(obj);
              this.state = [...this.state];
              this.length3 = this.state.length;
            }
          });
        }
      },
        error => {
          console.log(error);
        });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  showUserDetails(docId) {
    this.singleDoc = this.i9details.filter(x => x.id === docId)[0];
    this.isShowPopup = true;
    this.isShowDetails = true;
  }

  closePopup() {
    this.isShowPopup = !this.isShowPopup;
    this.isShowDetails = false;
  }

  showDetails(docId) {
    this.single = this.w4details.filter(x => x.id === docId)[0];
    this.isShowModal = true;
    this.isDetails = true;
  }

  closeModal() {
    this.isShowModal = !this.isShowModal;
    this.isDetails = false;
  }

  deletework(id) {
    this.singlework = this.workDetails.filter(x => x.id === id)[0];
    this.isShow = true;
    this.isDetails1 = true;
  }

  close() {
    this.isShow = !this.isShow;
    this.isDetails1 = false;
  }

  move() {
    this.router.navigate(['myInfo'])
  }

  closeIsSuccess() {
    window.location.reload();
  }


  // edit i9 record
  editi9Doc(doc) {
    this.editi9.id = doc.id;
    this.editi9.year = doc.year;
    if (doc.expiryDate != "") {
      // saikumar 23/8/2019 started here
      this.editi9.expiryDate = new DatePipe('en-US').transform(doc.expiryDate, 'yyyy-MM-dd');
      // saikumar 23/8/2019 ended here
    }
    else {
      this.editi9.expiryDate = "";
    }
    this.editi9.comment = doc.comment;
    this.editi9.alert = doc.alert;
    let index = this.i9details.indexOf(doc);
    this.display = index;
  }
  i9Validate() {
    this.editi9.expiryDate = new DatePipe('en-US').transform(this.editi9.expiryDate, 'yyyy-MM-dd');
    if (this.currentDate > this.editi9.expiryDate) {
      this.i9Error = 'Please select a valid expiry date';
    } else {
      this.i9Error = '';
    }
  }

  updatei9Doc() {
    if (this.editi9.alert) {
      this.editi9.alert = 1;
    } else {
      this.editi9.alert = 0;
    }
    // saikumar 23/8/2019 started here
    this.editi9.expiryDate = new DatePipe('en-US').transform(this.editi9.expiryDate, 'yyyy-MM-dd');
    // saikumar 23/8/2019 ended here
    if (this.i9Error) {
      this.i9Error = 'Please select a valid expiry date';
    } else {
      this.i9Error = '';
      this.service.updatei9Doc(this.editi9.id, this.editi9)
        .subscribe(response => {
          this.i9Info = response.json();
          if (this.i9Info.statusCode.code === '200') {
            this.isSuccess = true;
          } else {
            console.log(this.i9Info.errorMessages);
          }
        },
          error => {
            console.log(error);
          });
    }
  }

  // delete i9 document
  delete(id) {
    this.id = id;
    this.service.uploadDeleteI9(this.id)
      .subscribe(response => {
        this.i9Info = response.json();
        if (this.i9Info.statusCode.code === '200') {
          window.location.reload();
          this.isShowPopup = false;
          this.geti9Docs();
        } else {
          console.log(this.i9Info.errorMessages);
        }
      },
        error => {
          console.log(error);
        });
  }

  // delete work authorization
  deletedoc(id) {
    this.service.uploadDeleteWork(id)
      .subscribe(response => {
        this.workInfo = response.json();
        if (this.workInfo.statusCode.code === '200') {
          window.location.reload();
          this.isShow = false;
          // window.location.reload();
          this.getWorkDocs();

          // this.federal = [];
          // this.getw4Docs();

        } else {
          console.log(this.workInfo.errorMessages);
        }
      },
        error => {
          console.log(error);
        });
  }

  // delete w4 document
  deletew4(docId) {
    this.service.uploadDeleteW4(docId)
      .subscribe(response => {
        this.w4Info = response.json();
        if (this.w4Info.statusCode.code === '200') {
          window.location.reload();
          this.isShowModal = false;
          // this.getw4Docs();
          // this.getw4Docs();
        } else {
          console.log(this.w4Info.errorMessages);
        }
      },
        error => {
          console.log(error);
        });
  }


  // edit federal w4 record
  editFederal(doc) {
    this.editfw4.id = doc.id;
    this.editfw4.year = doc.year;
    // this.editfw4.expiryDate = new Date(doc.expiryDate);
    if (doc.expiryDate != "") {
      //  saikumar 23/08/2019 started here
      this.editfw4.expiryDate = new DatePipe('en-US').transform(doc.expiryDate, 'yyyy-MM-dd');
    }
    //  saikumar 23/08/2019 ended here
    else {
      this.editfw4.expiryDate = "";
    }
    this.editfw4.comment = doc.comment;
    this.editfw4.alert = doc.alert;
    let index = this.federal.indexOf(doc);
    this.displayFederalW4 = index;
  }

  w4Validate() {
    this.editfw4.expiryDate = new DatePipe('en-US').transform(this.editfw4.expiryDate, 'yyyy-MM-dd');
    if (this.currentDate > this.editfw4.expiryDate) {
      this.w4Error = 'Please select a valid expiry date';
    } else {
      this.w4Error = '';
    }
  }

  //update federal w4 document
  updatefw4Doc() {
    if (this.editfw4.alert) {
      this.editfw4.alert = 1;
    } else {
      this.editfw4.alert = 0;
    }
    this.editfw4.expiryDate = new DatePipe('en-US').transform(this.editfw4.expiryDate, 'yyyy-MM-dd');
    if (this.w4Error) {
      this.w4Error = 'Please select a valid expiry date'
    } else {
      this.w4Error = '';


      this.service.updatefw4Doc(this.editfw4.id, this.editfw4)
        .subscribe(response => {
          this.fw4Info = response.json();
          if (this.fw4Info.statusCode.code === '200') {
            this.isSuccess = true;
          } else {
            console.log(this.fw4Info.errorMessages);
          }
        },
          error => {
            console.log(error);
          });
    }
  }

  // edit state w4 record
  editState(doc) {
    this.editsw4.id = doc.id;
    this.editsw4.year = doc.year;
    // this.editsw4.expiryDate = new Date(doc.expiryDate);
    if (doc.expiryDate != "") {
      this.editsw4.expiryDate = new Date(doc.expiryDate);
    }
    else {
      this.editsw4.expiryDate = "";
    }
    this.editsw4.comment = doc.comment;
    this.editsw4.alert = doc.alert;
    let index = this.state.indexOf(doc);
    this.displayStateW4 = index;
  }

  stateValidate() {
    this.editsw4.expiryDate = new DatePipe('en-US').transform(this.editsw4.expiryDate, 'yyyy-MM-dd');
    if (this.currentDate > this.editsw4.expiryDate) {
      this.stateError = 'Please select a valid expiry date';
    } else {
      this.stateError = '';
    }
  }

  updatesw4Doc() {
    if (this.editsw4.alert) {
      this.editsw4.alert = 1;
    } else {
      this.editsw4.alert = 0;
    }
    this.editsw4.expiryDate = new DatePipe('en-US').transform(this.editsw4.expiryDate, 'yyyy-MM-dd');
    if (this.stateError) {
      this.stateError = 'Please select a valid expiry date';
    } else {
      this.stateError = '';

      this.service.updatesw4Doc(this.editsw4.id, this.editsw4)
        .subscribe(response => {
          this.w4Info = response.json();
          if (this.w4Info.statusCode.code === '200') {
            this.isShowPopup = false;
            this.isSuccess = true;
          } else {
            console.log(this.w4Info.errorMessages);
          }
        },
          error => {
            console.log(error);
          });
    }
  }


  //edit work authorization document
  editWorkDoc(doc) {
    this.editWorkAuth.id = doc.id;
    this.editWorkAuth.year = doc.year;
    this.editWorkAuth.type = doc.type.id;
    if (doc.expiryDate != "") {
      this.editWorkAuth.expiryDate = new Date(doc.expiryDate);
    }
    else {
      this.editWorkAuth.expiryDate = "";
    }
    this.editWorkAuth.comment = doc.comment;
    this.editWorkAuth.alert = doc.alert;
    let index = this.workDetails.indexOf(doc);
    this.displayWorkAuth = index;
  }

  //update work authorization
  updateWorkDoc() {
    if (this.editWorkAuth.alert) {
      this.editWorkAuth.alert = 1;
    } else {
      this.editWorkAuth.alert = 0;
    }
    this.editWorkAuth.expiryDate = new DatePipe('en-US').transform(this.editWorkAuth.expiryDate, 'yyyy-MM-dd');
    if (this.dateError) {
      this.dateError = "Please select a valid expiry date";
    } else {
      this.dateError = "";
      this.service.updateWorkDoc(this.editWorkAuth.id, this.editWorkAuth)
        .subscribe(response => {
          this.workAuthInfo = response.json();
          if (this.workAuthInfo.statusCode.code === '200') {
            this.isShowPopup = false;
            this.isSuccess = true;
          } else {
            console.log(this.workAuthInfo.errorMessages);
          }
        },
          error => {
            console.log(error);
          });
    }
  }
  updateValidate() {

    this.editWorkAuth.expiryDate = new DatePipe('en-US').transform(this.editWorkAuth.expiryDate, 'yyyy-MM-dd');
    console.log(this.editWorkAuth.expiryDate);
    if (this.currentDate > this.editWorkAuth.expiryDate) {
      this.dateError = 'Please select a valid expiry date';
    } else {
      this.dateError = '';
    }
  }


  ngOnInit() {

    this.currentDate = new DatePipe('en-US').transform(this.date1, 'yyyy-MM-dd');
    // i9 documents
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      if (this.i9Data.alert) {
        this.alert = 1;
      } else {
        this.alert = 0;
      }
      // code change for exipry date - sharmistha - 08-12-2019 - start
      if (this.i9Data.expiryDate) {
        this.expiryDate = new Date(this.i9Data.expiryDate);
      }
      else {
        this.expiryDate = "0000-00-00";
      }
      // code change for exipry date - sharmistha - 08-12-2019 - end
      form.append('comment', this.i9Data.comment);
      form.append('year', this.i9Data.i9year);
      form.append('alert', this.alert);
      form.append('expiryDate', this.expiryDate);
    };

    // federal w4 documents
    this.uploader1.onBuildItemForm = (fileItem: any, form: any) => {
      if (this.w4Data.alert) {
        this.alert = 1;
      } else {
        this.alert = 0;
      }
      // code change for exipry date - sharmistha - 08-12-2019 - start      
      if (this.w4Data.expiryDate) {
        this.expiryDate = new Date(this.w4Data.expiryDate);
      }
      else {
        this.expiryDate = "0000-00-00";
      }
      // code change for exipry date - sharmistha - 08-12-2019 - end      
      form.append('comment', this.w4Data.comment);
      form.append('year', this.w4Data.w4year);
      form.append('type', this.federalw4);
      form.append('alert', this.alert);
      form.append('expiryDate', this.expiryDate);
    };

    // state w4 documents
    this.uploader3.onBuildItemForm = (fileItem: any, form: any) => {
      if (this.statew4Data.alert) {
        this.alert = 1;
      } else {
        this.alert = 0;
      }
      // code change for exipry date - sharmistha - 08-12-2019 - start      
      if (this.statew4Data.expiryDate) {
        this.expiryDate = new Date(this.statew4Data.expiryDate);
      }
      else {
        this.expiryDate = "0000-00-00";
      }
      // code change for exipry date - sharmistha - 08-12-2019 - end      
      form.append('comment', this.statew4Data.comment);
      form.append('year', this.statew4Data.w4year);
      form.append('type', this.statew4);
      form.append('alert', this.alert);
      form.append('expiryDate', this.expiryDate);
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
      // code change for exipry date - sharmistha - 08-12-2019 - start      
      if (this.workData.expiryDate) {
        this.expiryDate = new Date(this.workData.expiryDate);
      }
      else {
        this.expiryDate = "0000-00-00";
      }
      // code change for exipry date - sharmistha - 08-12-2019 - end      
      form.append('workType', this.work);
      form.append('comment', this.workData.comment);
      form.append('year', this.workData.workyear);
      form.append('alert', this.alert);
      form.append('expiryDate', this.expiryDate);
    };
  }

  // validate expiry date
  dateValidate() {
    this.start = new Date(Date.now());
    if (this.i9Data.expiryDate < this.start) {
      this.dateError = 'Please select a valid expiry date';
    }
    else {
      this.dateError = "";
    }
  }

  //added date validation - sharmistha - 08-07-2019 - start
  dateValidate1() {
    this.start = new Date(Date.now());
    if (this.workData.expiryDate < this.start) {
      this.dateError1 = 'Please select a valid expiry date';
    }
    else {
      this.dateError1 = "";
    }
  }

  dateValidate2() {
    this.start = new Date(Date.now());
    if (this.w4Data.expiryDate < this.start) {
      this.dateError2 = 'Please select a valid expiry date';
    }
    else {
      this.dateError2 = "";
    }
  }

  dateValidate3() {
    this.start = new Date(Date.now());
    if (this.statew4Data.expiryDate < this.start) {
      this.dateError3 = 'Please select a valid expiry date';
    }
    else {
      this.dateError3 = "";
    }
  }

  //added date validation - sharmistha - 08-07-2019 - end

  onNavigate(location) {
    this.router.navigate([location]);
  }

  cancel() {
    this.router.navigate(['myInfo']);
  }

  editDocument() {
    this.displayDocument = true;
  }

  backDocument() {
    this.displayDocument = false;
  }

  editw4() {
    this.displayw4 = true;
  }

  backw4() {
    this.displayw4 = false;
  }

  editstatew4() {
    this.displaystatew4 = true;
  }

  backstatew4() {
    this.displaystatew4 = false;
  }

  editWork() {
    this.displayWork = true;
  }

  backWork() {
    this.displayWork = false;
  }
  increaseShow() {
    this.show += 1;
  }
  decreaseShow() {
    this.show = 3;
  }
  increaseShow1() {
    console.log(this.show1);
    this.show1 += 1;
    console.log(this.show1);
  }
  decreaseShow1() {
    console.log(this.show1);
    this.show1 = 3;
    console.log(this.show1);
  }
  increaseShow2() {
    this.show2 += 1;
  }
  decreaseShow2() {
    this.show2 = 3;
  }
  increaseShow3() {
    this.show3 += 1;
  }
  decreaseShow3() {
    this.show3 = 3;
  }

}


