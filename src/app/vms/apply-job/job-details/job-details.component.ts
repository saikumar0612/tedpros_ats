import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import {SafeHtmlPipe} from '../../../core/pipes/safe-html.pipe';
import { Http } from '@angular/http';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  details:any = {
    job:{id:'',name:''},company:{id:'',name:''},contact:{id:'',firstName:'',lastName:''},country:{id:'',name:''},state:{id:'',name:''},city:{id:'',name:''},
    employmentType:'',externalBillRate:'',openings:'',perHour:{id:'',pay_frequency:''},primarySkills:'',targetDate:'',internalCode:''
  };
  jobList;
  jobsList = [];
  id;
  singleData;
  userId;
  filterData:any = [];
  userData:any = {
    jobId:'',
    email:'',
    candidateId:''
  };
  data;
  isSuccess;
  isFailure;
  candidatPersonal;
  wishData:any = {};
  result;
  isSuccess1;
  isFailure1;
  check: boolean;
  availableRecords = 0;
  showData:any;
   candidateUser = JSON.parse(localStorage.getItem('candidateUserData')); 
  candidateEmail;
  candidateId;
  constructor(public service:VmsCandidateService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
   }

   getjobdetails(id){
    this.service.getJobDetails(id).subscribe(res=>{
      this.details = res.json().data;
      console.log(this.details);
      this.userData.jobId = this.details.internalCode;
      
    });
   }

  ngOnInit() {
    this.candidateId = this.candidateUser.data.id;
    this.candidateEmail = this.candidateUser.data.email;
    this.userData.email = this.candidateEmail;
    this.userData.candidateId = this.candidateId;
    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
      }
    );

    this.getjobdetails(this.id);

    

    //getting job list added suresh 09-18-2018 start 
      //matching jobs list - sharmistha - 08-01-2019 - start    
    this.service.getJobList().subscribe(res=>{
      this.jobList = res.json().data;   
      // console.log(this.jobList);   
      // this.jobList.forEach(obj => {
      //   if(obj != null){
      //     this.check =false;
      //     obj.forEach(job => {
      //       this.jobsList.push(job);
      //     })
      //   }
      //   else{
      //     this.check=true;
      //   }
      // });
      if(this.jobList){
        for (let i = 0; i < this.jobList.length; i++) {
          for (let j = i + 1; j < this.jobList.length;) {
            if (this.jobList[j].code == this.jobList[i].code) {
              for (let k = j; k < this.jobList.length; k++) {
                this.jobList[k] = this.jobList[k + 1];
              }
              this.jobList.length--;
            }
            else {
              j++;
            }
          }
        }
        this.filterData = this.jobList;
        this.availableRecords = this.jobList.length;
        // console.log(this.jobList);
        if(this.jobList){
          this.showData = true;
        }else{
          this.showData = false;
        }
        // console.log(this.availableRecords);
      }
    });
//matching jobs list - sharmistha - 08-01-2019 - end
    //getting job list added suresh 09-18-2018 start
    
     
  }
   
  jobApply(){
    console.log(this.userData);
   
    this.service.jobApply(this.userData).subscribe(res=>{
      this.data = res.json();
      if (this.data.statusCode.code === '200') {
        this.isSuccess = true;
      } else {
        this.isFailure = true;
      }
    });
  }

  addtoWishList(code){
    console.log(this.candidateEmail);
    this.wishData.jobId = code;
    this.wishData.email = this.candidateEmail;
    this.wishData.candidateId= this.candidateId
    this.service.addWishList(this.wishData).subscribe(res=>{
      this.result = res.json();
      if (this.result.statusCode.code === '200') {
        this.isSuccess1 = true;
      } else {
        this.isFailure1 = true;
      }
    });
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
    this.getjobdetails(this.id);
  }

  closePopup1(){
    this.isFailure1 = !this.isFailure1;
  }

  close1() {
    this.isSuccess1 = !this.isSuccess1;
  }



}
