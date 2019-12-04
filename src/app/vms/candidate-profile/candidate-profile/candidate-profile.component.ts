import { Component, OnInit } from '@angular/core';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {AuthenticationService } from '../../../core/services/authentication.service';
import { MailService } from '../../../core/services/mail.service';
 
@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {
  data:any = {};
  candidateUser:any;
  candidateData:any = {
    image:'',
    firstName:'',
    lastName:'',
    email:'',
    number:'',
    address:'',
    country:{
      id:'',
      name:'',
    },
    state:{
      id:'',
      name:'',
    },
    city:{
      id:'',
      name:'',
    }
  };
  candidateEmail;
  skillData;
  skillArray:any = [];
  barChartLabels;
  barChartData;
  skillCode:any = [];
  educations;
  skills;
  experience;
  jobList:any = {
    skills:''
  }
  jobsList = [];
  filterData;
  check: boolean;
  candidateId;
  resumeData;
  resume;
  resumeUrl='';
  shortlistData:any = [];
  shortlistDataCount;
  onHoldData:any = [];
  onHoldDataCount;
  selectedData:any = [];
  selectedDataCount;
  rejectedData:any = [];
  rejectedDataCount;
  appliedJobs;
  wishlist;
  result;
  eventsCount;
  availableRecords = 0;
  rejectedCount:any;
  skillList;
  jobSkills:any = [];
  resultData;
  wishData:any = {}; 
  isSuccess1:boolean = false;
  isFailure1;
  response:any;
  changesData:any ={
    password:'',
    cpassword:'',
    oldPassword:'',
    id:''
  };
  error;
  passwordPopup:any;
  emailPopup:any;
  emailData :any = {};
  emailError = '';
  addwishData;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  constructor(private service:VmsCandidateService,private router: Router, private authenticationService:AuthenticationService,public mailService: MailService) { 
  }

  ngOnInit() {
    this.resumeUrl = this.service.getBaseUrl() + '/frontend/resume/';

    this.candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
    this.candidateId = this.candidateUser.data.id;
    this.candidateEmail = this.candidateUser.data.email;
    this.service.getCandidatePersonal(this.candidateEmail).subscribe(res=>{
      this.data = res.json().data;
      this.candidateData = this.data;
      this.educations = this.data.education;
      this.skills = this.data.skills;
      this.experience = this.data.experience;
    });

    this.service.getJobList().subscribe(res=>{
      this.jobsList = res.json().data;      
      // this.jobList.forEach(obj => {
      //   if(obj != null){
      //     this.check =false;
      //     obj.forEach(job => {
      //       this.jobsList.push(job);
      //       // console.log(this.jobList);
      //     })
      //   }
      //   else{
      //     this.check=true;
      //   }
      // });
      // console.log(this.jobsList);
      if(this.jobsList){
        for (let i = 0; i < this.jobsList.length; i++) {
          for (let j = i + 1; j < this.jobsList.length;) {
            if (this.jobsList[j].code == this.jobsList[i].code) {
              for (let k = j; k < this.jobsList.length; k++) {
                this.jobsList[k] = this.jobsList[k + 1];
              }
              this.jobsList.length--;
            }
            else {
              j++;
            }
          }
        }
        this.filterData = this.jobsList;
        
        
      }
      // this.filterData.forEach(obj=>{
      //   // console.log(obj);
      //   obj.skill = obj.skills.skillName;
      //   this.jobList.skill = obj.skill
      //   console.log(this.jobList);
      // })
    });

     // get skill treands 
     this.service.getskillTrends().subscribe(res=>{
      this.skillData = res.json().data;
      this.skillData.forEach(x=>{
        this.skillArray.push(x.skill) ;
        this.skillCode.push(x.count);   
      })
      this.barChartLabels =this.skillArray;
    })

    this.barChartData = [
      { data:this.skillCode, label: 'Skills' , 'backgroundColor':'#67a5e6'}
    ];

    this.service.getCandidateResume(this.candidateId).subscribe(res=>{
      this.resumeData = res.json().data;
      if(this.resumeData){
        this.resume = this.resumeData.document;
      }else{
        this.resume = '';
      }
    });

      // get shortlist date 
    this.service.jobstatusCounts().subscribe(res=>{
      this.resultData  = res.json().data;
      if(this.resultData){
        this.shortlistData = this.resultData.shortlist;
        this.onHoldData = this.resultData.onhold;
        this.selectedData = this.resultData.selected;
        this.rejectedData = this.resultData.rejected;
        if(this.shortlistData){
          this.shortlistDataCount = this.shortlistData.length;
        }else{
          this.shortlistDataCount = 0;
        }
        if(this.onHoldData){
          this.onHoldDataCount = this.onHoldData.length;
        }else{
          this.onHoldDataCount = 0;
        }
        if(this.selectedData){
          this.selectedDataCount = this.selectedData.length;
        }else{
          this.selectedDataCount = 0;
        }
        if(this.rejectedData){
          this.rejectedDataCount = this.rejectedData.length;
        }else{
          this.rejectedDataCount = 0;
        }
      }else{
        this.shortlistDataCount = 0;
        this.onHoldDataCount = 0;
        this.rejectedDataCount = 0;
      }
    });
     
  // get applied jobs
    this.service.getAppliedJobs().subscribe(res=>{
      this.data = res.json().data;
      // this.appliedJobs = this.data.length;
      if(this.data){
        this.appliedJobs = this.data.length;
      }else{
        this.appliedJobs = 0;
      }
    });
  
      // get wishlistdata
    this.service.getWishList(this.candidateEmail).subscribe(res=>{
      this.data = res.json().data;
      if(this.data){
        this.wishlist = this.data.length;
      }else{
        this.wishlist = 0;
      }
    });

      // get calander events

    this.service.getCalendarEventsCandidate().subscribe(res=>{
      this.result = res.json().data;
      console.log(this.result);
      if(this.result){
        this.eventsCount = this.result.length;
      }else{
        this.eventsCount = 0;
      }

    });

    
  }

  addtoWishList(code){ 
    console.log(code);
    this.wishData.jobId = code;
    this.wishData.email = this.candidateEmail;
    this.wishData.candidateId = this.candidateId;
    console.log(this.wishData);
    this.service.addWishList(this.wishData).subscribe(res=>{
      this.addwishData = res.json();
      console.log(this.addwishData);
      if (this.addwishData.statusCode.code === '200') {
        this.isSuccess1 = true;
       
      } else {
        this.isFailure1 = true;
      }
    });
  }

  close1() {
    this.isSuccess1 = !this.isSuccess1; 
  }
  closePopup1(){
    this.isFailure1 = !this.isFailure1;
  }
  password(){
    this.passwordPopup = true;
  }
  closePasswordPopup(passwordForm:NgForm){
    this.passwordPopup = false;
    passwordForm.resetForm();
  }
  changePassword(passwordForm:NgForm){
    this.changesData.id= this.candidateId ;
    // console.log(this.changesData)
    this.service.changeCandidatePassword(this.changesData).subscribe(res=>{
      this.response = res.json();
      console.log(this.response)
      if(this.response.statusCode.code === '200'){
        passwordForm.resetForm();
        this.router.navigate(['/vms/candidate-login-register']);
      }
      else if(this.response.statusCode.code === '409'){
        this.error = this.response.errorMessages;
      }
    });
  }

  closeEmailPopup(){
    this.emailPopup = false;
  }

  email(){
    this.emailPopup = true;
  }

  changeEmail(){
    console.log(this.emailData);
  }

  checkMail() {
    const email = this.candidateData.email;
    this.authenticationService.checkRegisterEmail(email)
      .subscribe(response => {
        const result = response.json();
        if (result.statusCode.code === '409') {
          this.candidateData.email = '';
          this.emailError = 'This email is already registered';
        } else {
          this.emailError = '';
          // this.getPHPListToken();
          // this.mailService.addSubscriber(email)
          //   .subscribe(resp => {
          //     console.log('Add email');
          //     console.log(resp);
          //   },
          //     error => {
          //       console.log(error);
          //     });
        }
      },
        error => {
          console.log(error);
        });
  }

  // getPHPListToken() {
  //   this.mailService.createSession('admin', 'Pass12!@')
  //     .subscribe(resp => {
  //       console.log('generate token');
  //       console.log(resp);
  //     },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // uploadPic() {
  //   if (this.image !== '') {
  //     const candidate = {
  //       id: this.candidateId,
  //       image: this.image
  //     };
  //     this.service.uploadCandidate(candidate)
  //       .subscribe(response => {
  //         const result = response.json();
  //         this.uploadData = result;
  //         if (this.uploadData.statusCode.code === '200') {
  //           this.isShowPopup1 = true;
  //           this.error = null;
  //           this.message = this.uploadData.data;
  //         } else {
  //           this.isShowPopup1 = true;
  //           this.error = this.uploadData.errorMessages;
  //           this.message = null;
  //         }
  //       });

  //   }
  // }

}
