import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-job-categories',
  templateUrl: './add-job-categories.component.html',
  styleUrls: ['./add-job-categories.component.css']
})
export class AddJobCategoriesComponent implements OnInit {

  catData: any = {
    jobName: ''
  };
  data;
  isSuccess = false;
  isFailure = false;
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken: string = this.currentUser.token;
  constructor(private http: Http, private router: Router, public service: UserService, public blocation: Location) {
  }
//  saikumar 24/08/019 started here -->
  addCat(addJobFrm:NgForm) {
  
    this.service.addJobCategories(this.catData)
      .subscribe(response => {
        this.data = response.json();
       
        if (this.data.statusCode.code === '200') {
          addJobFrm.resetForm();
          //  saikumar 24/08/019 ended here -->
          this.isSuccess = true;
        } else {
          console.log(this.data.errorMessages);
          this.isFailure = true;
        }
      },
        error => {
          console.log(error);
        }
      );
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
  ngOnInit() {
    //console.log(this.currentUser);
  }

}
