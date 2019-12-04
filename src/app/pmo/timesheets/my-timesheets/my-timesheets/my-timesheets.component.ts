import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../../core/services';
import { DateRange } from '@uiowa/date-range-picker';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';
import { EventEmitterService } from '../../../../core/services/event-emitter.service';

@Component({
  selector: 'app-my-timesheets',
  templateUrl: './my-timesheets.component.html',
  styleUrls: ['./my-timesheets.component.css']
})
export class MyTimesheetsComponent implements OnInit {
  todayDate = new Date();
  dateerror;
  today;
  timesheets;
  timesheetLists;
  log;
  logger: any = {};
  message;
  isShowPopup;
  error;
  info;
  data: any;
  dates: any;
  dateStr: any;
  startDate: any;
  endDate: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  headers: any;
  options: any;
  customers: any;
  customerName: any;
  timesheetData: any = {
    startDate: '',
    endDate: ''
  };
  newDate;
  startDateError = '';
  dateRange = new DateRange();
  checkdate;
  diffInDays;
  age;
  differenceInHours;
  maxDate;
  start;
  date;
  currentDate;
  currentRange;
  ngOnInit() {
    this.userPermissions = this.currentUser.permission;
    //  added suresh 08-26-2019 start
    this.date = new DatePipe('en-US').transform(this.todayDate, 'MM/dd/yyyy');
    this.timesheetData.dateRange = this.todayDate;
    this.timesheetData.startDate = new DatePipe('en-US').transform(this.timesheetData.dateRange, 'yyyy-MM-dd');
    this.currentDate =new Date((new Date(this.timesheetData.dateRange)).getTime() + (60 * 60 * 24 * 1000 * 6));
    this.currentRange = new DatePipe('en-US').transform(this.currentDate, 'yyyy-MM-dd');
    this.timesheetData.endDate = this.currentRange;
//  added suresh 08-26-2019 end
    this.service.getTimesheetList()
      .subscribe(response => {
        this.timesheets = response.json();
        this.timesheetLists = this.timesheets.data;
      },
        error => {
          console.log(error);
        }
      );
  }


  constructor(private http: Http, private router: Router, public auth: AuthenticationService, private service: UserService,
    private eventEmitter: EventEmitterService) {

    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'My Timesheet';
    this.logger.comment = 'View My Timesheet';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });
  }
  // changedate() {
  //   const date1 = this.dateRange.start;
  //   const date2 = new Date((new Date(date1)).getTime() + (60 * 60 * 24 * 1000 * 6));
  //   this.dateRange = new DateRange(date1, date2);
  //   console.log(this.dateRange);
  //   this.startDate = new DatePipe('en-US').transform(date1, 'yyyy-MM-dd');
  //   this.endDate = new DatePipe('en-US').transform(date2, 'yyyy-MM-dd');
  //   console.log(this.startDate);
  //   console.log(this.endDate);
  //   this.timesheetData.startDate = this.startDate;
  //   this.timesheetData.endDate = this.endDate;
  // }

  //  added suresh 08-26-2019 start
  cangedate1(){
     this.start =  this.timesheetData.dateRange ;
     this.start = new DatePipe('en-US').transform(this.start, 'yyyy-MM-dd');
    this.maxDate =new Date((new Date(this.start)).getTime() + (60 * 60 * 24 * 1000 * 6));
    this.maxDate = new DatePipe('en-US').transform(this.maxDate, 'yyyy-MM-dd');
    this.timesheetData.startDate = this.start;
    this.timesheetData.endDate = this.maxDate;
  }
  // added suresh 08-26-2019 end
  createTimesheet() {
    this.today = new Date();
    this.today = new DatePipe('en-US').transform(this.today, 'yyyy-MM-dd');
    if (this.timesheetData.startDate > this.today) {
      this.dateerror = 'Start date cannot exceed today';
      this.isShowPopup = true;

    } 
     else {
      this.dateerror = '';
      this.startDateError = '';
      this.isShowPopup = false;
      this.service.addTimesheet(this.timesheetData)
        .subscribe(response => {
          this.info = response.json();
          console.log(this.info);
          if (response.status === 200 && this.info.errorMessages == null) {
            this.message = this.info.data;
            this.isShowPopup = true;
            localStorage.setItem('startDate', this.timesheetData.startDate);
            console.log(this.timesheetData.startDate, this.timesheetData.endDate);
            console.log(this.timesheetData);
          } else {
            // this.userData.roles = [];
            this.error = this.info.errorMessages;
            console.log(this.error);
            // this.loading = false;
            this.isShowPopup = true;
          }
          this.error = this.info.errorMessages;
          console.log(this.error);
        },
          error => {
            console.log(error);
          }
        );
    }
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

  closePopup1(){
    this.router.navigate(['/timesheets/view-week-timesheet']);
  }
}
