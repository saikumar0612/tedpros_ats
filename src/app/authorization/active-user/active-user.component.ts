import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Http } from '@angular/http';

import { AuthenticationService } from '../../core/services';
import {SuperService } from '../../core/services/super.service';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})


export class ActiveUserComponent implements OnInit {
  user: any = {};
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
  passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http,private superService:SuperService) {
  }

  ngOnInit() {
    // this.http.get("http://service.tedpros.com/config/getTheme")
    this.authenticationService.getTheme()
      .subscribe(response => {
        const result = JSON.parse(localStorage.getItem('settings'));
        this.logoUrl = this.authenticationService.getBaseUrl()+'/frontend/logos/' + result.data.siteLogo;
        this.themeData = this.logoUrl;
        // console.log(this.themeData.siteLogo);
        this.file1_input = this.themeData;
      });
  }

  userLogin() {
    this.loading = true;
    this.superService.createUser(this.user.id, this.user.password)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
           console.log(data);
            if(data.statusCode.code=='200')
                {
                  this.router.navigate(['/authorization/login']);
                }
        },
        error => {
          this.error = error;
          this.loading = false;
          console.log(this.error.error);
        });
  }

}
