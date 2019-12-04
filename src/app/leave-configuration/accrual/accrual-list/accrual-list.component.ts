import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-accrual-list',
  templateUrl: './accrual-list.component.html',
  styleUrls: ['./accrual-list.component.css']
})
export class AccrualListComponent implements OnInit {

  filterData: any = [];
  entitlementData = [{
    employeeType: { id: '', name: '' },
    location: { id: '', name: '' },
    leaveType: { id: '', name: '' },
    accrualFrequency: { id: '', value: '' },
    accrualInterval: '',
    creditDate: '',
    creditingMonth: '',
    creditingDay: '',
    validFrom: { id: '', value: '' },
    firstAccrual: { id: '', value: '' }
  }];
  availableRecords = 0;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getAccrualRuleList()
      .subscribe(res => {
        this.entitlementData = res.json().data;
        this.filterData = this.entitlementData;
        console.log(this.entitlementData);
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
      } else if (key === 'leave_type') {
        this.filterData = this.entitlementData.filter(x =>
          x.leaveType.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'location') {
        this.filterData = this.entitlementData.filter(x =>
          x.location.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'frequency') {
        this.filterData = this.entitlementData.filter(x =>
          x.accrualFrequency.value.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'accrualInterval') {
        this.filterData = this.entitlementData.filter(x =>
          x.accrualInterval.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'creditDate') {
        this.filterData = this.entitlementData.filter(x =>
          x.creditDate.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'validFrom') {
        this.filterData = this.entitlementData.filter(x =>
          x.validFrom.value.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'firstAccrual') {
        this.filterData = this.entitlementData.filter(x =>
          x.firstAccrual.value.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}
