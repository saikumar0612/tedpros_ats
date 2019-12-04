import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Headers, RequestOptions } from '@angular/http';
import { combineLatest } from 'rxjs';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  message;
  loading = true;
  userData: any = {
    userType: {
      id: '',
      typeName: ''
    },
    employeeType: {
      id: '',
      name: ''
    },
    reporting_to: { id: '' },
    roles: []
  };
  error = null;
  newUserInfo: any;
  public reportingTo: any = [];
  public activitesList: any = [];
  public selectedRole: any;
  userTypesMaster = [];
  employeeTypeMaster = [];
  rolesMaster: any;
  isShowPopup = false;
  dropdownSettings;
  //changed the variable declaration as it was inserting an empty data in select role field - sharmistha - 08-21-2019 - start
  selRoles = [];
  //changed the variable declaration as it was inserting an empty data in select role field - sharmistha - 08-21-2019 - end
  baseUrl: any;
  // declared variables for employee type changes functionality - sharmistha - 09-27-2019 - start
  singleEmployeeType:any;
  hideReportingTo:boolean = true;
  isAdmin: boolean = false;
  // declared variables for employee type changes functionality - sharmistha - 09-27-2019 - end

  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}';

  constructor(private http: Http, private router: Router, private blocation: Location, public service: UserService) {
    this.userData.userType.id = '3';
    const parsedUrl = new URL(window.location.href);
    this.baseUrl = parsedUrl.origin;
  }

  cancel() {
    this.blocation.back();
  }
  ngOnInit() {
    this.userData.status = "1";
    this.loading = true;
    combineLatest([
      this.service.getUsersType(),
      this.service.getEmployeeTypes(),
      this.service.getRolesList(),
      this.service.getUsersList()
    ]).subscribe(response => {
      this.userTypesMaster = response[0].json();
      this.employeeTypeMaster = response[1].json().data;
      this.rolesMaster = response[2].json().data;
      this.reportingTo = response[3].json();
      this.loading = false;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'role_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }

  // Add user
  addUser(addUserFrm: NgForm) {
    this.loading = true;
    this.userData.roles = [];
    if (this.selRoles.length > 1) {
      // this.userData.roles = this.selRoles;
      this.selRoles.forEach(role => {
        this.userData.roles.push(role.id);
      });
    } else if (this.selRoles.length === 1) {
      this.userData.roles.push(this.selRoles[0].id);
    } else {
      this.loading = false;
      this.error = 'Atleast one role must be assigned to user';
      return '';
    }

    this.userData.baseUrl = this.baseUrl;
    this.service.addUsers(this.userData)
      .subscribe(response => {
        const result = response.json();
        if (result.statusCode.code === '200') {
          this.message = result.data;
          this.error = '';
          this.newUserInfo = result.data[0];
          addUserFrm.resetForm();
          this.userData = {
            lastName: '',
            middleName: '',
            userType: { id: '' },
            employeeType: { id: '' },
            status: 1,
            reporting: '',
            roles: []
          };
          this.loading = false;
          this.isShowPopup = true;
        } else {
          // this.userData.roles = [];
          this.error = result.errorMessages;
          this.loading = false;
          this.isShowPopup = true;
        }
      });
  }

  closePopup() {
    this.isShowPopup = !this.isShowPopup;
    // modified by BASIT022 on 14-08-19 start
    this.error='';
    this.message='';
    // modified by BASIT022 on 14-08-19 end
  }

  // added code to hide reporting to based on employee type - sharmistha - 09-28-2019 - start
  onSelect(value){
    // console.log(value);
    this.singleEmployeeType = this.employeeTypeMaster.filter(x => x.id == value)[0];
    // if(this.singleEmployeeType.name === "Account Owner"){
    //   this.hideReportingTo = false;
    // }
    // else{
    //   this.hideReportingTo = true;
    //   this.isAdmin = false;
    // }
    if((this.singleEmployeeType.name == "Account Admin") || (this.singleEmployeeType.name == "Admin")){
      this.hideReportingTo = true;
      this.isAdmin = true;
    }
    else if(this.singleEmployeeType.name === "Account Owner"){
      this.hideReportingTo = false;
    }
    else{
      this.hideReportingTo = true;
      this.isAdmin = false;
    }
  }
  // added code to hide reporting to based on employee type - sharmistha - 09-28-2019 - start

}
