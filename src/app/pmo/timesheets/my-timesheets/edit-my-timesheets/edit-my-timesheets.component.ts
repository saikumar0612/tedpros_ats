import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule, Form, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../../core/services';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-edit-my-timesheets',
  templateUrl: './edit-my-timesheets.component.html',
  styleUrls: ['./edit-my-timesheets.component.css']
})
export class EditMyTimesheetsComponent implements OnInit {
  users;
  userId: string;
  name: string;
  description: string;
  date: string;
  actual: string;
  timesheetData: any = {};
  headers: any;
  options: any;
  projects: any = [];
  activities: any;
  loading: any;
  total: any;
  timesheets: any = [];
  timesheetSelect: any;
  timeBoolean = true;
  isShowPopup = false;
  timesheetResponse = {
    nextDate: '',
    message: '',
    previousDate: ''
  };
  projectMaster = [];
  totalHours: number = 0;
  error = '';

  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private route: ActivatedRoute, private http: Http, private router: Router, public auth: AuthenticationService, private blocation:Location, private service:UserService) {

  }

  cancel() {
    this.blocation.back(); 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.date = param.get('id');
        console.log(this.date);
        this.timesheetData.date = this.date;
      });
    this.getTimesheetByDate();
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


  }
  getMyProjects() {
    this.projects = [];
    for (let index = 0; index < this.projectMaster.length; index++) {
      let date1 = new Date(this.date);
      let date2 = new Date(this.projectMaster[index].startDate);
      if (date1 > date2) {
        this.projects.push(this.projectMaster[index]);
      }
      if (date1.getDate() === date2.getDate()) {
        this.projects.push(this.projectMaster[index]);
      }
    }
    // console.log(this.projects);
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
        console.log(this.timesheets);
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  getActivities(projectId: any) {
    // this.http.get('http://service.tedpros.com/timesheet/getMyActivities?id=' + projectId, this.options)
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
    // console.log(this.date);
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }
  closePopupNext() {
    this.isShowPopup = !this.isShowPopup;
    if (this.timesheetResponse.nextDate !== null) {
      this.date = this.timesheetResponse.nextDate;
      this.timesheetData.date = this.date;
      this.router.navigate(['/timesheets/edit-my-timesheets', this.date]);
      this.getTimesheetByDate();
      this.getMyProjects();
    }
  }
  closePopupPrev() {
    this.isShowPopup = !this.isShowPopup;
    if (this.timesheetResponse.previousDate !== null) {
      this.date = this.timesheetResponse.previousDate;
      this.timesheetData.date = this.date;
      this.router.navigate(['/timesheets/edit-my-timesheets', this.date]);
      this.getTimesheetByDate();
      this.getMyProjects();
    }
  }
  editTimesheet(id, projectId, activityId, date, hours, description, myform: NgForm) {

    let indexSheet = -1;
    let index = -1;

    let timesheet = {
      project: { id: '', name: '' },
      activity: { id: '', name: '' },
      date: '',
      hours: '',
      description: ''
    };
    console.log(timesheet);

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
    console.log(timesheet);
    if (id === '' || id === null) {
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
      console.log(this.totalHours);
    } else {
      this.timesheetSelect = this.timesheets.find(function (item, i) {
        if (item.id === id) {
          indexSheet = i;
          return i;
        }
      });

      this.timesheets[indexSheet] = timesheet;
    }
    this.isEmptyObject();
    myform.resetForm();
    myform.controls.date.setValue(date);

  }

  isEmptyObject() {
    console.log(this.timesheets.length);
    if (this.timesheets.length >= 0) {
      this.timeBoolean = false;
    } else {
      this.timeBoolean = true;
    }
  }

  removeTimesheet(timesheet) {
    const index = this.timesheets.indexOf(timesheet);
    this.timesheets.splice(index, 1);
    this.isEmptyObject();
  }
  editTimeData(timesheet) {
    const index = this.timesheets.indexOf(timesheet);
    // this.timesheetData = this.timesheets[timesheet];
    this.timesheetSelect = this.timesheets[index];

    this.timesheetData.id = this.timesheetSelect.id;
    // console.log(this.timesheetData.id);
    console.log(this.timesheetSelect.project.id);
    this.timesheetData.projectId = this.timesheetSelect.project.id;
    this.timesheetData.activityId = this.timesheetSelect.activity.id;
    this.getActivities(this.timesheetData.projectId);
    this.timesheetData.date = this.timesheetSelect.date;
    this.timesheetData.hours = this.timesheetSelect.hours;
    this.timesheetData.description = this.timesheetSelect.description;
    // this.timesheets.splice(index, 1);
    this.isEmptyObject();
  }

  editSheet() {
    // console.log(this.options, this.timesheets);

    // this.http.post('http://service.tedpros.com/timesheet/editStatus', this.timesheets, this.options)
    this.service.editTimesheetStatus(this.timesheets)
      .subscribe(response => {
        if (response.status === 200) {
          this.timesheetResponse = response.json().data;
          this.isShowPopup = true;
        }
        console.log(response);
      },
        error => {
          console.log(error);
        }
      );
  }
}
