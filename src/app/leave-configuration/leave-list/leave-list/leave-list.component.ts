import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ModalService } from '../../../core/services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  data: any;
  filterData: any = [];
  leave: any = {
    id: '',
    days: '',
    leave_balance: '',
    leave_scheduled: '',
    leave_taken: '',
    leave_pending: '',
    leave_type: {
      id: '',
      name: '',
      situational: '',
      country: ''
    },
    user: {
      userId: '',
      firstName: '',
      lastName: '',
      emailId: '',
      phoneNo: ''
    },
    leaveApplication: {
      id: '',
      from_date: '',
      to_date: '',
      comment: '',
      status: ''
    },
    leaveApplicationID:'',
    status:''
  };
  leaveRec:any = {
    leaveApplication:{
      from_date:'',
      to_date:'',
    },
    user:{
      firstName:'',
      lastName:''
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
  updateLeave;
  updateData = {
    id: '',
    comment: '',
    status: ''
  };
  isShowPopup =false;
  error = '';
  message = '';
  popError = '';
  availableRecords = 0;
  updateStatus;
  constructor(private service: UserService, private modalService: ModalService) {

    this.service.getAdminleaveList()
      .subscribe(res => {
        console.log(res);
        this.data = res.json().data;
        // this.filterData = this.data;
        console.log(this.data);
        const leaves = this.data;
        for (let i = 0; i < leaves.length; i++) {
          if (leaves[i].id !== null) {
            this.leave.id = leaves[i].id;
          }
          if (leaves[i].user !== null) {

            this.leave.user = leaves[i].user.firstName + ' ' + leaves[i].user.lastName;
          } else {
            this.leave.user = ' ';
          }
          if (leaves[i].leaveApplication !== null) {
            const d1 = new DatePipe('en-US').transform(leaves[i].leaveApplication.from_date, 'MM/dd/yyyy');
            const d2 = new DatePipe('en-US').transform(leaves[i].leaveApplication.to_date, 'MM/dd/yyyy');
            this.leave.leaveApplication = d1 + ' to ' + d2;
          } else {
            this.leaveRec.leaveApplication = ' ';
          }

          if (leaves[i].leave_type !==null) {
            this.leave.leave_type = leaves[i].leave_type.name;
          } else {
            this.leave.leave_type = ' ';
          }       
          if (leaves[i].days !== null) {
            this.leave.days = leaves[i].days;
          } else {
            this.leave.days = ' ';
          }
          if (leaves[i].leave_balance !== null){
            this.leave.leave_balance = leaves[i].leave_balance;
          } else {
            this.leave.leave_balance = ' ';
          }
          if (leaves[i].status !== null ){
            this.leave.status = leaves[i].leaveApplication.status;
          } else {
             this.leave.status = ' ';
          }
          if (leaves[i].comment !== null ){
            this.leave.comment = leaves[i].leaveApplication.comment;
          } else {
             this.leave.comment = ' ';
          }
          if (leaves[i].leave_pending !== null ){
            this.leave.leave_pending = leaves[i].leave_pending;
          } else {
             this.leave.leave_pending = ' ';
          }
          if (leaves[i].leave_taken !== null ){
            this.leave.leave_taken = leaves[i].leave_taken;
          } else {
             this.leave.leave_taken = ' ';
          }
          if (leaves[i].leave_scheduled !== null ){
            this.leave.leave_scheduled = leaves[i].leave_scheduled;
          } else {
             this.leave.leave_taken = ' ';
          }
          if (leaves[i].leaveApplicationID !== null ){
            this.leave.leaveApplicationID = leaves[i].leaveApplication.id;
          } else {
             this.leave.leaveApplicationID = ' ';
          }
          this.leaveListData.push(this.leave);


          this.leave = {
            id: '',
            days: '',
            leave_balance: '',
            leave_scheduled: '',
            leave_taken: '',
            leave_pending: '',
            leave_type: {
              id: '',
              name: '',
              situational: '',
              country: ''
            },
            user: {
              userId: '',
              firstName: '',
              lastName: '',
              emailId: '',
              phoneNo: ''
            },
            leaveApplication: {
              id: '',
              from_date: '',
              to_date: '',
              comment: '',
              status: ''
            },
            leaveApplicationID:'',
            status:''
          };
        }
        this.filterData = this.leaveListData;
        this.availableRecords = this.filterData.length;
        console.log(this.filterData);
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
      else if (key === 'user') {
        this.filterData = this.leaveListData.filter(x =>
          x.user.trim().toLowerCase().includes(term.trim().toLowerCase()),
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

  update(status: string) {
    console.log(status);
    this.error = '';
    if (this.updateData.comment === '' || this.updateData.comment === null) {
      this.error = 'Comment should be added';
      return '';
    }
    this.updateData.status = status;
    console.log(this.updateData);
    this.service.updatesEmpLeaves(this.updateData).subscribe(res => {
      console.log(res);
      this.updateLeave = res.json();
      console.log(this.updateLeave);
      if (this.updateLeave.statusCode.code === '200') {
        this.closeModal();
        this.message = "Leave Updated Successfully";
        this.popError = null;
        this.isShowPopup = true;
       
      } else {
        this.popError = this.updateLeave.errorMessages;
        this.isShowPopup = true;
        this.message =null;
      }
    });
  }


  ngOnInit() {

  }

  leaveUpdate(leave){
    console.log(leave);
    this.updateStatus = true;
    this.updateData.id = leave.leaveApplicationID;
    this.leave = leave;
    console.log(leave);
  }



  closeModal() {
    this.updateStatus = !this.updateStatus; 
  }

  closePopup() {
    this.isShowPopup = !this.isShowPopup;
    this.popError = '';
    window.location.reload();
  }

}
