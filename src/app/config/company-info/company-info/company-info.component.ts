import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { combineLatest } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {
  loading = false;
  popup = false;
  compnayInfo: any = {
    registered_address: {
      city: { id: '', name: null },
      state: { id: '', name: null },
      country: { id: '', name: null }
    }
  }; 
  invoiceList: any;
  countriesMaster: any;
  satesMaster: any;
  citysMaster: any;
  message = '';
  error = '';
  zipError = '';
  superurl: any;
  keypopup;
  mailData: any = {
    email: '',
    adminEmail: ''
  };
  keyData: any = {
    email: '',
    adminEmail: '',
    accessToken: ''
  };
  data;
  personalData;
  popup1 = false;
  errormsg;
  success;
  submitData: any = {
    key: ''
  };
  keyupgrade;
  superurl1;
  // currentUser={
  //   isAdmin: false
  // };
  currentUser ={
    token:'',
    email:'',
    id: '',
    flag: '',
    empType: {
        id:'',
        employeeType: ''
    },
    userType: {
        id: '',
        name: '',
        typeName: ''
    },
    first_name: '',
    last_name: '',
    middle_name: '',
    isAdmin: false,
    Adminrole: false,
    permission: {},
    submenuPermission: { },
    fieldPermission: {}
  };
  adminUser:boolean=false;
  increaseToken: any;
  increaseEmail: string;

  constructor(private http: Http, public service: UserService, public authservice: AuthenticationService, public route: Router) {
 
  }
 
  closePopup() {
    this.popup = !this.popup;
    this.success = null;
    this.keyupgrade = null;
    this.errormsg = null;
  }
  closePopup1() {
    this.popup1 = !this.popup1;
    this.success = null;
    this.keyupgrade = null;
    this.errormsg = null;
  }
  ngOnInit() {
    this.loading = true;
    this.superurl = environment.superUrl + '/printpdf';
    this.superurl1 = environment.superUrl + '/printpaidpdf';
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.adminUser = this.currentUser.isAdmin;
    this.service.viewCompnayInfo()
      .subscribe(res => {
        this.compnayInfo = res.json().data;
        this.invoiceList = this.compnayInfo.invoice;
        this.mailData.email = this.compnayInfo.email;
        this.keyData.email = this.compnayInfo.email;
      });

    this.service.getPersonalInfo().subscribe(res => {
      this.personalData = res.json().data;
      this.mailData.adminEmail = this.personalData.email;
      this.keyData.adminEmail = this.personalData.email;

    });
    this.loading = false;
  }


  sendMail() {
    console.log(this.mailData);
    this.service.increasePlan(this.mailData).subscribe(res => {
      this.data = res.json();
      console.log(this.data);
      if (this.data['success']) {
        this.popup1 = true;
        this.success = 'Your request as successfully send please check your mail for the further process';
        this.errormsg = null;
        this.keyupgrade = null;
      } else {
        this.popup1 = true;
        this.success = null;
        this.keyupgrade = null;
        this.errormsg = this.data['error']['msg'];
      }
    }, error => {
      if (error['error']) {
        this.errormsg = error['error']['msg'];
        this.popup1 = true;
        this.success = null;
        this.keyupgrade = null;
      } else {
        this.errormsg = 'Your request cannot be  please try again';
        this.popup1 = true;
        this.success = null;
        this.keyupgrade = null;
      }
    });
  }
  submitKey(keyFrm: NgForm) {
    this.keyData.accessToken = this.submitData.key;
    // console.log(this.keyData);
    // checkAccessToken()
    this.service.checkAccessToken(this.keyData).subscribe(res => {
      // console.log(res);
      this.closeKeyPopup();
      this.popup1 = true;
      this.keyupgrade = 'Are you want to upgrade your application ?';
    },
      error => {
        this.closeKeyPopup();
        this.popup1 = true;
        this.errormsg = 'Invaid Access Key or Invalid information';
      }
    );


  }
  upgrade() {
    // this.authservice.logout();
    localStorage.removeItem('settings');
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', '');
    localStorage.clear();
    this.route.navigate(['/authorization/upgrade']);

  }
  enterKey() {
    this.keypopup = true;
    this.success = null;
    this.keyupgrade = null;
    this.errormsg = null;
  }
  closeKeyPopup() {
    this.keypopup = !this.keypopup;
    this.success = null;
    this.keyupgrade = null;
    this.errormsg = null;
  }



}
