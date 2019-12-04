import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-user-salary-details',
  templateUrl: './user-salary-details.component.html',
  styleUrls: ['./user-salary-details.component.css']
})
export class UserSalaryDetailsComponent implements OnInit {
  log;
  logger: any = {};
  question: string;
  visible: boolean;
  salaryInfo: any = {
    amount:'',
    payGrade: {},
    payFrequency: {},
    deposit2:{
      accountType: {},
      routingNumber:'',
      accountNumber:'',
      accountNumberRetype:'',
      directAmount:''
    },
    deposit1:{
      accountType: {},
      routingNumber:'',
      accountNumber:'',
      accountNumberRetype:'',
      directAmount:''
    }
  };
  userSalaryInfo: any = {
    amount:'',
    payGrade: {},
    payFrequency: {},
    deposit2:{
      accountType: {},
      routingNumber:'',
      accountNumber:'',
      accountNumberRetype:'',
      directAmount:''
    },
    deposit1:{
      accountType: {},
      routingNumber:'',
      accountNumber:'',
      accountNumberRetype:'',
      directAmount:''
    }
  };
  deposits = [];
  salaryDetails: any = {};
  payGrades=[];
  payFrequencies;
  accountTypes;
  loading;
  salary;
  salaryComponentMin = {
    minSalary:'',
    maxSalary:''
  };
  filterdata;
  isSuccess;
  isFailure;
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userId: any;
  routingData = {
    url: ''
  };
  displayContact = false;
  showAmount = false;
  directDeposit2 = false;
  hideButton = true;
  showButton = false;
  errorMessage = false;
  additionalDeposit = true;
  routingError = '';
  salaryData:any;
  resultData:any;

