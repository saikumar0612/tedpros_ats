import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-employee-type',
  templateUrl: './add-employee-type.component.html',
  styleUrls: ['./add-employee-type.component.css']
})
export class AddEmployeeTypeComponent implements OnInit {
  data;
  typeData = {
    name: '',
  };
  isSuccess = false;
  isFailure = false;
 
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private http: Http, private router: Router, public service: UserService, public blocation: Location) {
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
  addType(addJobFrm:NgForm) {
    this.service.addEmployeeType(this.typeData)
      .subscribe(response => {
        this.data = response.json();
        if (this.data.statusCode.code === '200') {
          addJobFrm.resetForm();
          this.isSuccess = true;
        } else {
          console.log(this.data.errorMessages);
          this.isFailure = true;
        }
      },
        error => {
          console.log(error);
        });
  }
  ngOnInit() {
  }

}

