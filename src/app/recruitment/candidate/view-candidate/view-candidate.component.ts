import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import {NgForm} from '@angular/forms';
// import {map} from 'rxjs/operators';
// import { of } from 'rxjs';
// import { Observable, Subject, asapScheduler, pipe, of, from,
//   interval, merge, fromEvent, } from 'rxjs';
//   import { map, filter } from 'rxjs/operators';
import { DataTableModule } from 'angular-6-datatable';


@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css']
})
export class ViewCandidateComponent implements OnInit {
  jobDetails;
  log;
  logger:any={};
  candidateInfo:any ={
    data:{
      firstName:'',
      lastName:'',
      city:{name:''},
      state:{name:''},
      country:{name:''}
    }
  }
  candidateDetails = {
    jobId: '',
    emailId: '',
    candidateId: '',
    status: '',
    comment: ''
  };
  addPayGrade={
      jobCode:'',
      candidateId:'',
      country:'',
      state:'',
      city:'',
      pay:'',
      payGrade:''
  }
  msg;
  addSummary={
    jobCode:'',
    candidateId:'',
    summary:'',
    summaryUser:'',
    userType:''
    }
  job={
    jobCode:'',
	  candidateId:'',
  }

  summeryUsers=[];

  educationData;
  experienceData;
  skillsData;
  loading;
  headers: any;
  options: any;
  sendmailpopup=false;
  id;
  expectedPay=[{
                id:'',
                jobTitle:{jobTitle: '', companyName: ''},
                payRate:'',
                payGrade: {id: '', payFrequency: ''},
                location:
                    {
                      country: {countryId: '', countryName: ''},
                      state: {stateId: '', stateName: ''},
                      city: {cityId:'',cityName:''}
                    },
                  date:''}];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  jobcode;

  isShowPopup=false;
  payfrequency=false;
  summary=false;
  viewCommunicationMsg=false;
  payfrequencylist:any={};
  messageslist=[
    {
      userFlag:false,
      user:'',
      profilePic:'',
      msg:'',
      timestamp:''
    }
  ];
  reasonPopUp=false;
  success;
  error;
  test:any;
  skillsinfo = [];
  skillrate = [];
  skillname = [];
  campaigns = [];
  dropdownSettings;
  subscribeUser = {
    email: '',
    campaign: []
  };
  selCampaign = [];
  subscribCandidate = false;
  isStatusShowPopup = false;
  statusMessage = false;
  statusError = '';

