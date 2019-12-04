import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services';
import { PatternsService } from '../../../core/services/patterns.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-job-titles',
  templateUrl: './add-job-titles.component.html',
  styleUrls: ['./add-job-titles.component.css']
})
export class AddJobTitlesComponent implements OnInit {
   jobData: any = {};
  data;
  departments;
  loading;
  isSuccess = false;
  isFailure = false;
  headers: any;
  options: any;
  Jobtitlepattern;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private http: Http, private router: Router, public service: UserService, private blocation: Location, public pattern: PatternsService) {
    this.Jobtitlepattern = this.pattern.jobTitlePattern;
  }
  

  addJob(addJobFrm: NgForm) {
    this.service.addJobTitle(this.jobData)
      .subscribe(response => {
        this.data = response.json();
        if (this.data.statusCode.code == "200") {
          addJobFrm.resetForm();
          this.isSuccess = true;
        }
        else {
          console.log(this.data.errorMessages);
          this.isFailure = true;
        }
      },
        error => {
          console.log(error);
        }
      )
  }

  ngOnInit() {
    this.loading=true;
    this.service.getJobCategories()
      .subscribe(response => {
        this.departments = response.json().data;
        this.loading = false;
        
      },
        error => {
          console.log(error);
        });
    this.loading=false;

  }

  cancel() {
    this.blocation.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

}
