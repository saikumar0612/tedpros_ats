import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { AuthenticationService } from '../../core/services';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.css']
})
export class VerifyTokenComponent implements OnInit {
  loading = false;
  token = '';
  currentUser: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) {

    const result = JSON.parse(localStorage.getItem('settings'));
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(res => {
      this.token = res.id;
      console.log(this.token);
    });
    if (localStorage.getItem('currentUser') !== null) {
      this.currentUser = localStorage.getItem('currentUser');
      if (this.currentUser.token !== null) {
        this.authenticationService.getTimesheetDetails(this.token)
          .subscribe(response => {
            const timesheetData = response.json();
            const timesheetId = timesheetData.data.timesheetId;
            console.log(timesheetData.data.timesheetId);
            localStorage.setItem('timesheetId', timesheetId);
            if (this.currentUser.userType.name === 'employee') {
              this.router.navigate(['/timesheets/view-emp-timesheets/', timesheetId]);
            } else {
              this.router.navigate(['/timesheets/project-timesheets/', timesheetId]);
            }

          });
      } else {
        this.getUserToken();
      }
    } else {
      this.getUserToken();
    }
    this.loading = false;

  }
  getUserToken() {
    this.authenticationService.validateToken(this.token)
      .subscribe(response => {
        console.log(response.json());
        const userInfo = response.json();
        if (userInfo.statusCode.code) {
          localStorage.setItem('currentUser', JSON.stringify(userInfo.data));
          localStorage.setItem('timesheetId', JSON.stringify(userInfo.data.timesheetId));
        }
        const result = JSON.parse(localStorage.getItem('currentUser'));
        const timesheetId = JSON.parse(localStorage.getItem('timesheetId'));
        this.router.navigate(['/timesheets/project-timesheets/', timesheetId]);
      });

  }

}