  constructor(private eventEmitterService: EventEmitterService,private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, public service: UserService, private blocation: Location) {
     
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='View User Job Details';
    this.logger.comment='View User Job Details';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;   
      this.eventEmitterService.onRecentActivityRefresh();   
    });
    
    this.getAPIUrl();
    this.salaryInfo.directDeposit = true;
  }

  getAPIUrl() {
    this.service.getExternalApi('routingNumber')
      .subscribe(response => {
        const respData = response.json();
        this.routingData = respData.data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  getData(routingNumber) {
    this.routingError = '';
    if (this.salaryDetails.routingNumber !== '') {
      this.service.getData(this.routingData.url, routingNumber)
        .subscribe(response => {
          console.log(response.json());
          if (response.json().data.code === 200 || response.json().data.message === 'OK') {
            this.salaryDetails.bankName = response.json().customer_name;
            this.routingError = this.salaryDetails.bankName;
          } else {
            this.routingError = response.json().message;
          }
          this.loading = false;
        },
          error => {
            console.log(error);
          });
    }

  }

  ngOnInit() {
    console.log(this.salaryInfo.directDeposit);
    this.route.paramMap.subscribe(
      param => {
        this.salaryInfo.id = param.get('id');
        this.userId = this.salaryInfo.id;
      }
    );

    this.service.getUserSalary(this.userId)
      .subscribe(response => {
        this.userSalaryInfo = response.json().data;
        if(this.userSalaryInfo === null){
          this.salaryInfo = {
            amount:'',
            payGrade: {},
            payFrequency: {},
            deposit2:{
              accountType: {},
              routingNumber:'',
              accountNumber:'',
              accountNumberRetype:'',
              directAmount:''
            },
            deposit1:{
              accountType: {},
              routingNumber:'',
              accountNumber:'',
              accountNumberRetype:'',
              directAmount:''
            }
          };
        }
        else{
          this.salaryInfo = this.userSalaryInfo;
          if(this.salaryInfo.deposits[0]){
            this.salaryInfo.deposit1 = this.salaryInfo.deposits[0];
            this.salaryInfo.deposit1.accountNumberRetype = this.salaryInfo.deposit1.accountNumber;
          }
          else{
            this.salaryInfo.deposit1 = {
              accountType: {},
              routingNumber:'',
              accountNumber:'',
              accountNumberRetype:'',
              directAmount:'',
            }
          }
          if(this.salaryInfo.deposits[1]){
            this.salaryInfo.deposit2 = this.salaryInfo.deposits[1];
            this.salaryInfo.deposit2.accountNumberRetype = this.salaryInfo.deposit2.accountNumber;
          }
          else{
            this.salaryInfo.deposit2 = {
              accountType: {},
              routingNumber:'',
              accountNumber:'',
              accountNumberRetype:'',
              directAmount:''
            }
          }
          if(this.salaryInfo.directDeposit){
            this.additionalDeposit = false;
            this.directDeposit2 = false;
            this.hideButton = true;
            this.showButton = false;
          }
          else if(!this.salaryInfo.directDeposit){
            this.additionalDeposit = true;
            this.directDeposit2 = true;
            this.hideButton = false;
            this.showButton = true;
          }
          this.change(this.salaryInfo.payGrade.id);
        }
        // if(this.salaryInfo.deposit2){
        //   this.directDeposit2 = true;
        //   this.hideButton = false;
        //   this.showButton = true;
        // }
        // this.salaryComponentMin = response.json().data.payGrade;
      },
        error => {
          console.log(error);
        }
      )

    // get job titles list
    this.service.getPayGrades()
      .subscribe(response => {
        this.payGrades = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });

    // get pay frequency list
    this.service.getPayFrequency()
      .subscribe(response => {
        this.payFrequencies = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });

    // get account type list
    this.service.getBankingType()
    .subscribe(response => {
      this.accountTypes = response.json().data;
      this.loading = false;
    },
    error => {
      console.log(error);
    });
  }

  //on change pay grade
  change(id) {
    this.service.getPatGradesID(id)
    .subscribe(response => {
      this.salaryComponentMin = response.json().data;
      this.loading = false;
      this.showAmount = true;
    },
    error => {
      console.log(error);
    });
  }

  //add additonal deposit details
  addAdditional(){
    this.directDeposit2 = true;
    this.hideButton = false;
    this.showButton = true;
    this.salaryInfo.directDeposit = false;
  }

  //remove additonal deposite details
  removeAdditional(){
    this.directDeposit2 = false;
    this.hideButton = true;
    this.showButton = false;
    this.salaryInfo.directDeposit = true;
  }

  //check the total amount after splitting the salary
  checkAmount(){
    const deposit1 = this.salaryInfo.deposit1.directAmount;
    console.log(deposit1);
    if(deposit1){
      if(deposit1 > this.salaryInfo.amount){
        this.errorMessage = true;
        this.salaryInfo.deposit2.directAmount = "";
      }
      else{
        this.errorMessage = false;
        this.salaryInfo.deposit2.directAmount = this.salaryInfo.amount - deposit1;
      }
    }    
  }

  addSalary() {
    console.log(this.salaryInfo.directDeposit);
    if(!this.salaryInfo.directDeposit){
      this.deposits.length = 0;
      this.deposits.push({
        'accountType': {
          'id': this.salaryInfo.deposit1.accountType.id,
        },
        'routingNumber':this.salaryInfo.deposit1.routingNumber,
        'accountNumber':this.salaryInfo.deposit1.accountNumber,
        'directAmount':this.salaryInfo.deposit1.directAmount
      });

      this.deposits.push({
        'accountType': {
          'id': this.salaryInfo.deposit2.accountType.id,
        },
        'routingNumber':this.salaryInfo.deposit2.routingNumber,
        'accountNumber':this.salaryInfo.deposit2.accountNumber,
        'directAmount':this.salaryInfo.deposit2.directAmount
      });

      this.salaryDetails = {
        'amount':this.salaryInfo.amount,
        'payGrade': {
          'id': this.salaryInfo.payGrade.id,
        },
        'payFrequency': {
          'id': this.salaryInfo.payFrequency.id,
        },
        'deposits': this.deposits,
        'directDeposit': this.salaryInfo.directDeposit
      }
    }
    else if(this.salaryInfo.directDeposit){
      
      this.deposits.length = 0;
      // this.salaryInfo.deposit1.directAmount = "0";
      this.deposits.push({
        'accountType': {
          'id': this.salaryInfo.deposit1.accountType.id,
        },
        'routingNumber':this.salaryInfo.deposit1.routingNumber,
        'accountNumber':this.salaryInfo.deposit1.accountNumber,
        'directAmount':''
      });
      this.salaryDetails = {
        'amount':this.salaryInfo.amount,
        'payGrade': {
          'id': this.salaryInfo.payGrade.id,
        },
        'payFrequency': {
          'id': this.salaryInfo.payFrequency.id,
        },
        'deposits': this.deposits,
        'directDeposit': this.salaryInfo.directDeposit
      }
    }
    console.log(this.salaryDetails);
    this.service.addUserSalary(this.userId, this.salaryDetails)
    .subscribe(response => {
      this.salary = response.json();
      if (this.salary.statusCode.code == '200') {
        //call service to get user slary details for salary trends and sending the data to job portal - sharmistha - 08-08-2019 - start
        this.service.getUserSalaryDetails(this.userId)
        .subscribe(res => {
          this.salaryData = res.json().data;
          console.log(this.salaryData);
          if(this.salaryData){
            this.service.sendUserSalary(this.salaryData)
            .subscribe(result => {
              this.resultData = result.json().data;
            })
          }          
          this.isSuccess = true;
        })
        //call service to get user slary details for salary trends and sending the data to job portal - sharmistha - 08-08-2019 - end
      }
      else {
        console.log(this.salary.errorMessages);
        this.isFailure = true;
      }
    },
    error => {
      console.log(error);
    })
  }

  cancel() {
    // <!-- changed redirection link for cancel button - sharmistha - start - 08-14-2019 -->
    // this.blocation.back();
    this.displayContact = false;
    // <!-- changed redirection link for cancel button - sharmistha - end - 08-14-2019 -->
  }

  move(){
    this.router.navigate(['usersView']);
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close(){
    this.isSuccess = !this.isSuccess;
  }
  
  editContact() {
    this.displayContact = true;
    this.salaryInfo.directDeposit = true;
  }

  backContact() {
    this.displayContact = false;
  }

}

