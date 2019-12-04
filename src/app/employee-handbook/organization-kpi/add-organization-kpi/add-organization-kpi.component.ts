import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm }   from '@angular/forms';
import { Router } from "@angular/router";
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-add-organization-kpi',
  templateUrl: './add-organization-kpi.component.html',
  styleUrls: ['./add-organization-kpi.component.css']
})
export class AddOrganizationKpiComponent implements OnInit {
  log;
  logger:any={};
  kpiData:any={};
  rateerror;
  isSuccess;
  isFailure;
  error;
  data;
  headers:any;
  options:any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private http: Http, private router: Router, public service:UserService, private blocation:Location,private eventEmitterService: EventEmitterService) {
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Add Organizational KPI';
    this.logger.comment='Add Organizational KPI';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      // this.timerComponent.getusersactivity();
      // firstComponentFunction(){    
        this.eventEmitterService.onRecentActivityRefresh();    
      // }  
    }); }

  ngOnInit() {
    this.kpiData.minRating = "1";
    // this.kpiData.maxRating = "2";
    this.kpiData.type = "2";
  }

  cancel() {
    this.blocation.back(); 
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close(addJobFrm: NgForm) {
    this.isSuccess = !this.isSuccess;
    this.kpiData = {};
    addJobFrm.resetForm();
  }

  addKpi(addJobFrm:NgForm){
    if(this.rateerror){
      this.error = "Enter valid data before submitting"
    }
    else{
      // console.log(this.kpiData);
      this.service.addPerformanceIndicator(this.kpiData)
      .subscribe(response =>{
        this.data = response.json();
        if(this.data.statusCode.code == "200"){
          this.isSuccess = true;
          addJobFrm.resetForm();
        }
        else{
          console.log(this.data.errorMessages);
          this.isFailure = true;
        }
      });
    }
  }
  checkrating(){
    if( (Number(this.kpiData.minRating == "0")) || (Number(this.kpiData.maxRating == "0")) ){
      this.rateerror = "Min and Max rating cannot be 0";
    }
    if((Number(this.kpiData.minRating)) > (Number(this.kpiData.maxRating))){
      this.rateerror="Max rating should be greater than Min rating";
    }
    else if((Number(this.kpiData.minRating)) == (Number(this.kpiData.maxRating))){
      this.rateerror="Max rating should be greater than Min rating";
    }
    else{
      this.rateerror="";
    }
  }

}
