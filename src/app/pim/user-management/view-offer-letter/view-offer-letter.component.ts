import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { UserService} from './../../../core/services/user.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-offer-letter',
  templateUrl: './view-offer-letter.component.html',
  styleUrls: ['./view-offer-letter.component.css']
})
export class ViewOfferLetterComponent implements OnInit {

  data = {
    userId:'',
    typeId:''
  }; 
  offerLetter = {
    user:{
      department: {
        id: "",
        name: ""
      },
      firstname: "",
      jobTitle: {
        id: "",
        name: ""
      },
      lastname: "",
      middlename: "",
      name: "",
      payFrequency: {
        id: "",
        name: ""
      },
      totalSalary: "",
      userId: ""
    },
    hr:{
      name:'',
      userId:'',
      jobTitle:{
        id: "",
        name: ""
      }   
    },
    offerLetterTypeId:'',
    id: "",
    lastModified: "",
    offerLetter: "",
    offerLetterTypeName: "",
    status: "",
    companyInfo: []
  };
  logoUrl:any;
  types = [];
  template = {id:''};
  gethrdigitalKey:any;
  getuserDigitalKey:any;
  digitalKeystatus = false;
  userDigitalKeystatus = false;
  loading:boolean = false;

  constructor(public http: Http,public location : Location ,private sanitizer: DomSanitizer,public service :UserService , public authenticationService:AuthenticationService,private route: ActivatedRoute, private router: Router) { }

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
    this.getDigitalKey();
    this.getOfferLetterTemplates();
    this.getUserDigitalKey(this.data.userId);
  }

  getOfferLetterTemplates(){
    this.loading = true;
    this.service.getOfferLetterTemplates().subscribe(res => {
      this.types = res.json().data;
      this.loading = false;
      // console.log(this.types);
    })
  }

  getUserOfferLetter(){
    this.loading = true;
    this.service.viewOfferLetterById(this.data.userId,this.data.typeId)
      .subscribe(res => {
      this.loading = false;
      this.offerLetter = res.json().data;
      // console.log(this.offerLetter);
    });
  }

  getDigitalKey()
  {
    this.loading = true;
    this.service.getDigitalKey()
    .subscribe(res => {
      this.gethrdigitalKey=res.json();
      this.loading = false;
      if(this.gethrdigitalKey.statusCode.code==='200')
      {
        // console.log(this.gethrdigitalKey);
        this.digitalKeystatus=true;
      }
      else{
        this.digitalKeystatus=false;
      }
    });
  }

  getUserDigitalKey(id)
  {
    this.loading = true;
    this.service.getDigitalKeyById(id)
    .subscribe(res => {
    this.getuserDigitalKey=res.json();
    this.loading = false;
      if(this.getuserDigitalKey.statusCode.code==='200')
      {
        this.userDigitalKeystatus=true;
      }
      else
      {
        this.userDigitalKeystatus=false;
      }
    
    });
  }

  addOfferLetter(typeId){
    this.router.navigate(['/usersView/add-offerLetter',this.data.userId,typeId]);
  }

  back(){
    this.location.back();
  }

}
