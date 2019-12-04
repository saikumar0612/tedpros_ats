import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { Router } from "@angular/router";
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-edit-organization-kpi',
  templateUrl: './edit-organization-kpi.component.html',
  styleUrls: ['./edit-organization-kpi.component.css']
})
export class EditOrganizationKpiComponent implements OnInit {
  log
  logger:any={};
  rateerror;
  errormessage;
  message;
  loading;
  kpiDetails;
  kpiData:any={
    department:{},
    jobTitle:{},
  };
  kpiId;
  kpi;
  error;
  isShowPopup = false;
  isSuccess = false;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  
  // url:any = 'http://localhost/tedpros_services/';
  constructor(public http: Http, private route: ActivatedRoute, private router: Router, public service:UserService, private blocation:Location,private eventEmitterService: EventEmitterService) {
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Edit Organizational KPI';
    this.logger.comment='Edit Organizational KPI';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      // this.timerComponent.getusersactivity();
      // firstComponentFunction(){    
        this.eventEmitterService.onRecentActivityRefresh();    
      // }  
    });
  }

  ngOnInit() {
    this.kpiData.type = "2";
    this.loading = true;
    this.route.params.subscribe(res=>{
      this.kpiId = res.id;
    })

    this.loading = true;
    this.service.getOrganizationalKpiById(this.kpiId)
    .subscribe(response => {
      this.kpiData = response.json().data;
      // console.log(this.kpiData);
      this.loading = false;
    })

  }

  editKpi(){
    if(this.rateerror){
      this.error = "Enter valid data before submitting"
    }
    else{      
    this.kpiData.type = "2";
    this.service.editOrganizationalKpi(this.kpiId, this.kpiData)
    .subscribe(response =>{
      this.kpiDetails = response.json();
      if(this.kpiDetails.statusCode.code == "200"){
        this.isShowPopup = true;
        this.message="KPI Updated Successfully ";        
      }
      else{
        this.isShowPopup = true;
        this.message="";
        this.errormessage=this.kpiDetails.errorMessages;       
      }
    })
  }
  }
  cancel() {
    this.blocation.back(); 
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }
  close() {
    this.isShowPopup = !this.isShowPopup;
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

