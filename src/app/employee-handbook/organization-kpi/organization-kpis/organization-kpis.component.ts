import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-kpis',
  templateUrl: './organization-kpis.component.html',
  styleUrls: ['./organization-kpis.component.css']
})
export class OrganizationKpisComponent implements OnInit {

  logger:any={};
  log={};
  kpis=[];
  filterData=[];
  singleKpi;
  isShowPopup=false;
  isShowDetails=false;
  loading=false;
  availableRecords:any={};
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;

  constructor(public http: Http, public service: UserService,private router: Router,private eventEmitterService: EventEmitterService) {
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Organizational KPIs';
    this.logger.comment='Organizational Key Performance Indicators ';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;  
      this.eventEmitterService.onRecentActivityRefresh(); 
    });
   } 

  ngOnInit() {
    this.userPermissions = this.currentUser.permission;
    this.loading = true;
    this.service.getOrganizationKPI()
    .subscribe(response => {
      this.kpis = response.json().data;
      this.filterData = this.kpis;     
      // console.log(this.filterData); 
      if(this.filterData){
        this.availableRecords = this.filterData.length;
      }
      this.loading = false;
    });
  }

  showKpiDetails(kpiId){
    this.singleKpi = this.kpis.filter(x => x.id == kpiId)[0];
    this.isShowPopup = true;
    this.isShowDetails = true;
  }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
    this.isShowDetails = false;
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.kpis;
    } else {

      if (key === 'indicator') {
        this.filterData = this.kpis.filter(x =>
          x.indicator.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'minRating') {
        this.filterData = this.kpis.filter(x =>
          x.minRating.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'maxRating') {
        this.filterData = this.kpis.filter(x =>
          x.maxRating.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}
