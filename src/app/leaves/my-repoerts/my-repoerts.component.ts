import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-repoerts',
  templateUrl: './my-repoerts.component.html',
  styleUrls: ['./my-repoerts.component.css']
})
export class MyRepoertsComponent implements OnInit {
  date = new Date();
  formDate: any;
  toDate: any;
  reports;
  filterData: any = [];
  finalData: any = [];
  fromDate: any;
  toDates: any;
  filter: any = {
    leaveType: '',
    days: '',
    leaveTaken: '',
    leaveScheduled: '',
    leaveBalance: '',
    status: ''
  };
  reportsRec:any = {
    leave_type:{
      name:''
    },
    days:'',
    leave_pending:'',
    leave_scheduled:'',
    leave_taken:'',
    leave_balance:''
  };
  reportsData: any = [];
  appliedLeaves;
  today;
  today1;
  availableRecords = 0;
  constructor(private service: UserService) {
    //   this.today= new Date();
    // this.today= new DatePipe('en-US').transform ( this.today, 'yyyy-MM-dd');
    this.service.getMyReports().subscribe(res => {
      this.reports = res.json();
      console.log(this.reports);
      // this.filterData = this.reports.data;
      // console.log(this.filterData);
      const reportsList = this.reports.data;
      for (let i = 0; i < reportsList.length; i++) {
        if (reportsList[i].id !== null) {
          this.reportsRec.id = reportsList[i].id;
        }
        if (reportsList[i].leave_type !== null) {
          this.reportsRec.leave_type = reportsList[i].leave_type.name;
        } else {
          this.reportsRec.leave_type = ' ';
        }
        if (reportsList[i].days !== null) {
          this.reportsRec.days = reportsList[i].days;
        } else {
          this.reportsRec.days = ' ';
        }
        if (reportsList[i].leave_scheduled !== null ){
          this.reportsRec.leave_scheduled = reportsList[i].leave_scheduled;
        } else {
          this.reportsRec.leave_scheduled = ' ';
        }
        if (reportsList[i].leave_pending !== null ){
          this.reportsRec.leave_pending = reportsList[i].leave_pending;
        } else {
          this.reportsRec.leave_pending = ' ';
        }
        if (reportsList[i].leave_taken !== null ){
          this.reportsRec.leave_taken = reportsList[i].leave_taken;
        } else {
          this.reportsRec.leave_taken = ' ';
        }
        
        if (reportsList[i].leave_balance !== null ){
          this.reportsRec.leave_balance = reportsList[i].leave_balance;
        } else {
          this.reportsRec.leave_balance = ' ';
        }

        this.reportsData.push(this.reportsRec);


        this.reportsRec = {
          leave_type:{
            name:''
          },
          days:'',
          leave_pending:'',
          leave_scheduled:'',
          leave_taken:'',
          leave_balance:''
        };
      }
      this.filterData = this.reportsData;
      this.availableRecords = this.filterData.length;
    });
  };

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.reportsData;
    } else {
       if (key === 'leave_type') {
        this.filterData = this.reportsData.filter(x =>
          x.leave_type.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_pending') {
        this.filterData = this.reportsData.filter(x =>
          x.leave_pending.toString().trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'days') {
        this.filterData = this.reportsData.filter(x =>
          x.days.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_scheduled') {
        this.filterData = this.reportsData.filter(x =>
          x.leave_scheduled.toString().trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_balance') {
        this.filterData = this.reportsData.filter(x =>
          x.leave_balance.toString().trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_taken') {
        this.filterData = this.reportsData.filter(x =>
          x.leave_taken.toString().trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  };

  ngOnInit() {
  }

}
