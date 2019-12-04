/* 
Author : BASIT022
comment: bulk Emailing
date: 08-08-19
*/

import { Component, OnInit, ViewChild  } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../core/services';
@Component({
  selector: 'app-bulk-email',
  templateUrl: './bulk-email.component.html',
  styleUrls: ['./bulk-email.component.css']
})
export class BulkEmailComponent implements OnInit {

  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor", { static: true }) ckeditor: any;
  data: any = {
    content:'',
    id:'',
    status:'',
    subject:''
  };
  emailFormat:any={
    subject:'',
    message:''
  }
  content: any = {};
  result: any = {};
  isSuccess = false;
  isFailure = false;
  loading = false;
  currentUser ={
    token:'',
    email:'',
    id: '',
    flag: '',
    empType: {
        id:'',
        employeeType: ''
    },
    userType: {
        id: '',
        name: '',
        typeName: ''
    },
    first_name: '',
    last_name: '',
    middle_name: '',
    isAdmin: false,
    Adminrole: false,
    permission: {},
    submenuPermission: { },
    fieldPermission: {}
  };
  userPermissions:any;
  

  constructor(public http: Http, public service: UserService) {
    this.data.status = '1';
  }

  close(){
    this.isSuccess = false;
  }

  closePopup(){
    this.isFailure = false;    
  }

  ngOnInit() {
    this.loading = true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
    this.loading = false;
    // //get terms & conditions
    // this.service.getTermsConditions()
    // .subscribe(response => {
    //   this.data = response.json().data;
    //   // console.log(this.data);
    //   this.loading = false;
    // },
    // error => {
    //   console.log(error);
    // })
  }
  
  //send mail
  sendmail(){
    this.loading=true;
    this.emailFormat.subject=this.data.subject;
    this.emailFormat.message=this.data.content;
   
    this.service.sendBulkEmails(this.emailFormat)
    .subscribe(response => {
      console.log(response);
      this.result = response.json();
      if(this.result.statusCode.code==='403' || this.result.statusCode.code==='404'){
        this.loading=false;
        this.isFailure = true;
      }
      else{
        this.loading=false;
        this.isSuccess = true;
      }
    },
    error => {
      console.log(error);
    })
  }
}
