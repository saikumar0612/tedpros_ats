import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService, UserService } from '../../../../core/services';
import { DatePipe } from '@angular/common';
import { ModalService } from '../../../../core/services';
import { DateRange } from '@uiowa/date-range-picker';
import { EventEmitterService } from '../../../../core/services/event-emitter.service';

@Component({
  selector: 'app-view-my-week-timesheet',
  templateUrl: './view-my-week-timesheet.component.html',
  styleUrls: ['./view-my-week-timesheet.component.css']
})
export class ViewMyWeekTimesheetComponent implements OnInit {
  loading = false;
  ind;
  check;
  checkhours2;
  checkhours1;
  counthours2;
  testarray7 = [];
  testarray8 = [];
  testarray9 = [];
  isShowPopup1;
  availablehours;
  today1;
  timesheetarray = [];
  isShowPopup;
  submitPopup;
  today;
  hrerror2;
  counthours1;
  timesheetData3: any;
  testarray4 = [];
  testarray5 = [];
  testarray6 = [];
  availableRecords = 0;
  testproject = {
    name: '',
    activities: [{
      name: ''
    }]
  };
  checkdate;
  timesheetData2;
  dateid;
  hrerror1;
  checkhours;
  timesheetData1 = {
    log: []
  };
  counthours;
  testarray2 = [];
  testarray1: any = [];
  hrerror;
  testarray = [];
  error = '';
  timesheets: any = [];
  timesheetsList: any = [];
  timesheetSubmitdata = {};
  timeSheetSelected;
  timesheetId;
  timeBool: boolean;
  timesheetData = [];
  timesheetLists = [];
  timesheetResponse: any;
  timesheetStatus: any = '';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  headers: any;
  options: any;
  customers: any;
  customerName: any;
  myTimesheet: any = {
    id: '',
    projectId: '',
    activityId: '',
    description: '',
    date: ''
  };
  totalhrs;
  userTimesheetComments: any = {
    status: '',
    description: '',
    timesheetId: ''
  };
  projects: any;
  activities: any;
  dateRange = new DateRange();
  startDate: Date = new Date();
  endDate: Date = new Date();
  doCopy = false;
  timesheetstatus;
  log;
  logger: any = {};
  constructor(private route: ActivatedRoute, private http: Http, private router: Router,
    public auth: AuthenticationService, private modalService: ModalService, public service: UserService,
    private eventEmitter: EventEmitterService) {
    this.userPermissions = this.currentUser.permission;
    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'View Timesheets for Week';
    this.logger.comment = 'View Timesheets for Week';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });
  }
  copyTime() {
    this.doCopy = true;
  }
  getTimesheet(id) {
    // this.loading = true;
    this.dateid = id;
    // this.http.get('http://service.tedpros.com/timesheet/getTimesheetById?timesheet=' + id, this.options)
    this.service.getTimesheetById(id)
      .subscribe(response => {
        this.timesheetData = response.json().data.sheet;
        // console.log(this.timesheetData);
        this.timesheetData1 = response.json().data;
        // console.log(this.timesheetData1)
        if (this.timesheetData1.log == null) {
          // this.timesheetstatus = this.timesheetData1
        } else {
          this.timesheetstatus = this.timesheetData1.log[0].status;
        }

        // console.log(this.timesheetstatus)
        // this.timesheetData.forEach(obj=>{
        //   console.log(obj.activities.data)
        //   this.testarray.push(obj.activities.data)

        //   console.log(this.testarray)


        //   // this.totalhrs+obj
        // })

        this.testarray.forEach(obj => {
          // console.log(obj)
          obj.forEach(obj1 => {

            // console.log(obj1);
            this.testarray1.push(obj1);

          });


        });
        // console.log( this.totalhrs);

        this.timesheetId = id;

        // console.log(this.timesheetId)
        // console.log(this.timesheetData[0].activities[0].data);
        // console.log(this.timeBool);
        // console.log(this.timesheetLists)
        this.timeSheetSelected = this.timesheetLists.find(x => x.timesheetId === this.timesheetId);
        // console.log(this.timeSheetSelected);
        this.timesheetStatus = this.timeSheetSelected.status;
        this.startDate = new Date(this.timeSheetSelected.startDate);
        this.endDate = new Date(this.timeSheetSelected.endDate);
        this.dateRange = new DateRange(this.startDate, this.endDate);
        // console.log(this.timesheetStatus);
        this.timeBool = true;
      },
        error => {
          // console.log(error);
        }
      );
  }

  getActivities(projectId: any) {
    this.service.getTimesheetActivity(projectId)
      .subscribe(response => {
        this.activities = response.json().data;
      },
        error => {
          // console.log(error);
        });
  }

  timesheetSubmit() {
    this.loading =true;
    this.userTimesheetComments.status = 'SUBMITTED';
    this.userTimesheetComments.timesheetId = this.timesheetId;
     this.service.submitTimesheet(this.userTimesheetComments)
      .subscribe(response => {
        this.loading = false;
        this.timesheetResponse = response.json();
        if (this.timesheetResponse.statusCode.code === '200') {
          this.submitPopup = true;
          this.timesheetStatus = this.userTimesheetComments.status;
        }
      },
        error => {
          // console.log(error);
        }
      );
  }

  ngOnInit() {
    
    this.today1 = new Date();
    this.today1 = new DatePipe('en-US').transform(this.today1, 'yyyy-MM-dd');
    this.service.getTimesheetList()
      .subscribe(response => {
        this.timesheets = response.json();
        this.timesheetLists = this.timesheets.data;
        if (this.timesheetLists) {
          this.timesheetLists.forEach(obj2 => {
            if (obj2.startDate <= this.today1) {
              this.timesheetarray.push(obj2);
            } else {

            }
          },
          );
        }
      },
        error => {
          // console.log(error);
        }
      );
    this.service.getMyProjects()
      .subscribe(response => {
        this.projects = response.json().data;
        this.availableRecords = this.projects.length;
      },
        error => {
          // console.log(error);
        });

  }

  counthrs() {
    this.checkhours = 0;
    this.counthours = 0;
    console.log(this.counthours);
    this.service.getTimesheetById(this.dateid)
      .subscribe(response => {
        this.timesheetData2 = response.json().data.sheet;
        this.timesheetData2.forEach(obj => {
          this.testarray.push(obj.activities.data);
        });
        this.testarray.forEach(obj => {
          obj.forEach(obj1 => {
            this.testarray1.push(obj1);
          });
        });
        this.testarray1.forEach(obj2 => {
          if (obj2.date === this.checkdate) {
            this.testarray2.push(obj2);
          }
        });
        this.counthours = 0;
        this.testarray2.forEach(obj2 => {
          this.counthours = this.counthours + obj2.timesheet.hours * 1;
        });
        this.checkhours = this.myTimesheet.hours + this.counthours * 1;
        if (this.checkhours > 24) {

          this.hrerror1 = 'total hours for the day cannot exceed 24';
          this.counthours = 0;
          this.testarray = [];
          this.testarray1 = [];
          this.testarray2 = [];

        } else {

          this.hrerror1 = '';
          this.counthours = 0;
          this.checkhours = 0;
          this.testarray = [];
          this.testarray1 = [];
          this.testarray2 = [];

        }

      },
        error => {
          // console.log(error);
        }
      );
    return this.checkhours;
  }
  editTimesheet(editSingleRecordForm: NgForm) {
    if (this.hrerror1 === 'total hours for the day cannot exceed 24' || this.myTimesheet.hours > this.availablehours) {

    } else {
      const tempTime = this.myTimesheet;

      let index = -1;
      let timesheet = {
        id: '',
        project: { id: '', name: '' },
        activity: { id: '', name: '' },
        date: '',
        hours: '',
        description: ''
      };
      timesheet.id = this.myTimesheet.id;
      timesheet.project = this.projects.find(function (item, i) {
        if (item.id === tempTime.projectId) {
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
          if (item.id === tempTime.activityId) {
            index = i;
            return i;
          }
        });
      }
      if (index === 0) {
        timesheet.activity = this.activities[0];
      }
      timesheet.date = tempTime.date;
      timesheet.hours = tempTime.hours;
      timesheet.description = tempTime.description;

      if (this.doCopy) {
        let ecount = 0;
        let errorStr = '';
        this.startDate = this.dateRange.start;
        this.endDate = this.dateRange.end;
        errorStr = 'total hours exceeded for the following dates has exceed 24 ';
        for (let ind = this.startDate; ind <= this.endDate; ind = new Date((new Date(ind)).getTime() + (60 * 60 * 24 * 1000 * 1))) {

          let timesheetAryData = {
            id: '',
            project: { id: '', name: '' },
            activity: { id: '', name: '' },
            date: '',
            hours: '',
            description: ''
          };
          timesheetAryData.id = timesheet.id;
          timesheetAryData.project = timesheet.project;
          timesheetAryData.activity = timesheet.activity;
          timesheetAryData.date = new DatePipe('en-US').transform(ind, 'yyyy-MM-dd');
          timesheetAryData.hours = timesheet.hours;
          timesheetAryData.description = timesheet.description;
          this.checkdate = timesheetAryData.date;
          const avaHours = this.counthrs();
          console.log(avaHours + ', ' + this.checkdate);
          if (avaHours >= 0) {
            this.timesheetsList.push(timesheetAryData);
          } else {
            ecount = ecount + 1;
            errorStr = errorStr + timesheetAryData.date + ', ';
          }

        }
        if (ecount <= 0) {
          this.hrerror1 = '';
        } else {
          this.hrerror1 = errorStr;
        }
        console.log(this.hrerror1);
       
        if (this.hrerror1 === '') {
          this.service.editTimesheetStatus(this.timesheetsList)
            .subscribe(response => {
              const result = response.json();
              if (result.statusCode.code === '200') {
                editSingleRecordForm.resetForm();
                this.getTimesheet(this.dateid);
                this.hrerror1 = '';
                this.doCopy = false;

              }
            },
              error => {
                editSingleRecordForm.resetForm();
              }
            );
        }


      } else {
        console.log(timesheet);
     this.service.editSingleTimesheet(timesheet)
          .subscribe(response => {
            const result = response.json();
            if (result.statusCode.code === '200') {
              this.getTimesheet(this.dateid);
              editSingleRecordForm.resetForm();
              this.hrerror1 = '';
              this.doCopy = false;

            }
          },
            error => {
              editSingleRecordForm.resetForm();
              this.hrerror1 = '';
              this.doCopy = false;
            }
          );
        this.timesheetSubmitdata = timesheet;
      }
      this.closeModal(editSingleRecordForm);
      this.doCopy = false;

    }

  }
  openModal(record_id, projectId, activityId, date, hours, description) {
    this.today = new Date();
    this.today = new DatePipe('en-US').transform(this.today, 'yyyy-MM-dd');
    if (date > this.today) {
      this.isShowPopup = true;
    } else {
      this.service.getTimesheetById(this.dateid)
       .subscribe(response => {
          this.timesheetData3 = response.json().data.sheet;
        
          this.timesheetData3.forEach(obj => {
            this.testarray4.push(obj.activities.data);
          });
          this.testarray4.forEach(obj => {
            obj.forEach(obj1 => {
              this.testarray5.push(obj1);
            });
          });
          this.testarray5.forEach(obj2 => {
            if (obj2.date === date) {
              this.testarray6.push(obj2);
            }
           
          });
          this.counthours1 = 0;
          this.testarray6.forEach(obj2 => {
            this.counthours1 = this.counthours1 + obj2.timesheet.hours * 1;
          });
         
          this.availablehours = 24 - this.counthours1 * 1;
          if (this.counthours1 >= 24) {

            this.hrerror2 = 'total numbers of hours for the day has reached 24';
            this.counthours1 = 0;
            this.testarray4 = [];
            this.testarray5 = [];
            this.testarray6 = [];

          } else {

            this.hrerror2 = '';
            this.counthours1 = 0;
            this.testarray4 = [];
            this.testarray5 = [];
            this.testarray6 = [];

          }

        },
        );

      if (this.projects.length === 1) {
        this.testproject = this.projects[0];
      } else {
        this.testproject = this.projects.find(function (item, i) {
          console.log(item.id);
          if (item.id === projectId) {
            const index = i;
            return item;
          }

        });
      }

      this.checkdate = date;
      this.checkhours = 0;
      this.error = 'true';
      if (record_id === null) {
        this.myTimesheet.id = null;
      } else {
        this.myTimesheet.id = record_id;
      }
      this.myTimesheet.date = date;
      this.myTimesheet.projectId = projectId;
      this.getActivities(projectId);
      this.myTimesheet.activityId = activityId;
      if (hours === '') {
        this.myTimesheet.hours = '';
      } else {
        this.myTimesheet.hours = hours;
      }
      if (description === '') {
        this.myTimesheet.description = '';
      } else {
        this.myTimesheet.description = description;
      }

    }

  }
  closePopup() {

    this.isShowPopup = !this.isShowPopup;
  }
  closePopup1() {

    this.isShowPopup1 = !this.isShowPopup1;
  }
  // added --suresh-- 08-24-2019 start
  closesubmit(){
    this.submitPopup = !this.submitPopup;
  }
  // added --suresh-- 08-24-2019 end


  closeModal(editSingleRecordForm: NgForm) {
    this.error = null;
    this.hrerror1 = '';
    editSingleRecordForm.resetForm();
    this.doCopy = false;
  }

}
