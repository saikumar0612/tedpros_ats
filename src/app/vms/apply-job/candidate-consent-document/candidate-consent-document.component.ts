import { Component, OnInit } from '@angular/core';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ActivatedRoute,Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-candidate-consent-document',
  templateUrl: './candidate-consent-document.component.html',
  styleUrls: ['./candidate-consent-document.component.css']
})
export class CandidateConsentDocumentComponent implements OnInit {

  docId;
  jobId;
  documentData = {
    documentId:'',
    documentTemplate:'',
    documentName:'',
    id:'',
    jobId:'',
    recruiter:{
      signature:'',
      firstName:'',
      lastName:'',
      email:'',
      jobTitle:''
    },
    status:''
  }; 
  companyName;
  siteLogo;
  todayDate;
  candidateUser;
  today = new Date();
  candidateId;
  candidateName;
  signature={
    signature:'',
    id:'',
    email:''
  };
  mailData:any = {};
  signaturePad:boolean = false;
  signatureData:any = {};
  details:any = {};
  result = {
    statusCode:{
      code:''
    }
  }
  isSuccess:boolean = false;
  mailSubmit:boolean = false;
  sendData = {
    statusCode:{
      code:'',
      message:''
    },
    errorMessages:'',
    data:{}
  };
  successMsg:any;
  errorMsg:any;
  mailSuccess:boolean = false;
  mailFailure:boolean = false;

  constructor(private service:VmsCandidateService, private router: Router, private route: ActivatedRoute,private authenticationService:AuthenticationService, public location : Location) { }

  getAssignedDocument(jobId, docId){
    this.service.getAssignedDocument(jobId, docId)
    .subscribe(res =>{
      if(res.json().data){
        this.documentData = res.json().data;
        console.log(this.documentData);
        this.mailData.documentName = this.documentData.documentName;
        this.mailData.documentTemplate = this.documentData.documentTemplate;
        this.mailData.recruiter = this.documentData.recruiter;
        this.mailData.documentId = docId;
        this.mailData.id = this.documentData.id;
        this.mailData.jobId = jobId;
      }      
    })
  }
    

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.jobId = param.get('jobId');
        this.docId = param.get('docId');
      }
    );

    const result = JSON.parse(localStorage.getItem('settings'));
    this.companyName = result.data.title;
    this.siteLogo =this.authenticationService.getBaseUrl() +'/frontend/logos/'+ result.data.siteLogo;
    this.todayDate = new DatePipe('en-US').transform(this.today, 'yyyy-MM-dd');
    this.candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
    this.candidateId = this.candidateUser.data.candidateId;
    this.candidateName = this.candidateUser.data.firstName + ' ' + this.candidateUser.data.lastName;

    this.getAssignedDocument(this.jobId, this.docId);

    this.service.getDigitalKey().subscribe(res => {
      this.signature=res.json().data;
      console.log(this.signature);
      this.mailData.candidateId = this.signature.id;
      this.mailData.signature = this.signature.signature;
      this.mailData.candidateEmail = this.signature.email;
    });
    
  }

  back(){
    this.location.back();
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
    this.getAssignedDocument(this.jobId, this.docId);
    this.mailSubmit = false;
  }

  sendMail(){
    console.log(this.mailData);
    this.service.pdfSave(this.mailData).subscribe(res=>{
      // console.log(res);
      this.sendData = res.json();
      if(res.json().statusCode.code === "200"){
        this.mailSubmit = true;
        this.mailSuccess = true;
        this.mailFailure = false;
        this.successMsg = this.sendData.data;
      }
      else{
        this.mailSubmit = true;
        this.mailSuccess = false;
        this.mailFailure = true;
        this.errorMsg = this.sendData.errorMessages;
      }
      // console.log(this.sendData);
    })
  }
}
