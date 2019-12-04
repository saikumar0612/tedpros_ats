import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workshifts',
  templateUrl: './workshifts.component.html',
  styleUrls: ['./workshifts.component.css']
})
export class WorkshiftsComponent implements OnInit {

  shifts=[];
  filterData=[];
  loading = false;
  singleShift:any={};
  availableRecords:any={};
  isShowPopup = false;
  isShowDetails = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken:string = this.currentUser.token;
  userPermissions: any;
  headers = new Headers({'Token': this.userToken});
  options = new RequestOptions({ headers: this.headers });

  constructor(public http: Http, public service: UserService,private router: Router,private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    this.userPermissions = this.currentUser.permission;
    this.service.getWorkShifts()
    .subscribe(response => {
      this.shifts = response.json().data;
      this.filterData = this.shifts;
      if(this.filterData){
        this.availableRecords = this.filterData.length;
      }
      // console.log(this.filterData);
    },
    error => {
      console.log(error);
    });
  }

  showUserDetails(kpiId){
    this.loading = true;
    this.singleShift = this.filterData.filter(x => x.id == kpiId)[0];
    this.isShowPopup = true;
    this.isShowDetails = true;
    this.loading = false;
  }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
    this.isShowDetails = false;
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.shifts;
    } else {

      if (key === 'name') {
        this.filterData = this.shifts.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'starttime') {
        this.filterData = this.shifts.filter(x =>
          x.start_time.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'endtime') {
        this.filterData = this.shifts.filter(x =>
          x.end_time.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'hours') {
        this.filterData = this.shifts.filter(x =>
          x.hours_per_day.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}
