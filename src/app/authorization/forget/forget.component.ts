import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Http } from '@angular/http';

import { AuthenticationService } from '../../core/services';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) {

  }

  ngOnInit() {
    const result = JSON.parse(localStorage.getItem('settings'));
    this.themeData = result.data;
    this.file1_input = this.authenticationService.getBaseUrl()+ '/frontend/logos/' +this.themeData.siteLogo;
  }

  forgetpass() {
    this.loading = true;
    this.authenticationService.forget(this.emailId)
      .pipe(first())
      .subscribe(
        data => {
          if (data.statusCode.code === '200') {
            this.msg = data.data;
            this.error_msg = null;
          } else if (data.statusCode.code === '403' || data.statusCode.code === '204') {
            this.error_msg = data.errorMessages;
            this.msg = null;
          }
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

}
