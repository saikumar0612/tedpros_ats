import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../../core/services/user.service';
import { EventEmitterService } from '../../../../core/services/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-mytimesheet',
  templateUrl: './view-mytimesheet.component.html',
  styleUrls: ['./view-mytimesheet.component.css']
})
export class ViewMytimesheetComponent implements OnInit {
  timesheets;
  timesheetLists: any = {
    statusCode: {},
    data: {},
  };
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  headers: any;
  options: any;
  customers: any;
  customerName: any;
  log;
  logger:any={};

  constructor(public http: Http, private service:UserService, private eventEmitter:EventEmitterService, public router:Router) {
    this.userPermissions = this.currentUser.permission;
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='View My Timesheets';
    this.logger.comment='View My Timesheets';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      this.eventEmitter.onRecentActivityRefresh();
    });

    // http.get('http://service.tedpros.com/timesheet/getTimesheetList', options)
    this.service.getTimesheetList()
      .subscribe(response => {
        this.timesheets = response.json();
        this.timesheetLists = this.timesheets.data;
        console.log(this.timesheetLists);
      },
        error => {
          console.log(error);
        }
      );
  }


  ngOnInit() {
  }

}
