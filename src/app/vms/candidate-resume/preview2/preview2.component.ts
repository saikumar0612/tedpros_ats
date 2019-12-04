import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';


@Component({
  selector: 'app-preview2',
  templateUrl: './preview2.component.html',
  styleUrls: ['./preview2.component.css']
})
export class Preview2Component implements OnInit {
  isShowPopup;
  error = null;
  candidateData:any ={country:{id:'',name:''},state:{id:'',name:''},city:{id:'',name:''},per:{pay_frequency:''}};
  educations;
  skills;
  experience;
  candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
  candidateEmail = this.candidateUser.data.email;
  preview;
  educationData;
  experienceData;
  skillsData;
  endDates = [];
  skillsinfo = [];
  skillrate = [];
  skillname = [];
  jobTitle;
  candidateDetails:any;
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, private blocation: Location,  private service:VmsCandidateService) {
  }

  public captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      console.log(imgWidth + ',' + imgHeight + ',' + position);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, pageHeight);
      pdf.save(this.candidateData.firstName + ' ' + this.candidateData.lastName + ' CV.pdf'); // Generated PDF
    });
  }

  onNavigate(location) {
    this.router.navigate([location]);
  }
 
  ngOnInit() {

    this.service.getCandidatePersonal(this.candidateEmail).subscribe(res=>{
      this.candidateData = res.json().data;
      this.educations = this.candidateData.education;
      this.skills = this.candidateData.skills;
      this.experience = this.candidateData.experience;
      if(this.experience){
        this.experience.forEach((lastItem) => {
          this.endDates.push(lastItem.startDate);
          let maxDate = new Date(Math.max.apply(null, this.experience.map(z =>
            z["startDate"]).map(w => new Date(w))));
          const startDate = new DatePipe('en-US').transform(maxDate, 'yyyy-MM-dd');
          if (lastItem.startDate === startDate) {
            this.jobTitle = lastItem.jobTitle;
          }
        });
      }
     
      this.skills.forEach((obj) => {
        this.skillsinfo.push({ 'y': obj.experience, 'name': obj.skillName });
        this.skillname.push(obj.skillName);
        this.skillrate.push(obj.experience);
      });
    });

  }

  cancel() {
    this.blocation.back();
  }

  
  
  onChartClick(event) {
    console.log(event);
  }

   // CHART COLOR.
   pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)',
        'rgba(74, 88, 188, 0.9)',
        'rgba(253, 46, 46, 0.9)',
        'rgba(4, 208, 1, 0.9)',
        'rgba(219, 42, 251, 0.9)',
        'rgba(3, 222, 202, 0.9)'
      ]
    }
  ]

   // ADD CHART OPTIONS. 
   pieChartOptions = {
    responsive: true
  }

  pieChartLabels = this.skillname;

  pieChartData: any = [
    {
      data: this.skillrate
    }
  ];


}

