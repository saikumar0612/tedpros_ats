import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kips',
  templateUrl: './kips.component.html',
  styleUrls: ['./kips.component.css']
})
export class KipsComponent implements OnInit {
  log
  logger:any={};
  kpis:any;
  loading;
  // filterData={
  //   department:[],
  //   jobTitle:[]
  // }
  filterData=[]
  singleKpi:any={
    department:"",
    jobTitle:""
  }
  isShowDetails:boolean = false;
  isShowPopup = false;
  categories;
  jobTitles=[];
  titlekpis:any={};
  filteredTitle=[];
  availableRecords:any={};
  titleId;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions:any;

  
  // url:any = 'http://localhost/tedpros_services/';
  
  constructor(public http: Http, public service: UserService,private router: Router,private eventEmitterService: EventEmitterService) { 
    this.userPermissions = this.currentUser.permission;
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Key Performance Indicators ';
    this.logger.comment='Key Performance Indicators ';
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
    this.titlekpis = null;
    this.loading = true;
    this.service.getJobCategories()
    .subscribe(response => {
      this.categories = response.json().data;
      // console.log(this.categories);
    },
    error => {
      console.log(error);
    });


    this.service.getJobTitles()
    .subscribe(response => {
      this.jobTitles = response.json().data;
      //console.log(this.jobTitles);
    },
    error => {
      console.log(error);
    });

    
    // this.http.get(this.url+'performance/performanceIndicator', this.options)
    // .subscribe(response => {
    //   this.kpis = response.json().data;
    //   this.filterData = this.kpis;      
    //   this.loading = false;
    // });


    // this.http.get(this.url+'performance/getKpi', this.options)
    this.service.getPerformanceKPI()
    .subscribe(response => {
      this.kpis = response.json().data;
      this.filterData = this.kpis;     
      //console.log(this.filterData); 
      if(this.filterData){
        this.availableRecords = this.filterData.length;
      }
      this.loading = false;
    });

  }

  // get kpi based on job title
  onSelectTitle(id) {
    this.titleId = id;
    this.loading = true;
    this.service.getPerformanceKIPId(id)
    .subscribe(response => {
      this.filterData = response.json().data;
      this.loading = false;
    },
    error => {
      console.log(error);
    });
  }

  showUserDetails(kpiId){
    this.loading = true;
    this.service.getPerformanceIndicatorById(kpiId)
    .subscribe(response => {
      this.singleKpi = response.json().data;
    });
    this.isShowPopup = true;
    this.isShowDetails = true;
    this.loading = false;
  }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
    this.isShowDetails = false;
  }

  // search functionality change - sharmistha - 08-21-2019 - start
  search(term: string, key: string) {
    if (!term) {
      this.onSelectTitle(this.titleId);
    } else {
      if (key === 'indicator') {
        this.filterData = this.filterData.filter(x =>
          x.indicator.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'jobTitleName') {
        this.filterData = this.filterData.filter(x =>
          x.jobTitle.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'department') {
        this.filterData = this.filterData.filter(x =>
          x.department.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'jobTitle') {
        this.filterData = this.filterData.filter(x =>
          x.jobTitle.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'minRating') {
        this.filterData = this.filterData.filter(x =>
          x.minRating.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'maxRating') {
        this.filterData = this.filterData.filter(x =>
          x.maxRating.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }
  // search functionality change - sharmistha - 08-21-2019 - end

}
