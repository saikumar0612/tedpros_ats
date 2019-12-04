import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  isShowPopup;
  error = null;
  candidateInfo:any = {
    firstName:'',
    lastName:'',
    emailId:'',
    phoneNo:'',
    summary:'',
    image:'',
    per:{
      id:'',
      pay_frequency:''
    }
  }
  educationData;
  experienceData;
  skillsData;
  endDates = [];
  skillsinfo = [];
  skillrate = [];
  skillname = [];
  jobTitle;
  loading;
  headers: any;
  options: any;
  id;
  log;
  logger: any = {};
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, private blocation: Location, private service: UserService) {
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
      pdf.save(this.candidateInfo.firstName + ' ' + this.candidateInfo.lastName + ' CV.pdf'); // Generated PDF
    });
  }

  onNavigate(location) {
    this.router.navigate([location]);
  }
  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
        // console.log(this.id);
      }
    );
    // this.http.get('http://service.tedpros.com/job/getCandidate?id=' + this.id, this.options)
    this.service.getCandidateId(this.id)
      .subscribe(response => {
        this.candidateInfo = response.json().data;
        console.log(this.candidateInfo);
        if (this.candidateInfo.education === null || this.candidateInfo.skills === null) {
          this.error = "Please add Education and Skills Details";
          this.isShowPopup = true;
        } else {
          this.educationData = this.candidateInfo.education;
          this.experienceData = this.candidateInfo.experience;
          this.skillsData = this.candidateInfo.skills;
          console.log(this.candidateInfo);
          this.experienceData.forEach((lastItem) => {
            this.endDates.push(lastItem.startDate);
            console.log(this.endDates)
            let maxDate = new Date(Math.max.apply(null, this.experienceData.map(z =>
              z["startDate"]).map(w => new Date(w))));
            console.log(maxDate);
            const startDate = new DatePipe('en-US').transform(maxDate, 'yyyy-MM-dd')
            console.log(startDate);
            if (lastItem.startDate === startDate) {
              this.jobTitle = lastItem.jobTitle
              console.log(this.jobTitle)
            }
          });

          this.skillsData.forEach((obj) => {
            this.skillsinfo.push({ 'y': obj.experience, 'name': obj.skillName });
            this.skillname.push(obj.skillName);
            this.skillrate.push(obj.experience);
          })
        }


      },
        error => {
          console.log(error);
        }
      );
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
  cancel() {
    this.blocation.back();
  }

  closePopup() {
    this.blocation.back();
  }

}
