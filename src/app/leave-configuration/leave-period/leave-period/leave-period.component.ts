import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services';
import { DateRange } from '@uiowa/date-range-picker';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-leave-period',
  templateUrl: './leave-period.component.html',
  styleUrls: ['./leave-period.component.css']
})
export class LeavePeriodComponent implements OnInit {
  startDate = new Date();
  endDate = new Date();
  leavePeriod;
  data: any = [];
  constructor(private http: Http, private service: UserService) {
    this.endDate = new Date((new Date(this.startDate)).getTime() + (60 * 60 * 24 * 1000 * 364));
  }

  ngOnInit() {
    this.service.getLeavePeriod()
      .subscribe(res => {
        this.data = res.json().data;
        this.data.startDate =new DatePipe('en-US').transform(  this.data.startDate , 'yyyy-MM-dd');
        console.log(this.data);
      });
  }

  changedate() {
    this.endDate = new Date((new Date(this.startDate)).getTime() + (60 * 60 * 24 * 1000 * 364));

  }



}
