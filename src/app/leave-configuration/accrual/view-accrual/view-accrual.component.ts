import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-accrual',
  templateUrl: './view-accrual.component.html',
  styleUrls: ['./view-accrual.component.css']
})
export class ViewAccrualComponent implements OnInit {

  showform = false;
  showlocation = false;
  showemployee = false;
  showhidepregnant;
  roles: any = {};
  branches;
  data;
  leavePeriod: any = [];
  userData = {
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
  };
  availableRecords = 0;
  id = '';

  constructor(private blocation: Location, private route: ActivatedRoute, private service: UserService) {
  }

  cancel() {
    this.blocation.back();
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.id = res.id;
    });
    this.service.getAccrualRule(this.id)
      .subscribe(res => {
        this.userData = res.json().data;
        const creditDate = this.userData.creditDate.split('/');
        this.userData.creditingMonth = creditDate[0];
        this.userData.creditingDay = creditDate[1];
        console.log(this.userData);
      });
  }

}
