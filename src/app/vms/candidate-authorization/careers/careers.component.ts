import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  todayDate = new Date();
  currentYear;
  jobsList:any;
  jobCount;
  showData:any;
  result:any;
  companyName;
  jobPopup:any;
  isSuccess:any;
  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    this.currentYear = new DatePipe('en-US').transform(this.todayDate, 'yyyy');

    this.result = JSON.parse(localStorage.getItem('settings'));
    this.companyName = this.result.data.title;
    
    this.authService.getJobListData().subscribe(res=>{
      this.jobsList = res.json().data;
      console.log(this.jobsList);
      if(this.jobsList){
        this.showData = true;
        this.jobCount = this.jobsList.length;
      }else{
        this.showData = false;
      }
      
    });

  }

  readMore(){
    this.jobPopup = true;
  }

  applyPopup(){
      this.isSuccess = true;
  }
  closePopup(){
    this.isSuccess = !this.isSuccess;
  };

  close1(){
    this.isSuccess = false;
  }

}
