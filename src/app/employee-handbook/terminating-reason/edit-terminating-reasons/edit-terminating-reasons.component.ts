import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';  
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-edit-terminating-reasons',
  templateUrl: './edit-terminating-reasons.component.html',
  styleUrls: ['./edit-terminating-reasons.component.css']
})
export class EditTerminatingReasonsComponent implements OnInit {
  terminatingID;
  termination;
  reason;
  terminationInfo:any = {id:'',name:'',description:''};
  terminationData:any ={};
  isSuccess = false;
  isFailure = false;
  headers:any;
  options:any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public  blocation:Location, private service:UserService) {
   }

   ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.terminatingID = param.get('id');
        // console.log(this.terminatingID);
      }
    );
    // this.http.get(' http://service.tedpros.com/termination/getTermination?id='+this.terminatingID,this.options)
    this.service.getTermination(this.terminatingID)
    .subscribe(response =>{
      this.terminationInfo= response.json().data;
      // console.log(this.terminationInfo);
    });
  }
  
  cancel(){
    // this.router.navigate(['terminating-resons']);
    this.blocation.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  editReason(){
    this.terminationData.id = this.terminationInfo.id;
    this.terminationData.name = this.terminationInfo.name;
    this.terminationData.description = this.terminationInfo.description;
    // this.http.post('http://service.tedpros.com/termination/editTermination',this.terminationData,this.options)
    this.service.editTerminationReson(this.terminationData)
    .subscribe(response =>{
      this.reason = response.json();
      // console.log(this.reason);
      if(this.reason.statusCode.code == "200"){
        this.isSuccess = true;
      }
      else{
        this.isFailure = true;
      }
    }
  )
  };

}
