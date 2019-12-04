import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService }from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.css']
})
export class ManageReviewsComponent implements OnInit {
  log
  logger:any={};
  availableRecords:any;
  reviews:any={
    user:{},
    jobTitle:{},
    supervisor:{}
  };
  loading;
  filter:any={
    id:'',
    user:{},
    jobTitle:{},
    supervisor:{},
    kpiType:{},
    startDate:'',
    endDate:'',
    reviewDates:'',
    dueDate:'',
    status:''
  };
  finalData:any = [];
  filteredTitle = [];
  filteredType = [];
  filterData:any=[{
    user:{},
    jobTitle:{},
    supervisor:{}
  }];
  singleReview:any={
    user:{},
    jobTitle:{},
    supervisor:{}
  }
  isShowDetails:boolean = false;
  isShowPopup = false;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions:any;
  
  constructor(public http: Http, private service:UserService,private router: Router,private eventEmitterService: EventEmitterService) {
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Manage Reviews';
    this.logger.comment='Manage Reviews';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      this.eventEmitterService.onRecentActivityRefresh();   
    });
   }

  ngOnInit() {
    this.userPermissions = this.currentUser.permission;
    this.loading = true;
    this.service.getReviews()
    .subscribe(response => {      
      const arrayList=response.json().data;
      if(arrayList != null){
        for (let i = 0; i < arrayList.length; i++) {
          this.filter.id=arrayList[i].id;
          this.filter.user=arrayList[i].user;
          this.filter.jobTitle=arrayList[i].jobTitle;
          this.filter.supervisor=arrayList[i].supervisor;
          this.filter.kpiType=arrayList[i].kpiType;
          // added date pipe - sharmistha - 08-21-2019 - start
          this.filter.startDate=new DatePipe('en-US').transform(arrayList[i].startDate, 'MM-dd-yyyy');
          this.filter.endDate=new DatePipe('en-US').transform(arrayList[i].endDate, 'MM-dd-yyyy');
          this.filter.reviewDates=this.filter.startDate+ ' - ' +this.filter.endDate;
          this.filter.dueDate=new DatePipe('en-US').transform(arrayList[i].dueDate, 'MM-dd-yyyy');
          // added date pipe - sharmistha - 08-21-2019 - end

          if(arrayList[i].status == '1'){
            this.filter.status ='In Progress';
          }
          else if(arrayList[i].status == '2'){
            this.filter.status ='Activated';
          }
          else{
            this.filter.status ='Approved';
          }
          this.finalData.push(this.filter);
          this.filter = {
            id:'',
            user:{},
            jobTitle:{},
            supervisor:{},
            kpiType:{},
            startDate:'',
            endDate:'',
            reviewDates:'',
            dueDate:'',
            status:''
          };
        }
      }
      this.reviews = this.finalData;
      if(this.reviews){
        this.availableRecords = this.reviews.length;
      }
      
      // console.log(this.finalData);
      this.loading = false;
    });
  }

  showDetails(reviewId){
    this.singleReview = this.reviews.filter(x => x.id == reviewId)[0];
    this.isShowPopup = true;
    this.isShowDetails = true;
  }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
    this.isShowDetails = false;
  }

  search(term: string, key: string) {
    if (!term) {
      this.finalData = this.reviews;
    } else {

      if (key === 'user') {
        this.finalData = this.reviews.filter(x =>
          x.user.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'supervisor') {
        this.finalData = this.reviews.filter(x =>
          x.supervisor.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'jobTitle') {
        this.filteredTitle = this.reviews.filter(y => y.jobTitle != null);
        this.finalData = this.filteredTitle.filter(x =>
          x.jobTitle.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'reviewDate') {
        this.finalData = this.reviews.filter(x =>
          x.reviewDates.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'dueDate') {
        this.finalData = this.reviews.filter(x =>
          x.dueDate.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'kpiType') {
        this.filteredType = this.reviews.filter(y => y.kpiType != null);
        this.finalData = this.filteredType.filter(x =>
          x.kpiType.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'status') {
        this.finalData = this.reviews.filter(x =>
          x.status.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.finalData.length;
  }

}

