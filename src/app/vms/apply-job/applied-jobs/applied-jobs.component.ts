import { Component, OnInit } from '@angular/core';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {
  data;
  availableRecords = 0;
  constructor(private service:VmsCandidateService) { }

  ngOnInit() {
    this.service.getAppliedJobs().subscribe(res=>{
      this.data = res.json().data;
      this.availableRecords = this.data.length;
    });
  }

}
