import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-termination',
  templateUrl: './add-termination.component.html',
  styleUrls: ['./add-termination.component.css']
})
export class AddTerminationComponent implements OnInit {
  reason:any;
  addingData:any = { name:'',description:''};
  headers:any;
  options:any;
  isSuccess = false;
  isFailure = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private http:Http, private router:Router, private blocation:Location, private service:UserService) { 
  }

  ngOnInit() {
  }

  cancel() {
    // this.router.navigate(['terminating-resons']);
    this.blocation.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  addReason(addReasonFrm:NgForm){
    // this.http.post('http://service.tedpros.com/termination/addTermination',this.addingData,this.options)
    this.service.addTerminationReson(this.addingData)
    .subscribe(response=>{
      this.reason=response.json();
      // console.log(this.reason);
      // if(this.reason.statusCode.code === '200'){
      //   this.router.navigate(['terminating-resons']);
      // }
      if (this.reason.statusCode.code === '200') {
        this.isSuccess = true;
        addReasonFrm.resetForm();
      } else {
        this.isFailure = true;
      }
    }
    );
    }
  }


