import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {
  log
  logger:any={};
  dateError;
  dateError1;
  trackerData:any = {
    user:{
      id:'',
      name:''
    },
    supervisor:{
      id:'',
      name:''
    },
    kpiType:{
      id:'',
      name:''
    }
  };
  users:any=[];
  reporting;
  reviewId;
  review;
  data;
  loading;
  jobTitles;
  filteredUsers=[];
  kpitypes=[];
  message;
  isShowPopup = false;
  error;
  headers:any;
  options:any;
  supervisor = false;
  noSupervisor:any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  
  // url:any = 'http://localhost/tedpros_services/';
  constructor(private http: Http, private router: Router, public service:UserService, private route: ActivatedRoute, private blocation:Location,private eventEmitterService: EventEmitterService) { 

    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Edit Review';
    this.logger.comment='Edit Review';
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
    this.route.params.subscribe(res=>{
      this.reviewId = res.id;
    })

    // this.http.get(this.url+'performance/getReview?id='+this.reviewId, this.options)  
    this.loading = true;  
    this.service.getReviewId(this.reviewId)
    .subscribe(response => {
      this.trackerData = response.json().data;
      // console.log(this.trackerData);
      this.trackerData.type = this.trackerData.kpiType.id;
      this.trackerData.name = this.trackerData.supervisor.name;
      this.trackerData.startDate =new Date(this.trackerData.startDate);
      this.trackerData.endDate =new Date(this.trackerData.endDate);
      this.trackerData.dueDate =new Date(this.trackerData.dueDate);
    });
    
    // filtered users who dont have Account Owner as employee type - sharmistha - 09-27-2019 - start
    this.service.getUsersList()
    .subscribe(response => {
      this.filteredUsers = response.json();        
      // console.log(this.filteredUsers);
      this.filteredUsers.forEach(obj => {
        if(obj.employeeType.employeeType !== "Account Owner"){
          this.users.push(obj);
        }
      });
      // console.log(this.users);
    });
    // filtered users who dont have Account Owner as employee type - sharmistha - 09-27-2019 - end

    // get kpi types list
    this.service.getKpiTypes()
    .subscribe(response => {
      this.kpitypes = response.json().data;
      this.loading = false;
    });
        
  }

  change(id){
    // console.log(id);
    // this.http.get('http://service.tedpros.com/user/info?id='+id, this.options)
    this.service.getUserInfo(id)
     .subscribe(response => {
       this.data = response.json();
       this.trackerData.supervisor.id = this.data.reporting_to.id;
      //  this.trackerData.name = this.data.reporting_to.fname +' '+this.data.reporting_to.lname;
      //  this.loading = false;
      //  console.log(this.trackerData.supervisor.id);
      if(this.trackerData.supervisor.id){
        this.trackerData.name = this.data.reporting_to.fname +' '+this.data.reporting_to.lname;
        this.supervisor = false;
        this.loading = false;
      }
      else{
        this.trackerData.name = '';
        this.supervisor = true;
        this.noSupervisor = "No Supervior assigned yet"
      }
     },
     error => {
       console.log(error);
     });
  }

  // cancel(){
  //   this.router.navigate(['manage-reviews']);
  // }
  cancel() {
    this.blocation.back(); 
  }

  //save review
  save(){
    this.trackerData.startDate = new DatePipe('en-US').transform (this.trackerData.startDate, 'yyyy-MM-dd');
    this.trackerData.endDate = new DatePipe('en-US').transform(this.trackerData.endDate, 'yyyy-MM-dd');
    this.trackerData.dueDate = new DatePipe('en-US').transform(this.trackerData.dueDate, 'yyyy-MM-dd');
    this.trackerData.status = '1';
    //console.log(this.trackerData);
    // this.http.post(this.url+'performance/editReviews?id='+this.reviewId, this.trackerData, this.options)
    this.service.editReviewId(this.reviewId, this.trackerData)
    .subscribe(response =>{
      this.review = response.json();
      // console.log(this.review);
      if(this.review.statusCode.code === '200'){
        this.message = this.review.data;
        this.isShowPopup = true;
        // this.router.navigate(['/reviews/manage-reviews']);
      }
      else{
        this.error = this.review.errorMessages;
        this.loading = false;
        this.isShowPopup = true;
      }
    },
    error => {
      console.log(error);
    }
  )
  }

  //activate review
  activate(){
    this.trackerData.startDate = new DatePipe('en-US').transform (this.trackerData.startDate, 'yyyy-MM-dd');
    this.trackerData.endDate = new DatePipe('en-US').transform(this.trackerData.endDate, 'yyyy-MM-dd');
    this.trackerData.dueDate = new DatePipe('en-US').transform(this.trackerData.dueDate, 'yyyy-MM-dd');
    this.trackerData.status = '2';
    //console.log(this.trackerData);
    // this.http.post(this.url+'performance/editReviews?id='+this.reviewId, this.trackerData, this.options)
    this.service.editReviewId(this.reviewId,this.trackerData)
    .subscribe(res =>{
      this.review = res.json();
      // console.log(this.review);
      if(this.review.statusCode.code === '200'){
        this.message = this.review.data;
        this.isShowPopup = true;
        // this.router.navigate(['/reviews/manage-reviews']);
      }
      else{
        this.error = this.review.errorMessages;
        this.loading = false;
        this.isShowPopup = true;
      }
    },
    error => {
      console.log(error);
    }
  )
  }

  //close popup function
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

  //checking date validity function
  dateValidate() {
    if (this.trackerData.startDate >= this.trackerData.endDate) {
    this.dateError = 'Please select a valid end date';
    }
    else{
      this.dateError = "";
  
    }
    if (this.trackerData.startDate >= this.trackerData.dueDate) {

      this.dateError1 = 'Please select a valid due date';
    }
      else{
        this.dateError1 = "";
    
      }
  
  }

}

