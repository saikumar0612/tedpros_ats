import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-entitlements',
  templateUrl: './add-entitlements.component.html',
  styleUrls: ['./add-entitlements.component.css']
})
export class AddEntitlementsComponent implements OnInit {
  showform: boolean = false;
  showlocation: boolean = false;
  showemployee: boolean = false;
  showhidepregnant: boolean;
  roles: any = {};
  branches;
  data;
  leavePeriod: any = [];
  userData: any = {};
  leaveData;
  users;
  addLeaveError = "";
  isSuccess = false;
  isFailure = false;
  entitlementData:any;
  constructor(private blocation: Location, private service: UserService) {

    // get roles list

    this.service.getEmployeeTypes()
      .subscribe(response => {
        // console.log(response);
        this.roles = response.json().data;
        console.log(this.roles);
        // this.loading = false; 
      },
        error => {
          console.log(error);
        });

    // get leave type

    this.service.getLeaveType().subscribe(res => {
      this.data = res.json().data;
      console.log(this.data);
    });

    // get leave period

    this.service.getLeavePeriod()
      .subscribe(response => {
        this.leavePeriod = response.json().data;
        console.log(this.leavePeriod);
      });

    // get users list

    this.service.getUsersList().subscribe(res => {
      this.users = res.json();
      console.log(this.users);
    });
  }

  ngOnInit() {

    // get branches

    this.service.getCompanyBranches()
      .subscribe(res => {
        this.branches = res.json().data;
        //  console.log(this.branches);
      });
  }

  onchange(id) {

    this.showform = true;
    if (id === '0') {
      this.showform = true;
      this.showemployee = true;
      this.showlocation = false;
    } else if (id === '1') {
      this.showform = true;
      this.showlocation = true;
      this.showemployee = false;
    }
  }

  cancel() {
    this.blocation.back();
  }


// saikumar 27/08/2019 started here
  addLeave(addLeaveFrm:NgForm) {

    console.log(this.userData);
    this.service.addUserLeave(this.userData)
      .subscribe(res => {
        console.log(res);
        this.leaveData = res.json();
        if (this.leaveData.statusCode.code === '200') {
          addLeaveFrm.resetForm();

          
// saikumar 27/08/2019 ended here
          this.isSuccess = true;

        } else {
          this.isFailure = true;

        }
      }, error => {
        console.log(error);
      });
  }

  closePopup() {
    this.isFailure = !this.isFailure;
    
  }
  closePopup1(){
    this.isSuccess = !this.isSuccess;
  }
}
