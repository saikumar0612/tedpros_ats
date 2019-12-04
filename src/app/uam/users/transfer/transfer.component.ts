import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  showform = false;
  showleavetype = false;
  showemployee = false;
  formDate: any;
  toDate: any;
  getfilterData = [];
  reports;
  filterData: any = [];
  reportsList: any = [];
  finalData: any = [];
  fromDate: any;
  toDates: any;
  filter: any = {
    leaveType: '',
    days: '',
    leaveTaken: '',
    leaveBalance: ''
  };
  reportRec: any = {
    user: {
      firstName: '',
      lastName: ''
    },
    leave_type: {
      name: ''
    },
    days: '',
    leave_pending: '',
    leave_scheduled: '',
    leave_taken: '',
    leave_balance: ''
  };
  reportingData: any = [];
  leaveList = [];
  showAccountForm = false;
  showJobForm = false;
  searchData = {
    type: '',
    transferTo: '',
    transferIds: []
  };
  userId;
  error6 = '';
  jobTitles = [];
  branches = [];
  users = [];
  leavePeriod;
  reportsData;
  getResult = false;
  availableRecords = 0;
  jobRec = {
    internalCode: '',
    jobCode: '',
    jobName: '',
    datePosted: '',
    company: {
      id: '', name: ''
    },
    recruiter: {
      id: '', name: ''
    },
    companyOwner: {
      id: '', name: ''
    },
    applicationCount: 0,
    candidates: [],
    isPublished: 0,
    checked: false
  };
  data;
  customer = {
    companyId: '',
    companyName: '',
    cityName: '',
    billingContact: '',
    phoneNumber: '',
    owner: {
      id: '',
      name: ''
    },
    checked: false
  };
  error = '';
  loading = false;
  isShowPopup = false;
  sucessmsg = '';

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken: any;
  userPermissions: any;
  headers = new Headers({ 'Token': this.userToken });
  options = new RequestOptions({ headers: this.headers });

  constructor(public http: Http, public service: UserService, private router: Router, private route: ActivatedRoute,
    private eventEmitterService: EventEmitterService, private blocation: Location) {
    this.userToken = this.currentUser.token;
    this.userPermissions = this.currentUser.permission;
  }

  editOwner() {
    let result = [];
    if (this.showJobForm) {
      result = this.filterData.filter(x => x.checked).map(x => x.internalCode);
      if (result.length) {
        this.searchData.transferIds = result;
        console.log(this.searchData);
        this.service.transfer(this.searchData)
          .subscribe(res => {

            const response = res.json();
            console.log(response);
            this.loading = false;

            // console.log(result);
            if (response.statusCode.code === '200') {
              this.error = '';
              this.sucessmsg = response.data;
              this.isShowPopup = true;
            } else {
              this.sucessmsg = '';
              this.error = response.errorMessages;
              this.isShowPopup = false;
            }
          });
      } else {
        this.isShowPopup = !this.isShowPopup;
        this.sucessmsg = '';
        this.error = 'Please select atlease one job to transfer';
      }
    } else if (this.showAccountForm) {
      result = this.filterData.filter(x => x.checked).map(x => x.customerId);
      if (result.length) {
        this.searchData.transferIds = result;
        console.log(this.searchData);
        this.service.transfer(this.searchData)
          .subscribe(res => {
            const response = res.json();
            console.log(response);
            this.loading = false;

            // console.log(result);
            if (response.statusCode.code === '200') {
              this.error = '';
              this.sucessmsg = response.data;
              this.isShowPopup = true;
            } else {
              this.sucessmsg = '';
              this.error = response.errorMessages;
              this.isShowPopup = false;
            }
          });
      } else {
        this.isShowPopup = !this.isShowPopup;
        this.sucessmsg = '';
        this.error = 'Please select atlease one customer to transfer';
      }
    }
  }

  closeError() {
    this.error = '';
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.finalData;
    } else {

      if (key === 'internalCode') {
        this.filterData = this.finalData.filter(x =>
          x.internalCode.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'jobCode') {
        this.filterData = this.finalData.filter(x =>
          x.jobCode.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'job.name') {
        this.filterData = this.finalData.filter(x =>
          x.jobName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'company.name') {
        this.filterData = this.finalData.filter(x =>
          x.company.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'recruiter.firstName') {
        this.filterData = this.finalData.filter(x =>
          x.recruiter.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'datePosted') {
        this.filterData = this.finalData.filter(x =>
          x.datePosted.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'company.owner.firstName') {
        this.filterData = this.finalData.filter(x =>
          x.companyOwner.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'company') {
        this.filterData = this.finalData.filter(x =>
          x.companyName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'owner') {
        this.filterData = this.finalData.filter(x =>
          x.owner.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'contact') {
        this.filterData = this.finalData.filter(x =>
          x.billingContact.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'phone') {
        this.filterData = this.finalData.filter(x =>
          x.phoneNumber.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'city') {
        this.filterData = this.finalData.filter(x =>
          x.cityName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }




  ngOnInit() {

    this.userToken = this.currentUser.token;
    this.userPermissions = this.currentUser.permission;

    this.route.params.subscribe(res => {
      this.userId = res.id;
    });

    // get users list
    this.service.getUsersList()
      .subscribe(response => {
        this.users = response.json();
        // this.users.forEach((type) => {
        //   if (type.employeeType.employeeType === 'Recruiter') {
        //     this.filteredusers.push(type);
        //   }
        // });
        // this.recuiters = this.filteredusers;
        // // console.log(this.recuiters);
        // this.recuiters.forEach(obj => {
        //   obj.fullname = (obj.first_name + ' ' + obj.last_name);

        // });
      });
  }

  resetData(addReportFrm: NgForm) {
    this.showAccountForm = false;
    this.showJobForm = false;
    this.getResult = false;
    addReportFrm.resetForm();
  }

  getCompanyList() {
    this.filterData = [];
    this.finalData = [];
    this.service.getCompainesByUser(this.userId)
      .subscribe(response => {
        this.data = response.json().data;

        this.getfilterData = [];
        const customerLst = this.data;
        // console.log(customerLst);
        for (let i = 0; i < customerLst.length; i++) {
          this.customer.checked = false;
          this.customer.companyId = customerLst[i].companyId;
          this.customer.companyName = customerLst[i].companyName;
          if (customerLst[i].city && customerLst[i].city.name !== null) {
            this.customer.cityName = customerLst[i].city.name;
          } else {
            this.customer.cityName = ' ';
          }
          if (customerLst[i].billingContact) {
            this.customer.billingContact = customerLst[i].billingContact;
          } else {
            this.customer.billingContact = ' ';
          }
          if (customerLst[i].phoneNumber) {
            this.customer.phoneNumber = customerLst[i].phoneNumber;
          } else {
            this.customer.phoneNumber = ' ';
          }
          if (customerLst[i].owner && customerLst[i].owner.name !== null) {
            this.customer.owner.id = customerLst[i].owner.id;
            this.customer.owner.name = customerLst[i].owner.name;
          } else {
            this.customer.owner.id = '';
            this.customer.owner.name = ' ';
          }
          this.finalData.push(this.customer);
          this.customer = {
            companyId: '',
            companyName: '',
            cityName: '',
            billingContact: '',
            phoneNumber: '',
            owner: {
              id: '',
              name: ''
            },
            checked: false
          };

        }
        console.log(this.finalData);
        this.filterData = this.finalData;
        this.availableRecords = this.filterData.length;
      },
        error => {
          console.log(error);
        }
      );
    // console.log(this.getfilterData);
  }

  getJobList() {
    this.filterData = [];
    this.finalData = [];
    // this.http.get('http://service.tedpros.com/job/jobList', this.options)
    this.service.getjobListByUser(this.userId)
      .subscribe(response => {
        this.data = response.json();
        this.filterData = [];
        const jobLst = this.data.data;
        for (let i = 0; i < jobLst.length; i++) {
          this.jobRec.checked = false;
          this.jobRec.internalCode = jobLst[i].internalCode;
          // this.jobRec.jobCode = jobLst[i].jobCode;
          this.jobRec.jobName = jobLst[i].job.name;
          if (jobLst[i].jobCode) {
            this.jobRec.jobCode = jobLst[i].jobCode;
          } else {
            this.jobRec.jobCode = ' ';
          }
          if (jobLst[i].company) {
            this.jobRec.company.id = jobLst[i].company.id;
            this.jobRec.company.name = jobLst[i].company.name;
            if (jobLst[i].company.owner) {
              this.jobRec.companyOwner.id = jobLst[i].company.owner.id;
              this.jobRec.companyOwner.name = jobLst[i].company.owner.firstName + ' ' + jobLst[i].company.owner.lastName;
            } else {
              this.jobRec.companyOwner.id = '';
              this.jobRec.companyOwner.name = ' ';
            }
          } else {
            this.jobRec.company.id = '';
            this.jobRec.company.name = ' ';
            this.jobRec.companyOwner.id = '';
            this.jobRec.companyOwner.name = ' ';
          }
          if (jobLst[i].recruiter) {
            this.jobRec.recruiter.id = jobLst[i].recruiter.userId;
            this.jobRec.recruiter.name = jobLst[i].recruiter.firstName + ' ' + jobLst[i].recruiter.lastName;
          } else {
            this.jobRec.recruiter.id = '';
            this.jobRec.recruiter.name = ' ';
          }
          if (jobLst[i].applications.applicationCount) {
            this.jobRec.applicationCount = jobLst[i].applications.applicationCount;
          } else {
            this.jobRec.applicationCount = 0;
          }
          if (jobLst[i].applications.candidates) {
            this.jobRec.candidates = jobLst[i].applications.candidates;
          } else {
            this.jobRec.candidates = [];
          }
          if (jobLst[i].datePosted) {
            this.jobRec.datePosted = new DatePipe('en-US').transform(jobLst[i].datePosted, 'MM/dd/yyyy');
          } else {
            this.jobRec.datePosted = ' ';
          }
          this.jobRec.isPublished = parseInt(jobLst[i].isPublished, 10);
          this.filterData.push(this.jobRec);
          this.jobRec = {
            internalCode: '',
            jobCode: '',
            jobName: '',
            datePosted: ' ',
            company: {
              id: '', name: ''
            },
            recruiter: {
              id: '', name: ''
            },
            companyOwner: {
              id: '', name: ''
            },
            applicationCount: 0,
            candidates: [],
            isPublished: 0,
            checked: false
          };
        }
        this.finalData = this.filterData;
        this.availableRecords = this.filterData.length;
        console.log(this.filterData);
      },
        error => {
          console.log(error);
        }
      );
  }

  cancel() {
    this.blocation.back();
  }

  onchange(id) {
    this.getResult = false;
    if (id !== '') {
      if (id === 'jobPosting') {
        this.getJobList();
        this.showAccountForm = false;
        this.getResult = true;
        this.showJobForm = true;
      } else if (id === 'accounts') {
        this.getCompanyList();
        this.getResult = true;
        this.showAccountForm = true;
        this.showJobForm = false;
      }
    }
  }

}
