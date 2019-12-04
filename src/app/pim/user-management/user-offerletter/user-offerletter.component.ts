import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { UserService} from './../../../core/services/user.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-user-offerletter',
  templateUrl: './user-offerletter.component.html',
  styleUrls: ['./user-offerletter.component.css']
})
export class UserOfferletterComponent implements OnInit {

  data = {
    userId:'',
    typeId:''
  }; 
  offerLetter = {
    userDigitalKey:{
      digitalKey:''
    },
    hrDigitalKey:{
      digitalKey:''
    },
    offerLetter:{
      user:{
        name:'',
        userId:'',
        jobTitle : {
          id:'',
          name:''
        }
      },
      hr:{
        name:'',
        userId:'',
        jobTitle : {
          id:'',
          name:''
        }
      },
      offerLetterTypeId:'',
      offerLetter: ''
    }
  }
  displayNext:boolean = false;
  offerLetters = [];
  logoUrl:any;
  gethrdigitalKey:any;
  getuserDigitalKey:any;
  digitalKeystatus = false;
  userDigitalKeystatus = false;
  isSuccess = false;
  loading = false;
  offerData = false;
  responseStatus = false;
  uploadhrsignature = false;
  signaturePad = false;
  userSignature = false;
  currentUser:any;
  imageData:any = {
    digital:''
  };
  imageChangedEvent: any = '';
  image1;
  imagePopSuccess=false;
  imagePop=false;
  signatureImage;
  error:any;
  result:any;
  userName:any={
    firstName:'',
    lastName:'',
    middleName:'',
    name:''
  };
  acceptnext: boolean = false;
  next:boolean = false;

  constructor(public http: Http,public location : Location ,private sanitizer: DomSanitizer,public service :UserService , public authenticationService:AuthenticationService,private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    const result = JSON.parse(localStorage.getItem('settings'));
    this.logoUrl = this.authenticationService.getBaseUrl() + '/frontend/logos/' + result.data.siteLogo;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.data.userId = this.currentUser.id;

    this.getUserOfferLetter();
    // this.getName(this.currentUser.id);
  }

  getUserOfferLetter(){
    this.loading = true;
    this.service.getOfferDetails()
      .subscribe(res => {
      this.offerLetters = res.json().data;
      console.log(this.offerLetters);
      if(this.offerLetters){
        if(this.offerLetters.length > 1){
          this.acceptnext = true;
        }
        else{
          this.next = true;
        }
        this.offerLetter = this.offerLetters[0];
        if(this.offerLetter){
          this.data.typeId = this.offerLetter.offerLetter.offerLetterTypeId;
          if(this.offerLetter.hrDigitalKey){
            this.digitalKeystatus = true;
          }
          else{
            this.digitalKeystatus = false;
          }
          if(this.offerLetter.userDigitalKey){
            this.userDigitalKeystatus = true;
            this.userSignature = true;
          }
          else{
            this.userDigitalKeystatus = false;
            this.userSignature = false
          }
        }        
        this.loading = false;
      }
      else{
        this.router.navigate(['myInfo']);
      }
    });
  }

  // getName(userId){
  //   this.loading = true;
  //   this.service.getName(userId).subscribe(res => {
  //     this.userName = res.json().data;
  //     if(!this.userName.middleName){
  //       this.userName.middleName='';
  //     }
  //     this.userName.name = this.userName.firstName+' '+this.userName.middleName+' '+this.userName.lastName;
  //   })    
  // }


  nextOfferLetter(){
    this.updateStatus(this.data);
    window.location.reload();
  }


  updateStatus(typeId){
    this.service.updateStatus(typeId)
    .subscribe(res => {
      this.result = res.json();
    })
  }

  uploadSignature(){
    this.offerData = true;
    this.responseStatus = false;
    this.uploadhrsignature = true;
    this.signaturePad = true;
  }

  editSignature(){
    this.offerData = true;
    this.responseStatus = false;
    this.userSignature = false;
    this.signaturePad = true;
  }

  uploadImage(){
    this.offerData = true;
    this.userSignature = false;
    this.signaturePad = false;
  }

  continue(){
    this.offerData = true;
    this.uploadhrsignature = false;
    this.isSuccess = true;
    this.getUserOfferLetter();
  }

  tryagain(){
    this.imagePop = false;
    this.error = '';
    this.getUserOfferLetter();
    this.offerData = true;
    this.responseStatus = false;
    this.uploadhrsignature = true;
    this.signaturePad = true;
  }

  imagepopup(){
    this.imagePopSuccess = false;
    this.error = false;
    this.imagePop = false;
  }

  viewOfferLetter(){
    this.offerData = false;
  }

  goBack(){
    this.userSignature = true;
  }

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

  addimage()
  {
    if(this.imageData.digital)
    {
      this.service.addUserDigitalKey(this.imageData)
      .subscribe(res => {
      const result =res.json();
        if(result.statusCode.code==='200')
        {
          this.imageData.digital = '';
          // this.updateStatus(this.data);
          this.getUserOfferLetter();
        }
        else{
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
      this.error="Please provide valid information";
    }   
  }

  showImage(data) {
    this.imageData.digital = data;
    console.log(data);
    if(this.imageData.digital)
    {
      this.service.addUserDigitalKey(this.imageData)
      .subscribe(data => {
      const result =data.json();
        if(result.statusCode.code==='200')
        {
          this.imageData.digital = '';
          // this.updateStatus(this.data);
          this.getUserOfferLetter();
        }
        else{
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
      this.error="Please provide valid information";
    }   
  }

  public captureScreen() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      let imgWidth = 158;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 10;
      pdf.addImage(contentDataURL, 'PNG', 25, position, imgWidth, imgHeight);
      pdf.save(this.offerLetter.offerLetter.user.name + '-offerletter.pdf');
    });
  }

}

