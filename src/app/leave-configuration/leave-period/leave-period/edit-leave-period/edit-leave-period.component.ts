import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../core/services';
import { DateRange } from '@uiowa/date-range-picker';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import { UserService } from '../../../../core/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-leave-period',
  templateUrl: './edit-leave-period.component.html',
  styleUrls: ['./edit-leave-period.component.css']
})
export class EditLeavePeriodComponent implements OnInit {
  startDate ;
  endDate = new Date();
  leavePeriod: any = [];
  date;
  date1;
  getData: any = [];
  error = null;
  message;
  isSuccess = false;
  isFailure = false;
  leaveData:any = {
      startDate: '',
      endDate: ''
    };
  constructor(private http: Http, private service: UserService, private blocation: Location) {
    // this.leaveData.startDate =  new DatePipe('en-US').transform( this.leaveData.startDate, 'yyyy-MM-dd');
    // this.leaveData.endDate = new Date((new Date(this.leaveData.startDate)).getTime() + (60 * 60 * 24 * 1000 * 365));

   
  }

  ngOnInit() {
    this.date = new Date(new Date().getFullYear(), 0, 1);
    this.date1 = new Date(new Date().getFullYear(), 11, 31);
    // console.log(this.date);
    // console.log(this.date1);

    
    this.service.getLeavePeriod()
      .subscribe(res => {
        this.getData = res.json().data;
        console.log(this.getData);
        // console.log(this.getData);
        // console.log(this.getData[0].startDate);
      this.leaveData.startDate = new Date(this.getData[0].startDate);
      this.leaveData.endDate =new Date(this.getData[0].endDate)
      });
      

  }

  changedate() {
    this.leaveData.endDate = new Date((new Date(this.leaveData.startDate)).getTime() + (60 * 60 * 24 * 1000 * 365));
    this.leaveData.endDate = new DatePipe('en-US').transform( this.leaveData.endDate, 'yyyy-MM-dd');
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  addleavePeriod() {
    // const leaveData = {
    //   startDate: this.startDate,
    //   endDate: this.endDate
    // };
    this.leaveData.startDate = new DatePipe('en-US').transform( this.leaveData.startDate, 'yyyy-MM-dd');
    console.log(this.leaveData.startDate);
    console.log(this.leaveData);
    this.service.addLeavePeriod(this.leaveData)
      .subscribe(res => {
        this.leavePeriod = res.json();
        console.log(this.leavePeriod);
        if (this.leavePeriod.statusCode.code === '200') {
          this.isSuccess = true;
          // this.message = 'Leave Period Edited Sucessfully';
          // this.error = null;
        } else {
          // console.log(this.status.errorMessages);
          this.isFailure = true;
          // this.message = null;
          // this.error = null;
        }
      },
        error => {
          console.log(error);
        }
      );
  }

  cancel() {
    this.blocation.back();
  }

}
