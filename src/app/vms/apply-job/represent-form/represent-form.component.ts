import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { DatePipe } from '@angular/common';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-represent-form',
  templateUrl: './represent-form.component.html',
  styleUrls: ['./represent-form.component.css']
})
export class RepresentFormComponent implements OnInit {
  companyName;
  id;
  details;
  recruiterName;
  jobTitle;
  candidateUser;
  candidateName;
  today = new Date();
  todayDate;
  siteLogo;
  signaturePad:any;
  signature:any= {
    signature:''
  }
  result;
  signatureData:any = {};
  candidateId;
  isSuccess:any;
  sendData;
  mailData:any = {};
  mailSubmit:any;
  constructor(private service:VmsCandidateService,private route: ActivatedRoute,private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.todayDate = new DatePipe('en-US').transform(this.today, 'yyyy-MM-dd');
    this.candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
    console.log(this.candidateUser);
    this.candidateId = this.candidateUser.data.candidateId;
    console.log(this.candidateId);
    // this.signature = this.candidateUser.data.signature;
    this.candidateName = this.candidateUser.data.firstName + ' ' + this.candidateUser.data.lastName;

    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
      }
    );

    const result = JSON.parse(localStorage.getItem('settings'));
    this.companyName = result.data.title;
    this.siteLogo =this.authenticationService.getBaseUrl() +'/frontend/logos/'+ result.data.siteLogo;

    this.mailData.companyName = this.companyName;
    this.mailData.candidateName = this.candidateName;
    this.mailData.date = this.todayDate ;
   

    this.service.getJobDetails(this.id).subscribe(res=>{
      this.details = res.json().data;
      console.log(this.details);
      this.recruiterName = this.details.recruiter.firstName+ ' ' + this.details.recruiter.lastName;
      this.jobTitle = this.details.techJobTitle;

      this.mailData.jobId =this.details.internalCode;
      this.mailData.jobTitle = this.details.techJobTitle;
      this.mailData.recruiterName = this.recruiterName;
      
    });

     this.service.getDigitalKey().subscribe(res => {
      this.signature=res.json().data;
      console.log(this.signature);
      this.mailData.candidateId = this.signature.id;
      this.mailData.signature = this.signature.signature;
      this.mailData.candidateEmail = this.signature.email;
    });
  }

  uploadSignature(){
    this.signaturePad = true;
  }


  
  showImage(data){
    this.signatureData.signature = data;
    console.log(this.details);
    this.service.addSignature(this.signatureData).subscribe(res=>{
      this.result = res.json();
      console.log(this.result);
      if(this.result.statusCode.code==='200'){
        // this.signaturePad = false;
        this.isSuccess = true;
      }
    })
  }

  closeSignature(){
    this.isSuccess = false;
    window.location.reload();
  }
  closeSubmitForm(){
    this.mailSubmit = false;
  }

  sendMail(){
    console.log(this.mailData);
    this.service.pdfSave(this.mailData).subscribe(res=>{
      console.log(res);
      this.mailSubmit = true;
      // this.sendData = res.json();
      // console.log(this.sendData);
    })
  }


}
