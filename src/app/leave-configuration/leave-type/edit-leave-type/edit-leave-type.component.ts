import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-leave-type',
  templateUrl: './edit-leave-type.component.html',
  styleUrls: ['./edit-leave-type.component.css']
})
export class EditLeaveTypeComponent implements OnInit {
  leaveInfo: any = {
     id: '',
     name: '',
     country:{
       id:'',
       name:''
     }
    
    };
  data;
  leaveData: any = {};
  leave;
  isShowPopup;
  isShowPopup1;
  error = null;
  message;
  countries;
  isSuccess = false;
  isFailure = false;

  constructor(private route: ActivatedRoute, private service: UserService, private router: Router, private blocation: Location) {
    this.service.getCountries()
      .subscribe(response => {
        this.countries = response.json().data;
        // this.loading = false;
        // console.log(this.countries);
      },
        error => {
          console.log(error);
        });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.leaveInfo.id = param.get('id');
        console.log(this.leaveInfo.id);
      }
    );

    this.service.getLeaveTypeById(this.leaveInfo.id).subscribe(res => {
      this.data = res.json().data;
      this.leaveInfo = this.data;
      console.log(this.leaveInfo);
    })
  }

  editLeave() {
    console.log(this.leaveInfo);
    this.service.editLeaveType(this.leaveInfo.id, this.leaveInfo).subscribe(response => {
      console.log(response);
      this.leave = response.json();
      // console.log(this.leaveInfo);
      if (this.leave.statusCode.code === '200') {
        this.isSuccess = true;
        // this.isShowPopup1 = true;
        // this.message = 'Type of Leave Edited sucessfully';
        // this.error = null;

      } else {
        this.isFailure = true;
        // this.message = null;
        // this.error = this.data.errorMessages;
        // this.isShowPopup1 = true;
      }
    },
      error => {
        console.log(error);
      });
  }

  popupMsg() {
    this.isShowPopup = true;
    this.isShowPopup1 = true; 
  }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
  }

  closePopup1() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  // closePopup1() {
  //   this.isShowPopup1 = !this.isShowPopup1;
  //   this.error = '';
  //   this.message = '';
  // }

  cancel() {
    this.blocation.back();
  }
}
