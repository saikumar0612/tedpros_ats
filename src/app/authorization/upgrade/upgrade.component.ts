import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../core/services';
import { SuperService } from '../../core/services/super.service';
@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

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
    private http: Http, private superService: SuperService) {
    
    }

   
  ngOnInit() {
    this.loading = true;
    this.authenticationService.getTheme()
    .subscribe(response => {
      const result = JSON.parse(localStorage.getItem('settings'));
      this.logoUrl = this.authenticationService.getBaseUrl()+'/frontend/logos/' + result.data.siteLogo;
      this.themeData = this.logoUrl;
      this.file1_input = this.themeData;
      this.loading = false;
    });

  }

  activation() {
    this.loading = true;
    console.log(this.user.id);
    this.superService.custActivate(this.user.id)
      .subscribe(response => {
        this.currentUser = JSON.parse(localStorage.getItem('superUser'));
        console.log(this.currentUser);
        if (this.currentUser.token) {
          this.router.navigate(['/authorization/upgradation']);
        }
        else {
          console.log("Unauthrolized");
        }
      })
  }

}
