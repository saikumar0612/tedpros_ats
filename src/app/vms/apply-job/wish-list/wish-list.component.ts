import { Component, OnInit } from '@angular/core';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service'

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishdata;
  candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
  candidateId:any;
  deleteData:any ={};
  result;
  availableRecords = 0;
  constructor(private service:VmsCandidateService) { }

  ngOnInit() {
    this.getwishData();

  }

  getwishData(){
    this.candidateId  = this.candidateUser.data.id;
    this.service.getWishList(this.candidateId).subscribe(res=>{
      this.wishdata = res.json().data;
      console.log(this.wishdata); 
    });
  }

  deleteJob(code){
    this.deleteData.jobcode = code;
    this.deleteData.candidateId = this.candidateId;
    this.service.deletewish(this.deleteData).subscribe(res=>{
      this.result = res.json();
      if (this.result.statusCode.code === '200') {
        // window.location.reload();
        this.getwishData();
      } else {
        // this.isFailure1 = true;
      }
    })
  }

}
