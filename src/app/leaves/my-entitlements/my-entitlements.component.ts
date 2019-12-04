import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-entitlements',
  templateUrl: './my-entitlements.component.html',
  styleUrls: ['./my-entitlements.component.css']
})
export class MyEntitlementsComponent implements OnInit {
  entitlements;
  filterData: any = [];
  leaveRec: any = {
    leave_type: {
      name: ''
    },
    leave_period: '',
    days: ''
  };
  entitlementData: any = []; 
  availableRecords = 0; 
  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getMyEntitlements().subscribe(res => {
      this.entitlements = res.json();
      // this.filterData = this.entitlements.data;
      // console.log(this.filterData);
      const entitlement = this.entitlements.data;
      for (let i = 0; i < entitlement.length; i++) {
        if (entitlement[i].id != null) {
          this.leaveRec.id = entitlement[i].id;
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

  };

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.entitlementData;
      // console.log(this.leavedata);
    } else {
       if (key === 'leave_type') {
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
  };








}
