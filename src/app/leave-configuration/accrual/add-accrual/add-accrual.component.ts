import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-accrual',
  templateUrl: './add-accrual.component.html',
  styleUrls: ['./add-accrual.component.css']
})
export class AddAccrualComponent implements OnInit {

  showform = false;
  showlocation = false;
  showemployee = false;
  showhidepregnant: boolean;
  roles: any = {};
  branches;
  data;
  leavePeriod: any = [];

  userData = {
    employeeType: { id: '' },
    location: { id: '' },
    leaveType: { id: '' },
    accrualFrequency: { id: '' },
    accrualInterval: { id: '' },
    creditDate: '',
    creditingMonth: '',
    creditingDay: '',
    validFrom: '',
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
  constructor(private blocation: Location, private service: UserService) {

    // get roles list
    for (let index = 1; index < 32; index++) {
      this.days.push(index);
    }

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

  cancel() {
    this.blocation.back();
  }

  formReset(addLeaveFrm: NgForm) {
    addLeaveFrm.resetForm();
    this.userData = {
      employeeType: { id: '' },
      location: { id: '' },
      leaveType: { id: '' },
      accrualFrequency: { id: '' },
      accrualInterval: { id: '' },
      creditDate: '',
      creditingMonth: '',
      creditingDay: '',
      validFrom: '',
      firstAccrual: { id: '' }
    };
  }


  addAccrual(addLeaveFrm: NgForm) {
    this.userData.creditDate = this.userData.creditingMonth + '/' + this.userData.creditingDay;
    console.log(this.userData);
    this.service.addAccrualRule(this.userData)
      .subscribe(res => {
        console.log(res);
        this.leaveData = res.json();
        if (this.leaveData.statusCode.code === '200') {
          this.isSuccess = true;
          addLeaveFrm.resetForm();
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
