import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { AuthenticationService, UserService } from '../../../core/services';

@Component({
  selector: 'app-edit-workshift',
  templateUrl: './edit-workshift.component.html',
  styleUrls: ['./edit-workshift.component.css']
})
export class EditWorkshiftComponent implements OnInit {
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
    startTime: {hour: '', minute: '', second: ''},
    endTime: {hour: '', minute: '', second: ''},
    totalTime: ''
  };
  shiftData1: any = {
    assignedEmployee: '',
    shiftName:'',
    startTime: '',
    endTime: '',
    totalTime: ''
  };
  shiftData2: any = {
    startTime: {hour: '', minute: '', second: ''},
    endTime: {hour: '', minute: '', second: ''}
  };
  shift: any = {};
  isFailure = false;
  isSuccess = false;
  nameError = false;
  error = false;
  name: any = {};
  allname=[];
  meridian = false;
  spinners = false;
  data:any;
  timeDetails={
    startTime: {},
    endTime: {},
    totalTime:''
  };
  shiftInfo:any;
  loading = false;

  constructor(private http: Http, private router: Router, public auth: AuthenticationService, public service: UserService, private route: ActivatedRoute) { }

  //check duplicate name
  checkName() {
    this.loading = true;
    this.service.getShiftName(this.shiftData.shiftName).subscribe(res => {
      this.name = res.json();
      console.log(this.name);
      if (this.name.statusCode.code === "200") {
        this.nameError = true;
      }
      else{
        this.nameError = false;
      }
      this.loading = false;
    });
  }

  getShiftData(){   

    this.service.getWorkShiftDetails(this.shift.id)
    .subscribe(response => {
      this.loading = true;
      this.shiftData1 = response.json().data;
      console.log(this.shiftData1);
      const start = this.shiftData1.startTime.split(":");
      this.shiftData2.startTime.hour = Number(start[0]);
      this.shiftData2.startTime.minute = Number(start[1]);
      this.shiftData2.startTime.second = Number(start[2]);
      
      const end = this.shiftData1.endTime.split(":");
      this.shiftData2.endTime.hour = Number(end[0]);
      this.shiftData2.endTime.minute = Number(end[1]);
      this.shiftData2.endTime.second = Number(end[2]);

      this.shiftData.startTime = this.shiftData2.startTime;
      this.shiftData.endTime = this.shiftData2.endTime;
      this.shiftData.totalTime = this.shiftData1.totalTime;
      this.shiftData.shiftName = this.shiftData1.shiftName;
      this.shiftData.assignedEmployee = this.shiftData1.assignedEmployee;
      this.loading = false;
      this.timediff();
    },
    error => {
      console.log(error);
    });
  }

  ngOnInit() {

    this.route.paramMap.subscribe(
      param => {
        this.shift.id = param.get('id');
      }
    );

    this.getShiftData();

    //get users list
    this.service.getUsersList().subscribe(res => {
      this.loading = true;
      this.users = res.json();
      this.users.forEach(obj => {
        obj.fullname=(obj.first_name + " " +  obj.last_name );
      });
      this.loading = false;
    });    
    

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

  //get time difference
  timediff(){
    this.service.getDiff(this.shiftData).subscribe(res => {
      this.timeDetails = res.json();
      console.log(this.timeDetails);
      this.shiftData.totalTime = this.timeDetails.totalTime;
    });
  }

  cancel() {
    this.auth.cancel('work-shifts');
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
    window.location.reload();
  }

  editShift(addApplyFrm:NgForm) {
    if (this.nameError) {
      this.error = true;
    }
    else {
      this.shiftData.shiftId = this.shift.id;
      if(this.timeDetails){
        this.shiftData.startTime = this.timeDetails.startTime;
        this.shiftData.endTime = this.timeDetails.endTime;
      }
      else{
        this.shiftData.startTime = this.shiftData1.startTime;
        this.shiftData.endTime = this.shiftData1.endTime;
      }
      this.service.editWorkShift(this.shiftData).subscribe(res => {
        this.shift = res.json();
        if (this.shift.statusCode.code === '200') {
          addApplyFrm.resetForm();
          this.isSuccess = true;
        }
        else {
          this.isFailure = true;
        }
      });
    }
  }

  add(addApplyFrm: NgForm) {
    this.isSuccess = false;
    addApplyFrm.resetForm();
  }
}
