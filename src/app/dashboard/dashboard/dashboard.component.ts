import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableModule } from 'angular-6-datatable';
import { AuthenticationService } from '../../core/services';
// import { ExcellExportService } from '../core/services/excell-export.service';
import { ExcelService } from '../../core/services/excell-export.service';
import { UserService } from '../../core/services/user.service';
import { EventEmitterService } from '../../core/services/event-emitter.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //added by Geeta - 10-22-2019 - start
  portalResp:any;
  //added by Geeta - 10-22-2019 - end
  currentDate=new Date();
  today:any;
  dateError:any;
  showEventResponse:any;
  eventResponse:any={};
  eventPopup:any;
  dropdownSettings = {};
  selectedCandidates:any=[]
  userList:any=[];
  showOwner;
  eventData:any={
    clientCompany:{},
    companyContact:{},
    recruiter:{},
    accountOwner:{},
    job:{},
    duration:{ hour:1,minute:0 ,second:0}
  }
  jobInfo: any = {
  };
  jobDetails:any={};
  lastData: any = [];
  exportData: any = {
    company: '',
    recruiter: '',
    companyOwner: '',
    isPublished: '',
    applicationCount: '',
    datePosted: '',
    internalCode: '',
    jobCode: '',
    jobName: ''
  };
  jobRes;
  users = [];
  jobData: any = {
    job: {},
    contact: {},
    recruiter: {},
    statusCode: {},
    data: {},
  };
  candidatesAvailable = 0;
  leaveBalance = 0;
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
    isPublished: 0
  };
  email: any = {
    email: '',
    jobId: ''
  };
  emailData: any = {};
  finalData;
  candidates = [{
    id: '',
    firstName: '',
    lastName: '',
    city: {
      id: '',
      name: ''
    },
    state: {
      id: '',
      name: ''
    },
    emailId: '',
    phoneNo: '',
    expectedPay: '',
    skills: [],
    rating: 0,
    skill: '',
    flag: true
  }];
  updateData;
  internalCode;
  recruiterId;
  loading;
  skillInfo;
  filterData = [];
  exportingData: any = [];
  data;
  jobs;
  selectedAll: any;
  isShowPopup = false;
  expiryDetails = {
    license: {
      licenseDetails: []
    },
    certificate: {
      certificateDetails: []
    }
  };
  availableRecords: any = {};
  LicenseAlertCount;
  CertificateAlertCount;
  totalAlertCount;
  alertDetails = [];
  totalCount;
  docalertDetails: any = {
    i9AlertDetails: '',
    federalw4AlertDetails: '',
    statew4AlertDetails: '',
    workAuthAlertDetails: ''
  };
  finalCount: any;
  headers: any;
  options: any;
  selectCandidate;
  jobApplyLink;
  assignRecruiter;
  shortList = {
    emailId: '',
    jobId: '',
    status: 0,
    comment: ''

  };
  candidateId = [];
  candidateDetails = {
    jobId: '',
    emailId: '',
    candidateId: '',
    status: '',
    comment: ''

  };
  reasonPopUp = false;
  candReason = '';
  checkresp: any;
  message: any;
  getData;
  role: any;
  newUsers = [];
  newUsersCount: any;
  hrNotification: boolean = false;
  companiesList:boolean = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken: any;
  userPermissions: any;
  userFlag: any;
  // url:any = 'http://localhost/tedpros_services/';
  themeColor: any;
  checkDate;
  recruterId;
  recruiterIdcheck:any;
  timeNullError:any;
  timeZeroError:any;

  spinners = false;

  constructor(public http: Http, private router: Router,
    public route: ActivatedRoute,
    public auth: AuthenticationService,
    private excelService: ExcelService,
    public service: UserService, private eventEmitterService: EventEmitterService
  ) {
    this.recruiterIdcheck = this.currentUser.id;
    this.userToken = this.currentUser ? this.currentUser.token : '';
    this.userPermissions = this.currentUser.permission;
    this.userFlag = this.currentUser.flag;
    this.themeColor = JSON.parse(localStorage.getItem('settings')).data.themeColor;

    this.getDetails();
    this.getDocumentAlertDetails();
    console.log(JSON.parse(localStorage.getItem('settings')).data.themeColor);
  }

  // get alerts
  getDetails() {
    this.loading = true;
    this.service.getAlertDetails()
      .subscribe(response => {
        this.alertDetails = response.json().data;
        if (this.alertDetails != null) {
          this.totalAlertCount = this.alertDetails.length;
        }
      });
  }

  // test commit
  // get document alerts list
  getDocumentAlertDetails() {
    this.service.getDocumentAlertDetails()
      .subscribe(response => {
        this.docalertDetails = response.json().data;
        this.loading = false;
        if (this.docalertDetails != null) {
          let countDoc = Object.keys(this.docalertDetails).length;
          if (this.alertDetails) {
            this.totalCount = this.alertDetails.length;
          } else {
            this.totalCount = 0;
          }
          this.finalCount = this.totalCount + Number(countDoc);
          // console.log(this.finalCount);
        }
      },
        error => {
          console.log(error);
        });
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
      }
    }
    this.availableRecords = this.filterData.length;
  }

  applyJob(candId, emailId, candStatus, reason) {
    let cand = {
      id: '',
      firstName: '',
      lastName: '',
      city: {
        id: '',
        name: ''
      },
      state: {
        id: '',
        name: ''
      },
      emailId: '',
      phoneNo: '',
      expectedPay: '',
      skills: [],
      rating: 0,
      skill: '',
      flag: true
    };
    const data = { jobId: this.internalCode, candidateId: candId, status: candStatus, comment: reason };
    // console.log(data);
    this.service.addCandidateApply(data)
      .subscribe(response => {
        const jobResp = response.json().data;
        // console.log(this.users);
        if (jobResp === 'Job applied successfully') {
          this.shortList.emailId = emailId;
          this.shortList.jobId = this.internalCode;
          // this.http.post('http://frontend.tedpros.com/user/addShortList',this.shortList)
          this.service.addShortList(this.shortList)
            .subscribe(resp => {
              this.checkresp = resp.json();
              // console.log(this.checkresp);
            },
              error => {
                console.log(error);
              });
          this.getJobList();
          this.candidates.forEach((type) => {
            if (type.id === candId) {
              cand = type;
            }
          });
          const index = this.candidates.indexOf(cand);
          this.candidates.splice(index, 1);
          // this.router.navigate(['/dashboard']);
          // this.closeModal();
        }

      },
        error => {
          console.log(error);
        });
  }

  sendCandidateApplyLink(email) {
    console.log(email);
    this.emailData.email = email;
    this.sendLink();
    this.closeModel2();
  }
  updateCandidateComment() {
    this.applyJob(this.candidateDetails.candidateId, this.candidateDetails.emailId, '1', this.candidateDetails.comment);
    this.closeModal4();
  }
  candidateComment(candId, emailId) {
    this.candidateDetails.candidateId = candId;
    this.candidateDetails.emailId = emailId;
    this.reasonPopUp = true;
  }
  closeModal4() {
    this.reasonPopUp = !this.reasonPopUp;
  }
  viewCandidate(candidateId) {
    let candId = '';
    if (localStorage.getItem('candidateId')) {
      const candList = localStorage.getItem('candidateId');
      candId = candList + ',' + candidateId;
    } else {
      candId = '' + candidateId;
    }
    localStorage.setItem('candidateId', candId);
    this.router.navigate(['/candidate/view-candidate', candidateId]);
  }


  // start send job apply link
  sendLink() {
    this.emailData.jobId = this.internalCode;
    // console.log(this.emailData);
    this.service.sendJobApplyLink(this.emailData)
      .subscribe(response => {
        const resp = response.json();
        if (resp.statusCode.code === '200') {
          this.getJobList();
          this.closeModel2();
          this.isShowPopup = true;
          this.message = resp.data;
        } else {
          this.closeModel2();
          this.isShowPopup = true;
          this.message = resp.errorMessages;
        }
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

  ngOnInit() {
    this.today=new DatePipe('en-US').transform ( this.currentDate, 'yyyy-MM-dd');
    if (this.eventEmitterService.subsVar === undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeUserAlertRefresh.subscribe((name: string) => {
          this.getDetails();
        });
    }

    //show notification to hr based on role - sharmistha - 09-10-2019 - start
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser.role.forEach(obj => {
      if (obj.roleName === "HR") {
        this.hrNotification = true;
      }
    });
    // added sales person companies list by -suresh - 10-31-2019 start
    if(this.currentUser.empType.employeeType === 'Sales'){
      this.companiesList = true;
    }else{
      this.companiesList = false;
    }
// added sales person companies list by -suresh - 10-31-2019 end

    //show notification to hr based on role - sharmistha - 09-10-2019 - start

    // this.http.get('http://service.tedpros.com/user/all', this.options)
    this.service.getUsersList()
      .subscribe(response => {
        const userList = response.json();
        // console.log(userList);
        userList.forEach((type) => {
          if (type.employeeType.employeeType === 'Recruiter') {
            this.users.push(type);
            // console.log(this.users);

          }
          if (type.isNew === '1') {
            this.newUsers.push(type);
          }
        });
        if (this.newUsers) {
          this.newUsersCount = this.newUsers.length;
        }


        this.loading = false;
      },
        error => {
          console.log(error);
        });
    this.getJobList();

    this.service.getMyLeaveBalance()
      .subscribe(response => {
        this.leaveBalance = response.json().data.balance;
        // console.log(this.users);
        this.loading = false;
      },
        error => {
          console.log(error);
        });

    if (localStorage.getItem('applyJobId')) {
      this.selectCandidate = true;
      const str = localStorage.getItem('candidateId');
      this.candidateId = str.split(',');
      // console.log(this.candidateId);
      this.internalCode = localStorage.getItem('applyJobId');
      this.candidateSelect('applyModal', this.internalCode);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.lastData, 'jobposts-listing');
  }

  copyJob(jobCode) {
    localStorage.setItem('jobDetails', jobCode);
    this.router.navigate(['jobs/add-jobs']);
  }


  getJobList() {
    this.service.getJobsList()
      .subscribe(response => {
        this.data = response.json();
        this.getData = this.data.data;
        console.log(this.getData);
        this.filterData = [];
        const jobLst = this.data.data;
        for (let i = 0; i < jobLst.length; i++) {
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
            // console.log(this.jobRec.recruiter);
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
          // console.log(this.jobRec);
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
            isPublished: 0
          };
        }
        // saikumar 12/09/2019 started here
        this.finalData = this.filterData;
        this.filterData.forEach(obj => {
          // console.log(obj);
          if (obj) {
            // obj.company = obj.company.name;
            // obj.recruiter = obj.recruiter.name;
            obj.companyOwner = obj.companyOwner.name;
            // console.log(obj.isPublished);
            // if (obj.isPublished === 1) {
            //   obj.isPublished = 'Yes';
            // } else {
            //   obj.isPublished = 'No';
            // }

            this.exportData.company = obj.company.name;
            this.exportData.recruiter = obj.recruiter.name;
            // saikumar 12/09/2019 ended here
            this.exportData.companyOwner = obj.companyOwner;
            if (obj.isPublished === 1) {
              this.exportData.isPublished = 'Yes';
            } else {
              this.exportData.isPublished = 'No';
            }
            this.exportData.applicationCount = obj.applicationCount;
            this.exportData.datePosted = obj.datePosted;
            this.exportData.internalCode = obj.internalCode;
            this.exportData.jobCode = obj.jobCode;
            this.exportData.jobName = obj.jobName;
          }
          this.lastData.push(this.exportData);
          this.exportData = {
            company: '',
            recruiter: '',
            companyOwner: '',
            isPublished: '',
            applicationCount: '',
            datePosted: '',
            internalCode: '',
            jobCode: '',
            jobName: ''
          };
        });
        if (this.finalData) {
          this.availableRecords = this.filterData.length;
        }

        // console.log(this.filterData);
      },
        error => {
          console.log(error);
        }
      );
  }

  closeModal() {
    this.selectCandidate = !this.selectCandidate;
    localStorage.setItem('applyJobId', '');
    localStorage.setItem('candidateId', '');
  }
  closeModal1() {
    this.assignRecruiter = !this.assignRecruiter;
  }
  closeModel2() {
    this.jobApplyLink = false;
  }
  // saikumar started here 12/09/2019
  editJob() {
    const jobFilterData = {
      internalCode: this.internalCode,
      recruiter: this.jobData.recruiter.userId
    };
    // console.log(this.filterData);
    this.service.updateRecruiter(jobFilterData)
      .subscribe(response => {
        this.jobRes = response.json();
        // console.log(this.jobRes);
        if (this.jobRes.statusCode.code === '200') {
          this.getJobList();
          this.closeModal1();

        }
        this.loading = false;
      },
        error => {
          console.log(error);
        }
      );
  }
  // saikumar ended here 12/09/2019
  candidateSelect(id: string, jobs) {
    this.selectCandidate = true;
    this.internalCode = jobs;
    if (id === 'applyModal') {
      this.candidates = [];
      try {
        this.service.getEligibleCandidates(jobs)
          .subscribe(response => {
            if (response.json().data) {
              this.candidates = response.json().data.candidates;
              this.candidates.forEach((type) => {
                type.flag = false;
                this.candidateId.forEach((candId) => {
                  if (candId === type.id) {
                    type.flag = true;
                  }
                });
              });
              localStorage.setItem('applyJobId', jobs);
              this.candidatesAvailable = this.candidates.length;
              // console.log(this.candidates);
            } else {
              this.candidates = null;
              this.candidatesAvailable = 0;
            }
            // this.jobData = this.data.data;
            this.recruiterId = this.jobData.recruiter.userId;
            // console.log(this.recruiterId);
          },
            error => {
              console.log(error);
            });
      } catch (error) {
        console.log(error);
      }
    }

  }
  recruiterAssign(id: string, jobs) {
    this.assignRecruiter = true;
    this.internalCode = jobs;
    if (id === 'modal') {
      try {
        this.service.getjobDetails(jobs)
          .subscribe(response => {
            this.jobData = response.json().data;
            // this.jobData = this.data.data;
            if (this.jobData.recruiter) {
              this.recruiterId = this.jobData.recruiter.userId;
            } else {
              this.recruiterId = '';
              this.jobData.recruiter = {
                userId: ''
              };
            }

            // console.log(this.recruiterId);
          },
            error => {
              console.log(error);
            });
      } catch (error) {
        console.log(error);
      }
    }
  }

  linksend(id: string, jobs) {
    this.jobApplyLink = true;
    this.internalCode = jobs;
    if (id === 'linkmodal') {
      try {
        this.service.getjobDetails(jobs)
          .subscribe(res => {
            this.jobData = res.json().data;
            // this.jobData = this.data.data;
            this.recruiterId = this.jobData.recruiter.userId;
            // console.log(this.recruiterId);
          },
            error => {
              console.log(error);
            });
      } catch (error) {
        console.log(error);
      }
    }
  }
  // start code added by geeta
 
  openEventPopUp(jobCode){
    console.log(jobCode);
    console.log("came in");
    this.service.getjobDetails(jobCode)
    .subscribe(response => {
      this.jobDetails= response.json().data;
      this.jobInfo=this.jobDetails;
      console.log(this.jobInfo);
      console.log(this.jobInfo);
      this.eventData.jobPosted=this.jobInfo.datePosted;
      this.eventData.clientCompany.name=this.jobInfo.company.name;
      this.eventData.clientCompany.id=this.jobInfo.company.id;
      this.eventData.companyContact.name=this.jobInfo.contact.firstName +' '+ this.jobInfo.contact.lastName;
      this.eventData.companyContact.id=this.jobInfo.contact.id;
      this.eventData.postedBy=this.jobInfo.postedBy;
      if(this.jobInfo.company.owner){
       this.eventData.accountOwner.id=this.jobInfo.company.owner.userId;
       this.eventData.accountOwner.name=this.jobInfo.company.owner.firstName +' '+ this.jobInfo.company.owner.lastName;
       this.showOwner=true;
      }
      else{
        this.showOwner=false;
      }
      this.eventData.job.name=this.jobInfo.techJobTitle;
      this.eventData.job.code=this.jobInfo.internalCode;
      this.eventData.recruiter.email=this.jobInfo.recruiter.email;
      this.eventData.recruiter.id=this.jobInfo.recruiter.userId;
      this.eventData.recruiter.name=this.jobInfo.recruiter.firstName +' '+ this.jobInfo.recruiter.lastName;
      this.service.getUsers()
      .subscribe(response => {
        this.userList = response.json();
        // console.log(userList);
        this.userList.forEach((type) => {
          // console.log(type.employeeType);
          if (type.id == this.jobInfo.postedBy) {
            console.log(this.jobInfo.postedBy);
            console.log(type.id);
            this.eventData.postedByName=type.first_name +' '+type.last_name
          }
        });
       
      },
        error => {
          console.log(error);
        });
        console.log(this.data);
        this.data.data.forEach((obj) => {
          if(obj.internalCode==jobCode){
            this.selectedCandidates=obj.applications.candidates;
            if(this.selectedCandidates.length>1){
            this.selectedCandidates.forEach(obj1 => {
              obj1.name = obj1.firstName+' '+obj1.lastName;
            });
          }
          else{
            this.selectedCandidates[0].name= obj.applications.candidates[0].firstName+' '+obj.applications.candidates[0].lastName;
          }
          }
        });
        console.log(this.selectedCandidates);
        this.dropdownSettings = {
          singleSelection: true,
          idField: 'id',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true,
          "closeDropDownOnSelection": true
        };   
    },
      error => {
        console.log(error);
      }
    );
    this.eventPopup=true;
   
  }
  closeeventPopup(addEvent: NgForm){
    this.eventPopup=!this.eventPopup;
    addEvent.resetForm();
  }
  submitEvent(addEvent: NgForm){
    this.eventData.jobPosted=new DatePipe('en-US').transform ( this.eventData.jobPosted, 'yyyy-MM-dd');
    this.checkDate=new DatePipe('en-US').transform ( this.eventData.startDate, 'yyyy-MM-dd');
    console.log(this.today);
    console.log(this.checkDate);
    // console.log(this.eventData.duration.hour);
    // console.log(this.eventData.duration.minute);
    this.timeNullError="";
    this.dateError="";
    if(this.eventData.duration==null){
      this.timeNullError = "Select Duration";

    }
    else if(this.eventData.duration.hour < 1 && this.eventData.duration.minute < 1){
      this.timeNullError="Select Duration";
    }
    else if((this.eventData.jobPosted < this.checkDate) && (this.checkDate > this.today))
    {
      console.log(this.eventData);
      this.eventData.singleCandidate = this.selectedCandidates.filter(x => x.id === this.eventData.candidates[0].id)[0];
    console.log(this.eventData);
    this.eventData.startDate = new DatePipe('en-US').transform ( this.eventData.startDate, 'yyyy-MM-dd HH:mm:ss');
    console.log(this.eventData.startDate);
    this.service.addCalendarEvents(this.eventData)
      .subscribe(response => {
        this.eventResponse = response.json();
        console.log(this.eventResponse);
        if(this.eventResponse.statusCode.code=="200"){
          //added by Geeta - 10-22-2019 - start
          console.log(this.eventResponse.data);
          this.service.addPortalCalendarEvent(this.eventResponse.data)
            .subscribe(resp => {
              this.portalResp = resp.json();
              console.log(this.portalResp);
            },
              error => {
                console.log(error);
              });
           //added by Geeta - 10-22-2019 - end
          this.eventPopup=false
          this.showEventResponse=true;
          addEvent.resetForm();
          this.eventData={
            clientCompany:{},
            companyContact:{},
            recruiter:{},
            accountOwner:{},
            job:{},
            duration:{ hour:1,minute:0 ,second:0}
          }
        }
      },
        error => {
          console.log(error);
        });
    }
    else{
      this.dateError="Please Select The Valid Start Date";
    }
    

  }
  closeEventResponse(){
    this.showEventResponse=!this.showEventResponse;
  }




}
