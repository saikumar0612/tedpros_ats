import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../core/services';
import { SuperService } from '../../core/services/super.service';
import { SupervalidateService } from '../../core/services/supervalidate.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-upgradation',
  templateUrl: './upgradation.component.html',
  styleUrls: ['./upgradation.component.css']
})
export class UpgradationComponent implements OnInit {
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
  message; message2; message3; message4; message5;
  count = 0;
  superadmin: any;
  custData: any;
  custplans: any;
  custInvoice: any;
  custInvoicePaid: any;
  constructor( 
    private route: ActivatedRoute,private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http, private superService: SuperService, private superValidate: SupervalidateService ) { }

  ngOnInit() {

    this.loading = true;
    this.currentUser = JSON.parse(localStorage.getItem('superUserEmail'));
    this.authenticationService.getTheme()
      .subscribe(response => {
        const result = JSON.parse(localStorage.getItem('settings'));
        this.logoUrl = this.authenticationService.getBaseUrl()+'/frontend/logos/' + result.data.siteLogo;
        this.themeData = this.logoUrl;
        console.log(this.currentUser);
        this.file1_input = this.themeData;
      });

      
    combineLatest([
      this.superValidate.getcustData(this.currentUser),
      this.superValidate.getcustplans(this.currentUser),
      this.superValidate.getcustInvoice(this.currentUser),
      this.superValidate.getcustInvoicePaid(this.currentUser)
      // this.superValidate.getUsersList(this.user.id)
    ]).subscribe(response => {
      this.custData = response[0].json();
      this.custplans = response[1].json();
      this.custInvoice = response[2].json();
      this.custInvoicePaid = response[3].json();
      // this.reportingTo = response[3].json();

      this.superService.postencdata('Customer', this.custData.customer)
        .subscribe(response => {

          console.log(response);

          if (response.statusCode.code === '200') {
            this.message = 'Customer data added .';
            // this.count++;
            console.log(this.message);

            this.superService.postencdata('Customerplan', this.custplans.customerplan)
              .subscribe(response => {
                console.log(response);
                if (response.statusCode.code == '200') {
                  this.message2 = ' Customerplan  data added .';
                  // this.count++;
                  console.log(this.message2);
                  this.superService.postencdata('CustomerPendingInvoice', this.custInvoice.customerinvoice)
                    .subscribe(response => {
                      console.log(response);
                      if (response.statusCode.code == '200') {
                        this.message3 = ' Customer Pending Invoice  data added .';
                        console.log(this.message3);
                        this.superService.postencdata('CustomerPaidInvoice', this.custInvoicePaid.customerinvoice)
                          .subscribe(response => {
                            console.log(response);
                            if (response.statusCode.code == '200') {
                              this.message4 = ' Customer Paid Invoice  data added .';
                              console.log(this.message4);


                              this.superService.getCompanyInfo()
                                .subscribe(response => {
                                  console.log(response);
                                  if (response.statusCode.code == '200') {
                                    this.message5 = ' Company Information added .';
                                    console.log(this.message5);
                                    this.router.navigate(['/authorization/login']);
                                  }
                                  else {
                                    this.message5 = 'Failed to add  Company Information .';
                                  }

                                });




                            }
                            else {
                              this.message4 = ' Failed to add Customer Paid Invoice  data .';
                              // console.log(this.message);
                            }
                          });

                      }
                      else {
                        this.message3 = ' Failed to add Customer Pending Invoice  data .';

                      }
                    });

                }
                else {
                  this.message2 = ' Failed to add Customerplan  data .';
                  // console.log(this.message);
                }
              });




          }
          else {
            this.message = 'Failed to add Customer data';
            console.log(this.message);
          }
        });

      this.loading = false;
    });

  }

}
