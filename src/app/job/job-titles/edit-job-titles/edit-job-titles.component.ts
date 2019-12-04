import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { PatternsService } from '../../../core/services/patterns.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-job-titles',
  templateUrl: './edit-job-titles.component.html',
  styleUrls: ['./edit-job-titles.component.css']
})
export class EditJobTitlesComponent implements OnInit {
  jobId;
  data;
  departments;
  loading;
  jobInfo:any = {
    department:{}
  };
  jobData:any = {};
  isSuccess = false;
  isFailure = false;
  headers:any;
  options:any;
  jobTitlePattern;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public service:UserService,  private blocation: Location, public pattern:PatternsService) {
    this.jobTitlePattern = pattern.jobTitlePattern;

    // get department list
    this.service.getJobCategories()
    .subscribe(response => {
      this.departments = response.json().data;
      this.loading = false;
    },
    error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.jobInfo.id = param.get('id');
      }
    );
    this.service.getJobTitle(this.jobInfo.id).subscribe(response =>{
      this.jobInfo = response.json().data;
    },
    error => {
      console.log(error);
    }
  )
  }

  editJob(){
    this.service.editJobTitle(this.jobInfo)
    .subscribe(response =>{
      this.data = response.json();
      if(this.data.statusCode.code == "200"){
        this.isSuccess = true;
      }
      else{
        console.log(this.data.errorMessages);
        this.isFailure = true;
      }
    },
    error => {
      console.log(error);
    }
  )
  }

  cancel(){
    this.blocation.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

}
