import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  users: any = [];
  loading;
  selePermissions: any = [];
  filterData;
  availableRecords = 0;
  isShowPopup = false;
  rolesUpdateStatus = false;
  selectedUser: any;
  singleUser = {
    id:'',
    user_id: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    status: '',
    userstatus: '',
    employeeType: {
      id: '',
      employeeType: ''
    },
    userType: {
      id: '',
      name: '',
      typeName: ''
    },
    reporting_to: { id: '', fname: '', lname: '' },
    roles: [{ id: '', roleName: '' }]
  };
  isShowUser = false;
  isManageRoles = false;

  userData = [];
  userRec: any = {
    userName: '',
    status: '',
    employeeName: '',
    role: '',
    userstatus: '',
    roles: [
      { roleName: '' }
    ]

  };
  rolenames = '';

  roles: any;

  constructor(public http: Http, public service: UserService) {
    this.userPermissions = this.currentUser.permission;
  }

  ngOnInit() {
    this.loading = true;
    this.service.getAllUsers()
      .subscribe(response => {
        this.users = response.json();
        const userRoles = this.users;
        let i = 0;
        while (i < userRoles.length) {
          if (userRoles[i].id != null) {
            this.userRec.id = userRoles[i].id;
          }
          if (userRoles[i].first_name !== null) {
            this.userRec.employeeName = userRoles[i].first_name + ' ' + userRoles[i].last_name;
          } else {
            this.userRec.employeeName = ' ';
          }
          if (userRoles[i].employeeType !== null) {
            this.userRec.employeeType = userRoles[i].employeeType.employeeType;
          } else {
            this.userRec.employeeType = ' ';
          }
          if (userRoles[i].username !== null) {

            this.userRec.userName = userRoles[i].username;
          } else {
            this.userRec.userName = ' ';
          }
          if (userRoles[i].roles !== null) {
            let j = 0;
            while (j < userRoles[i].roles.length) {
              this.rolenames = this.rolenames + ' ' + userRoles[i].roles[j].roleName;
              j++;
            }

            this.userRec.role = this.rolenames;
            this.userRec.roles = userRoles[i].roles;
            this.rolenames = '';
          } else {
            this.userRec.roles = ' ';
            this.userRec.role = ' ';
          }

          if (userRoles[i].status === '1') {
            this.userRec.userstatus = 'Active';
          } else {
            this.userRec.userstatus = 'Disabled';
          }
          this.userData.push(this.userRec);
          this.userRec = {
            userName: '',
            status: '',
            employeeName: '',
            employeeType: '',
            role: '',
            userstatus: '',
            roles: [
              { roleName: '' }
            ]
          };
          i++;
        }
        this.filterData = this.userData;
        this.availableRecords = this.users.length;
        // console.log(this.userData);
        this.loading = false;
      });
  }

  // assigned the status to a new varible - sharmistha - 08-21-2019 - start
  showUserDetails(userId) {
    this.singleUser = this.users.filter(x => x.id === userId)[0];
    if (this.singleUser.status === '1') {
      this.singleUser.userstatus = 'Active';
    } else {
      this.singleUser.userstatus = 'Disabled';
    }
    this.isShowPopup = true;
    this.isShowUser = true;
  }
  // assigned the status to a new varible - sharmistha - 08-21-2019 - end

  addRoletoUser() {
    this.loading = true;
    let inputParams = {
      userId: this.selectedUser,
      roles: this.selePermissions
    };
    this.service.addRole(inputParams)
      .subscribe(res => {
        this.loading = false;
        this.rolesUpdateStatus = true;

      });
  }

  closePopup() {
    this.isShowPopup = !this.isShowPopup;
    this.isShowUser = false;
    this.isManageRoles = false;
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.userData;
    } else {
      if (key === 'employeeName') {
        this.filterData = this.userData.filter(x =>
          x.employeeName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'username') {
        this.filterData = this.userData.filter(x =>
          x.userName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'empType') {
        this.filterData = this.userData.filter(x =>
          x.employeeType.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'roles') {
        this.filterData = this.userData.filter(x =>
          x.role.trim().toLowerCase().includes(term.trim().toLowerCase()),

        );
      } else if (key === 'status') {
        this.filterData = this.userData.filter(x =>
          x.userstatus.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }



}
