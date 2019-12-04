import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-myleave-list',
  templateUrl: './myleave-list.component.html',
  styleUrls: ['./myleave-list.component.css']
})
export class MyleaveListComponent implements OnInit {
  data;
  filterData: any = [];
  leaveRec:any = {
    leaveApplication:{
      from_date:'',
      to_date:'',
    },
    leave_type:{
      name:''
    },
    leave_balance:'',
    days:'',
    status:'',
    comment:''
  };
  leaveListData: any = [];
  availableRecords = 0;
  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getMyLeaveLists()
      .subscribe(res => {
        console.log(res);
        this.data = res.json();
        // this.filterData = this.data.data;
        // console.log(this.filterData);
        const leaves = this.data.data;
        for (let i = 0; i < leaves.length; i++) {
          if (leaves[i].id !== null) {
            this.leaveRec.id = leaves[i].id;
          }
          if (leaves[i].leaveApplication !== null) {
            const d1 = new DatePipe('en-US').transform(leaves[i].leaveApplication.from_date, 'MM/dd/yyyy');
            const d2 = new DatePipe('en-US').transform(leaves[i].leaveApplication.to_date, 'MM/dd/yyyy');
            this.leaveRec.leaveApplication = d1 + ' to ' + d2;
          } else {
            this.leaveRec.leaveApplication = ' ';
          }
          if (leaves[i].leave_type !==null) {
            this.leaveRec.leave_type = leaves[i].leave_type.name;
          } else {
            this.leaveRec.leave_type = ' ';
          }       
          if (leaves[i].days !== null) {
            this.leaveRec.days = leaves[i].days;
          } else {
            this.leaveRec.days = ' ';
          }
          if (leaves[i].leave_balance !== null){
            this.leaveRec.leave_balance = leaves[i].leave_balance;
          } else {
            this.leaveRec.leave_balance = ' ';
          }
          if (leaves[i].status !== null ){
            this.leaveRec.status = leaves[i].leaveApplication.status;
          } else {
             this.leaveRec.status = ' ';
          }
          if (leaves[i].comment !== null ){
            this.leaveRec.comment = leaves[i].leaveApplication.comment;
          } else {
             this.leaveRec.comment = ' ';
          }

          this.leaveListData.push(this.leaveRec);


          this.leaveRec = {
            leaveApplication:{
              from_date:'',
              to_date:'',
            },
            leave_type:{
              name:''
            },
            leave_balance:'',
            days:'',
            status:'',
            comment:''
          };
        }
        this.filterData = this.leaveListData;
        this.availableRecords = this.filterData.length;
      });
  };

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.leaveListData;
      // console.log(this.leavedata);
    } else {

      if (key === 'leaveApplication') {
        this.filterData = this.leaveListData.filter(x =>
          x.leaveApplication.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_type') {
        this.filterData = this.leaveListData.filter(x =>
          x.leave_type.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_balance') {
        this.filterData = this.leaveListData.filter(x =>
          x.leave_balance.toString().trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'days') {
        this.filterData = this.leaveListData.filter(x =>
          x.days.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'status') {
        this.filterData = this.leaveListData.filter(x =>
          x.status.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'comment') {
        this.filterData = this.leaveListData.filter(x =>
          x.comment.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  };



}
