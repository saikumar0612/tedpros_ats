import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { identifierModuleUrl } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-role-activity',
  templateUrl: './role-activity.component.html',
  styleUrls: ['./role-activity.component.css']
})
export class RoleActivityComponent implements OnInit {

  loading = false;
  masterRoles: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  inputPermissions = {};
  roleId: any;
  inputParams: any = {};
  roleInfo: any = {};
  popup = false;
  errorpopup = false;
  selectedAll:any;
  message:any;
  errormessage:any;
  roleData:any;
  masterSelected:boolean;
  checkedList:any;
  selectAll = false;
  selectAllChkBox = false;
  selectCategoryChkBox = {};
  selectAllCategory = false;
  constructor(public http: Http, private route: ActivatedRoute, private router: Router, private blocation: Location, private service: UserService) { }

  ngOnInit() {
    this.userPermissions = this.currentUser.permission;
    this.loading = true;
    this.service.getRolesCategory()
      .subscribe(res => {
        this.masterRoles = res.json().data;
        this.loading = false;
        this.masterRoles.forEach(obj => {
          obj.permissions.forEach(obj1 => {
            obj1.status = false;
          });
        });
      });

    this.route.params.subscribe(res => {
      this.roleId = res.id;
    });
  }
  cancel() {
    this.blocation.back();
  }

  createRole(addPermissions:NgForm) {
    this.loading = true;
    this.roleInfo.status = '1';
    this.inputParams = {
      roleName: this.roleInfo.roleName,
      description: this.roleInfo.description,
      status: this.roleInfo.status,
      assignPermission: this.masterRoles
    };
    this.service.addRolePermission(this.inputParams)
      .subscribe(res => {
        this.roleData = res.json();
        this.loading = false;
        if(this.roleData.statusCode.code === "200"){
          addPermissions.resetForm();
          this.triggerSelectAll({target:{checked: false}});
          this.popup = true;
          this.message = this.roleData.data;
        }
        else{
          this.errorpopup = true;
          this.errormessage = this.roleData.errorMessages;
        }
      });
  }

  closePopup(addPermissions:NgForm) {
    this.popup = !this.popup;
    // this.router.navigated = false;
    addPermissions.resetForm();
    this.triggerSelectAll({target:{checked: false}});
    // this.router.navigate([this.router.url]);
  }

  closeErrorPopup(){
    this.errorpopup = !this.errorpopup;
  }

  // code for select all functionality - sharmistha - 08-21-2019 - start
  triggerSelectAll(event) {
    this.masterRoles.map(mr => {
      this.selectCategoryChkBox[mr.id] = event.target.checked;
      mr.permissions.map(res => res.status = event.target.checked);
      return mr;
    });
    this.selectAll = this.selectAllChkBox = event.target.checked;
  }

  checkIndividualPermission(event: any, masterRole) {
    // console.log('masterRoles ', this.masterRoles);
    // console.log('event ', event);
    if(!event.target.checked && this.selectAll) {
        this.selectAllChkBox = false;
        this.selectCategoryChkBox[masterRole.id] = false;
    }
    if(event.target.checked && this.selectAll) {
      if(!this.masterRoles.filter(tmp => {
        if(tmp.permissions.filter(res => res.status === false).length) {
            return tmp;
        }
        return false }).length) {
            this.triggerSelectAll({target:{checked: true}});
        }
    }

    if(!masterRole.permissions.filter(res => res.status === false).length) {
      this.selectCategoryChkBox[masterRole.id] = true;
    }
  }

  triggerSelectAllCategory(event, masterRole) {
    this.masterRoles.filter(mrs => mrs.id === masterRole.id).map(res => {
      res.permissions.map(per => per.status = event.target.checked);
      // console.log('res ', res);
      return res;
    });
    this.selectCategoryChkBox[masterRole.id] = event.target.checked;
  }

  // code for select all functionality - sharmistha - 08-21-2019 - start
}
