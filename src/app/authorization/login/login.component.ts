import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Http } from '@angular/http';
import { SuperService } from '../../core/services/super.service';
import { AuthenticationService } from '../../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  userFlag;
  loading = false;
  error;
  url;
  file1_input;
  themeForm;
  logoUrl;
  isNew;
  currentUser;
  themeData: {
    siteLogo: '',
  };
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private superService: SuperService) {
  }

  ngOnInit() {
    // this.http.get("http://service.tedpros.com/config/getTheme")
    this.authenticationService.getTheme()
      .subscribe(response => {
        const result = JSON.parse(localStorage.getItem('settings'));
        this.logoUrl = this.authenticationService.getBaseUrl() +'/frontend/logos/' + result.data.siteLogo;
        this.themeData = this.logoUrl;
        console.log(this.themeData);
        this.file1_input = this.themeData;
      });
    this.superService.ckeckInstallation().subscribe(response => {
      if (response.statusCode.code !== '200') {
        this.router.navigate(['/authorization/activate']);
      }
    });
  }

  userLogin() {
    this.loading = true;
    this.authenticationService.login(this.user.id, this.user.password)
      .pipe(first())
      .subscribe(
        data => {
          //  console.log(data);
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          if (this.currentUser.userType.name === 'employee') {
            // this.userFlag = this.currentUser.flag;
            // if (this.userFlag == null) {
            //   this.router.navigate(['myInfo']);
            // } else {
            //   this.router.navigate(['dashboard']);
            // }
            this.isNew = this.currentUser.isNew;
            // console.log(this.isNew)
            this.userFlag = this.currentUser.flag;
            if (this.isNew === '1') {
              this.router.navigate(['/usersView/user-offerletter']);
            } else {
              if (!this.userFlag) {
                this.router.navigate(['myInfo']);
              } else {
                this.router.navigate(['dashboard']);
              }
            }
          } else {
            this.router.navigate(['/timesheets/project-sheets']);
          }

        },
        error => {
          this.error = error;
          this.loading = false;
          console.log(this.error.error);
        });
  }

}
