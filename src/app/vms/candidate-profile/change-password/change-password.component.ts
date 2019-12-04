import { Component, OnInit } from '@angular/core';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changesData:any ={
    password:'',
    cpassword:'',
    oldPassword:'',
    id:''
  };
  candidateUser:any;
  candidateId;
  response;
  changePasswordPopup;
  error;
  constructor(private service:VmsCandidateService, private router:Router) { }

  ngOnInit() {
    this.changesData.oldPassword = 'Pass12!@';
    this.candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
    this.candidateId = this.candidateUser.data.id;
  }

  changePassword(passwordForm:NgForm){
    this.changesData.id= this.candidateId ;
    // console.log(this.changesData)
    this.service.changeCandidatePassword(this.changesData).subscribe(res=>{
      this.response = res.json();
      console.log(this.response)
      if(this.response.statusCode.code === '200'){
        passwordForm.resetForm();
        this.changePasswordPopup = true;
        // this.router.navigate(['/vms/candidate-login-register']);
      }
      else if(this.response.statusCode.code === '409'){
        this.error = this.response.errorMessages;
      }
    });
  }
  closechangePasswordPopup(){
    this.router.navigate(['/profile/edit-profile']);
  }

}
