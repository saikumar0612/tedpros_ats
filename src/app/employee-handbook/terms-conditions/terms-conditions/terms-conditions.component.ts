import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services';

@Component({
  selector: 'app-pay-grades',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent implements OnInit {

  data:any={
    statusCode:{
      code:'',
      message:''
    },
    data:{
      id:'',
      status:'',
      content:''
    },
    errorMessages:''
  };
  content:any;
  loading = false;
  headers: any;
  options: any;
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
  constructor(public http: Http, public service: UserService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
    this.loading = true;
    //get terms & conditions
    this.service.getTermsConditions()
    .subscribe(response => {
      this.data = response.json();
      // console.log(this.data);
      this.loading = false;
      this.content =this.data.data;
    },
    error => {
      console.log(error);
    })
  }

}
