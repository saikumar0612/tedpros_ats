import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.css']
})
export class UserReportsComponent implements OnInit {

  userData:any;
  loading = false;

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, public service: UserService, private blocation: Location) { }

  getUserReport(){
    this.loading = true;
    this.service.getUserReports()
      .subscribe(response => {
        this.userData = response.json().data;
        this.loading = false;
        // console.log(this.userData);
      })
  }

  ngOnInit() {
    this.getUserReport();
  }

}
