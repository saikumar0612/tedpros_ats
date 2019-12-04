// import { Component, OnInit } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../core/services';
import { SuperService } from '../../core/services/super.service';
// import { SupervalidateService } from '../core/services/supervalidate.service';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  loading = false;
  user: any = {};
  userFlag;

  error;
  url;
  file1_input;
  themeForm;
  logoUrl;
  currentUser;
  themeData: {
    siteLogo: '',
  };
  superadmin: any;
  emailIdPattern = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z.]{2,4}$)';

  custData: any;
  custplans: any;
  custInvoice: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http, private superService: SuperService) { }

  ngOnInit() {
    this.authenticationService.getTheme()
      .subscribe(response => {
        const result = JSON.parse(localStorage.getItem('settings'));
        this.logoUrl = this.authenticationService.getBaseUrl()  +'/frontend/logos/' + result.data.siteLogo;
        this.themeData = this.logoUrl;
        // console.log(this.themeData.siteLogo);
        this.file1_input = this.themeData;
      });
    this.superService.ckeckInstallation().subscribe(response => {
      if (response.statusCode.code === '200') {
        this.router.navigate(['login']);
      }

    });
  }
  activation() {
    this.loading = true;
    console.log(this.user.id);
    // this.loading = false;
    this.superService.custActivate(this.user.id)
      .subscribe(response => {
        this.currentUser = JSON.parse(localStorage.getItem('superUser'));
        console.log(this.currentUser);
        if (this.currentUser.token) {
          this.router.navigate(['/authorization/activation']);
        }
        else {
          console.log("Unauthrolized");
        }
      })

  }


}

