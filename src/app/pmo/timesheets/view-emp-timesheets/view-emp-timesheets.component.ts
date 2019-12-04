import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { DatePipe } from '@angular/common';
import { ModalService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';


@Component({
  selector: 'app-view-emp-timesheets',
  templateUrl: './view-emp-timesheets.component.html',
  styleUrls: ['./view-emp-timesheets.component.css']
})
export class ViewEmpTimesheetsComponent implements OnInit {
  loading = false;
  statusPopup;
  timesheets;
  timeSheetSelected: any = {
    status: '',
    description: '',
    timesheetId: ''
  };
  userTimesheetComments: any = {
    status: '',
    description: '',
    timesheetId: ''
  };
  timesheetId;
  timeBool: boolean;
  timesheetData;
  timesheetLists: any = {
    statusCode: {},
    data: {},
  };
  dates;
  timesheetDetails: any = {};
  timesheetResponse: any;
  timesheetStatus: any = '';
  timesheetHours: any = '';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  headers: any;
  options: any;
  userTimesheetDescription = '';
  log;
  logger: any = {};

  constructor(private route: ActivatedRoute, private http: Http, private router: Router,
    private modalService: ModalService, public auth: AuthenticationService, private service: UserService,
    private eventEmitter: EventEmitterService) {
      this.userPermissions = this.currentUser.permission;
  }
 
  timesheetSubmit(status) {
    this.loading = true;
    this.userTimesheetComments.status = status;
    this.userTimesheetComments.timesheetId = this.timesheetId;
    console.log(this.userTimesheetComments);
    this.service.updateEmpTimesheet(this.userTimesheetComments)
      .subscribe(response => {
        this.loading = false;
        this.timesheetResponse = response.json();
        console.log(this.timesheetResponse);
        if (this.timesheetResponse.statusCode.code === '200') {
          this.statusPopup= true;
          // this.router.navigate(['timesheets/emp-timesheets']);
        }
      },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.timesheetId = param.get('id');
      }
    );

    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'View Emp Timesheeet';
    this.logger.comment = 'View Emp Timesheeet by Id as' + this.timesheetId;
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });
    this.service.getTimesheetId(this.timesheetId)
      .subscribe(response => {
        // changes --suresh-- 08-27-2019 start
        this.timesheetDetails = response.json().data;
        this.timesheetData = this.timesheetDetails.details;
        this.dates = this.timesheetData[0].activities.data;
        this.timesheetStatus = this.timesheetDetails.status;
        this.timesheetHours = this.timesheetDetails.totalHours;
        this.userTimesheetDescription = this.timesheetDetails.description;
         // changes --suresh-- 08-27-2019 end
      },
        error => {
          console.log(error);
        }
      );
  }

  openModal(id: string, description) {
    this.modalService.open(id);
    console.log(description);
    this.timeSheetSelected.description = description;

  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  closesubmit(){
    this.router.navigate(['timesheets/emp-timesheets']);
  }

}
