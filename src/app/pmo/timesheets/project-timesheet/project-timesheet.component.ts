import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { DatePipe } from '@angular/common';
import { ModalService } from '../../../core/services/';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-project-timesheet',
  templateUrl: './project-timesheet.component.html',
  styleUrls: ['./project-timesheet.component.css']
})
export class ProjectTimesheetComponent implements OnInit {
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
  totalHours = 0;
  statusPopup;

  constructor(private route: ActivatedRoute, private http: Http, private router: Router,
    private modalService: ModalService, public auth: AuthenticationService, private service: UserService,
    private eventEmitter: EventEmitterService) {
    this.userPermissions = this.currentUser.permission;
  }

  timesheetSubmit(status) {
    this.userTimesheetComments.status = status;
    this.userTimesheetComments.timesheetId = this.timesheetId;
    console.log(this.userTimesheetComments);
    // this.http.post('http://service.tedpros.com/timesheet/updateEmpTimesheet', this.userTimesheetComments, this.options)
    this.service.updateEmpTimesheet(this.userTimesheetComments)
      .subscribe(response => {
        this.timesheetResponse = response.json();
        console.log(this.timesheetResponse);
        if (this.timesheetResponse.statusCode.code === '200') {
          this.statusPopup = true;
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

    // this.http.get('http://service.tedpros.com/timesheet/getTimesheet?timesheet=' + this.timesheetId, this.options)
    this.service.getTimesheetByApprover(this.timesheetId)
      .subscribe(response => {
        this.timesheetDetails = response.json().data;
        this.timesheetData = this.timesheetDetails.sheet;
        this.timesheetStatus = this.timesheetDetails.log[0].status;
        console.log(this.timesheetDetails);
        this.totalHours = this.timesheetDetails.sheet[0].activities.activityHours;
        // for (let i = 0; i < this.timesheetDetails.sheet.data.length; i++) {
        //   this.totalHours = this.totalHours + parseInt(this.timesheetDetails.sheet.data[i].hours, 10);
        // }
        // this.timesheetData = this.timesheetDetails.details;
        // this.timesheetStatus = this.timesheetDetails.status;
        // this.timesheetHours = this.timesheetDetails.totalHours;
        // this.userTimesheetDescription = this.timesheetDetails.description;
        this.timeBool = true;
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

  closesubmit() {
    this.router.navigate(['/timesheets/project-sheets']);
  }

}
