import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-professional-info',
  templateUrl: './professional-info.component.html',
  styleUrls: ['./professional-info.component.css']
})
export class ProfessionalInfoComponent implements OnInit {
  log
  logger:any={};

  professionalInfo: any = {
    jobTitle: {
      id: '',
      name: ''
    },
    empStatus: {
      id: '',
      name: ''
    },
    jobCategory: {
      id: '',
      name: ''
    },
    jobLocation: {
      id: '',
      name: ''
    },
    frequency: {
      id: '',
      name: ''
    }
  };
// changed the variable declaration - sharmistha - 08-12-2019 - start    
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
// changed the variable declaration - sharmistha - 08-12-2019 - start   
  additionalDeposit:boolean;
  location: string;
  info: any = {};
  url: any;
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private route: ActivatedRoute, public http: Http, private router: Router,
    public auth: AuthenticationService, public service: UserService,private eventEmitterService: EventEmitterService) {

    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='View Salary Info';
    this.logger.comment='View Salary Info';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      this.eventEmitterService.onRecentActivityRefresh();    
    });

    // get professional info
    this.service.getProfessionalInfo()
    .subscribe(response => {
      this.professionalInfo = response.json().data;
      const docs = this.service.getBaseUrl() + '/frontend/contract_docs/' + this.professionalInfo.documents;
      this.professionalInfo.documents = docs;
    },
    error => {
      console.log(error);
    });

    // get salary info code changes for preview - sharmistha - start - 08-12-2019
    this.service.getSalaryInfo()
    .subscribe(response => {
      this.salaryInfo = response.json().data;
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
        }
        else if(!this.salaryInfo.directDeposit){
          this.additionalDeposit = true;
        }
    },
    error => {
      console.log(error);
    });

    // get salary info code changes for preview - sharmistha - start - 08-12-2019
  }

  ngOnInit() {
  }
  onNavigate(location) {
    this.router.navigate([location]);
  }

  cancel() {
    this.router.navigate(['myInfo']);
  }
}
