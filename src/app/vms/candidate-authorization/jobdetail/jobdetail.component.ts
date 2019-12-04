import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css']
})
export class JobdetailComponent implements OnInit {
  id;
  details:any={
    job:{name:''},
    country:{name:''},state:{name:''},city:{name:''}
  };
  todayDate = new Date();
  currentYear;
  result:any;
  companyName;
  jobsList;
  showData:any;
  postedDate;
  currentDate;
  oneDay;
  diffDays;
  isSuccess:any;

  constructor(private authService:AuthenticationService,private route: ActivatedRoute,private blocation:Location) { }

  ngOnInit() {
    this.currentYear = new DatePipe('en-US').transform(this.todayDate, 'yyyy');

    this.result = JSON.parse(localStorage.getItem('settings'));
    this.companyName = this.result.data.title;

    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
        console.log(this.id);
      }
    );

    this.authService.getJobDetail(this.id).subscribe(res=>{
      this.details = res.json().data;
      console.log(this.details);
      this.oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      this.postedDate = new Date(this.details.datePosted) ;
      console.log(this.postedDate);
      this.currentDate = new Date(this.todayDate);
      console.log(this.currentDate);
      this.diffDays = Math.round(Math.abs(( this.postedDate - this.currentDate) / this.oneDay));
      console.log(this.diffDays);

    });

    this.authService.getJobListData().subscribe(res=>{
      this.jobsList = res.json().data;
      console.log(this.jobsList);
      if(this.jobsList){
        this.showData = true;
      }else{
        this.showData = false;
      }
      
    });

  }

  loginPopup(){
    this.isSuccess = true;
  }
  closePopup(){
    this.isSuccess = !this.isSuccess;
  };
  
  cancel() {
    this.blocation.back();
  }

}
