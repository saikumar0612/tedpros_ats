import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-assign-leave',
  templateUrl: './assign-leave.component.html',
  styleUrls: ['./assign-leave.component.css']
})
export class AssignLeaveComponent implements OnInit {
  assignData: any = {
    from_date: '', to_date: '', user_id: '', leave_type: [], partial: '', duration_day: '', duration_time: '',
    startday: { day: '', time: '' }, endday: { day: '', time: '' }, comment: ''

  };
  filterData;
  data;
  assignDays: any = {};
  none: any;
  allDays: any;
  showDuration: any;
  startDay: any;
  endDay: any;
  startEndDay: any;

  fullDay: any;
  halfDay: any;

  isShowPopup = false;
  isShowDetails = false;
  isShowPopup1 = false;
  isShowDetails1 = false;

  dateError = ' ';

  isShowPopup2;
  message;
  error = null;
  balanceDays = 0;
  showform1 = false;
  showmonth = false;
  showyear = false;
  report: any = {};
  leaveData: any;
  leaveRecAvail = 0;
  users = [];
  workDay;
  workDays;
  halfdays;
  fulldays;
  leaveDays;
  timings;
  halfDayTimings;
  date = new Date();
  today;
  work;
  workRec: any = {
    id: '',
    name: ''
  };
  leaveTypeDropdownSettings = {};
  selectedLeaveType = [];
  constructor(private service: UserService) {

    // get users

    this.service.getUsersList().subscribe(res => {
      this.users = res.json();
      // console.log(this.users);
      this.users.forEach(obj => {
        obj.fullname = (obj.first_name + " " + obj.last_name);
      });
      console.log(this.users);
    });

    // get work days

    this.service.getWorkDay().subscribe(res => {
      this.workDay = res.json().data;

      // console.log(this.workDay);
      const index: number = this.workDay.indexOf(3);
      if (index !== -3) {
        this.workDay.splice(index, 3);
        // console.log(this.workDay);
      }
      this.workDays = this.workDay;
      console.log(this.workDay);
      const index1: number = this.workDays.indexOf(1);
      if (index1 !== -1) {
        this.workDays.splice(index1, 1);
        // console.log(this.workDays);
        console.log('Data', this.workDays);
      }






      // this.work = this.workDays
      // const index2: number = this.work.indexOf(1);
      // if (index1 !== -1) {
      //   this.work.splice(index2, 1);
      //   // console.log(this.workDays);
      //   console.log('Data1', this.work);
      // }


    });


    // get Days

    this.service.getLeaveDays().subscribe(res => {
      this.leaveDays = res.json().data;
      // console.log(this.leaveDays);
    });

    // get day timings

    this.service.getLeaveDaysTimings().subscribe(res => {
      this.timings = res.json().data;
      // console.log(this.timings);
    });



  }

  dateValidate() {
    if (this.assignData.from_date > this.assignData.to_date) {
      this.dateError = 'Please select the valid From date';
      console.log('1' + this.dateError);
    } else {
      this.dateError = '';

    }

  }

  ngOnInit() {
    this.leaveTypeDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      "closeDropDownOnSelection": true
    }
  }


  

  assignLeave(addApplyFrm: NgForm) {

    this.assignData.from_date = new DatePipe('en-US').transform(this.assignData.from_date, 'yyyy-MM-dd');
    this.assignData.to_date = new DatePipe('en-US').transform(this.assignData.to_date, 'yyyy-MM-dd');
    this.assignData.leave_type =this.assignData.leave_type[0].id;
    console.log(this.assignData);
    this.service.AddAssignLeave(this.assignData)
      .subscribe(res => {
        this.data = res.json();
        // console.log(this.assignData);
        if (this.data.statusCode.code === '200') {
          addApplyFrm.resetForm();
          this.isShowPopup2 = true;
          this.message = 'Leave Assigned successfully';
          this.error = null;
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
  onItemSelect(userId){
    this.balanceDays = 0;
    this.selectedLeaveType=[];
    this.assignData.leave_type=[]
    
    this.service.userAssignedLeaves(userId)
      .subscribe(res => {
        this.data = res.json();
        if (this.data.statusCode.code === '200') {
          this.leaveData = this.data.data;
          this.leaveRecAvail = this.leaveData.length;
          this.selectedLeaveType = [];
          this.leaveData.forEach(obj=>{
            this.selectedLeaveType.push(obj.leave_type);
            this.selectedLeaveType =  [...this.selectedLeaveType];
          })
          console.log(this.selectedLeaveType);
        } else {
          this.leaveData = [];
          this.leaveRecAvail = this.leaveData.length;
          this.balanceDays = 0;
        }
      }, error => {
        console.log(error);
      });
  }
  getBalance(item:any) {
    this.leaveData.forEach((data) => {
      if (data.leave_type.id === item.id) {
        this.balanceDays = data.leave_balance;
      }[0]

    });
  }

  

  belanceDetails() {
    this.isShowPopup1 = true;
    this.isShowDetails1 = true;
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


  showdetails() {
    this.isShowPopup = true;
    this.isShowDetails = true;
  }

  onchange(value) {
    // console.log(value);

    if (value === '1') {
      this.none = false;
      this.allDays = false;
      this.showDuration = false;
      this.startDay = false;
      this.endDay = false;
      this.startEndDay = false;

    } else if (value === '2') {
      this.none = false;
      this.allDays = true;
      this.showDuration = true;
      this.startDay = false;
      this.endDay = false;
      this.startEndDay = false;

    } else if (value === '3') {
      this.none = false;
      this.allDays = false;
      this.showDuration = false;
      this.startDay = true;
      this.endDay = false;
      this.startEndDay = false;
    } else if (value === '4') {
      this.none = false;
      this.allDays = false;
      this.showDuration = false;
      this.startDay = false;
      this.endDay = true;
      this.startEndDay = false;
    } else if (value === '5') {
      this.none = false;
      this.showDuration = false;
      this.allDays = false;
      this.startDay = false;
      this.endDay = false;
      this.startEndDay = true;
    }
  }

  onchange1(id) {
    this.today = new DatePipe('en-US').transform(this.date, 'yyyy-MM-dd');
    // console.log(id);
    if (id !== '' && this.today) {
      this.showform1 = true;
    }
  }

  onchange2(value) {
    // console.log(value);
    if (value === '2') {
      this.halfDay = true;
    } else {
      this.halfDay = false;
    }
  }

  endDayChange(value){
    // console.log(value);
    if (value === '2') {
      this.halfdays = true;
      this.fulldays = false;
    } else {
      this.fulldays = false;
      this.halfdays = false;
    }
  }

}
