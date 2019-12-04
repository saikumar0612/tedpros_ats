import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  showform = false;
  showleavetype = false;
  showemployee = false;

  formDate: any;
  toDate: any;

  reports;
  filterData: any = [];
  reportsList: any = [];
  finalData: any = [];
  fromDate: any;
  toDates: any;
  filter: any = {
    leaveType: '',
    days: '',
    leaveTaken: '',
    leaveBalance: ''
  };
  reportRec: any = {
    user: {
      firstName: '',
      lastName: ''
    },
    leave_type: {
      name: ''
    },
    days: '',
    leave_pending: '',
    leave_scheduled: '',
    leave_taken: '',
    leave_balance: ''
  };
  reportingData: any = [];
  leaveList = [];
  showEmployeeForm = false;
  showLeaveForm = false;
  searchData: any = {
    type: '',
    leaveType: '',
    from: '',
    title: '',
    branch: '',
    employee: '',
  };

  error6 = '';
  jobTitles = [];
  branches = [];
  users = [];
  leavePeriod;
  reportsData;
  getResult = false;
  availableRecords = 0;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken: string = this.currentUser.token;
  userPermissions: any;
  headers = new Headers({ 'Token': this.userToken });
  options = new RequestOptions({ headers: this.headers });

  constructor(public http: Http, public service: UserService, private router: Router, private eventEmitterService: EventEmitterService) {
    this.userPermissions = this.currentUser.permission;
  }

  view() {
    // start modification done by BASIT003 on 04-09-2019
    this.reportingData = [];
    // end modification done by BASIT003 on 04-09-2019
    console.log(this.searchData);
    this.service.generateReports(this.searchData).subscribe(res => {
      this.reports = res.json().data;
      console.log(this.reports);
      // this.filterData = this.reports.data;
      this.getResult = true;
      console.log(this.reports);
      const report = this.reports;

      for (let i = 0; i < report.length; i++) {
        if (report[i].id != null) {
          this.reportRec.id = report[i].id;
        }
        if (report[i].user !== null) {
          this.reportRec.user = report[i].user.firstName + ' ' + report[i].user.lastName;
        } else {
          this.reportRec.user = ' ';
        }
        if (report[i].leave_type !== null) {
          this.reportRec.leave_type = report[i].leave_type.name;
        } else {
          this.reportRec.leave_type = ' ';
        }
        if (report[i].days !== null) {
          this.reportRec.days = report[i].days;
        } else {
          this.reportRec.days = ' ';
        }
        if (report[i].leave_pending !== null) {
          this.reportRec.leave_pending = report[i].leave_pending;
        } else {
          this.reportRec.leave_pending = ' ';
        }
        if (report[i].leave_balance !== null) {
          this.reportRec.leave_balance = report[i].leave_balance;
        } else {
          this.reportRec.leave_balance = ' ';
        }
        if (report[i].leave_scheduled !== null) {

          this.reportRec.leave_scheduled = report[i].leave_scheduled;
        } else {
          this.reportRec.leave_scheduled = ' ';
        }
        if (report[i].leave_taken !== null) {
          this.reportRec.leave_taken = report[i].leave_taken;
        } else {
          this.reportRec.leave_taken = ' ';
        }

        this.reportingData.push(this.reportRec);


        this.reportRec = {
          user: {
            firstName: '',
            lastName: ''
          },
          leave_type: {
            name: ''
          },
          days: '',
          leave_pending: '',
          leave_scheduled: '',
          leave_taken: '',
          leave_balance: ''
        };
      }
      this.filterData = this.reportingData;
      this.availableRecords = this.filterData.length;
      console.log(this.reportingData);
      // console.log(this.reportRec);

    });
  };

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.reportingData;
      console.log(this.filterData);

    } else {

      if (key === 'user') {
        this.filterData = this.reportingData.filter(x =>
          x.user.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_type') {
        this.filterData = this.reportingData.filter(x =>
          x.leave_type.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'days') {
        this.filterData = this.reportingData.filter(x =>
          x.days.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_pending') {
        this.filterData = this.reportingData.filter(x =>
          x.leave_pending.toString().trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_scheduled') {

        this.filterData = this.reportingData.filter(x =>
          x.leave_scheduled.toString().trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_taken') {
        this.filterData = this.reportingData.filter(x =>
          x.leave_taken.toString().trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_balance') {
        this.filterData = this.reportingData.filter(x =>
          x.leave_balance.toString().trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  };




  ngOnInit() {

    // get leave types
    this.service.getLeaveType()
      .subscribe(res => {
        this.leaveList = res.json().data;
        // console.log(this.leaveList);
      });

    // get jobtitles
    this.service.getEmployeeTypes()
      .subscribe(response => {
        this.jobTitles = response.json().data;
        // console.log(this.jobTitles);
      },
        error => {
          console.log(error);
        });

    // get users list
    this.service.getUsersList()
      .subscribe(response => {
        this.users = response.json();
      });

    // get leave period
    this.service.getLeavePeriod().subscribe(res => {
      this.leavePeriod = res.json().data;
      // console.log(this.leavePeriod);
    });

    // get branches

    this.service.getCompanyBranches()
      .subscribe(res => {
        this.branches = res.json().data;
        // console.log(this.branches);
      });
  }

  resetData(addReportFrm: NgForm) {
    this.showEmployeeForm = false;
    this.showLeaveForm = false;
    this.getResult = false;
    addReportFrm.resetForm();
  }

  onchange(id) {
    if (id !== '') {
      this.showform = true;
      if (id === 'leavetype') {
        this.showEmployeeForm = false;
        this.showLeaveForm = true;
      } else if (id === 'employee') {
        this.showEmployeeForm = true;
        this.showLeaveForm = false;
      }
    }
  }

}
 // var num = report[i].leave_pending;
          // var n = num.toString();
          // document.getElementById("demo").innerHTML = n;