import { Component, OnInit } from '@angular/core';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {
  loading
  jobList;
  data;
  userData:any = {
    jobId:'',
    email_id:''
  };
  isSuccess:boolean = false;
  isFailure;
  isSuccess1:boolean = false;
  isFailure1;
  code;
  singleData;
  filterData;
  userId;
  jobsList = [];
  single =[];
  skills;
  wishData:any = {}; 
  result;
  candidateUser :any;
  candidateEmail:string;
  check: boolean;
  availableRecords = 0;
  candidateId;
  constructor(private service:VmsCandidateService, private http:Http) {
  }
 
  ngOnInit() {
    this.candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
    this.candidateEmail = this.candidateUser.data.email;
    this.candidateId=this.candidateUser.data.id;
    //matching jobs list - sharmistha - 08-01-2019 - start    
    this.getmatchingJobs();
//matching jobs list - sharmistha - 08-01-2019 - end
   
  }

getmatchingJobs()
{
  this.service.getJobList().subscribe(res=>{
    this.jobList = res.json().data; 
    console.log(this.jobList);
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
    console.log(this.jobList);     
    
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
      console.log(this.filterData);
      this.availableRecords = this.filterData.length;
    }
});
this.loading=false
}


  jobApply(jobId){
    console.log(jobId);
    this.userData.jobId = jobId;
    this.userData.email = this.candidateEmail;
    this.userData.candidateId = this.candidateId;
    this.service.jobApply(this.userData).subscribe(res=>{
      this.data = res.json();
     
      if (this.data.statusCode.code === '200') {
        this.isSuccess = true;
        // this.getmatchingJobs();
      } else {
        this.isFailure = true;
      }

    }); 
  };

  addtoWishList(code){
    console.log(code);
    this.wishData.jobId = code;
    this.wishData.email = this.candidateEmail;
    this.wishData.candidateId = this.candidateId;
    console.log(this.wishData);
    this.service.addWishList(this.wishData).subscribe(res=>{
      this.result = res.json();
      if (this.result.statusCode.code === '200') {
        this.isSuccess1 = true;
       
      } else if(this.result.statusCode.code === '409') {
        this.isFailure1 = true;
      }
    });
  }


  closePopup() {
    this.isFailure = !this.isFailure;
  }
  closePopup1(){
    this.isFailure1 = !this.isFailure1;
  }

  close() {
    this.loading=true;
    this.getmatchingJobs();
    this.isSuccess = false;
    
  }
  close1() {
    this.isSuccess1 = !this.isSuccess1;
    
  }

}
