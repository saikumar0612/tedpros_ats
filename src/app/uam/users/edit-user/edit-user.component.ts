import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services';
import { MultiSelectComponent } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  loading = false;
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
  userId;
  usersMaster: any;
  userTypesMaster: any;
  employeeTypeMaster: any;
  rolesMaster: any;
  selRoles: any = [];
  isShowPopup = false;
  dropdownSettings;
  filteredROles = [
    { id: '', roleName: '' }
  ];
  error = '';
  sucessmsg;

  filterUdata = {
    userId: '',
    email: '',
    reporting: '',
    userType: { id: '' },
    employeeType: { id: '', employeeType:'' },
    status: '',
    firstName: '',
    lastName: '',
    middleName: '',
    roles: []
  };
  // declared variables for employee type changes functionality - sharmistha - 09-27-2019 - start
  hideReportingTo: boolean = true;
  singleEmployeeType:any;
  isAdmin: boolean = false;
  // declared variables for employee type changes functionality - sharmistha - 09-27-2019 - end

  @ViewChild('multiSelect', { static: false })
  multiSelect: MultiSelectComponent;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(public http: Http, private route: ActivatedRoute, private router: Router, private blocation: Location, public service: UserService) {
    this.userData.userType.id = '3';
  }

  getUserInfo(userId) {
    this.loading = true;
    this.service.getUserInfo(userId)
      .subscribe(response => {
        this.userData = response.json();
        this.filteredROles = this.userData.roles;
        // console.log(this.filteredROles);
      });
    this.loading = false;
  }
  cancel() {
    this.blocation.back();
  }

  editUser() {
    this.userData.roles = [];
    if (this.filteredROles.length > 1) {
      this.filteredROles.forEach(role => {
        this.userData.roles.push(role.id);
      });
    } else if (this.filteredROles.length === 1) {
      this.userData.roles.push(this.filteredROles[0].id);
    } else {
      this.error = 'Atleast one role must be assigned to user';
      return '';
    }
    // console.log(this.userData);
    this.filterUdata = {
      userId: this.userData.user_id,
      email: this.userData.email,
      reporting: this.userData.reporting_to.id,
      userType: this.userData.userType,
      employeeType: this.userData.employeeType,
      status: this.userData.status,
      firstName: this.userData.first_name,
      lastName: this.userData.last_name,
      middleName: this.userData.middle_name,
      roles: this.userData.roles
    };
    // done changes to check employee type - sharmistha - 09-28-2019 - start
    this.singleEmployeeType = this.employeeTypeMaster.filter(x => x.id == this.filterUdata.employeeType.id)[0];
    if(this.singleEmployeeType.name === "Account Owner"){
      this.filterUdata.reporting = "";
    }
    // done changes to check employee type - sharmistha - 09-28-2019 - end

    // console.log(this.filterUdata);
    this.loading = true;
    this.service.editUsers(this.filterUdata)
      .subscribe(res => {
        const result = res.json();
        this.loading = false;

        // console.log(result);
        if (result.statusCode.code === '200') {
          this.error = '';
          this.sucessmsg = result.data;
          this.isShowPopup = true;
        } else {
          this.sucessmsg = '';
          this.error = result.errorMessages;
          this.isShowPopup = false;
        }
      });
    this.loading = false;
  }

  ngOnInit() {
    this.loading = true;
    // Getting Current User info
    this.route.params.subscribe(res => {
      this.userId = res.id;
    });

    // Getting all master lists
    combineLatest([
      this.service.getUsersType(),
      this.service.getEmployeeTypes(),
      this.service.getRolesList(),
      this.service.getUsersList(),
      this.service.getUserInfo(this.userId)
    ]).subscribe(response => {
      this.userTypesMaster = response[0].json();
      this.employeeTypeMaster = response[1].json().data;

      this.rolesMaster = response[2].json().data;
      // console.log(this.rolesMaster);
      this.usersMaster = response[3].json();
      this.userData = response[4].json();
      // console.log(this.userData);

      // added code to hide reporting to based on employee type - sharmistha - 09-28-2019 - start
      // if(this.userData.employeeType.employeeType === "Account Owner"){
      //   this.hideReportingTo = false;
      // }
      // else{
      //   this.hideReportingTo = true;
      // }
      if((this.userData.employeeType.employeeType == "Account Admin") || (this.userData.employeeType.employeeType == "Admin")){
        this.hideReportingTo = true;
        this.isAdmin = true;
      }
      else if(this.userData.employeeType.employeeType === "Account Owner"){
        this.hideReportingTo = false;
      }
      else{
        this.hideReportingTo = true;
        this.isAdmin = false;
      }

      if(this.userData.reporting_to === 0){
        this.userData.reporting_to = {
          id:'',
          fname:'',
          lname:''
        };
      }
      // added code to hide reporting to based on employee type - sharmistha - 09-28-2019 - end
      let userRoles = [];
      userRoles = this.userData.roles;
      userRoles.forEach(role => {
        let ary = { id: '', role_name: '' };
        ary.id = role.id;
        ary.role_name = role.roleName;
        this.selRoles.push(ary);
      });
      this.filteredROles = this.selRoles;
      // console.log(this.filteredROles);
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'role_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
    this.loading = false;
  }
  // oninit close

  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }
  closeError() {
    this.error = '';
  }

  // added code to hide reporting to based on employee type - sharmistha - 09-28-2019 - start
  onSelect(value){
    // console.log(value);
    this.singleEmployeeType = this.employeeTypeMaster.filter(x => x.id == value)[0];
    // if(this.singleEmployeeType.name === "Account Owner"){
    //   this.hideReportingTo = false;
    //   this.userData.reporting_to.id = null;
    // }
    // else{
    //   this.hideReportingTo = true;
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
