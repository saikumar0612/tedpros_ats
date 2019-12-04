import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './../../../core/services/user.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-offerletter',
  templateUrl: './offerletter.component.html',
  styleUrls: ['./offerletter.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class OfferletterComponent implements OnInit {

  types:any=[];
  data = {
    content:''
  };
  filterData = [];
  availableRecords = 0;
  url;
  loading:boolean = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
	userPermissions: any;

  constructor(public http: Http,public location : Location ,private sanitizer: DomSanitizer,public service :UserService , public authenticationService:AuthenticationService, private router: Router) {

  }

  ngOnInit() {
    this.userPermissions = this.currentUser.permission;
    this.getOfferLetterTemplates();
  }

  getOfferLetterTemplates(){
    this.loading = true;
    this.service.getOfferLetterTemplates().subscribe(res => {
      this.types = res.json().data;
      this.filterData = this.types;
      this.loading = false;
      if(this.filterData){
        this.availableRecords = this.filterData.length;
      }
      // console.log(this.filterData)
    })
  }

  addTemplate(typeId){
    this.url = "/offer-letter/add-offer-letter-template/";
    this.router.navigateByUrl(this.url+typeId);
  }

  viewTemplate(typeId){
    this.url = "/offer-letter/view-offer-letter-template/";
    this.router.navigateByUrl(this.url+typeId);
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.types;
    } else {

      if (key === 'name') {
        this.filterData = this.types.filter(x =>
          x.type.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}
