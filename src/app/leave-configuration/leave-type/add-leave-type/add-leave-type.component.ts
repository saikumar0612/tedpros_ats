import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-leave-type',
  templateUrl: './add-leave-type.component.html',
  styleUrls: ['./add-leave-type.component.css']
})
export class AddLeaveTypeComponent implements OnInit {
  leaveData: any = {};
  isShowPopup;
  data: any;
  countries;
  isShowPopup1;
  message;
  loading;
  error = null;
  constructor(private blocation: Location, private service: UserService) {
    // this.loading = true;
  }

  ngOnInit() {
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

  popupMsg() {
    this.isShowPopup = true;
  }

  cancel() {
    this.blocation.back();
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

// saikumar 27/08/2019 started here
  addLeave(addLeaveFrm:NgForm) {
    console.log(this.leaveData);
    // this.loading=true;
    this.service.addLeaveType(this.leaveData).subscribe(res => {
      console.log(res);
      this.data = res.json();
      console.log(this.data);
      if (this.data.statusCode.code === '200') {
        addLeaveFrm.resetForm();

        
// saikumar 27/08/2019 ended here
        // this.loading=false;
        this.isShowPopup1 = true;
        this.message = 'Leave type added successfully';
        this.error = null;

      } else {
        // this.loading=false;
        this.message = null;
        this.error = this.data.errorMessages;
        this.isShowPopup1 = true;
        // this.error = 'Please Enter Required Fields';
      }
    },
      error => {
        console.log(error);
      });
  }

  closePopup1() {
    this.isShowPopup1 = !this.isShowPopup1;
    this.error = '';
    this.message = '';
  }
}
