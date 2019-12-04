import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { DataTableModule } from 'angular-6-datatable';
import { AuthenticationService } from '../../../core/services';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { NgForm } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { FileUploader } from 'ng2-file-upload';

@Component({ 
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {

  @ViewChild('mf', {static: false})
  mf: any;
  duplicateData:boolean=false;
  spinners = false;
  // added by Geeta - 10-22-2019 - start
  portalResp:any;
  // added by Geeta - 10-22-2019 - end
  timeNullError:any;
  dateError:any;
  showEventResponse:any;
  eventResponse:any={};
  dropdownSettings = {};
  selectedCandidates:any=[]
  userList:any=[];
  jobDetails:any={};
  showOwner;
  jobInfo: any = {
    recruiter:{}
    
  };

  editeventPopup=false;
  eventData:any={
    clientCompany:{},
    companyContact:{},
    recruiter:{},
    accountOwner:{},
    timezone:{},
    job:{},
    duration:{ hour:1,minute:0 ,second:0},
    location:'',
    candidates:[{
      id:'',
      name:''
    }]
  }
  eventPopup;
  log;
  logger: any = {};
  filterData;
  data;
  jobs;
  email: any = {
    email: '',
    jobId: ''
  };
  emailData: any = {};
  selectedAll: any;
  internalCode;
  jobData: any = {
    job: {},
    contact: {},
    recruiter: {},
    statusCode: {},
    data: {},
  }; 
  candidatesAvailable = 0;
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

    salesflag:'',
    recruiterfalg:'',
    dateadded:'',
          dateupdated:'',
    candidates: [{
      id: "",
      firstName: "",
    lastName: "",
    city: {
      id: "",
      name: ""
    },
    state: {
      id: "",
      name: ""
    },
    emailId: "",
    phoneNo: "",
    expectedPay: "",
    linkedin: "",
    status: "",
    skills: [{
        skillName: "",
        experience: "",
        lastUsed: "",
        comment: ""
      }
    ],
    jobExpectedPay: "",
    Interviewing:[ {
      timeValidation: false,
      slot: "",
      notes: "",
      timezone: "",
      description: "",
      id:'',
      status:''
    }],
    clientPay: "",
    interviewCount:''
  }],
    onholdcandidates:[{
      id: "",
      firstName: "",
    lastName: "",
    city: {
      id: "",
      name: ""
    },
    state: {
      id: "",
      name: ""
    },
    emailId: "",
    phoneNo: "",
    expectedPay: "",
    linkedin: "",
    status: "",
    skills: [{
        skillName: "",
        experience: "",
        lastUsed: "",
        comment: ""
      }
    ],
    jobExpectedPay: "",
    Interviewing:[ {
      timeValidation: false,
      slot: "",
      notes: "",
      timezone: "",
      description: "",
      id:'',
      status:''
    }],
    
    clientPay: "",interviewCount:''
  }],
    selectedcandidates:[{
      id: "",
      firstName: "",
    lastName: "",
    city: {
      id: "",
      name: ""
    },
    state: {
      id: "",
      name: ""
    },
    emailId: "",
    phoneNo: "",
    expectedPay: "",
    linkedin: "",
    status: "",
    skills: [{
        skillName: "",
        experience: "",
        lastUsed: "",
        comment: ""
      }
    ],
    jobExpectedPay: "",
    Interviewing:[ {
      timeValidation: false,
      slot: "",
      notes: "",
      timezone: "",
      description: "",id:'',
      status:''
    }],
    
    clientPay: "",interviewCount:''
  }],
    rejectedcandidates:[{
      id: "",
      firstName: "",
    lastName: "",
    city: {
      id: "",
      name: ""
    },
    state: {
      id: "",
      name: ""
    },
    emailId: "",
    phoneNo: "",
    expectedPay: "",
    linkedin: "",
    status: "",
    skills: [{
        skillName: "",
        experience: "",
        lastUsed: "",
        comment: ""
      }
    ],
    jobExpectedPay: "",
    Interviewing:[ {
      timeValidation: false,
      slot: "",
      notes: "",
      timezone: "",
      description: "",
      id:'',
      status:''
    }],
    
    clientPay: "",interviewCount:''
  }],
    onholdCount: 0,
    selectedCount: 0,
    rejectedCount: 0,
    isPublished: 0,
    totalApplications:0
  };
  candidates = [
    {
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
    }
  ];
  recruiterId;
  jobRes;
  users = [];
  hr = [];
  expand = [];
  readmore=[];
  finalData;
  loading = false;
  isShowPopup = false;
  availableRecords = 0;
  headers;
  options;
  selectCandidate;
  jobApplyLink;
  assignRecruiter;
  assignHR = false;
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
  checkresp: any;
  reasonPopUp = false;
  candReason = '';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  checkDate;
  recruiterIdcheck:any;
  today:any;
  currentDate=new Date();

  candidateresumepath:any={};
  sendresumeToClient=false;
  successMsg='';
  errorMsg='';
  setJobIdSC=false;

  // added by Sharmistha - 10-23-2019 - start
  types:any=[];
  candidateData = {
    jobCode:'',
    canId:'',
    canEmail:'',
    document:[]
  };
  assignDocument: boolean = false;
  preDocPopup: boolean = false;
  preDocSuccess: boolean = false;
  preDocFailure:boolean = false;
  uploadSign:boolean = false;
  documentData:any;
  getdigitalKey:any;
  digitalKeystatus = false;
  signaturePad:boolean = false;
  imageData:any = {
    digital:''
  };
  imageChangedEvent: any = '';
  image1;
  imagePopSuccess=false;
  imagePop=false;
  signatureImage;
  error;
  successMsgs =[];
  // added by Sharmistha - 10-23-2019 - end

  imgData = {
    image1:''
  };

  // added by sharmistha - 11-05-2019 - start
  documentSettings={}
  result:any = {};
  getAssignedDocsView:boolean = false;
  listViewOfDocs:boolean = false;
  singleViewOfDocs:boolean = false;
  assignedDocData = {
    documents:[],
    candidate:{firstName:'',lastName:'',signature:''},
    recruiter:{signature:'',firstName:'',lastName:'',jobTitle:'',status:''}
  };
  availableDocs = 0;
  assignedJobCode;
  assignedCanId;
  singleDocDetails = {documentName:'',status:'',documentTemplate:''};
  logoUrl:any;
  class:any;

//resume upload fileds added bt basit022
resumeInfo=false;
files : FileList;
fileName:boolean = false;
sendResume={
  jobcode:'',candidateId:''
}
uploadeddocuments;
mailcontentdoc=false;
documentUrl;
hrInfo = {
  hrUserId: '',
  jobCode: '',
  candidateId:''
};
assignHrtoCandidate = false;
sendresumeinfo={candidateinfo:'',canDesc:'',jobcode:'',candidateId:'',selectdoc:[]};
//end



  // added by sharmistha - 11-05-2019 - end

  constructor(public http: Http, public router: Router, public auth: AuthenticationService, private service: UserService, private eventEmitter: EventEmitterService, public authenticationService:AuthenticationService) {
    this.recruiterIdcheck = this.currentUser.id;
    this.userPermissions = this.currentUser.permission;
    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Job Postings';
    this.logger.comment = 'View Job Postings List';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();

      });

  }


  ngOnDestroy() {
    
  }

  public uploader: FileUploader = new FileUploader({
    url: this.service.uploadResume(),
    itemAlias: 'resume',
    parametersBeforeFiles: true,
    headers: [{ name: 'Token', value: this.currentUser.token }]
  });

  ngOnInit() {
    this.documentUrl = this.service.getBaseUrl() + '/frontend/candidate_docs/';
    const result = JSON.parse(localStorage.getItem('settings'));
    this.logoUrl = this.authenticationService.getBaseUrl() + '/frontend/logos/' + result.data.siteLogo;
    this.class = result.data.themeClass;
    this.today=new DatePipe('en-US').transform ( this.currentDate, 'yyyy-MM-dd');
    this.loading = true;
    this.service.getUsers()
      .subscribe(response => {
        this.userList = response.json();
        console.log(this.userList);
        this.userList.forEach((type) => {
          if (type.employeeType.employeeType === 'Recruiter') {
            this.users.push(type);
          }
          if (type.employeeType.employeeType.toLowerCase() === 'hr manager') {
            this.hr.push(type);
          }
          
        });
        console.log('hr');
        console.log(this.hr);
      },
      error => {
        console.log(error);
      });

    this.getJobList();
    this.loading = false;
    console.log(localStorage.getItem('applyJobId'));
    if (localStorage.getItem('applyJobId')) {
      this.selectCandidate = true;
      const str = localStorage.getItem('candidateId');
      if(str){
        this.candidateId = str.split(',');
      }      
      this.internalCode = localStorage.getItem('applyJobId');
      if(this.internalCode)
        this.candidateSelect('applyModal', this.internalCode);
    }

    // multi-select dropdown for pre-requisite documents
    this.documentSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'type',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      "closeDropDownOnSelection": true
    };
    console.log('mf ', this.mf);
  }

  copyJob(jobCode) {
    localStorage.setItem('jobDetails', jobCode);
    this.router.navigate(['/jobs/add-jobs']);
  }

  getJobList() {
    // this.http.get('http://service.tedpros.com/job/jobList', this.options)
    this.service.getJobsList()
      .subscribe(response => {
        this.data = response.json();
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
          } else {
            this.jobRec.recruiter.id = '';
            this.jobRec.recruiter.name = ' ';
          }
          this.jobRec.salesflag=jobLst[i].salesflag;
          this.jobRec.recruiterfalg= jobLst[i].recruiterfalg;
          this.jobRec.dateadded= jobLst[i].dateadded;
          this.jobRec.dateupdated=jobLst[i].dateupdated;
          if (jobLst[i].applications.applicationCount) {
            this.jobRec.applicationCount = jobLst[i].applications.applicationCount;
          } else {
            this.jobRec.applicationCount = 0;
          }
          if (jobLst[i].applications.onholdcount) {
            this.jobRec.onholdCount = jobLst[i].applications.onholdcount;
          } else {
            this.jobRec.onholdCount = 0;
          }
          if (jobLst[i].applications.selectedcount) {
            this.jobRec.selectedCount = jobLst[i].applications.selectedcount;
          } else {
            this.jobRec.selectedCount = 0;
          }
          if (jobLst[i].applications.rejectcount) {
            this.jobRec.rejectedCount = jobLst[i].applications.rejectcount;
          } else {
            this.jobRec.rejectedCount = 0;
          }

          if (jobLst[i].applications.totalApplications) {
            this.jobRec.totalApplications = jobLst[i].applications.totalApplications;
          } else {
            this.jobRec.totalApplications = 0;
          }

          

            // onholdcandidates:[],
          // selectedcandidates:[],
          // rejectedcandidates:[],
          if (jobLst[i].applications.candidates) {
            this.jobRec.candidates = jobLst[i].applications.candidates;
          } else {
            this.jobRec.candidates = [];
          }

          if (jobLst[i].applications.onholdcandidates) {
            this.jobRec.onholdcandidates = jobLst[i].applications.onholdcandidates;
          } else {
            this.jobRec.onholdcandidates = [];
          }

          if (jobLst[i].applications.selectedcandidates) {
            this.jobRec.selectedcandidates = jobLst[i].applications.selectedcandidates;
          } else {
            this.jobRec.selectedcandidates = [];
          }

          if (jobLst[i].applications.rejectedcandidates) {
            this.jobRec.rejectedcandidates = jobLst[i].applications.rejectedcandidates;
          } else {
            this.jobRec.rejectedcandidates = [];
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
            salesflag:'',
            recruiterfalg:'',dateadded:'',
            dateupdated:'',
            candidates: [{
              id: "",
              firstName: "",
            lastName: "",
            city: {
              id: "",
              name: ""
            },
            state: {
              id: "",
              name: ""
            },
            emailId: "",
            phoneNo: "",
            expectedPay: "",
            linkedin: "",
            status: "",
            skills: [{
                skillName: "",
                experience: "",
                lastUsed: "",
                comment: ""
              }
            ],
            jobExpectedPay: "",
            Interviewing:[ {
              timeValidation: false,
              slot: "",
              notes: "",
              timezone: "",
              description: "",
              id:'',
      status:''
            }],
            clientPay: "",interviewCount:''
          }],
             onholdcandidates:[{
              id: "",
              firstName: "",
            lastName: "",
            city: {
              id: "",
              name: ""
            },
            state: {
              id: "",
              name: ""
            },
            emailId: "",
            phoneNo: "",
            expectedPay: "",
            linkedin: "",
            status: "",
            skills: [{
                skillName: "",
                experience: "",
                lastUsed: "",
                comment: ""
              }
            ],
            jobExpectedPay: "",
            Interviewing:[ {
              timeValidation: false,
              slot: "",
              notes: "",
              timezone: "",
              description: "",
              id:'',
      status:''
            }], 
            clientPay: "",interviewCount:''
          }],
          selectedcandidates:[{
            id: "",
            firstName: "",
          lastName: "",
          city: {
            id: "",
            name: ""
          },
          state: {
            id: "",
            name: ""
          },
          emailId: "",
          phoneNo: "",
          expectedPay: "",
          linkedin: "",
          status: "",
          skills: [{
              skillName: "",
              experience: "",
              lastUsed: "",
              comment: ""
            }
          ],
          jobExpectedPay: "",
          Interviewing:[ {
            timeValidation: false,
            slot: "",
            notes: "",
            timezone: "",
            description: "",id:'',
            status:''
          }], 
          clientPay: "",interviewCount:''
        }],
          rejectedcandidates:[{
            id: "",
            firstName: "",
          lastName: "",
          city: {
            id: "",
            name: ""
          },
          state: {
            id: "",
            name: ""
          },
          emailId: "",
          phoneNo: "",
          expectedPay: "",
          linkedin: "",
          status: "",
          skills: [{
              skillName: "",
              experience: "",
              lastUsed: "",
              comment: ""
            }
          ],
          jobExpectedPay: "",
          Interviewing:[ {
            timeValidation: false,
            slot: "",
            notes: "",
            timezone: "",
            description: "",id:'',
            status:''
          }], 
          clientPay: "",interviewCount:''
        }],
          onholdCount: 0,
          selectedCount: 0,
          rejectedCount: 0,
            isPublished: 0,
            totalApplications:0
          };
        }
        this.finalData = this.filterData;
        this.availableRecords = this.filterData.length;
      },
        error => {
          console.log(error);
        }
      );
  }

  setjobCode(job)
  {
    localStorage.setItem('applyJobId', job);
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

  // start of change for send job apply link for existing candidate
  sendCandidateApplyLink(email) {

    this.emailData.email = email;
    this.sendLink();
    // this.closeModal3();
    this.closeModel2();
  }
  updateCandidateComment(rejectReasonForm:NgForm) {
    this.applyJob(this.candidateDetails.candidateId, this.candidateDetails.emailId, '1', this.candidateDetails.comment);
    rejectReasonForm.reset();
    this.expand.map(res => res=false);
    if(this.setJobIdSC)
    {
    localStorage.setItem('applyJobId', '');
    this.setJobIdSC=false;
    }
    this.closeModal4();
  }
  candidateComment(candId, emailId) {
    this.candidateDetails.candidateId = candId;
    this.candidateDetails.emailId = emailId;
    this.reasonPopUp = true;
  }
  candidateCommentSelected(candId, emailId,jobId) {
    localStorage.setItem('applyJobId', jobId);
    this.setJobIdSC=true;
    this.candidateDetails.candidateId = candId;
    this.candidateDetails.emailId = emailId;
    this.reasonPopUp = true;
  }
  closeModal4() {
    this.reasonPopUp = !this.reasonPopUp;
    if(this.setJobIdSC)
    {
    localStorage.setItem('applyJobId', '');
    this.setJobIdSC=false;
    }
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
    // this.emailData = {
    //   "email":this.email.id,
    //   "jobId":this.internalCode
    // }
    // this.emailData.email = this.email.email;
    this.emailData.jobId = this.internalCode;
   
    this.service.sendJobApplyLink(this.emailData)
      .subscribe(response => {
        const resp = response.json().data;
        if (resp) {
          this.getJobList();

          this.closeModel2();
          this.isShowPopup = true;
        }
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }
  closePopup() {
    // this.isShowPopup = !this.isShowPopup;
    this.isShowPopup = false;
    this.sendresumeToClient=false;
    this.successMsg='';
    this.errorMsg='';
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
    this.loading = true;
    if(this.internalCode)
    {
      console.log("Job details Trigged");
    }
    else{
      this.internalCode = localStorage.getItem('applyJobId');
    }

    const data = { jobId: this.internalCode, candidateId: candId, status: candStatus, comment: reason };
    this.service.addCandidateApply(data)
      .subscribe(response => {
        const resp = response.json().data;
        if (resp === 'Job applied successfully') {
          this.shortList.emailId = emailId;
          this.shortList.jobId = this.internalCode;
          this.shortList.status = candStatus;
          this.shortList.comment = reason;
          this.service.addShortList(this.shortList)
            .subscribe(superResp => {
              this.checkresp = superResp.json();
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
          // this.closeModal3();
        }
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }


  editJob() {
    this.loading = true;
    // this.jobData.recruiter = this.jobData.recruiter.userId;
    const jobFilterData = {
      internalCode: this.internalCode,
      recruiter: this.jobData.recruiter.userId
    };
   
    this.service.updateRecruiter(jobFilterData)
      .subscribe(response => {
        this.jobRes = response.json();
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


  closeModal3() {
    this.selectCandidate = !this.selectCandidate;
    localStorage.removeItem('applyJobId');
    localStorage.setItem('candidateId', '');
    this.sendresumeToClient=false;
    this.successMsg='';
    this.errorMsg='';
  }

  closeModal1() {
    this.assignRecruiter = false;
    this.sendresumeToClient=false;
    this.successMsg='';
    this.errorMsg='';
    this.assignDocument = false;
    this.preDocPopup = false;
    this.candidateData.document = [];
    this.getAssignedDocsView = false;
    this.assignedDocData.documents = [];
    this.listViewOfDocs = false;
    this.singleViewOfDocs = false;
  }
  closeModel2() {
    this.jobApplyLink = false;
    this.sendresumeToClient=false;
    this.successMsg='';
    this.errorMsg='';
  }

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

              if (this.candidates) {
                this.candidatesAvailable = this.candidates.length;
              } else {
                this.candidatesAvailable = 0;
              }
            } else {
              this.candidates = null;
              this.candidatesAvailable = 0;
            }

            // this.jobData = this.data.data;
            this.recruiterId = this.jobData.recruiter.userId;
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
            if (this.jobData.recruiter) {
              this.recruiterId = this.jobData.recruiter.userId;
            } else {
              this.recruiterId = '';
              this.jobData.recruiter = {
                userId: ''
              };
            }
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
            this.recruiterId = this.jobData.recruiter.userId;
          },
            error => {
              console.log(error);
            });
      } catch (error) {
        console.log(error);
      }
    }
  }
  // start code added by geeta modification done by BASIT023 ( 22 oct 2019 )
 
  openEventPopUp(jobCode,candidateId){
    this.service.getjobDetails(jobCode)
    .subscribe(response => {
      this.jobDetails= response.json().data;
      this.jobInfo=this.jobDetails;
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
      console.log(this.jobInfo);
      this.eventData.recruiter.name=this.jobInfo.recruiter.firstName +' '+ this.jobInfo.recruiter.lastName;
      this.service.getUsers()
      .subscribe(response => {
        this.userList = response.json();
        this.userList.forEach((type) => {
          if (type.id == this.jobInfo.postedBy) {
            this.eventData.postedByName=type.first_name +' '+type.last_name
          }
        });
       
      },
        error => {
          console.log(error);
        });
        this.data.data.forEach((obj) => {
          if(obj.internalCode==jobCode){
            this.selectedCandidates=obj.applications.candidates;
            const candidate= this.selectedCandidates.map(x => x).filter(x => x.id === candidateId);
            const canDetails={
              'name' : candidate[0].firstName+' '+candidate[0].lastName,
              'id' : candidate[0].id
            }
            const can=[];
            can.push(canDetails);
            this.eventData.candidates=can;
          }
            
        });
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
   this.eventPopup=true
  }
  closeeventPopup(addEvent: NgForm){
    this.eventPopup=false;
    this.editeventPopup=false;
    this.sendresumeToClient=false;
    this.successMsg='';
    this.errorMsg='';
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
  submitEvent(addEvent: NgForm){
    this.eventData.jobPosted=new DatePipe('en-US').transform ( this.eventData.jobPosted, 'yyyy-MM-dd');
    this.checkDate=new DatePipe('en-US').transform ( this.eventData.startDate, 'yyyy-MM-dd');
    this.dateError="";
    this.timeNullError="";
    if(this.eventData.duration==null){
      this.timeNullError = "Select Duration";
    }
    else if(this.eventData.duration.hour < 1 && this.eventData.duration.minute < 1){
      this.timeNullError="Select Duration";
    }
    else if(this.eventData.jobPosted<this.checkDate && (this.checkDate > this.today)){
    this.eventData.singleCandidate = this.selectedCandidates.filter(x => x.id === this.eventData.candidates[0].id)[0];
    this.eventData.startDate = new DatePipe('en-US').transform ( this.eventData.startDate, 'yyyy-MM-dd HH:mm');
    this.eventData.endDate = new DatePipe('en-US').transform ( this.eventData.endDate, 'yyyy-MM-dd HH:mm:ss');
    this.service.addCalendarEvents(this.eventData)
      .subscribe(response => {
        this.eventResponse = response.json();
        if(this.eventResponse.statusCode.code=="200"){
          // added by Geeta - 10-22-2019 - start
          this.service.addPortalCalendarEvent(this.eventResponse.data)
          .subscribe(resp => {
            this.portalResp = resp.json();
            console.log(this.portalResp);
          },
            error => {
              console.log(error);
            });
          // added by Geeta - 10-22-2019 - end
          this.eventPopup=false
          this.showEventResponse=true;
          addEvent.resetForm();
          this.getJobList();
          this.eventData={
            clientCompany:{},
            companyContact:{},
            recruiter:{},
            accountOwner:{},
            job:{},
            duration:{ hour:1,minute:0 ,second:0}
          }
        }
        else if(this.eventResponse.statusCode.code=="409"){
           this.duplicateData=true

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
    this.sendresumeToClient=false;
    this.successMsg='';
    this.errorMsg='';
  }

 
  //  view assigned documents - sharmistha - 11-05-2019 - start
  getAssignedDocs(jobcode,candidateId){
    // console.log(jobcode+" "+candidateId);
    this.getAssignedDocsView = true;
    this.listViewOfDocs = true;
    this.singleViewOfDocs = false;
    this.service.getAssignedDocuments(jobcode,candidateId)
    .subscribe(res => {
      this.result = res.json();
      if(this.result.statusCode.code === "200"){
        this.assignedDocData = this.result.data;
        this.availableDocs = this.assignedDocData.documents.length;
        this.assignedJobCode = jobcode;
        this.assignedCanId = candidateId;
      }
      else{
        this.availableDocs = 0;
      }
    })
  }

  viewTemplate(id, jobId, canId){
    this.getAssignedDocsView = true;
    this.listViewOfDocs = false;
    this.singleViewOfDocs = true;
    console.log(id+" "+jobId+" "+canId);
    console.log(this.assignedDocData);
    this.singleDocDetails = this.assignedDocData.documents.filter(x => 
      {
        return x.id == id
      })[0];
    console.log(this.singleDocDetails);
  }

  backToListView(){
    console.log(this.assignedJobCode+" "+this.assignedCanId);
    this.getAssignedDocs(this.assignedJobCode, this.assignedCanId);
  }

  captureScreen() {
    let popupWinindow;
    const innerContents = document.getElementById('contentToConvert').innerHTML;
    popupWinindow = window.open('', '_blank', 'width=1200,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write(
      '<html><head><link rel="stylesheet" type="text/css" href="../../../../assets/css/style.css" /></head><style>.form-header h5{color: red;} .popup-logo{width:70%; margin: 0 auto 30px;}</style><body class="' + this.class + '" onload="window.print()"><div class="container-fluid full-screen"><div class="row"><div class="main-content"><div class="container">' + innerContents + '</div></div></div></div></body></html>'
    );
    popupWinindow.document.close();
  }

  //  view assigned documents - sharmistha - 11-05-2019 - end

  // assign prerequisite documents - sharmistha - 10-23-2019 - start
  getDigitalKey()
  {
    this.service.getDigitalKey()
    .subscribe(res => {
    this.getdigitalKey=res.json();
      if(res.json().statusCode.code==='200')
      {
        this.digitalKeystatus=true;
      }
      else{ 
        this.digitalKeystatus=false;
      }
    });
  }

  uploadRecSign(){
    this.preDocPopup = false;
    this.uploadSign = true;
    this.signaturePad = true;
  }

  candidateAssignDocument(canId, canEmail, jobCode){
    this.assignDocument = true;
    this.service.getPrerequisiteDocs().subscribe(res => {
      if(res.json()){
        this.loading = false;
        this.types = res.json().data;
        this.candidateData.jobCode = jobCode;
        this.candidateData.canEmail = canEmail;
        this.candidateData.canId = canId;
      }
      else{
        this.loading = false;
        this.types = [];
      }
    })
  }

  assignPreDocument(assignDocForm:NgForm){
    // console.log(this.candidateData);
    this.service.assignPreDocument(this.candidateData)
    .subscribe(res=>{
      this.documentData = res.json();
      if(res.json().statusCode.code === "200"){
        assignDocForm.resetForm();
        this.assignDocument = false;
        this.preDocPopup = true;
        this.preDocSuccess = true;
        this.preDocFailure = false;
        this.getDigitalKey();
        this.successMsgs = this.documentData.condition;
      }
      else{
        assignDocForm.resetForm();
        this.assignDocument = false;
        this.preDocPopup = true;
        this.preDocSuccess = false;
        this.preDocFailure = true;
        this.errorMsg = this.documentData.errorMessages;
      }
    })
  }

  uploadImage(){
    this.digitalKeystatus = false;
    this.signaturePad = false;
  }

  imagepopup(){
    this.imagePopSuccess = false;
    this.error = false;
    this.imagePop = false;
  }

  goBack(addSignFrm:NgForm){
    addSignFrm.resetForm();
    this.signaturePad = true;
  }

  // image crop
  imageCropped(event: ImageCroppedEvent) {
    this.image1 = event.base64;
    this.imageData.digital=this.image1;
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  addimage(addSignFrm:NgForm)
  {
    if(this.imageData.digital)
    {
      this.service.addDigitalKey(this.imageData)
      .subscribe(res => {
      const result =res.json();
        if(result.statusCode.code==='200')
        {
          this.imageData.digital = '';
          addSignFrm.resetForm();
          this.getDigitalKey();
          this.uploadSign = false;
          this.imagePopSuccess=true;
          this.imagePop=true;
        }
        else{          
          addSignFrm.resetForm();
          this.uploadSign = false;
          this.imagePopSuccess=false;
          this.imagePop=true;
          this.error=result.errorMessages;
        }
      });
    }
    else
    {
      this.imagePopSuccess=false;
      this.imagePop=true;
      this.error="Please provide Valid information";
    }   
  }

  // code added for handling error message - Sharmistha - 11-12-2019 - start
  tryagain(){
    this.uploadSign = true;
    this.digitalKeystatus = false;
    this.signaturePad = false;
    this.imgData.image1 = "";
  }
  // code added for handling error message - Sharmistha - 11-12-2019 - end

  showImage(data) {
    this.imageData.digital = data;
    if(this.imageData.digital)
    {
      this.service.addDigitalKey(this.imageData)
      .subscribe(data => {
      const result =data.json();
        if(data.json().statusCode.code==='200')
        {
          this.imageData.digital = '';
          this.getDigitalKey();
          this.uploadSign = false;
          this.imagePopSuccess=true;
          this.imagePop=true;
        }
        else{
          this.uploadSign = false;
          this.imagePopSuccess=false;
          this.imagePop=true;
          this.error=result.errorMessages;
        }
      });
    }
    else
    {
      this.imagePopSuccess=false;
      this.imagePop=true;
      this.error="Please provide Valid information";
    }   
  }
  closeDuplicate(){
    this.duplicateData=false;
  }
  // assign prerequisite documents - sharmistha - 10-23-2019 - end

  interviewEdit(slotId)
  {
    this.eventData.slotId=slotId;

    this.service.getInterviewDetails(slotId).subscribe(data => {
      const result=data.json();
      if(result.statusCode.code==='200')
        {
          this.eventData.startDate= new DatePipe('en-US').transform ( result.data.start_date, 'yyyy-MM-dd');
          this.eventData.duration=result.data.duration;
          this.eventData.timezone=result.data.timezone;
          this.eventData.location=result.data.location;
          this.eventData.notes=result.data.notes;
          this.eventData.description=result.data.description;
          this.service.getjobDetails(result.data.job_code)
              .subscribe(response => {
                this.jobDetails= response.json().data;
                this.jobInfo=this.jobDetails;
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
                  this.userList.forEach((type) => {
                    if (type.id == this.jobInfo.postedBy) {
                      this.eventData.postedByName=type.first_name +' '+type.last_name
                    }
                  });
                
                },
                  error => {
                    console.log(error);
                  });
                  this.data.data.forEach((obj) => {
                    if(obj.internalCode==result.data.job_code){
                      this.selectedCandidates=obj.applications.candidates;
                      const candidate= this.selectedCandidates.map(x => x).filter(x => x.id === result.data.candidate);
                      const canDetails={
                        'name' : candidate[0].firstName+' '+candidate[0].lastName,
                        'id' : candidate[0].id
                      }
                      const can=[];
                      can.push(canDetails);
                      this.eventData.candidates=can;
                    }
                      
                  });
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
            this.editeventPopup=true;
        }
        else
        {
          this.getJobList();
        }
    });
  }

  interviewCancel(slotId)
  {
    console.log(slotId);

    this.service.cancelInterview(slotId).subscribe(data => {

      console.log(data.json());
      if(data.json().statusCode.code==='200')
        {
          this.getJobList();
        }
        else
        {
          this.getJobList();
        }
    });
  }

  editInterviewSlot(addEvent: NgForm){
    this.eventData.jobPosted=new DatePipe('en-US').transform ( this.eventData.jobPosted, 'yyyy-MM-dd');
    this.checkDate=new DatePipe('en-US').transform ( this.eventData.startDate, 'yyyy-MM-dd');
    this.dateError="";
    this.timeNullError="";
    if(this.eventData.duration==null){
      this.timeNullError = "Select Duration";
    }
    else if(this.eventData.duration.hour < 1 && this.eventData.duration.minute < 1){
      this.timeNullError="Select Duration";
    }
    else if(this.eventData.jobPosted<this.checkDate && (this.checkDate > this.today)){
    this.eventData.singleCandidate = this.selectedCandidates.filter(x => x.id === this.eventData.candidates[0].id)[0];
    this.eventData.startDate = new DatePipe('en-US').transform ( this.eventData.startDate, 'yyyy-MM-dd HH:mm');
    this.eventData.endDate = new DatePipe('en-US').transform ( this.eventData.endDate, 'yyyy-MM-dd HH:mm:ss');


console.log(this.eventData);

    this.service.editCalendarEvents(this.eventData)
      .subscribe(response => {
        this.eventResponse = response.json();
        if(this.eventResponse.statusCode.code=="200"){
          // added by Geeta - 10-22-2019 - start
          // this.service.addPortalCalendarEvent(this.eventResponse.data)
          // .subscribe(resp => {
          //   this.portalResp = resp.json();
          //   console.log(this.portalResp);
          // },
          //   error => {
          //     console.log(error);
          //   });
          // added by Geeta - 10-22-2019 - end
          this.eventPopup=false
          this.editeventPopup=false
          this.showEventResponse=true;
          addEvent.resetForm();
          this.getJobList();
          this.eventData={
            clientCompany:{},
            companyContact:{},
            recruiter:{},
            accountOwner:{},
            job:{},
            duration:{ hour:1,minute:0 ,second:0}
          }
        }
        else if(this.eventResponse.statusCode.code=="409"){
           this.duplicateData=true

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


// public uploader: FileUploader = new FileUploader({
//   url: this.service.postEmpResume(),
//   itemAlias: 'document',
//   parametersBeforeFiles: true,
//   headers: [{ name: 'Token', value: this.currentUser.token}]
// });


 //send candidate  resume to client  start
  // *** BASIT023 oct 16Th 2019

  sendResumeToClient(jobcode,candidateId)
  {

    this.sendResume={
      jobcode:jobcode,candidateId:candidateId
    }
    console.log(jobcode);
    this.resumeInfo=true;

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('candidateId', this.sendResume.candidateId);
    };



    // const data={jobcode:jobcode,candidate:candidateId};
    // this.service.sendCandidateResumeToclient(data)
    //   .subscribe(response => {
    //     this.candidateresumepath = response.json();
    //     if( this.candidateresumepath.statusCode.code==='200')
    //     {
    //       this.sendresumeToClient=true;
    //       this.successMsg='Candidate information has been sent to client Email-ID';
    //       this.errorMsg='';
    //     }
    //     else{

    //       this.sendresumeToClient=true;
    //       this.successMsg='';
    //       this.errorMsg=this.candidateresumepath.errorMessages;

    //     }
     
    // });
  }
resumecontent(jobcode,candidateId)
{
  this.mailcontentdoc=true;
  this.sendresumeinfo.jobcode=jobcode;
  this.sendresumeinfo.candidateId=candidateId;

  this.service.getCandidateDocuments(candidateId).subscribe(res=>{
    this.uploadeddocuments = res.json().data;
    let i=0;
    if( this.uploadeddocuments &&  this.uploadeddocuments.length)
    {
      this.uploadeddocuments.map(x=>x).filter(x=>{
      const info={id:x.id,document:'/frontend/candidate_docs/'+x.document,type:x.type,status:true};
      this.sendresumeinfo.selectdoc.push(info);
      });
    }

    // console.log(this.documents)
  })

  this.service.getCandidateResume(candidateId).subscribe(res=>{
    // id: "11", candidate_id: "32", document: "SMU10041574972320.pdf"
    console.log(res.json().data);
    
    if( res.json().data)
    {
      const info={id:res.json().data.id,document:'/frontend/resume/'+res.json().data.document,type:'Resume',status:true};
      this.sendresumeinfo.selectdoc.push(info);
      
    }

    // console.log(this.documents)
  })

  
}

closepopup()
{
this.resumeInfo=false;
this.mailcontentdoc=false;
// this.sendresumeToClient=false;

}
sendresume(sendresumeinfo,sendresumeform:NgForm)
{
  this.service.sendresume(sendresumeinfo).subscribe(res=>{
    console.log(res.json().data);
    
    // if( res.json())
    // {
    //   console.log(res.json())
    //   this.sendresumeToClient=true;
    // }
    this.closepopup();
    if( res.json().statusCode.code==='200')
        {
         
          this.sendresumeToClient=true;
          this.successMsg='Candidate information has been sent to client Email-ID';
          this.errorMsg='';
          sendresumeform.reset();
          
this.sendresumeinfo={candidateinfo:'',canDesc:'',jobcode:'',candidateId:'',selectdoc:[]};
        }
        else{

          this.sendresumeToClient=true;
          this.successMsg='';
          this.errorMsg=res.json().errorMessages;

        }

  })

}


  //send candidate  resume to client  end


getFiles(event){ 
  this.files = event.target.files; 
  if(this.files.length != 0){
    this.fileName = true;
  }
  else{
    this.fileName = false;
  }
  // this.fileName = true;
  // console.log(this.files)
}

// assign hr for a recruiter

assignHr(){
  this.service.assignCandidateToHr(this.hrInfo).subscribe(res=>{
    this.closeHr();
    if( res.json().statusCode.code==='200')
        {
          this.assignHrtoCandidate=true;
          this.successMsg='HR is assigned to candidate successfully';
          this.errorMsg='';
        }
        else{

          this.assignHrtoCandidate=true;
          this.successMsg='';
          this.errorMsg=res.json().errorMessages;

        }

  })
}

candidateAssignHr(canId, jobCode){
  this.hrInfo.candidateId = canId;
  this.hrInfo.jobCode = jobCode;
  this.assignHR = true;
}

closeHr(){
  this.assignHR = false;
}
closeHRPopup() {
  // this.isShowPopup = !this.isShowPopup;
  this.assignHrtoCandidate = false;
  this.assignHR=false;
  this.successMsg='';
  this.errorMsg='';
}

}

  
 

