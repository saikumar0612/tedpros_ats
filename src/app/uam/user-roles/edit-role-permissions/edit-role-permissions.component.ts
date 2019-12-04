import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { identifierModuleUrl } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { UserService } from '../../../core/services';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-role-permissions',
  templateUrl: './edit-role-permissions.component.html',
  styleUrls: ['./edit-role-permissions.component.css']
})
export class EditRolePermissionsComponent implements OnInit {

  loading = false;
  masterRoles: any[] = [];
  inputPermissions = {};
  roleId: any;
  inputParams: any = {};
  roleInfo: any = {};
  popup = false;
  errorpopup = false;
  roleExistingPermissions: any = {};
  selectedAll: any;
  selectedNames: any;
  message: any;
  errormessage: any;
  roleData: any;
  masterSelected: boolean;
  checkedList: any;
  selectAll = false;
  selectAllChkBox = false;
  selectCategoryChkBox = {};
  selectAllCategory = false;

  constructor(public http: Http, private route: ActivatedRoute, private router: Router, private blocation: Location, public service: UserService) {
    this.masterSelected = false;
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(res => {
      this.roleId = res.id;
    });

    this.service.getUserRolePermissions(this.roleId)
      .subscribe(res => {
        this.roleInfo = res.json().data;
        this.masterRoles = this.roleInfo.permissionSet.map(res =>{
          if(res.permissions === 0 ) {
            res.permissions = []
          }
          return res;
        });
        setTimeout(() => {
          this.checkSelectAllStatus();
        }, 500)
        // console.log(this.masterRoles);
      });
    this.loading = false;

  }

  cancel() {
    this.blocation.back();
  }

  updateRole() {
    this.loading = true;
    this.roleInfo.status = '1';
    this.inputParams = {
      roleId: this.roleInfo.id,
      roleName: this.roleInfo.role_name,
      description: this.roleInfo.description,
      status: this.roleInfo.status,
      assignPermission: this.masterRoles
    };
    // console.log(this.inputParams.assignPermission);
    this.service.editRolePermission(this.inputParams, this.roleId)
      .subscribe(res => {
        this.roleData = res.json();
        this.loading = false;
        if (this.roleData.statusCode.code === "200") {
          this.popup = true;
          this.message = this.roleData.data;
        }
        else {
          this.errorpopup = true;
          this.errormessage = this.roleData.errorMessages;
        }

      });
  }

  closePopup() {
    this.popup = !this.popup;
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  }

  closeErrorPopup() {
    this.errorpopup = !this.errorpopup;
  }

  // code for select all functionality - sharmistha - 08-23-2019 - start
  triggerSelectAll(event) {
    this.masterRoles.map(mr => {
      this.selectCategoryChkBox[mr.id] = event.target.checked;
      mr.permissions.map(res => res.status = event.target.checked);
      return mr;
    });
    this.selectAll = this.selectAllChkBox = event.target.checked;
  }

  checkIndividualPermission(event: any, masterRole) {
    if (!event.target.checked && this.selectAll) {
      this.selectAllChkBox = false;
    }
    if(!event.target.checked &&  masterRole) {
      this.selectCategoryChkBox[masterRole.id] = false;
    }
    if (event.target.checked && this.selectAll) {
      if (!this.masterRoles.filter(tmp => {
        if (tmp.permissions.filter(res => res.status === false).length) {
          return tmp;
        }
        return false
      }).length) {
        this.triggerSelectAll({ target: { checked: true } });
      }
    }

    if (masterRole && !masterRole.permissions.filter(res => res.status === false).length) {
      this.selectCategoryChkBox[masterRole.id] = true;
    }
  }

  triggerSelectAllCategory(event, masterRole) {
    this.masterRoles.filter(mrs => mrs.id === masterRole.id).map(res => {
      res.permissions.map(per => per.status = event.target.checked);
      return res;
    });
    this.selectCategoryChkBox[masterRole.id] = event.target.checked;
    if (!Object.values(this.selectCategoryChkBox).filter(res => res === false).length) {
      this.triggerSelectAll({ target: { checked: true } });
    } else {
      this.selectAllChkBox = false;
    }
  }
  checkSelectAllStatus() {
    if (!this.masterRoles.filter(tmp => {
      if (tmp.permissions && tmp.permissions.filter(res => res.status === false).length) {
        return tmp;
      }
      return false
    }).length) {
      this.triggerSelectAll({ target: { checked: true } });
    }
    this.masterRoles.forEach(masterRole => {
      if (!masterRole.permissions.filter(res => res.status === false).length) {
        this.selectCategoryChkBox[masterRole.id] = true;
      } else {
        this.selectCategoryChkBox[masterRole.id] = false;
      }
    })
  }

  // code for select all functionality - sharmistha - 08-23-2019 - end
}
