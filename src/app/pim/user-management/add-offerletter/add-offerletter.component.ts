import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { UserService} from './../../../core/services/user.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
declare var CKEDITOR: any;

@Component({
  selector: 'app-add-offerletter',
  templateUrl: './add-offerletter.component.html',
  styleUrls: ['./add-offerletter.component.css']
})
export class AddOfferletterComponent implements OnInit {

  data = {
    userId:'',
    content:'',
    typeId:''
  }; 
  offerLetter = {
    user:{
      name:'',
      userId:''
    }
  };
  logoUrl:any;
  getdigitalKey:any;
  getuserDigitalKey:any;
  digitalKeystatus = false;
  userDigitalKeystatus = false;
  safeSrc: SafeResourceUrl;
  responses:any;
  error:any;
  isSuccess = false;
  isFailure = false;
  loading = false;
  offerData = false;
  responseStatus = false;
  uploadhrsignature = false;
  signaturePad = false;
  imageData:any = {
    digital:''
  };
  imageChangedEvent: any = '';
  image1;
  imagePopSuccess=false;
  imagePop=false;
  signatureImage;
  offerLetterTemplate:any;
  config: any;

  constructor(public http: Http,public location : Location ,private sanitizer: DomSanitizer,public service :UserService , public authenticationService:AuthenticationService,private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    const result = JSON.parse(localStorage.getItem('settings'));
    this.logoUrl = this.authenticationService.getBaseUrl() + '/frontend/logos/' + result.data.siteLogo;

    this.route.paramMap.subscribe(
      param => {
        this.data.userId = param.get('id');
        this.data.typeId = param.get('typeId');
      }
    );

    this.getUserOfferLetter();
    this.getOfferLetterTemplateById(this.data.typeId);

    this.config = {
      uiColor: '#d9e4fb',
      on: {
        pluginsLoaded: function() {
          console.log('this ', this);
          const editor = this;
          // editor.ui = {};
          // editor.config = {};
          const config = editor.config;

          editor.ui.addRichCombo('my-combo', {
            label: 'Custom Fields',
            title: 'Custom Fields',
            toolbar: 'basicstyles,0',
            panel: {
              css: [CKEDITOR.skin.getPath('editor')].concat(config.contentsCss),
              multiSelect: false,
              attributes: { 
                'aria-label': 'Custom Fields'
              }
            },
            init: function() {
              this.add(
                '{{User_First_Name}}',"User First Name"
              );
              this.add(
                '{{User_Last_Name}}',"User Last Name"
              );
              this.add(
                '{{User_Middle_Name}}',"User Middle Name"
              );
              this.add(
                '{{User_Job_Title}}',"User Job Title"
              );
              this.add(
                '{{User_Job_Department}}',"User Job Department"
              );
              this.add(
                '{{User_Salary}}',"User Salary"
              );
              this.add(
                '{{User_Pay_Frequency}}',"User Pay Frequency"
              );
            },
            onClick: function(value) {
              editor.focus();
              editor.fire('saveSnapshot');
              editor.insertHtml(value);
              editor.fire('saveSnapshot');
            }
          });
        }
      },
      resize_enabled: true,
    };
  }

  getOfferLetterTemplateById(typeId){
    this.service.getOfferLetterById(this.data.typeId)
      .subscribe(res => {
      this.offerLetterTemplate = res.json().data;
      this.data.content = this.offerLetterTemplate.template;
      // console.log(this.offerLetterTemplate);
    });
  }

  getUserOfferLetter(){
    this.service.getOfferLettersById(this.data.userId,this.data.typeId)
      .subscribe(res => {
      this.offerLetter = res.json().data;
      // console.log(this.offerLetter);
    });
  }

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

  getUserDigitalKey(id)
  {
    this.service.getDigitalKeyById(id)
    .subscribe(res => {
    this.getuserDigitalKey=res.json();
      if(res.json().statusCode.code==='200')
      {
        this.userDigitalKeystatus=true;
      }
      else
      {
        this.userDigitalKeystatus=false;
      }
    
    });
  }

  generateOfferLetter()
  {
    if(this.data.content)
    {     
      if(this.data.userId!=='')
      {    
      this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.data.content);
      this.service.addOfferLetter(this.data)
      .subscribe(res => {
      this.responses=res.json();
        if (this.responses.statusCode.code === '200') {
          this.offerData=true;
          this.responseStatus=true;

          this.getUserOfferLetter();
          this.getDigitalKey();
          this.getUserDigitalKey(this.data.userId);

        }
        else {
          this.offerData=true;
          this.error="Please provide Valid information";
          this.responseStatus=false;
        }      
      },
        error => {
          console.log(error);
        })
        }
        else
        {
          this.offerData=true;
          this.error="Please provide Valid information";
          this.responseStatus=false;
        }
    }
    else
    {
      this.offerData=true;
      this.error="Please provide Valid information";
      this.responseStatus=false;
    }    
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
    this.digitalKeystatus = false;
    this.signaturePad = true;
  }

  uploadImage(){
    this.offerData = true;
    this.digitalKeystatus = false;
    this.signaturePad = false;
  }

  continue(){
    this.offerData = true;
    this.uploadhrsignature = false;
    this.isSuccess = true;
  }

  cancel(){
    this.router.navigate(['/usersView/user-offerLetters',this.data.userId]);
  }

  imagepopup(){
    this.imagePopSuccess = false;
    this.error = false;
    this.imagePop = false;
  }

  goBack(){
    this.digitalKeystatus = true;
  }

  close()
  {
    this.isSuccess = false;
    this.isFailure = false;
    this.loading = false;
    this.offerData=false;
    this.error='';
    this.responseStatus=false;
    this.uploadhrsignature = false;
  }

  tryagain(){
    this.imagePop = false;
    this.error = '';
    this.getDigitalKey();
    this.offerData = true;
    this.responseStatus = false;
    this.uploadhrsignature = true;
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

  addimage()
  {
    if(this.imageData.digital)
    {
      this.service.addDigitalKey(this.imageData)
      .subscribe(res => {
      const result =res.json();
        if(result.statusCode.code==='200')
        {
          this.imageData.digital = '';
          this.getDigitalKey();
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
      this.error="Please provide Valid information";
    }   
  }

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
      this.error="Please provide Valid information";
    }   
  }

}
