import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Http } from '@angular/http';

import { AuthenticationService } from '../../../core/services';

@Component({
  selector: 'app-candidateresetpass',
  templateUrl: './candidateresetpass.component.html',
  styleUrls: ['./candidateresetpass.component.css']
})
export class CandidateresetpassComponent implements OnInit {

  user: any = {
    id: '',
    password: ''
  };
  userFlag;
  loading = false;
  error;
  msg = '';
  url;
  file1_input;
  themeForm;
  logoUrl;
  currentUser;
  themeData: {
    siteLogo: '',
  };
  token:any;
  data;
  isFailure = false;
  isSuccess = false;
  changeData:any = {}
  candidateId:any;
  emailId;
  sendData:any = {
    email:''
  };
  response;
  canId:any;
  result;
  message;
  res;
  error_msg;
  passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}';
  constructor(  private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) { }

 
    ngOnInit() {
      this.route.params.subscribe(res => {
        this.token = res.token;
      });

      const result = JSON.parse(localStorage.getItem('settings'));
      this.file1_input = this.authenticationService.getBaseUrl()+'/frontend/logos/'+ result.data.siteLogo;
  
      this.authenticationService.createCandidate(this.token).subscribe(res => {
        this.response = res.json(); 
          if(this.response.statusCode.code === '200'){
            this.candidateId= this.response.data.id;
            this.canId =  this.candidateId;
          }else if(this.response.statusCode.code === '403'){          
            this.isFailure = true; 
          }
        },error => {
          this.error = error;
          this.loading = false;
        });
       
    }
  
    changePassword() {
      this.changeData.id= this.canId;
      this.changeData.password = this.user.password;
      // console.log(this.changeData);
      this.authenticationService.candidateResetPassword(this.changeData).subscribe(res=>{
        this.result = res.json();
        if(this.result.statusCode.code === '200'){
          this.isSuccess =true;
          this.message = this.result.data;
        }else{
          this.msg = this.result.errorMessages;
          this.isSuccess = false;
        }
      });
       
    };

    sendMail(){
      this.emailId = this.sendData.emailId;
      console.log(this.emailId);
      this.authenticationService.candidateForgetPassword(this.emailId)
        .subscribe(
          data => {
            console.log(data);
            if (data.statusCode.code === '200') {
              this.msg = data.data;
              this.error_msg = null;
            } else if (data.statusCode.code === '403' || data.statusCode.code === '204') {
              this.error_msg = data.errorMessages;
              this.msg = null;
            }
          },
          error => {
            this.error = error;
          });

        }
  
}
