import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../core/services';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {
  loading = false;
  timesheet: any;
  availableRecords = 0;
  timesheetData = {
    fromDate: '',
    toDate: ''
  };
  activitieslist: any;
  activityData = {};
  projects = [];
  users;
  assignInfo = {
    userId: '',
    activityId: '0',
    projectId: '0',
    fromDate: '',
    toDate: '',
    isApproved: false
  };
  dropdownSettings = {};
  projectCount = 0;
  activityCount = 0;
  userCount = 0;
  fromDate = '';
  toDate = '';
  projectStart = '';
  projectEnd = '';
  startDateError = '';
  userError = '';
  userInfo = [];
  reportInfo = [];
  totalDuration: number;

  constructor(private route: ActivatedRoute, private http: Http, private router: Router, public service: UserService) {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'fullname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }
  
  ngOnInit() {
    this.getProjectList();
    this.getUserList();
  }

  getUserList() {
    this.service.getUsersList()
      .subscribe(response => {
        this.users = response.json();
        // console.log(this.users);
        this.users.forEach(obj => {
          obj.fullname = (obj.first_name + " " + obj.last_name);
        });
        this.userCount = this.users.length;
        // console.log(this.userCount);
      },
        error => {
          console.log(error);
        });
  }

  getProjectList() {
    this.service.getProject()
      .subscribe(response => {
        this.projects = response.json().data;
        console.log(this.projects);
        this.projectCount = this.projects.length;
        // console.log(this.projectCount);
      },
        error => {
          console.log(error);
        });
  }

  activites(project) {
    // console.log(project);
    this.service.getProjectActivity(project)
      .subscribe(response => {
        this.activitieslist = response.json().data;
        // console.log(this.activitieslist);
        this.activityCount = this.activitieslist.length;
        // console.log(this.activityCount);
      },
        error => {
          console.log(error);
        });
  }

  dateValidate() {
    this.fromDate =  new DatePipe('en-US').transform(this.timesheetData.fromDate, 'yyyy-MM-dd');
    this.toDate = new DatePipe('en-US').transform(this.timesheetData.toDate, 'yyyy-MM-dd');
    console.log(this.fromDate + ' - ' + this.toDate);
    // this.projectStart = new DatePipe('en-US').transform(this.toDate, 'yyyy-MM-dd');
    // this.projectEnd = new DatePipe('en-US').transform(this.toDate, 'yyyy-MM-dd');
    if(this.fromDate !== '' || this.toDate !== ''){
      // if(this.assignInfo.projectId !== '0'){
      //   const project = this.projects.filter(x => x.id === this.assignInfo.projectId)[0];
      // } else {
      // }
      if(this.fromDate >= this.toDate) {
        this.timesheetData.toDate = '';
        this.toDate = '';
        this.startDateError = 'End date cannot exceed start date';
        
      } else {
        this.startDateError = '';
      }
    } else {
      this.startDateError = '';
    }
  }

  // function to get employee based project reports by BASIT003

  getTimesheetData() {
    this.loading = true;
    this.totalDuration = 0;
    this.reportInfo = [];
    console.log(this.userInfo);
    this.userError = '';
    this.assignInfo.fromDate =  new DatePipe('en-US').transform(this.timesheetData.fromDate, 'yyyy-MM-dd');
    this.assignInfo.toDate = new DatePipe('en-US').transform(this.timesheetData.toDate, 'yyyy-MM-dd');
    if(this.userInfo[0]){
      this.assignInfo.userId = this.userInfo[0].id;
      console.log(this.assignInfo);
      this.service.getEmployeeReport(this.assignInfo)
      .subscribe(response => {
        if(response.json().statusCode.code === '200'){
          this.reportInfo = response.json().data;
          this.availableRecords = this.reportInfo.length;
          if(this.reportInfo){
            for (var value of this.reportInfo) {
              
              this.totalDuration = this.totalDuration + parseInt(value.totalDuration);
            }
            
          }
        }else{
          this.availableRecords = 0;
        }
        
        this.loading = false;
      },
        error => {
          console.log(error);
        });
    }else{
      this.reportInfo = [];
      this.userError = 'Please select user first';
      this.loading = false;
    }
    
    
  }

}
