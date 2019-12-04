import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { AuthenticationService, UserService } from '../../../core/services';
// import moment from 'moment';
@Component({
  selector: 'app-add-workshift',
  templateUrl: './add-workshift.component.html',
  styleUrls: ['./add-workshift.component.css']
})
export class AddWorkshiftComponent implements OnInit {
  obj1:any=[];
  fullname={
    name:""
  };
  totalTime;
  start;
  end;
  n: any;
  users = [];
  timeList = [];
  dropdownSettings = {};
  shiftData: any = {
    assignedEmployee: '',
    shiftName:'',
    startTime: {hour: 9, minute: 30, second: 0o0},
    endTime: {hour: 17, minute: 30, second: 0o0},
    totalTime: ''
  };
  shift: any = {};
  isFailure = false;
  isSuccess = false;
  minutes: any;
  hours: any;
  nameError = false;
  error = false;
  name: any = {};
  allname=[];
  meridian = false;
  spinners = false;
  timeData:{
    start:any,
    end:any
  }
  timeDetails={
    startTime: {},
    endTime: {},
    totalTime:''
  };
  loading = false;

  constructor(private http: Http, private router: Router, public auth: AuthenticationService, 
    public service: UserService, private blocation: Location) { }

  //check duplicate name
  checkName() {
    this.service.getShiftName(this.shiftData.shiftName).subscribe(res => {
      this.name = res.json();
      if (this.name.statusCode.code === "200") {
        this.nameError = true;
      }
      else{
        this.nameError = false;
      }
    });
  }

  //get time difference
  timediff(){
    this.service.getDiff(this.shiftData).subscribe(res => {
      this.timeDetails = res.json();
      this.shiftData.totalTime = this.timeDetails.totalTime;
    });
  }

  // added the functionality of form reset - sharmistha - 08-23-2019 - start
  resetForm(addApplyFrm:NgForm){
    addApplyFrm.resetForm();
    this.shiftData = {
      assignedEmployee: '',
      shiftName:'',
      startTime: {hour: 9, minute: 30, second: 0o0},
      endTime: {hour: 17, minute: 30, second: 0o0},
      totalTime: ''
    };
    this.timediff();
  }
  // added the functionality of form reset - sharmistha - 08-23-2019 - end

  ngOnInit() {
    this.loading = true;
    this.timediff();

    //get users list
    this.service.getUsersList().subscribe(res => {
      this.users = res.json();
      this.users.forEach(obj => {
        obj.fullname=(obj.first_name + " " +  obj.last_name );
      });
    });    
    this.loading = false;
    

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'fullname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      "closeDropDownOnSelection": true
    };

  }

  cancel() {
    this.blocation.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close(addApplyFrm:NgForm) {
    this.isSuccess = !this.isSuccess;
    // this.shiftData = {};
    addApplyFrm.resetForm();
    this.shiftData = {
      assignedEmployee: '',
      shiftName:'',
      startTime: {hour: 9, minute: 30, second: 0o0},
      endTime: {hour: 17, minute: 30, second: 0o0},
      totalTime: ''
    };
    this.timediff();
  }

  addShift() {
    if (this.nameError) {
      this.error = true;
    }
    else {
      this.shiftData.startTime = this.timeDetails.startTime;
      this.shiftData.endTime = this.timeDetails.endTime;
      this.service.addWorkShift(this.shiftData).subscribe(res => {
        this.shift = res.json();
        if (this.shift.statusCode.code === '200') {
          this.isSuccess = true;
        }
        else {
          this.isFailure = true;
        }
      });
    }
  }

  add(addApplyFrm: NgForm) {    
    addApplyFrm.resetForm();
    this.isSuccess = false;
  }
}
