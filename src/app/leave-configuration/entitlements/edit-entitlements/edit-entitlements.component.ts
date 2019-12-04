import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-edit-entitlements',
  templateUrl: './edit-entitlements.component.html',
  styleUrls: ['./edit-entitlements.component.css']
})
export class EditEntitlementsComponent implements OnInit {
  showform: boolean = false;
  showlocation: boolean = false;
  showemployee: boolean = false;
  showhidepregnant: boolean;
  roles: any = {};
  branches;
  data;
  leavePeriod: any = [];
  userData: any = {};
  leaveData;
  users;
  id;
  isSuccess = false;
  isFailure = false;

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, private blocation: Location,
    private service: UserService) {
    // get roles list

    this.service.getEmployeeTypes()
      .subscribe(response => {
        // console.log(response);
        this.roles = response.json().data;
        // console.log(this.roles);
        // this.loading = false;
      },
        error => {
          console.log(error);
        });

    // get leave type

    this.service.getLeaveType().subscribe(res => {
      this.data = res.json().data;
      console.log(this.data);
    });

    // get leave period

    this.service.getLeavePeriod()
      .subscribe(response => {
        this.leavePeriod = response.json().data;
        // console.log(this.leavePeriod);
      });

    // get users list

    this.service.getUsersList().subscribe(res => {
      this.users = res.json();
      console.log(this.users);
    });

    // get barnches
    this.service.getCompanyBranches()
    .subscribe(res => {
      this.branches = res.json().data;
      //  console.log(this.branches);
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
        console.log(this.id);
      }
    );
    this.service.getUserLeaveListById(this.id)
      .subscribe(res => {
        this.userData = res.json().data;
        console.log(res.json());
      }, error => {
        console.log(error);
      });
  }

  onchange(id) {

    this.showform = true;
    if (id === '0') {
      this.showform = true;
      this.showemployee = true;
      this.showlocation = false;
    } else if (id === '1') {
      this.showform = true;
      this.showlocation = true;
      this.showemployee = false;
    }
  }

  cancel() {
    this.blocation.back();
  }


  addLeave() {
    console.log(this.userData);
    this.service.editUserLeaves(this.userData)
      .subscribe(res => {
        this.leaveData = res.json();
        if (this.leaveData.statusCode.code === '200') {
          this.isSuccess = true;

        } else {
          this.isFailure = true;

        }
      }, error => {
        console.log(error);
      });
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }
  closePopup1(){
    this.isSuccess = !this.isSuccess;
  }

}
