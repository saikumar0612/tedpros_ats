import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {Router} from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService} from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-employment-status',
  templateUrl: './add-employment-status.component.html',
  styleUrls: ['./add-employment-status.component.css']
})
export class AddEmploymentStatusComponent implements OnInit {
  status;
  statusData={
    empStatus:''
  };
  isSuccess = false;
  isFailure = false;
  headers:any;
  options:any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private http: Http, private router: Router, public service:UserService,private blocation: Location) {
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
   //  saikumar 24/08/019 started here -->
addStatus(addJobFrm:NgForm){
    this.service.addEmpStatus(this.statusData)
    .subscribe(response =>{
      this.status = response.json();
         
      if(this.status.statusCode.code == "200"){
        
        addJobFrm.resetForm();
        this.isSuccess = true;
      }
       //  saikumar 24/08/019 ended here -->
      else{
        this.isFailure = true;
      }
    },
    error => {
      console.log(error);
    }
  )
  }
  ngOnInit() {
  }
}
