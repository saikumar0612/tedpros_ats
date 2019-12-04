import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-entitlements',
  templateUrl: './entitlements.component.html',
  styleUrls: ['./entitlements.component.css']
})
export class EntitlementsComponent implements OnInit {

  leavedata: any;
  data: any;
  leaveInfo: any = {};
  usersList;
  filterData: any = [];
  entitlementData: any = [];
  leaveRec: any = {
    employeeType: {
      id: '',
      name: ''
    },
    leave_type: {
      name: ''
    },
    leave_period: '',
    days: ''
  };
  availableRecords = 0;
  constructor(private blocation: Location, private service: UserService) {
    this.service.getLeaveType().subscribe(res => {
      this.data = res.json().data;
      this.leavedata = this.data;
      // console.log(this.leavedata);
    });
  }

  ngOnInit() {
    this.service.getUserLeavesList()
      .subscribe(res => {
        this.usersList = res.json();
        this.filterData = this.usersList.data;
        console.log(this.usersList);
        const entitlement = this.usersList.data;
        for (let i = 0; i < entitlement.length; i++) {
          if (entitlement[i].id != null) {
            this.leaveRec.id = entitlement[i].id;
          }
          if (entitlement[i].employeeType != null) {

            this.leaveRec.employeeType.name = entitlement[i].employeeType.name;
          } else {
            this.leaveRec.employeeType.name = ' ';
          }
          if (entitlement[i].leave_type != null) {
            this.leaveRec.leave_type = entitlement[i].leave_type.name;
          } else {
            this.leaveRec.leave_type = ' ';
          }
          if (entitlement[i].leave_period != null) {
            const d1 = new DatePipe('en-US').transform(entitlement[i].leave_period.startDate, 'MM/dd/yyyy');
            const d2 = new DatePipe('en-US').transform(entitlement[i].leave_period.endDate, 'MM/dd/yyyy');
            this.leaveRec.leave_period = d1 + ' to ' + d2;
          } else {
            this.leaveRec.leave_period = ' ';
          }
          if (entitlement[i].days != null) {
            this.leaveRec.days = entitlement[i].days;
          } else {
            this.leaveRec.days = ' ';
          }

          this.entitlementData.push(this.leaveRec);


          this.leaveRec = {
            employeeType: {
              id: '',
              name: ''
            },
            leave_type: {
              name: ''
            },
            leave_period: '',
            days: ''
          };
        }
        this.filterData = this.entitlementData;
        this.availableRecords = this.filterData.length;

      });
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.entitlementData;
      // console.log(this.leavedata);
    } else {

      if (key === 'employeeType') {
        this.filterData = this.entitlementData.filter(x =>
          x.employeeType.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_type') {
        this.filterData = this.entitlementData.filter(x =>
          x.leave_type.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'leave_period') {
        this.filterData = this.entitlementData.filter(x =>
          x.leave_period.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'days') {
        this.filterData = this.entitlementData.filter(x =>
          x.days.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }


}
