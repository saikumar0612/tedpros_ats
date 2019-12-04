import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../../core/services';

@Component({
  selector: 'app-edti-terms-conditions',
  templateUrl: './edti-terms-conditions.component.html',
  styleUrls: ['./edti-terms-conditions.component.css']
})
export class EdtiTermsConditionsComponent implements OnInit {
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor", { static: true }) ckeditor: any;
  data: any = {
    content:'',
    id:'',
    status:''
  };
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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
    this.loading = true;
    //get terms & conditions
    this.service.getTermsConditions()
    .subscribe(response => {
      this.data = response.json().data;
      // console.log(this.data);
      this.loading = false;
    },
    error => {
      console.log(error);
    })
  }
  
  //edit contents
  editTerms(){
    this.service.editTermsConditions(this.data)
    .subscribe(response => {
      this.result = response.json();
      if(this.result.statusCode.code == "200"){
        this.isSuccess = true;
      }
      else{
        this.isFailure = true;
      }
    },
    error => {
      console.log(error);
    })
  }

}
