import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-view-personal-info',
  templateUrl: './view-personal-info.component.html',
  styleUrls: ['./view-personal-info.component.css']
})
export class ViewPersonalInfoComponent implements OnInit {
  data:any={
    statusCode:{},
    data:{
      personalInformation:{},
      contactDetails:{},
      emergencyContacts:{},
      professionalDetails:{},
      familyDetails:{},
      experienceDetails:{},
      educationDetails:{},
      skillDetails:{},
      languageDetails:{},
      licenseDetails:{},
    },
  }
  personalInfo;
  contactinfo;
  emergencyInfo;
  professionalInfo;
  familyInfo;
  experienceInfo;
  educationInfo;
  skillInfo;
  languageInfo;
  licenseInfo;
  headers:any;
  options:any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, private service:UserService) {
    // this.http.get('http://service.tedpros.com/personal/fullInfo', this.options)
    this.service.getPersonalFullInfo()
    .subscribe(response =>{
      let datadetails= response.json();
      console.log(datadetails);
      this.data =datadetails.data;
      // this.data = response.json();
      // console.log(this.data);
      this.personalInfo = this.data.personalInformation;
      this.contactinfo=this.data.contactDetails;
      this.emergencyInfo=this.data.emergencyContacts;
      this.professionalInfo = this.data.professionalDetails;
      this.familyInfo=this.data.familyDetails;
      this.experienceInfo=this.data.experienceDetails;
      this.educationInfo = this.data.educationDetails;
      this.skillInfo=this.data.skillDetails;
      this.languageInfo=this.data.languageDetails;
      this.licenseInfo = this.data.licenseDetails;
    },
    error => {
      console.log(error);
    })
   }

  ngOnInit() {
  }

}
