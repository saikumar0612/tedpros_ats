import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-project-sheet',
  templateUrl: './project-sheet.component.html',
  styleUrls: ['./project-sheet.component.css']
})
export class ProjectSheetComponent implements OnInit {
  log;
  logger: any = {};
  timesheets;
  data;
  catData: any = {};
  catInfo: any = {};
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  constructor(public http: Http, private blocation: Location, private service: UserService,
    private eventEmitter: EventEmitterService, public router: Router) {
    this.userPermissions = this.currentUser.permission;
    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Employeee Timesheets';
    this.logger.comment = 'View Employeee Timesheets';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });

    // http.get('http://service.tedpros.com/timesheet/getReportingUsers', this.options)
    this.service.getReportingProjects()
      .subscribe(response => {
        this.timesheets = response.json();
        this.data = this.timesheets.data;
        console.log(this.data);
      });
  }

  ngOnInit() {
  }

  search(term: string, key: string) {
    if (!term) {
      this.data = this.timesheets.data;
    } else {
      if (key === 'timesheet.firstName') {
        this.data = this.timesheets.data.filter(x =>
          x.firstName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'timesheet.status') {
        this.data = this.timesheets.data.filter(x =>
          x.status.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
  }


  cancel() {
    this.blocation.back();
  }
}
