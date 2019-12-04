import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  halfdays5;
  halfDay1;
  halfDay2;
  halfDay3;
  halfDay4;
  halfDay5;
  date2;
  date1;
  diffIndays: number;
  datediff: any;
  assignData: any = {
    start_day: undefined,
    start_day_shift: undefined,
    end_day: undefined,
    end_day_shift: undefined
  };
  isShowPopup = false;
  isShowDetails = false;
  assignDays: any = {};
  isShowPopup1 = false;
  isShowDetails1 = false;

  showform = false;
  showalldays = false;
  showstartday = false;
  showendday = false;
  showstartandendday = false;

  none: any;
  allDays: any;
  startDay: any;
  endDay: any;
  startEndDay: any;

  showform1 = false;
  showmonth = false;
  showyear = false;

  isShowPopup2;
  message;
  error = null;

  leaveData = [];
  applyData: any = {};
  data;
  countries;
  appliedLeaves;
  filterData: any;
  fromDate: any;
  toDates: any;
  totalDays: any;
  differenceDays: any;
  balanceDays = 0;
  leaveTypes = [];
  halfdays;
  fulldays;

  days1;
  days2;

  dateError = '';

  workDay;
  timings;
  leaveday;
  halfDay;
  leaveDays;
  reports;
  today1;
  limitError = '';
  startdayvalue;
  constructor(private service: UserService) {



    // get work day

    this.service.getWorkDay().subscribe(res => {
      this.workDay = res.json().data;
      console.log(this.workDay);
      const index: number = this.workDay.indexOf(3);
      if (index !== -3) {
        this.workDay.splice(index, 3);
        // console.log(this.workDay);
      }
    });

    // get day timings

    this.service.getLeaveDaysTimings().subscribe(res => {
      this.timings = res.json().data;
      // console.log(this.timings);
    });

    // get days

    this.service.getLeaveDays().subscribe(res => {
      this.leaveDays = res.json().data;
      // console.log(this.leaveDays);
    });

    // get leaveTypes

    this.service.getMyEntitlements().subscribe(res => {
      this.leaveData = res.json().data;
      // console.log(this.leaveData);
      this.leaveData.forEach((data) => {
        if (data.leave_type !== null) {
          this.leaveTypes.push(data);
        }
      });

      console.log(this.leaveTypes);
    });

    // get leave type reports

    this.service.getMyReports().subscribe(data => {
      this.reports = data.json();
      // console.log(this.reports);
    });


  }

  dateValidate() {
    if (this.applyData.from_date > this.applyData.to_date) {
      this.dateError = 'Please select the valid from date';
      console.log('1' + this.dateError);
    } else {
      this.dateError = '';

    }
    this.datediff = this.applyData.to_date - this.applyData.from_date;
    this.date1 = new DatePipe('en-US').transform(this.applyData.to_date, 'yyyy-MM-dd');
    this.date2 = new DatePipe('en-US').transform(this.applyData.from_date, 'yyyy-MM-dd');
    console.log(this.date1);
    console.log(this.date2);
    if (this.date1 === this.date2) {
      this.diffIndays = 1;
    } else {
      this.diffIndays = this.datediff / 1000 / 60 / 60 / 24;
    }
    if (this.applyData.leave_type !== '') {
      if (this.balanceDays < this.diffIndays) {
        this.limitError = 'Leave balance exceded please contact you manager';
      } else {
        this.limitError = '';
      }
    }

    // const today = new Date();

    // if (this.applyData.from_date < today) {
    //   this.dateError = 'Please select up to date';
    //   // this.showform1 = false;
    // } else if (this.applyData.from_date > this.applyData.to_date) {
    //   this.dateError = 'Please select a valid target date';
    //   this.applyData.to_date = this.applyData.from_date;
    //   // this.showform1 = false;
    // } else if (this.applyData.from_date > today && this.applyData.to_date < today) {
    //   this.dateError = 'Please select a valid date range';
    //   this.applyData.to_date = today;
    //   this.applyData.from_date = today;
    //   // this.showform1 = false;
    // } else if (this.applyData.to_date < today && this.applyData.from_date < today) {
    //   this.dateError = 'Please select a valid date range';
    //   this.applyData.to_date = today;
    //   // this.showform1 = false;
    // } else {
    //   this.dateError = '';

    // }

  }




  onchange1(id) {
    // console.log(id);
    if (id !== '') {
      this.showform1 = true;

    }
  }

  ngOnInit() {



    // leave entitlements

    // this.service.getUserLeavesList()
    //   .subscribe(res => {
    //     this.leaveData = res.json().data;
    //   const leavesList = this.leaveData;
    //   // console.log(leavesList);
    //   leavesList.forEach((data)=> {
    //     if(data.days != null){
    //       this.totalDays = data.days;
    //       this.days1 = this.totalDays;
    //     }
    //     // console.log(this.days1);
    //   });
    // });

    // user aplllied leaves list
    this.service.getApplyLeaveList().subscribe(res => {
      this.appliedLeaves = res.json();
      this.filterData = this.appliedLeaves.data;
      // console.log( this.filterData);\
      this.filterData.forEach((data) => {
        if (data.from_date != null) {
          this.fromDate = data.from_date;
          this.toDates = data.to_date;
        }
        // console.log(this.fromDate);
        // console.log(this.toDates);
        const date1 = this.fromDate;
        const date2 = this.toDates;
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(new Date(date1));
        const secondDate = new Date(new Date(date2));

        const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        //  console.log(diffDays);
        this.differenceDays = diffDays;
        this.days2 = this.differenceDays;
        //  console.log(this.days2);

      });
    });
    // console.log(this.days1);
    // console.log(this.days2);
    // this.balanceDays = (this.totalDays) - (this.differenceDays);
    // console.log(this.balanceDays);



  }


  applyLeave(addleaveFrm: NgForm) {
    const datediff = this.applyData.to_date - this.applyData.from_date;
    this.date1 = new DatePipe('en-US').transform(this.applyData.to_date, 'yyyy-MM-dd');
    this.date2 = new DatePipe('en-US').transform(this.applyData.from_date, 'yyyy-MM-dd');
    console.log(this.date1);
    console.log(this.date2);
    if (this.date1 === this.date2) {
      this.diffIndays = 1;
    } else {
      this.diffIndays = datediff / 1000 / 60 / 60 / 24;
    }
    if (this.applyData.leave_type !== '') {
      if (this.balanceDays < this.diffIndays) {
        this.limitError = 'Leave balance exceded please contact you manager';
      } else {
        this.limitError = '';
      }
    }
    if (this.limitError) {
      return '';
    } else {
      this.applyData.from_date = new DatePipe('en-US').transform(this.applyData.from_date, 'yyyy-MM-dd');
      this.applyData.to_date = new DatePipe('en-US').transform(this.applyData.to_date, 'yyyy-MM-dd');
      this.service.addapplyLeave(this.applyData)
        .subscribe(res => {
          console.log(res);
          this.data = res.json();
          // console.log(this.applyData);
          if (this.data.statusCode.code === '200') {
            addleaveFrm.resetForm();
            this.isShowPopup2 = true;
            this.message = 'Leave Applied successfully';
            this.error = null;
            addleaveFrm.resetForm();
          } else {
            // this.loading=false;
            this.message = null;
            this.error = this.data.errorMessages;
            this.isShowPopup2 = true;

          }
        }, error => {
          console.log(error);
        });
    }
  }


  closePopup() {
    this.isShowPopup = !this.isShowPopup;
    this.isShowDetails = false;
  }

  closePopup1() {
    this.isShowPopup1 = !this.isShowPopup1;
    this.isShowDetails1 = false;
  }
  closePopup2() {
    this.isShowPopup2 = !this.isShowPopup2;
    this.error = '';
    this.message = '';
  }

  balanceDetails() {
    this.isShowPopup1 = true;
    this.isShowDetails1 = true;
  }

  showdetails() {
    this.isShowPopup = true;
    this.isShowDetails = true;
  }


  onchange(value, flag) {
    if (flag) {
      this.assignData.start_day = undefined;
      this.assignData.start_day_shift = undefined;
      this.assignData.end_day = undefined;
      this.assignData.end_day_shift = undefined;
    }
    this.assignData.start_day = '';
    if (value === '1') {
      this.none = false;
      this.allDays = false;
      this.startDay = false;
      this.endDay = false;
      this.startEndDay = false;
      this.halfDay = false;

    } else if (value === '2') {
      this.none = false;
      this.allDays = true;
      this.startDay = false;
      this.endDay = false;
      this.startEndDay = false;
      this.halfDay = false;
      this.halfDay1 = false;
    } else if (value === '3') {
      this.none = false;
      this.allDays = false;
      this.startDay = true;
      this.endDay = false;
      this.startEndDay = false;
      this.halfDay = false;
      this.halfDay2 = false;
    } else if (value === '4') {
      this.none = false;
      this.allDays = false;
      this.startDay = false;
      this.endDay = true;
      this.startEndDay = false;
      this.halfDay = false;
    } else if (value === '5') {
      this.none = false;
      this.allDays = false;
      this.startDay = false;
      this.endDay = false;
      this.startEndDay = true;
      this.halfDay = false;
    }

  }

  getBalance(id) {
    this.balanceDays = 0;
    this.leaveTypes.forEach((data) => {
      if (data.leave_type.id === id) {
        this.balanceDays = data.leave_balance;
      }
    });
  }

  onchange2(value) {
    // console.log(value);
    if (value === '2') {
      this.halfDay1 = true;
    } else {
      this.halfDay1 = false;
    }
  }
  onchange3(value) {
    console.log(value);
    this.startdayvalue = value;
    if (value === '2') {
      this.halfDay2 = true;
    } else {
      this.halfDay2 = false;
    }
  }
  onchange4(value) {
    console.log(value);
    if (value === '2') {
      this.halfDay3 = true;
    } else {
      this.halfDay3 = false;
    }
  }
  onchange5(value) {
    console.log(value);
    if (value === '2') {
      this.halfDay4 = true;
    } else {
      this.halfDay4 = false;
    }
  }

  endDayChange(value) {
    // console.log(value);
    if (value === '2') {
      this.halfdays5 = true;
      this.fulldays = false;
    } else {
      this.fulldays = false;
      this.halfdays5 = false;
    }
  }


}
