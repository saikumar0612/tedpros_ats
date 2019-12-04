import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './../../../core/services/user.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-offerletter-info',
  templateUrl: './offerletter-info.component.html',
  styleUrls: ['./offerletter-info.component.css']
})
export class OfferletterInfoComponent implements OnInit {

  filterData=[];
  data = {
    content:''
  };
  types = [
    {
      offerLetter:{
        offerLetterTypeName:'',
        id:'',
        offerLetter:'',
        offerLetterTypeId:'',
        user:{
          name:''
        },
        hr:{}
      },
      userDigitalKey:{},
      hrDigitalKey:{},
    }
  ];
  availableRecords = 0;
  url;
  deleteId:any;
  userId:any;
  message:any;
  logoUrl:any;
  displayDownload:boolean=false;
  displayEdit:boolean=false;
  displayAdd:boolean=false;
  isConfirm:boolean=false;
  isSuccess:boolean=false;
  viewLetter:boolean=false;
  loading:boolean = false;
  contentToConvert:boolean=false;
  singleLetter:any;
  singleLetterDownload:any;
  class:any;
  userName:any={
    firstName:'',
    lastName:'',
    middleName:'',
    name:''
  };
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(public http: Http,public location : Location ,private sanitizer: DomSanitizer,public service :UserService , public authenticationService:AuthenticationService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const result = JSON.parse(localStorage.getItem('settings'));
    this.logoUrl = this.authenticationService.getBaseUrl() + '/frontend/logos/' + result.data.siteLogo;
    this.class = result.data.themeClass;
    this.userId = this.currentUser.id;

    this.getUserOfferLetters();
    this.getName(this.userId);
  }

  getUserOfferLetters(){
    this.loading = true;
    this.service.getOfferLettersList().subscribe(res => {
      this.types = res.json().data;
      // console.log(this.types);
      this.filterData = this.types;
      this.loading = false;
      if(this.filterData){
        this.availableRecords = this.filterData.length;
      }
      this.filterData.forEach(obj => {
        if((obj.offerLetter.offerLetter != null)&&(obj.offerLetter.status != null)){
          if(obj.offerLetter.status === "1"){
            obj.displayEdit = true;
            obj.displayDownload = false;
            obj.displayAdd = false;
          }
          else if(obj.offerLetter.status === "2"){
            obj.displayDownload = true;
            obj.displayEdit = false;
            obj.displayAdd = false;
          }
        }
      });
    })
  }
  
  getName(userId){
    this.loading = true;
    this.service.getName(userId).subscribe(res => {
      this.userName = res.json().data;
      if(!this.userName.middleName){
        this.userName.middleName='';
      }
      this.userName.name = this.userName.firstName+' '+this.userName.middleName+' '+this.userName.lastName;
    })    
  }

  addOfferLetter(typeId){
    this.router.navigate(['/usersView/add-offerLetter',this.userId,typeId]);
  }

  editOfferLetter(typeId){
    this.router.navigate(['/usersView/edit-offerLetter', this.userId,typeId]);
  }

  viewTemplate(id){
    this.viewLetter = true;
    this.singleLetter = this.filterData.filter(x => x.offerLetter.id === id)[0];
    console.log(this.singleLetter)
  }

  closePopup(){
    this.viewLetter = false;
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

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.types;
    } else {

      if (key === 'name') {
        this.filterData = this.types.filter(x =>
          x.offerLetter.offerLetterTypeName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}
