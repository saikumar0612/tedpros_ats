import { Component, OnInit } from '@angular/core';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-candidate-resume',
  templateUrl: './candidate-resume.component.html',
  styleUrls: ['./candidate-resume.component.css']
})
export class CandidateResumeComponent implements OnInit {
  candidateData:any ={country:{id:'',name:''},state:{id:'',name:''},city:{id:'',name:''}};
  educations;
  skills;
  experience;
  candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
  userToken: string = this.candidateUser.token;
  candidateEmail = this.candidateUser.data.email;
  candidateId = this.candidateUser.data.id;
  preview;
  availableRecords = 0;
  data;
  appliedJobs = 0;
  wishlist = 0;
  experienceData;
  shortlistData;
  skillData;
  skillArray:any = [];
  barChartLabels;
  barChartData;
  skillCode:any = [];
  personalData;
  resumeData;
  resume;
  resumeUrl='';
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  constructor(private service:VmsCandidateService, private route:ActivatedRoute ) { }
  ngOnInit() {
    this.resumeUrl = this.service.getBaseUrl() + '/frontend/resume/';

    this.service.getCandidatePersonal(this.candidateEmail).subscribe(res=>{
      this.candidateData = res.json().data;
      // console.log(this.candidateData);
      this.educations = this.candidateData.education;
      this.skills = this.candidateData.skills;
      this.experience = this.candidateData.experience;
    });

    this.service.getCandidateResume(this.candidateId).subscribe(res=>{
      this.resumeData = res.json().data;
      if(this.resumeData){
        this.resume = this.resumeData.document;
      }else{
        this.resume = '';
      }
    });
  

    // get shortlist date 

    this.service.getShortlistJobs().subscribe(res=>{
      this.data = res.json().data;
      if(this.data){
        this.shortlistData = this.data.length;
      }else{
        this.shortlistData = 0;
      }
    })
// get applied jobs
    this.service.getAppliedJobs().subscribe(res=>{
      this.data = res.json().data;
      // this.appliedJobs = this.data.length;
      if(this.data){
        this.appliedJobs = this.data.length;
      }else{
        this.appliedJobs = 0;
      }
    });

    // get wishlistdata
    this.service.getWishList(this.candidateEmail).subscribe(res=>{
      this.data = res.json().data;
      if(this.data){
        this.wishlist = this.data.length;
      }else{
        this.wishlist = 0;
      }
    });

    // get skill treands 
    this.service.getskillTrends().subscribe(res=>{
      this.skillData = res.json().data;
      this.skillData.forEach(x=>{
        this.skillArray.push(x.skill) ;
        this.skillCode.push(x.count);   
      })
      this.barChartLabels =this.skillArray;
    })

    this.barChartData = [
      { data:this.skillCode, label: 'Skills','backgroundColor':'#67a5e6' }
    ];
  };

  resumePreview(){
    this.showpreview();
  }

  showpreview() {
    this.preview = true;

  }
  closePreviewPopup() {
    this.preview = !this.preview;
  }

    
}
 