import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
 
@Component({
  selector: 'app-edit-employment-status',
  templateUrl: './edit-employment-status.component.html',
  styleUrls: ['./edit-employment-status.component.css']
})
export class EditEmploymentStatusComponent implements OnInit {

  statusId;
  status;
  data;
  isSuccess = false;
  isFailure = false;
  statusInfo:any = {id:'',name:''};
  statusData:any = {};
  headers:any;
  options:any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public service:UserService, private blocation: Location) {
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

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.statusInfo.id = param.get('id');
      
      }
    );
   
    this.service.editEmpStatusID(this.statusInfo.id)
    .subscribe(response =>{
      this.status= response.json().data;
      this.statusInfo =this.status;
    
    },
    error => {
      console.log(error);
    }
  )
  }

  editStatus(){
    this.statusData.id = this.statusInfo.id;
    this.statusData.empStatus = this.statusInfo.name;
  
    this.service.editEmpStatus(this.statusData)
    .subscribe(response =>{
      this.status = response.json();
     
      if(this.status.statusCode.code == "200"){
        this.isSuccess = true;
      }
      else{
       
        this.isFailure = true;
      }
    },
    error => {
      console.log(error);
    }
  )
  }

}
