import { Component, OnInit } from '@angular/core';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { DatePipe , Location} from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  workData;
  today = new Date();
  formDisplay:boolean = false;
  result;
  submitData:any = {};
  candidateUser:any;
  candidateId;
  data;
  letterData:any={};
  deletingData:any={};
  resuletData;
  special_offer;
  tedCommunication;
  newsLetter;
  accountData:any;
  coverLetterDetails:boolean = false;
  letterDetails:any = {
    title:'',
    letter:''
  };
  deleteData:any;
  passwordPopup:any;
  changesData:any ={
    password:'',
    cpassword:'',
    oldPassword:'',
    id:''
  };
  changeEmailData:any = {};
  response;
  error;
  emailPopup:any;
  emailData :any = {};
  emailError = '';
  filterData:any={email:''};
  settingsPopup:any;
  changeMailPopup:any;
  changePasswordPopup:any;
  changeEmailErrorPopup:any;
  addDoc:boolean = false;
  uploader: any;
  files : FileList;
  fileName:boolean = false;
  documentData:any = {
    title:'',
    comment:'',
    fileData:'',
    type:''
  };
  docData;
  documentUrl;
  deletedocData:any;
  deletedItems:any = {};
  responce;
  docMessage:any;
  docErrorMessage:any;
  start;
  dateError;
  expiryDate;
  constructor(private service :VmsCandidateService, private blocation:Location, private router:Router, private authenticationService:AuthenticationService) { }

    // validate expiry date
    dateValidate() {
      this.start = new Date(Date.now());
      
      if (this.documentData.expiryDate < this.start) {
        this.dateError = 'Please select a valid expiry date';
      }
      else {
        this.dateError = "";
      }
    }

  ngOnInit() {
    this.documentUrl = this.service.getBaseUrl() + '/frontend/candidate_docs/';
    console.log(this.documentUrl);
   
    this.candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
    this.candidateId = this.candidateUser.data.id;

    this.uploader = new FileUploader({
      url: this.service.uploadCanDoc(),
      itemAlias: 'document',
      parametersBeforeFiles: true,
      headers: [{ name: 'Token', value: this.candidateUser.token }]
    });

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('candidateId', this.candidateId); 
      form.append('title', this.documentData.title);      
      form.append('comment', this.documentData.comment);  
      if (this.documentData.expiryDate) {
        this.expiryDate = new Date(this.documentData.expiryDate);
      }
      else {
        this.expiryDate = "0000-00-00";
      } 
      form.append('expiryDate', this.expiryDate); 
      form.append('type', this.documentData.type); 
    };
    // handle response for file upload - start
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    // handle response for file upload - end

    this.service.getCandidatePersonal(this.candidateUser.data.email)
    .subscribe(response => {
      this.data = response.json();
      this.filterData = this.data.data;
    },
      error => {
        console.log(error);
      }
    );
    // get work authentication

    this.service.getWorkAuth().subscribe(res=>{
      this.workData = res.json().data;
    });

    // get account details 

    this.service.getCanAccountDetails().subscribe(res=>{
      this.accountData = res.json().data;
      // console.log(this.accountData);
      if(this.accountData){
        this.submitData.workAuth = this.accountData.workAuth.id;
        this.submitData.to_change = this.accountData.to_change;
        
        this.submitData.newsLetter = this.accountData.newsLetter;
        this.submitData.special_offer = this.accountData.special_offer;
        this.submitData.tedCommunication = this.accountData.tedCommunication;
        if(this.submitData.newsLetter === '1'){
          this.newsLetter  = true;
        }else{
          this.newsLetter  = false;
        }
        if(this.submitData.special_offer === '1'){
          this.special_offer  = true;
        }else{
          this.special_offer  = false;
        }
        if(this.submitData.tedCommunication === '1'){
          this.tedCommunication  = true;
        }else{
          this.tedCommunication  = false;
        }
      }
      
      
    });
    this.getCoverLetter();
    this.getDocuments();
  }

  // handle response for file upload - start
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response); //success server response
    // console.log(data);
    if(data.statusCode.code === "200"){
      this.docErrorMessage = "";
      this.docMessage = "Document uploaded successfully!";
    }
    else{
      this.docMessage = "";
      this.docErrorMessage = data.errorMessages;
    }    
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let error = JSON.parse(response); //error server response
    // console.log(error);
    this.docErrorMessage = error;
  }
  // handle response for file upload - end

  getFiles(event:any){ 
    this.files = event.target.files; 
    if(this.files.length != 0){
      this.fileName = true;
    }
    else{
      this.fileName = false;
    }
  }

      // get cover letters data
  getCoverLetter(){
    this.service.getCoverLetters().subscribe(res=>{
      this.resuletData = res.json().data;
      // console.log(this.resuletData);
    });
  }

  

  addCoverLetters(){
    this.formDisplay = true;
  }
  closeOfferLetter(letterFrm:NgForm){
    this.formDisplay = false;
    letterFrm.resetForm();
  }

  addCoverletter(letterFrm:NgForm){
    this.letterData.candidateId = this.candidateId ;
    this.letterData.date =  new DatePipe('en-US').transform(this.today, 'yyyy-MM-dd');
    this.service.addCoverletter(this.letterData).subscribe(res=>{
      this.data = res.json();
      console.log(this.data);
      if(this.data.statusCode.code === '200'){
        letterFrm.resetForm();
        this.formDisplay = false;
        this.getCoverLetter();
        // this.closeOfferLetter(letterFrm:NgForm)
      }
    });
  }

  addInfo(){
    if(this.special_offer){
      this.special_offer = 1;
    }else{
      this.special_offer = 0;
    }
    if(this.tedCommunication){
      this.tedCommunication = 1;
    }else{
      this.tedCommunication = 0;
    }
    if(this.newsLetter){
      this.newsLetter = 1;
    }else{
      this.newsLetter = 0;
      console.log(this.newsLetter)
    }
    this.submitData.candidateId = this.candidateId ;
    this.submitData.special_offer = this.special_offer ;
    this.submitData.tedCommunication = this.tedCommunication ;
    this.submitData.newsLetter = this.newsLetter ;
    this.service.candidatesSettings(this.submitData).subscribe(res=>{
      this.result = res.json();
      console.log(this.result);
      // addInfo.resetForm();
      if(this.result.statusCode.code === '200'){
        this.settingsPopup = true;
      }
    });
  }

  closeSettingsPopup(){
    this.settingsPopup = false;
  }

  cancel(){
    this.blocation.back();
  }

  openPopup(id){
    console.log(id);
    this.coverLetterDetails = true;
    this.service.getCoverLettersById(id).subscribe(res=>{
      this.letterDetails = res.json().data;
      console.log(this.letterDetails);
    })
  }

  closePopup(){
    this.coverLetterDetails = false;
  }

  delete(id){
    console.log(id);
    this.deletingData.latterId = id;
    this.service.deleteCandidateCoverLetter(this.deletingData).subscribe(res=>{
      this.deleteData = res.json();
      console.log(this.deleteData);
      if(this.deleteData.statusCode.code === '200'){
        this.getCoverLetter();
      }
    })
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
        this.passwordPopup = false;
        this.changePasswordPopup = true;
        // this.router.navigate(['/vms/candidate-login-register']);
      }
      else if(this.response.statusCode.code === '409'){
        this.error = this.response.errorMessages;
      }
    });
  }

  closeEmailPopup(emailForm:NgForm){
    this.emailPopup = false;
    emailForm.resetForm();
  }

  closechangePasswordPopup(){
    this.changePasswordPopup = false;
  }

  email(){
    this.emailPopup = true;
  }

  changeEmail(emailForm:NgForm){
    console.log(this.changeEmailData);
    this.service.changeCandidateEmail(this.changeEmailData).subscribe(res=>{
      this.responce = res.json();
      console.log(this.responce);
      if(this.responce.statusCode.code === '200'){
        emailForm.resetForm();
        this.emailPopup = false;
        this.changeMailPopup = true;
      }else{
        this.changeEmailErrorPopup = true;
        this.error = this.responce.errorMessages;
      }
    });

  }

  closeEmailErrorPopup(){
    this.changeEmailErrorPopup = false;
  }

  closechangeMailPopup(){
    this.logout();
  }

  logout(){
    this.authenticationService.candidatelogout();
  }
 
  checkMail() {
    const email = this.changeEmailData.email;
    this.authenticationService.checkRegisterEmail(email)
      .subscribe(response => {
        const result = response.json();
        if (result.statusCode.code === '409') {
          this.changeEmailData.email = '';
          this.emailError = 'This email is already registered';
        } else {
          this.emailError = '';
        }
      },
        error => {
          console.log(error);
        });
  }


  addDocuments(){
    this.addDoc = true;
  }
  closeDocuments(documentFrm:NgForm){
    this.addDoc = false;
    documentFrm.resetForm();
  }

  close(documentFrm:NgForm){
    this.documentData.fileData = '';
    documentFrm.resetForm();
    this.addDoc = false;
    this.getDocuments();
  }

  getDocuments(){
    this.service.getCandidateDocuments().subscribe(res=>{
      this.docData = res.json().data;
    });
  };

  deleteDoc(id){
    console.log(id)
    this.deletedItems.docId = id;
    this.service.deleteCandidateDocument(this.deletedItems).subscribe(res=>{
      this.deletedocData = res.json();
      if(this.deletedocData.statusCode.code === '200'){
        this.getDocuments();
      }
    });
  }

}
