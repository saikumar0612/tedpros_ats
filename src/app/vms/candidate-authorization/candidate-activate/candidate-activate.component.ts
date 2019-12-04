import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Http } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
// import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';

@Component({
  selector: 'app-candidate-activate',
  templateUrl: './candidate-activate.component.html',
  styleUrls: ['./candidate-activate.component.css']
})
export class CandidateActivateComponent implements OnInit {
  user: any = {};
  token:any;
  userFlag;
  loading = false;
  error;
  url;
  file1_input;
  themeForm;
  logoUrl;
  currentUser;
  themeData: {
    siteLogo: '',
  };
  mailData:any = {
    email:''
  }
  data;
  isSuccess = false;
  isFailure = false;
  sendMailpopup1 = false;
  sendMailpopup = false;
  res:any;
  candidateUser;
  sendData;
  passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}';
  constructor( private route: ActivatedRoute,private router: Router,private authenticationService: AuthenticationService,
    ) { }

  ngOnInit() {
    
    this.route.params.subscribe(res => {
      this.token = res.token;
      console.log(this.token);
    });
    this.authenticationService.getTheme()
    .subscribe(response => {
      const result = JSON.parse(localStorage.getItem('settings'));
      this.logoUrl = this.authenticationService.getBaseUrl()+'/frontend/logos/'+result.data.siteLogo;
      this.themeData = this.logoUrl;
      this.file1_input = this.themeData;
    });

    this.authenticationService.createCandidate(this.token).subscribe(res => {
      this.data = res.json();
      console.log(this.data);
          if(this.data.statusCode.code === '403'){
            this.isFailure = true; 
          }else{
            this.user.username = this.data.data.email;
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  userLogin() {
    this.authenticationService.candidateactivationlogin(this.user.username, this.user.password)
      .pipe(first())
      .subscribe(data => {
           console.log(data);
           if(data.statusCode.code === '200'){
            this.router.navigate(['/vms/candidate-login-register']);
          }
          else if(data.statusCode.code === '403'){
            this.isSuccess = true;
          }
          else if(data.statusCode.code === '422') {
            this.error = data.errorMessages;
          }
          else if(data.statusCode.code === '405') {
            this.error = data.errorMessages;
          }
        },
        error => {
          this.error = error.errorMessages;
          this.loading = false;
        });
  }

  login(){
    this.router.navigate(['/vms/candidate-login-register']);
  }

  closePopup1(){
    this.isFailure = !this.isFailure;
  }
  closeSendMailpopup(){
    this.sendMailpopup = !this.sendMailpopup;
  }

  sendMail(){
    this.mailData.email = this.mailData.email;
    this.authenticationService.resendLink(this.mailData.email).subscribe(res=>{
      console.log(res);
      if(res.statusCode.code === '200'){
        this.isFailure = false;
        this.sendMailpopup = true;
      }else if(res.statusCode.code === '405'){
        this.error =res.errorMessages;
      }else if(res.statusCode.code === '404'){
        this.error = res.errorMessages;
      }
      
    })
  };
 
}
