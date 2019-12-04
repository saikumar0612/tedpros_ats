import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, Form, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../../core/services';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';
import { EventEmitterService } from '../../../../core/services/event-emitter.service'

@Component({
  selector: 'app-create-my-timesheet',
  templateUrl: './create-my-timesheet.component.html',
  styleUrls: ['./create-my-timesheet.component.css']
})
export class CreateMyTimesheetComponent implements OnInit {
  users;
  userId: string;
  name: string;
  description: string;
  date: string;
  actual: string;
  isShowPopup = false;
  timesheetData: any = {
    project: { id: '' },
    activity: { id: '' },
    date: '',
    hours: '',
    description: ''
  };
  headers: any;
  options: any;
  projects: any = [];
  activities: any;
  loading: any;
  total: any;
  timesheets: any = [];
  timeBoolean = true;
  timesheetResponse = {
    nextDate: '',
    message: '',
    previousDate: ''
  };
  projectMaster = [];
  totalHours: number;
  error = '';
  log;
  logger:any={};

  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private http: Http, private router: Router, public auth: AuthenticationService, private service:UserService, private eventEmitter:EventEmitterService) {

    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Add Timesheet';
    this.logger.comment='Add New Timesheet';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      this.eventEmitter.onRecentActivityRefresh();
    });

  }

  ngOnInit() {
    
    this.date = localStorage.getItem('startDate');
    if (localStorage.getItem('projectId') === null) {
      this.timesheetData.projectId = localStorage.getItem('projectId');
    }
    if (localStorage.getItem('activityId') === null) {
      this.timesheetData.activityId = localStorage.getItem('activityId');
    }
    console.log(this.date);
    this.checkDate();
    this.timesheetData.date = this.date;
    // this.http.get(`http://service.tedpros.com/timesheet/getMyProjects`, this.options)
    this.service.getMyProjects()
      .subscribe(response => {
        this.projectMaster = response.json().data;
        this.getMyProjects();
        this.loading = false;
      },
        error => {
          console.log(error);
        });
    this.getTimesheetByDate();

  }
  getMyProjects() {
    this.projects = [];
    for (let index = 0; index < this.projectMaster.length; index++) {
      const date1 = new Date(this.date);
      const date2 = new Date(this.projectMaster[index].startDate);
      if (date1 > date2) {
        this.projects.push(this.projectMaster[index]);
      }
      if (date1.getDate() === date2.getDate()) {
        this.projects.push(this.projectMaster[index]);
      }
    }
    // console.log(this.projects);
  }

  getActivities(projectId: any) {
    this.service.getTimesheetActivity(projectId)
      .subscribe(response => {
        this.activities = response.json().data;
        console.log(this.activities);
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  checkDate() {
    this.date = new DatePipe('en-US').transform(this.date, 'yyyy-MM-dd');
    console.log(this.date);
  }

  isEmptyObject() {
    console.log(this.timesheets.length);
    if (this.timesheets.length >= 0) {
      this.timeBoolean = false;
    } else {
      this.timeBoolean = true;
    }
  }

  addTimesheet(projectId, activityId, date, hours, description, myform: NgForm) {
    let index = -1;
    let timesheet = {
      project: { id: '', name: '' },
      activity: { id: '', name: '' },
      date: '',
      hours: '',
      description: ''
    };
    timesheet.project = this.projects.find(function (item, i) {
      if (item.id === projectId) {
        index = i;
        return i;
      }
    });
    if (index === 0) {
      timesheet.project = this.projects[0];
    }
    if (this.activities.length === 1) {
      timesheet.activity = this.activities[0];
    } else if (this.activities.length > 1) {
      timesheet.activity = this.activities.find(function (item, i) {
        if (item.id === activityId) {
          index = i;
          return i;
        }
      });
    }
    if (index === 0) {
      timesheet.activity = this.activities[0];
    }
    timesheet.date = date;
    timesheet.hours = hours;
    timesheet.description = description;
    this.totalHours = 0;
    for (let itr = 0; itr < this.timesheets.length; itr++) {
      this.totalHours = this.totalHours + Number(this.timesheets[itr].hours);
    }
    this.totalHours = this.totalHours + Number(hours);
    if (this.totalHours <= 24) {
      this.error = null;
      this.timesheets.push(timesheet);
    } else {
      this.error = 'The total hours cannot be more than 24';
    }
    this.totalHours = this.totalHours - Number(hours);
    console.log(this.timesheets);
    this.isEmptyObject();
    myform.resetForm();
    myform.controls.date.setValue(date);
  }
  assignDate() {
    this.timesheetData.date = this.date;
    console.log(this.timesheetData.date);
    console.log(this.date);
  }
  removeTimesheet(timesheet) {
    const index = this.timesheets.indexOf(timesheet);
    this.timesheets.splice(index, 1);
    this.isEmptyObject();
  }

  addSheet() {
    console.log(this.options, this.timesheets);

    // this.http.post('http://service.tedpros.com/timesheet/addStatus', this.timesheets, this.options)
    this.service.adddTimesheetStatus(this.timesheets)
      .subscribe(response => {
        if (response.status === 200) {
          this.timesheetResponse = response.json().data;
          // this.date = localStorage.getItem('startDate');
          this.isShowPopup = true;
          this.timesheets = [];
        }
        console.log(response);
      },
        error => {
          console.log(error);
        }
      );
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }
  closePopupNext() {
    this.isShowPopup = !this.isShowPopup;
    if (this.timesheetResponse.nextDate !== null) {
      this.date = this.timesheetResponse.nextDate;
      this.timesheetData.date = this.date;
      localStorage.setItem('startDate', this.date);
      this.router.navigate(['/timesheets/create-my-timesheet']);
      this.getMyProjects();
      this.getTimesheetByDate();
    }
  }
  closePopupPrev() {
    this.isShowPopup = !this.isShowPopup;
    if (this.timesheetResponse.previousDate !== null) {
      this.date = this.timesheetResponse.previousDate;
      this.timesheetData.date = this.date;
      localStorage.setItem('startDate', this.date);
      this.router.navigate(['/timesheets/create-my-timesheet']);
      this.getMyProjects();
      this.getTimesheetByDate();
    }
  }
  getTimesheetByDate() {
    // this.http.get(`http://service.tedpros.com/timesheet/getTimesheetByDate?date=` + this.date, this.options)
    this.service.getTimesheetByDate(this.date)
      .subscribe(response => {
        if (response.json().data) {
          this.timesheets = response.json().data;
          this.isEmptyObject();
        } else {
          this.timesheets = [];
        }
        // console.log(this.timesheets);
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

}
export class TimesheetData {

  projectId: string;
  activityId: string;
  date: string;
  description: string;
  hours: string;

  constructor(projectId, activityId, date, hours, description) {
    this.projectId = projectId;
    this.activityId = activityId;
    this.hours = hours;
    this.description = description;
    this.date = date;
  }

}
