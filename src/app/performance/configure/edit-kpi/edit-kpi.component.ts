import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { Router } from "@angular/router";
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-edit-kpi',
  templateUrl: './edit-kpi.component.html',
  styleUrls: ['./edit-kpi.component.css']
})
export class EditKpiComponent implements OnInit {
  log
  logger:any={};
  rateerror;
  errormessage;
  message;
  loading;
  jobTitle;
  kpiDetails;
  departments;
  titles;
  categoryTitles;
  dropdownSettings = {};
  jobTitlesDropdownSettings = {};
  kpiData:any={
    department:{},
    jobTitle:{},
  };
  kpiId;
  kpi;
  departmentId;
  jobTitles;
  selectedJobTitles = [];
  selectedTitles = [];
  catTitles;
  deSelectList;
  error;
  isShowPopup = false;
  isSuccess = false;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  kpiPattern;
  
  // url:any = 'http://localhost/tedpros_services/';
  constructor(public http: Http, private route: ActivatedRoute, private router: Router, public service:UserService, private blocation:Location,private eventEmitterService: EventEmitterService, private pattern:PatternsService) {
   this.kpiPattern = this.pattern.kpiIndicatorPattern;
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Edit kpi';
    this.logger.comment='Edit kpi';
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
    this.kpiData.type = "departmental";
    this.loading = true;
    this.route.params.subscribe(res=>{
      this.kpiId = res.id;
    })
    this.loading = true;
    // console.log(this.url+'performance/performanceIndicatorById?id='+this.kpiId);
    // this.http.get(this.url+'performance/performanceIndicatorById?id='+this.kpiId, this.options)
    this.service.getPerformanceIndicatorById(this.kpiId)
    .subscribe(response => {
      this.kpiData = response.json().data;
      // console.log(this.kpiData)
      this.loading = false;

      let jobcategories = [];
      jobcategories = this.kpiData.department;
      jobcategories.forEach(cat =>{
        this.service.getJobTitleById(cat.id)
        .subscribe(response=>{
          this.selectedJobTitles = response.json().data;
          this.loading = false;
        })
      })
      

      let userTitles = [];
      userTitles = this.kpiData.jobTitle;
      userTitles.forEach(title => {
        let ary = { id: '', jobTitle: '' };
        ary.id = title.id;
        ary.jobTitle = title.jobTitle;
        this.selectedTitles.push(ary);
      });
      this.selectedJobTitles = this.selectedTitles;
      this.selectedJobTitles =  [...this.selectedJobTitles];
    });

    // get department list
    this.service.getJobCategories()
    .subscribe(response => {
      this.departments = response.json().data;
      this.loading = false;   
    },
    error => {
      console.log(error);
    });

    // get job titles
    this.service.getJobTitles()
    .subscribe(response => {
      this.titles = response.json().data;

    },
    error => {
      console.log(error);
    });


    // get job titles of categories
    this.service.getJobCategoryTitle()
    .subscribe(response=>{
      this.categoryTitles = response.json().data;
      this.loading = false;
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      "closeDropDownOnSelection": true
    };

  }

  ngDoCheck(){
    this.jobTitlesDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'jobTitle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      "closeDropDownOnSelection": true
    }
  }

  onItemSelect(item: any) {
    this.catTitles = this.categoryTitles.filter(x=>{
      return x.id == item.id
    })[0];
    this.catTitles.jobTitle.forEach(obj=>{
      this.selectedJobTitles.push(obj);
      this.selectedJobTitles =  [...this.selectedJobTitles];
    })
  }

  // code change for department deselection - sharmistha - 08-26-2019 - start

  OnItemDeSelect(item: any){
    this.deSelectList = this.categoryTitles.filter(x=>{
      return x.id == item.id
    })[0];
    
    this.deSelectList.jobTitle.forEach((removeObj) => {
      this.selectedJobTitles.forEach((jobTitle, index)=>{
        if(removeObj.id == jobTitle.id){
          this.selectedJobTitles.splice(index, 1);
          this.selectedJobTitles =  [...this.selectedJobTitles];
        }
      })
      this.kpiData.jobTitle.forEach((ele, index)=>{
        if(removeObj.id === ele.id){
          this.kpiData.jobTitle.splice(index, 1);
          this.kpiData.jobTitle =  [...this.kpiData.jobTitle];
          this.selectedJobTitles =  [...this.selectedJobTitles];
        }
      })
    })
  }

  // code change for department deselection - sharmistha - 08-26-2019 - end

  onDeSelectAll(item: any){
    this.selectedJobTitles = [];
    this.kpiData.jobTitle=[];
    this.selectedJobTitles =  [...this.selectedJobTitles];
  }
  

  onSelectAll(item: any){
    this.selectedJobTitles = [];
    this.categoryTitles.forEach(selCat=>{
      if(selCat.jobTitle){
        selCat.jobTitle.forEach(cItem =>{
          this.selectedJobTitles.push(cItem);
          this.selectedJobTitles =  [...this.selectedJobTitles];
        })
      }
    })
  }

  editKpi(){
    if(this.rateerror){
      this.error = "Enter valid data before submitting"
    }
    else{
    this.kpiData.type = "1";
    this.service.editPerformanceIndicatorId(this.kpiId, this.kpiData)
    .subscribe(response =>{
      this.kpiDetails = response.json();
      if(this.kpiDetails.statusCode.code == "200"){
        // this.router.navigate(['kpis']);
        this.isShowPopup = true;
        this.message="KPI updated successfully";
        
      }
      else{
        //console.log(this.kpiDetails.errorMessages);
        this.isShowPopup = true;
        this.message="";
        console.log(this.kpiDetails.errorMessages);
        this.errormessage=this.kpiDetails.errorMessages

       
      }
    },
    error => {
      console.log(error);
    })
  }
  }
  // cancel(){
  //   this.router.navigate(['kpis']);
  // }
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
