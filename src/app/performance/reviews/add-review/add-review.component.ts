import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { DateRange } from '@uiowa/date-range-picker';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  log
  logger:any={};
  dateError;
  dateError1;

  dateRange = new DateRange(new Date(2018, 1, 1), new Date(2018, 1, 31));
  dateRange1 = DateRange.nextTwoWeeks();
  dateRange2 = DateRange.nextMonth();
  maxDate = new Date();
  dateRange3 = new DateRange(new Date(2018, 9, 1), new Date(2018, 9, 9));
  dateRange4 = new DateRange(new Date(2018, 9, 1), new Date(2018, 9, 9));
  dateRange5 = new DateRange(new Date(2018, 9, 1), null);
  dateRange6 = new DateRange(null, new Date(2018, 9, 1));
  dateRange7 = new DateRange(new Date('sssss'), new Date('aaaa'));

  date8 = new Date(2018, 0, 24);



  message;
  isShowPopup;
  error;
  trackerData:any = {};
  users:any=[];
  reporting;
  kpi;
  data;
  selDept=[];
  selectedItems = [];
  loading;
  jobTitles;
  start:any = new Date(Date.now());
  title=[];
  filteredUsers=[];
  dropdownSettings;
  kpitypes:any=[];
  // maxDate = new Date();
  headers:any;
  options:any;
  supervisor = false;
  noSupervisor:any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private http: Http, private router: Router, public service:UserService, private blocation:Location,private eventEmitterService: EventEmitterService) { 

    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Add Review';
    this.logger.comment='Add Review';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      this.eventEmitterService.onRecentActivityRefresh();    
    });

  }

  changedate() {
    this.dateRange4 = new DateRange(
      new Date(2018, 9, 1),
      new Date(2018, 9, 19)
    );
  }

  getdate(){    
    this.start = new Date(this.trackerData.startDate);    
    this.options2.minDate =  new Date(this.start);
    console.log(this.options2.minDate);
    console.log(this.start);    
  }
  

  options1: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select start date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

  options2: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    // minDate: this.trackerData.startDate,
    //minDate: this.trackerData.startDate,
    minDate: new Date(this.start),
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select end date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

  ngOnInit() {
    this.loading = true;
    
    // filtered users who dont have Account Owner as employee type - sharmistha - 09-27-2019 - start
    //get users list
    this.service.getUsersList()
    .subscribe(response => {
      this.filteredUsers = response.json();
      // console.log(this.filteredUsers);
      this.filteredUsers.forEach(obj => {
        if(obj.employeeType.employeeType !== "Account Owner"){
          this.users.push(obj);
        }
      });
      // console.log(this.users);
    });    
    // filtered users who dont have Account Owner as employee type - sharmistha - 09-27-2019 - end

    // get kpi types list
    this.service.getKpiTypes()
    .subscribe(response => {
      this.kpitypes = response.json().data;
    });
    this.loading = false;
  }

  change(id){
    this.service.getUserInfo(id)
     .subscribe(response => {
        this.data = response.json();
        this.trackerData.supervisorId = this.data.reporting_to.id;
        if(this.trackerData.supervisorId){
          this.trackerData.name = this.data.reporting_to.fname +' '+this.data.reporting_to.lname;
          this.supervisor = false;
          this.loading = false;
        }
        else{
          this.trackerData.name = '';
          this.supervisor = true;
          this.noSupervisor = "No Supervior assigned yet"
        }
     },
     error => {
       console.log(error);
     });
  }
  
  cancel() {
    this.blocation.back(); 
  }

  //save review
  save(addJobFrm: NgForm){
    this.trackerData.status = '1';
    //console.log(this.trackerData);
    this.trackerData.startDate = new DatePipe('en-US').transform (this.trackerData.startDate, 'yyyy-MM-dd');
    this.trackerData.endDate = new DatePipe('en-US').transform(this.trackerData.endDate, 'yyyy-MM-dd');
    this.trackerData.dueDate = new DatePipe('en-US').transform(this.trackerData.dueDate, 'yyyy-MM-dd');
    this.service.addReviews(this.trackerData)
    .subscribe(response =>{
      this.kpi = response.json();
      if(this.kpi.statusCode.code === '200'){
        this.message = this.kpi.data;
        addJobFrm.resetForm();
        this.isShowPopup = true;
      }
      else {
        this.error = this.kpi.errorMessages;
        this.loading = false;
        this.isShowPopup = true;
      }
    },
    error => {
      console.log(error);
    }
  )
  }

  //activate review
  activate(addJobFrm: NgForm){
    this.trackerData.startDate = new DatePipe('en-US').transform (this.trackerData.startDate, 'yyyy-MM-dd');
    this.trackerData.endDate = new DatePipe('en-US').transform(this.trackerData.endDate, 'yyyy-MM-dd');
    this.trackerData.dueDate = new DatePipe('en-US').transform(this.trackerData.dueDate, 'yyyy-MM-dd');
    this.trackerData.status = '2';
    //console.log(this.trackerData);
    this.service.addReviews(this.trackerData)
    .subscribe(res =>{
      this.kpi = res.json();
      if(this.kpi.statusCode.code === '200'){
        this.message = this.kpi.data;
        addJobFrm.resetForm();
        this.isShowPopup = true;
      }
      else {
        this.error = this.kpi.errorMessages;
        this.loading = false;
        this.isShowPopup = true;
      }
    },
    error => {
      console.log(error);
    }
  )
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }
  dateValidate() {
    if (this.trackerData.startDate >= this.trackerData.endDate) {
      this.dateError = 'Please select a valid end date';
    }
    else{
      this.dateError = "";  
    }
    if (this.trackerData.startDate >= this.trackerData.dueDate) {
      this.dateError1 = 'Please select a valid due date';
    }
    else{
      this.dateError1 = "";  
    }
  
  }

}
