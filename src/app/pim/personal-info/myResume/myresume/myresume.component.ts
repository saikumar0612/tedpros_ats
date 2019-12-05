import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../../core/services/user.service';
import { EventEmitterService } from '../../../../core/services/event-emitter.service';

@Component({
  selector: 'app-myresume',
  templateUrl: './myresume.component.html',
  styleUrls: ['./myresume.component.css']
})
export class MyresumeComponent implements OnInit {
  log
  logger:any={};
  filterData;
  preview;

  single;
  personalData:any={
    nationality:{},
  };
  experienceData;
  educationData;
  skillsData;
  contactData;
  informationData;
  licenseData;
  loading;
  headers: any;
  options: any;
  id;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, private service:UserService,private eventEmitterService: EventEmitterService) {
    
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='View My Resume';
    this.logger.comment='View My Resume';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      // this.timerComponent.getusersactivity();
      // firstComponentFunction(){    
        this.eventEmitterService.onRecentActivityRefresh();    
      // }  
    });

  }



  ngOnInit() {
    // this.http.get('http://service.tedpros.com/personal/fullInfo', this.options)
    this.service.getPersonalFullInfo()
      .subscribe(response => {
        this.personalData = response.json().data;
        // console.log(this.personalData);
        this.informationData = this.personalData.personalInformation;
        this.experienceData = this.personalData.experienceDetails;
        this.educationData = this.personalData.educationDetails;
        this.skillsData = this.personalData.skillDetails;
        if(this.skillsData != null){
          this.skillsData.forEach((list) => {
            if(list.skillId === "0"){
              list.name = list.otherSkill;
            }
            else{
              list.name = list.name;
            }
          })
        }
        this.contactData = this.personalData.contactDetails;
        this.licenseData = this.personalData.licenseDetails;  
        if(this.licenseData != null){
          this.licenseData.forEach((list) => {
            if(list.licenseId === "0" || list.licenseId === ""){
              list.name = list.certificate;
            }
            else if(list.licenseId != "0" || list.licenseId != ""){
              list.name = list.licensename;
            }
          })
        }
      },
      error => {
        console.log(error);
      });


  }
  showpreview(){
    // this.single = this.filterData.filter(x => x.id == typeid)[0];
    this.preview = true;
  



  }
  closePopup() {
    this.preview = !this.preview;
  }

}
