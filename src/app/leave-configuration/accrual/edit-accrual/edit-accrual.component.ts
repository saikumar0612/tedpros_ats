import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-accrual',
  templateUrl: './edit-accrual.component.html',
  styleUrls: ['./edit-accrual.component.css']
})
export class EditAccrualComponent implements OnInit {

  showform = false;
  showlocation = false;
  showemployee = false;
  showhidepregnant;
  roles: any = {};
  branches;
  data;
  leavePeriod: any = [];
  userData = {
    employeeType: { id: '' },
    location: { id: '' },
    leaveType: { id: '' },
    accrualFrequency: { id: '' },
    accrualInterval: '',
    creditDate: '',
    creditingMonth: '',
    creditingDay: '',
    validFrom: { id: '' },
    firstAccrual: { id: '' }
  };
  leaveData;
  users;
  addLeaveError = '';
  isSuccess = false;
  isFailure = false;
  entitlementData: any;
  monthName = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  days = [];
  filterData: any = [];
  availableRecords = 0;
  id = '';

  constructor(private blocation: Location, private route: ActivatedRoute, private service: UserService) {

    for (let index = 1; index < 32; index++) {
      this.days.push(index);
    }

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

  cancel() {
    this.blocation.back();
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.id = res.id;
    });
    this.service.getCompanyBranches()
      .subscribe(res => {
        this.branches = res.json().data;
        //  console.log(this.branches);
      });
    this.service.getAccrualRule(this.id)
      .subscribe(res => {
        this.userData = res.json().data;
        const creditDate = this.userData.creditDate.split('/');
        this.userData.creditingMonth = creditDate[0];
        this.userData.creditingDay = creditDate[1];
        console.log(this.userData);
      });
  }

  editAccrual(editLeaveFrm: NgForm) {
    this.userData.creditDate = this.userData.creditingMonth + '/' + this.userData.creditingDay;
    console.log(this.userData);
    this.service.editAccrualRule(this.userData)
      .subscribe(res => {
        console.log(res);
        this.leaveData = res.json();
        if (this.leaveData.statusCode.code === '200') {
          editLeaveFrm.resetForm();
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
  close() {
    this.isSuccess = !this.isSuccess;
  }

}