  jobstatus={
    jobCode:'',
    candidateId:'',
    applicationStatus:'',
    sales:false,
    recruiter:false,
    techJobTitle:'',
    jobTitle:{
      id:'',
      name:''
    },
    internalPay:''
  }
  documents;
  documentUrl;
  userPermissions: any;
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public backLoc: Location, private service:UserService, private eventEmitter:EventEmitterService) {   
    
    this.userPermissions = this.currentUser.permission; 
  }

  ngOnInit() {
    this.documentUrl = this.service.getBaseUrl() + '/frontend/candidate_docs/';
    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
        this.addPayGrade.candidateId=param.get('id');
        this.addSummary.candidateId=param.get('id');
        this.job.candidateId=param.get('id');
        console.log(this.id);
      }
    );
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='View Candidate';
    this.logger.comment='View Candidate by Id as'+this.id;
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      this.eventEmitter.onRecentActivityRefresh();
    });
    this.service.getCandidateId(this.id)
      .subscribe(response => {
        this.candidateInfo = response.json();
        this.educationData = this.candidateInfo.data.education;
        this.experienceData = this.candidateInfo.data.experience;
        this.skillsData = this.candidateInfo.data.skills;

        const candidate={
          id:'',
          name:'',
          userType:'Candidate',
          userName:'Candidate'
        };
        candidate.id=this.id;
        candidate.name=this.candidateInfo.data.firstName+' '+this.candidateInfo.data.lastName;
        this.summeryUsers.push(candidate);

        // chanhes by suresh 10-24-2019 start
        this.skillsData.forEach((obj) => {
          this.skillsinfo.push({ 'y': obj.experience, 'name': obj.skillName });
          this.skillname.push(obj.skillName);
          this.skillrate.push(obj.experience);
        });
        // chanhes by suresh 10-24-2019 end
      },
        error => {
          console.log(error);
        }
      );

      //modification done by BASIT023 start

      this.getexpectedPay();

      if(localStorage.getItem('applyJobId'))
      {
        this.jobcode=localStorage.getItem('applyJobId');
        if(this.jobcode)
        { 
        localStorage.setItem('applyJobId','');
        }
        this.addPayGrade.jobCode=this.jobcode;
        this.addSummary.jobCode=this.jobcode;
        this.job.jobCode=this.jobcode;

       this.checkjobstatus();
        // getjobDetails by job id
        this.service.getjobDetails(this.jobcode)
        .subscribe(response => {
          this.jobDetails=response.json().data;
          
          this.addPayGrade.country=response.json().data.country.id;
          this.addPayGrade.state=response.json().data.state.id;
          this.addPayGrade.city=response.json().data.city.id;  

          const recuriter={
            id:'',
            name:'',
            userType:'User',
            userName:'Recuriter'
          };
          recuriter.id=response.json().data.recruiter.userId;
          recuriter.name=response.json().data.recruiter.firstName+' '+response.json().data.recruiter.lastName;
          this.summeryUsers.push(recuriter);

          const client={
            id:'',
            name:'',
            userType:'Client',
            userName:'Client'
          };

          client.id=response.json().data.contact.id;
          client.name=response.json().data.contact.firstName+' '+response.json().data.contact.lastName;
          this.summeryUsers.push(client);

          // get sales person user Info
          this.service.getUserInfo(response.json().data.postedBy)
          .subscribe(result => {
              // console.log(result.json().data);
              // this.test=result.json();
              const sales={
                id:'',
                name:'',
                userType:'User',
                userName:'Sales'
              };
              sales.id=result.json().user_id;
              sales.name=result.json().first_name+' '+result.json().last_name;
              this.summeryUsers.push(sales);
    
          });

        },
          error => {
            console.log(error);
          }
        );
     this.getcommunication();
      }
      else{
        this.jobcode='';
      }

      this.service.getPayFrequency()
      .subscribe(response => {
        // console.log(response.json().data);
        this.payfrequencylist=response.json().data;

      },
        error => {
          console.log(error);
        }
      );

      // getcommunicationMsg
      // modification done by BASIT023 end
      this.service.getCampaigns()
      .subscribe(response => {
        if(response.json().statusCode.code === '200') {
          this.campaigns = response.json().data;
          this.getSubscribedCampaigns();
        }else{
          this.campaigns = [];
        }
      },
        error => {
          console.log(error);
        }
      );
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
    this.getDocuments();
  }
  goBack() {

    if(this.jobcode)
    { 
    localStorage.setItem('applyJobId',this.jobcode);
    }

    this.backLoc.back();
  }

  selectCampaign() {
    this.subscribCandidate = true;
  }

  addSubscriber() {
    this.loading = true;
    this.subscribeUser.email = this.candidateInfo.data.emailId;
    this.subscribeUser.campaign = [];
    if (this.selCampaign.length > 1) {
      // this.userData.roles = this.selRoles;
      this.selCampaign.forEach(Campaign => {
        this.subscribeUser.campaign.push(Campaign.id);
      });
    } else if (this.selCampaign.length === 1) {
      this.subscribeUser.campaign.push(this.selCampaign[0].id);
    } else {
      this.loading = false;
      this.error = 'Atleast one role must be assigned to user';
      return '';
    }
    this.service.addSubscriber(this.subscribeUser)
      .subscribe(response => {
        this.subscribCandidate = false;
        if(response.json().statusCode.code === '200'){
          this.isStatusShowPopup = true;
          this.statusMessage = true;
          this.statusError = '';
          this.loading = false;
        }else{
          this.isStatusShowPopup = true;
          this.statusMessage = false;
          this.statusError = response.json().errorMessages;
          this.loading = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getSubscribedCampaigns(){
    // getSubscribedCampaigns
    this.service.getSubscribedCampaigns(this.candidateInfo.data.emailId)
      .subscribe(response => {
        if(response.json().statusCode.code === '200') {
          this.selCampaign = response.json().data;
          console.log(this.selCampaign);
        }else{
          this.selCampaign = [];
        }
      },
        error => {
          console.log(error);
        }
      );
  }

  cancelAddSubscriber() {
    this.subscribCandidate = false;
  }

  closeStatusPopup() {

    this.isStatusShowPopup = false;
    this.statusMessage = false;
    this.statusError = '';
    this.reasonPopUp=false;
    this.sendmailpopup=false;
  }



  //modifications done by BASIT023 strat
  getcommunication()
  {
    this.service.getcommunicationMsg(this.job)
    .subscribe(response => {
      // console.log(response.json().data);
      this.messageslist=response.json().data;

    },
      error => {
        console.log(error);
      }
    );
  }
  payGrade()
  {
    this.payfrequency=true;
    this.isShowPopup=true;
    this.success='';
    this.error='';
    this.summary=false;
    this.viewCommunicationMsg=false;
    this.reasonPopUp=false;this.sendmailpopup=false;
  }

  summarypopup()
  {
    this.payfrequency=false;
    this.isShowPopup=true;
    this.success='';
    this.error='';
    this.summary=true;
    this.viewCommunicationMsg=false;this.reasonPopUp=false;this.sendmailpopup=false;
  }

  closePopup(){
    this.payfrequency=false;
    this.isShowPopup=false;
    this.summary=false;
    this.success='';
    this.error='';
    this.viewCommunicationMsg=false;
    this.reasonPopUp=false;this.sendmailpopup=false;

    this.addPayGrade.pay='';
    this.addPayGrade.payGrade='';
    this.addSummary.summary='';
    this.addSummary.summaryUser='';
  }

  addPayGradeInfo(addPayGrade,addExpectPayForm : NgForm)
  {
    this.service.addCandidateExpectedPay(addPayGrade)
    .subscribe(response => {
      // console.log(response);
      const result=response.json();
      if(result.statusCode.code==='200')
      {
        addExpectPayForm.reset();
        this.getexpectedPay();
        this.payfrequency=false;
        // this.isShowPopup=false;
        this.success='Candidated expected pay added';
        this.error='';
        this.summary=false;
        this.viewCommunicationMsg=false;
    
      }
      else
      {
        this.payfrequency=false;
        // this.isShowPopup=false;
        this.success='';
        this.summary=false;
        this.error=result.errorMessages;
        this.viewCommunicationMsg=false;
      }
    },
      error => {
        console.log(error);
      }
    );
    // console.log(addPayGrade);
  }

  addSummaryInfo(addSummary,addsummaryForm:NgForm)
  {    
    this.loading = true;
    this.service.addCandidateSummaryinfo(addSummary)
    .subscribe(response => {
      // console.log(response);
      const result=response.json();
      if(result.statusCode.code==='200')
      {
        addsummaryForm.reset();
        this.getexpectedPay();
        this.payfrequency=false;
        // this.isShowPopup=false;
        this.success='Candidate Mail Communication Added';
        this.error='';
        this.summary=false;
        this.viewCommunicationMsg=false;
        this.getcommunication();
    
      }
      else
      {
        this.payfrequency=false;
        // this.isShowPopup=false;
        this.success='';
        this.summary=false;
        this.error=result.errorMessages;
        this.viewCommunicationMsg=false;
      }
    },
      error => {
        console.log(error);
      }
    );
    
    this.loading = false;
  }


  getexpectedPay(){
    
    this.loading = true;
        this.service.getCandidateExpectedPay(this.id)
            .subscribe(response => {
              this.expectedPay=response.json().data;
              this.loading = false;
            },
              error => {
                console.log(error);
                this.loading = false;
              }
            );
      }

  communicationUser(id)
  {
    if(id)
    {
    const userType = this.summeryUsers.filter(x =>{
        if(x.id===id)
        {
          return x.userType;
        }
      }
      );
      this.addSummary.userType=userType[0].userType;
    }
  }

  communicationpopup()
  {
    this.payfrequency=false;
    this.isShowPopup=true;
    this.success='';
    this.error='';
    this.summary=false;
    this.viewCommunicationMsg=true;
    this.reasonPopUp=false;this.sendmailpopup=false;
  }

  
  applyjob(candId, emailId, candStatus, reason)
  {
    
    this.loading = true;
    // if(this.jobcode)
    // {
    //   console.log("Job details Trigged");
    // }
    // else{
    //   this.jobcode = localStorage.getItem('applyJobId');
    // }
    const data = { jobId: this.jobcode, candidateId: candId, status: candStatus, comment: reason };
    this.service.addCandidateApply(data)
      .subscribe(response => {
        const resp = response.json().data;
        if (resp === 'Job applied successfully') {
          const shortList={emailId :emailId,jobId: this.jobcode,status:candStatus,comment:reason};
          this.service.addShortList(shortList)
            .subscribe(superResp => {
              // this.checkresp = superResp.json();
            },
              error => {
                console.log(error);
              });
             this.checkjobstatus();
        }
        this.loading = false;
      },
        error => {
          console.log(error);
        });
        
    this.loading = false;
  }

  checkjobstatus()
  {
    
    this.loading = true;
    const data={jobId:this.jobcode,candidateId:this.id}
    this.service.checkjobapplystatus(data).subscribe(response=>{
      // console.log(response.json().data);
      if(response.json().statusCode.code==='200')
      {
        this.jobstatus=response.json().data;
      }
      else{
        console.log(response);
      }
      
    });
    
    this.loading = false;
  }


  //modifications done by BASIT023 end 


  // chanhes by suresh 10-24-2019 start
  
  onChartClick(event) {
    
  }

   // CHART COLOR.
   pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)',
        'rgba(74, 88, 188, 0.9)',
        'rgba(253, 46, 46, 0.9)',
        'rgba(4, 208, 1, 0.9)',
        'rgba(219, 42, 251, 0.9)',
        'rgba(3, 222, 202, 0.9)'
      ]
    }
  ]

   // ADD CHART OPTIONS. 
   pieChartOptions = {
    responsive: true
  }

  pieChartLabels = this.skillname;

  pieChartData: any = [
    {
      data: this.skillrate
    }
  ];

  // chanhes by suresh 10-24-2019 end

  candidateComment(candId, emailId) {
    
    this.loading = true;
    this.candidateDetails.candidateId = candId;
    this.candidateDetails.emailId = emailId;
    this.reasonPopUp = true;
    
    this.loading = false;
  }

  updateCandidateComment(rejectReasonForm:NgForm) {

    this.applyjob(this.candidateDetails.candidateId, this.candidateDetails.emailId, '1', this.candidateDetails.comment);
    rejectReasonForm.reset();
    this.checkjobstatus();
    this.closePopup();
  }

  sendLink(email) {
    this.loading = true;
    const emailData = {
      email:email,
      jobId:this.jobcode
    }
    // // this.emailData.email = this.email.email;
    // this.emailData.jobId = this.internalCode;
   
    this.service.sendJobApplyLink(emailData)
      .subscribe(response => {
        this.sendmailpopup = true;
        if (response.json().statusCode.code==='200') {
          // this.closeModel2();
          this.msg='Mail has been sent';
        }
        else{
          this.msg='Mail could not be sent';
        }
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  //  added get document details by suresh on 11-28-2019 start

  getDocuments(){
    this.service.getCandidateDocuments(this.id).subscribe(res=>{
      this.documents = res.json().data;
      console.log(this.documents)
    })
  }

  //  added get document details by suresh on 11-28-2019 start

  // getjobdetails(jobCode)
  // {
  //   this.service.getjobDetails(jobCode)
  //   .subscribe(response => {
  //     this.jobDetails= response.json().data;
  //   })
  // }

}
