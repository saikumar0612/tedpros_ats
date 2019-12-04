import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../../../core/services';
import {Location} from '@angular/common';

@Component({
  selector: 'app-company-prefix',
  templateUrl: './company-prefix.component.html',
  styleUrls: ['./company-prefix.component.css']
})
export class CompanyPrefixComponent implements OnInit {
  loading;
  isShowPopup;
  prefix;
  prefixInfo: any = {};
  headers: any;
  options: any;
  compnayInfo ={
    compay_name:''
  };
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private http: Http, private router: Router, public auth: AuthenticationService,
     public service: UserService,public location:Location) {
  }
  result:any={};
  error = '';
  message = '';
  popup = false;
  errorStatus ;
  prefixesData:any={
    vendorEmployee:{
      prefix:'',
      startingnum:''
      },
    invoicePrefix:{
      prefix:'',
      startingnum:''
    },
    clientEmployee:{
      prefix:'',
      startingnum:''
    },
    vendorPrefix:{
      prefix:'',
      startingnum:''
    },
    companyPrefix:{
      prefix:'',
      startingnum:''
    },
    userPrefix:{
      prefix:'',
      startingnum:''
    }
  }

  ngOnInit() {
    this.service.viewCompnayInfo() 
    .subscribe(res => {
      this.compnayInfo = res.json().data;
    });

    this.service.companySettings()
    .subscribe(response => {
      const resp = response.json();
      this.prefixInfo = resp.data;
    });
  }
  addPrefix() {
    this.prefixesData={
      vendorEmployee:{
        prefix: this.prefixInfo.vendorPrefixData,
        startingnum: this.prefixInfo.vendorNumber
      },
      invoicePrefix:{
        prefix: this.prefixInfo.inviocePrefix,
        startingnum: this.prefixInfo.invoicenumber
      },
      clientEmployee:{
        prefix: this.prefixInfo.clientPrefix,
        startingnum: this.prefixInfo.clientNumber
      },
      vendorPrefix:{
        prefix: this.prefixInfo.vendorPrefData,
        startingnum: this.prefixInfo.vendorPrefixNumber
      },
      companyPrefix:{
        prefix: this.prefixInfo.companyPrefixData,
        startingnum: this.prefixInfo.companyPrefixNumber
      },
      userPrefix:{
        prefix: this.prefixInfo.userPrefixData,
        startingnum: this.prefixInfo.userPrefixNumber
      }
    }


    this.service. addCompanyPrefix( this.prefixesData)
      .subscribe(response => {
        this.result = response.json();
        if (this.result.statusCode.code === '200') {
          this.error = '';
          this.message = this.result.data;
          this.loading = false;
          this.isShowPopup = true;
          this.prefixInfo.vendorEmployee=null;
          this.prefixInfo.clientEmployee=null;
          this.prefixInfo.userPrefix=null;
          this.prefixInfo.invoicePrefix=null;
          this.prefixInfo.vendorPrefix=null;
          this.prefixInfo.companyPrefix=null;
        }
        else if (this.result.statusCode.code === '401') {
          this.errorStatus= this.result.errorMessages;
          this.loading = false;
          this.isShowPopup = true;
        }
        else {
          this.errorStatus= this.result.errorMessages;
          this.error = this.result.errorMessages;
          this.message = '';
        }
      },
        error => {
          console.log(error);
        });
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

  cancel() {
    // this.router.navigate(['companyPrefix']);
    this.location.back(); 
  }
}
