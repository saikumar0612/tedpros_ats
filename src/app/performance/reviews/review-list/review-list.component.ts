import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { DateRange } from '@uiowa/date-range-picker';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  log
  logger:any={};

  startDate: any;
  endDate: any;
  reviews:any;
  test:any;
  loading;
  filterData;
  single:any;
  singleReview:any;
  isShowDetails:boolean = false;
  isShowPopup = false;
  filter = {
    id:'',
    user:{},
    jobTitle:{},
    supervisor:{},
    kpiType:{},
    startDate:'',
    endDate:'',
    reviewDates:'',
    dueDate:'',
    status:'',
    statusName:''
  };
  finalData = [];
  filteredTitle = [];
  filteredType = [];
  availableRecords:any;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions:any;
  userId: any;
  // dateRange = new DateRange();

  
  // url:any = 'http://localhost/tedpros_services/';
  
  constructor(public http: Http, private service:UserService,private eventEmitterService: EventEmitterService,private router: Router) { 
    this.userPermissions = this.currentUser.permission;
    this.userId = this.currentUser.id;
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='View Review list';
    this.logger.comment='View Review list';
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
    this.loading = true;
    // this.http.get(this.url+'performance/reviews', this.options)
    this.service.getReviews()
    .subscribe(response => {
      this.reviews = response.json().data;
      // this.filterData = this.reviews;
      if(this.reviews != null){
        this.singleReview = this.reviews.filter(x => x.supervisor.id == this.userId);
        this.filterData = this.singleReview;
        for (let i = 0; i < this.filterData.length; i++) {
          this.filter.id=this.filterData[i].id;
          this.filter.user=this.filterData[i].user;
          this.filter.jobTitle=this.filterData[i].jobTitle;
          this.filter.supervisor=this.filterData[i].supervisor;
          this.filter.kpiType=this.filterData[i].kpiType;
          // added date pipe - sharmistha - 08-21-2019 - start
          this.filter.startDate=new DatePipe('en-US').transform(this.filterData[i].startDate, 'MM-dd-yyyy');
          this.filter.endDate=new DatePipe('en-US').transform(this.filterData[i].endDate, 'MM-dd-yyyy');
          this.filter.reviewDates=this.filter.startDate+ ' - ' +this.filter.endDate;
          this.filter.dueDate=new DatePipe('en-US').transform(this.filterData[i].dueDate, 'MM-dd-yyyy');
          // added date pipe - sharmistha - 08-21-2019 - end
          this.filter.status=this.filterData[i].status;
          // this.filter.kpiType=this.filterData[i].kpiType;
          if(this.filterData[i].status == '1'){
            this.filter.statusName ='In Progress';
          }
          else if(this.filterData[i].status == '2'){
            this.filter.statusName ='Activated';
          }
          else{
            this.filter.statusName ='Approved';
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
            status:'',
            statusName:''
          };
        }
        this.reviews = this.finalData;
        if(this.reviews){
          this.availableRecords = this.reviews.length;
        }
      }
      else{}
      this.loading = false;
    });
  }

  showDetails(reviewId){
    this.single = this.reviews.filter(x => x.id == reviewId)[0];
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
      } else if (key === 'startDate') {
        this.finalData = this.reviews.filter(x =>
          x.startDate.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'endDate') {
        this.finalData = this.reviews.filter(x =>
          x.endDate.trim().toLowerCase().includes(term.trim().toLowerCase()),
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
          x.statusName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.finalData.length;
  }

}

