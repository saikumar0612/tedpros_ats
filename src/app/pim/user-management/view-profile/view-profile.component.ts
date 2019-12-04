import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Location } from '@angular/common';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  log;
  logger: any = {};
  data: any = {};
  personalInfo = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    contact: '',
    driverLicenseNo: '',
    licenseExpDate: '',
    bloodGroup: '',
    maritalStatus: '',
    gender: '',
    nationality: { name: '' },
    ssn: '',
    dob: '',
    startDate: '',
    endDate: '',
    userId:'',
    linkedin:''
  };
  contactinfo = {
    addressLine1: '',
    addressLine2: '',
    street: '',
    city: { name: '' },
    state: { name: '' },
    country: { name: '' },
    zip: '',
    homeTelephone: '',
    workTelephone: '',
    otherEmail: ''
  };
  professionalInfo = {
    jobTitle: { name: '' },
    jobCategory: { name: '' },
    frequency: { name: '' },
    jobLocation: { name: '' },
    annualSalary: '',
    jobSpecification: '',
    gender: '',
    joiningDate: '',
    maritalStatus: '',
    startDate: '',
    endDate: ''
  };
  salaryInfo={
    amount:'',
    directDeposit:'',
    id:'',
    payGrade:'',
    userId:'',
    payFrequency:{
      id:'',
      name:''
    },
    deposit2:{
      accountType: {
        name:''
      },
      routingNumber:'',
      accountNumber:'',
      accountNumberRetype:'',
      directAmount:''
    },
    deposit1:{
      accountType: {
        name:''
      },
      routingNumber:'',
      accountNumber:'',
      accountNumberRetype:'',
      directAmount:''
    },
    deposits:[]
  }
  additionalDeposit: boolean = false;
  familyInfo = [];
  experienceInfo = [];
  educationInfo = [];
  skillInfo = [];
  languageInfo = [];
  licenseInfo = [];
  id;
  headers: any;
  options: any;

  url = 'http://service.tedpros.com/';
  // url='http://localhost/tedpros_services/';

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userFieldPermissions:any;
  userPermissions:any;
  isUser:boolean =  false;
  skillsinfo = [];
  skillrate = [];
  skillname = [];
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, private service: UserService,
    private eventEmitterService: EventEmitterService,private blocation:Location ) {
    this.userFieldPermissions = this.currentUser.fieldPermission;
    this.userPermissions = this.currentUser.permission;
    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'View User Profile';
    this.logger.comment = 'View User Profile';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        // this.timerComponent.getusersactivity();
        // firstComponentFunction(){
        this.eventEmitterService.onRecentActivityRefresh();
        // }
      });
  }

  public captureScreen() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      let imgWidth = 158;
      // let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      // let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 10;
      pdf.addImage(contentDataURL, 'PNG', 25, position, imgWidth, imgHeight);
      pdf.save(this.personalInfo.firstName + '' + this.personalInfo.lastName + '.pdf');
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
        if(this.id === this.currentUser.id){
          this.isUser = true;
        }
        // console.log(this.id);
      }
    );
    // this.http.get(this.url+ 'personal/fullInfo/?id='+this.id, this.options)
    this.service.getPersonalInfoId(this.id)
      .subscribe(response => {
        this.data = response.json().data;
        console.log(this.data);
        this.personalInfo = this.data.personalInformation;
        this.contactinfo = this.data.contactDetails;
        this.professionalInfo = this.data.professionalDetails;
        this.familyInfo = this.data.dependentsDetails;
        if(this.familyInfo){
          this.familyInfo.forEach(obj => {
            obj.countryname = obj.country.name; 
            obj.countryId = obj.country.id;  
          }); 
        }         
        this.experienceInfo = this.data.experienceDetails;
        this.educationInfo = this.data.educationDetails;
        this.skillInfo = this.data.skillDetails;
        this.salaryInfo = this.data.salaryDetails;
        if(this.salaryInfo !== null){
          this.salaryInfo.deposit1 = this.salaryInfo.deposits[0];
          if(!this.salaryInfo.directDeposit){
            this.additionalDeposit = true;
            this.salaryInfo.deposit2 = this.salaryInfo.deposits[1];
          }
        }
        // this.lists = this.qualifications.skillDetails;
        if (this.skillInfo != null) {
          this.skillInfo.forEach((list) => {
            if (list.skillId === '0') {
              list.name = list.otherSkill;
            }
          });
        }
        // chanhes by suresh 10-24-2019 start
        this.skillInfo.forEach((obj) => {
          console.log(obj);
          this.skillsinfo.push({ 'y': obj.experience, 'name': obj.name });
          this.skillname.push(obj.name);
          this.skillrate.push(obj.experience);
        });
        // chanhes by suresh 10-24-2019 end

        this.languageInfo = this.data.languageDetails;
        this.licenseInfo = this.data.licenseDetails;
        if (this.licenseInfo != null) {
          this.licenseInfo.forEach((list) => {
            if (list.licenseId === '0' || list.licenseId === '') {
              list.name = list.certificate;
            } else if (list.licenseId !== '0' || list.licenseId !== '') {
              list.name = list.licensename;
            }
          });
        }
      },
        error => {
          console.log(error);
        });

  }

  cancel() {
    this.blocation.back();
  }

  
  // chanhes by suresh 10-24-2019 start
  
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

  // chanhes by suresh 10-24-2019 end
}
