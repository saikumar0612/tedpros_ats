import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services';

@Component({
  selector: 'app-candidateforget',
  templateUrl: './candidateforget.component.html',
  styleUrls: ['./candidateforget.component.css']
})
export class CandidateforgetComponent implements OnInit {
  user: any = {}; 
  userFlag;
  loading = false;
  error;
  msg;
  url;
  file1_input;
  themeForm;
  logoUrl;
  currentUser;
  themeData: {
    siteLogo: '',
  };
  emailId = '';
  error_msg;
  constructor(private authenticationService: AuthenticationService) { }

  
    ngOnInit() {
      const result = JSON.parse(localStorage.getItem('settings'));
      this.file1_input = this.authenticationService.getBaseUrl()+'/frontend/logos/'+ result.data.siteLogo;
    }
  
    forgetpass() {
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
 