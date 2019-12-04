import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Http } from '@angular/http';

import { AuthenticationService } from '../../core/services';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-restpass',
  templateUrl: './restpass.component.html',
  styleUrls: ['./restpass.component.css']
})
export class RestpassComponent implements OnInit {


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

  passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) {

  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.user.id = res.id;
      console.log(this.user);
    });
    const result = JSON.parse(localStorage.getItem('settings'));
    this.file1_input = this.authenticationService.getBaseUrl() +'/frontend/logos/' + result.data.siteLogo;



  }

  changePassword() {

    this.route.params.subscribe(res => {
      this.user.id = res.id;
      console.log(this.user);
    });
    this.loading = true;
    this.authenticationService.reset(this.user.id, this.user.password)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (data.statusCode.code === '200') {
            this.msg = data.data;
            this.router.navigate(['authorization/login']);
          } else {
            this.msg = data.errorMessages;
          }
          this.loading = false;
        },
        error => {
          this.error = error;
          this.msg = this.error.error;
          this.loading = false;
          console.log(this.error.error);
        });
  }


}
