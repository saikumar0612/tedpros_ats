import { Component, OnInit } from '@angular/core';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-shortlist-jobs',
  templateUrl: './shortlist-jobs.component.html',
  styleUrls: ['./shortlist-jobs.component.css']
})
export class ShortlistJobsComponent implements OnInit {
  shortListdata;
  availableRecords = 0;
  detailsPopup:any;
  signaturePad:any;
  result;
  details:any ={};
  popupJobDetails:any = {};
  getuserKey;
  candidateId;
  candidateName;
  companyName;
  candidateUser = JSON.parse(localStorage.getItem('candidateUserData')); 
  constructor(private service:VmsCandidateService, private router: Router) { }

  ngOnInit() {
    this.candidateId = this.candidateUser.data.id;
    this.candidateName = this.candidateUser.data.firstName + ' ' +this.candidateUser.data.lastName;

    const result = JSON.parse(localStorage.getItem('settings'));
    this.companyName = result.data.title;
    

    this.service.getShortlistJobs().subscribe(res=>{
      this.shortListdata = res.json().data;
      if(this.shortListdata){
        this.shortListdata.forEach(obj => {
          if(obj.assignedDocuments){
            obj.assignedDocuments.forEach(ele => {
              if(ele.documentId === "1"){
                obj.consent = true;
              }
              else if(ele.documentId === "2"){
                obj.compete = true;
              }
              else if(ele.documentId === "3"){
                obj.nda = true;
              }
            });
          }   
          
          if(obj.status){
            if(obj.status === "0"){
              obj.statusType = "Shorlisted";
            }
            else if(obj.status === "1"){
              obj.statusType = "On hold";
            }
            else if(obj.status === "3"){
              obj.statusType = "Selected";
            }
            else if(obj.status === "4"){
              obj.statusType = "Rejected";
            }
          }

        });
        console.log(this.shortListdata);
        this.availableRecords = this.shortListdata.length;
      }
      
    });
    

  }

  acceptLetter(jobId,docId){
    this.router.navigate(['/job/consent-document',this.candidateId, jobId, docId]);
  }

}
