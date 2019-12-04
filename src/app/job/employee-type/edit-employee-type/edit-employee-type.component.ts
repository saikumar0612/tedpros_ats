import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-employee-type',
  templateUrl: './edit-employee-type.component.html',
  styleUrls: ['./edit-employee-type.component.css']
})
export class EditEmployeeTypeComponent implements OnInit {

  typeId;
  data;
  statusInfo: any = {};
  isSuccess = false;
  isFailure = false;
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public service: UserService, private blocation: Location) {
  }

  cancel() {
    this.blocation.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.statusInfo.id = param.get('id');
        this.typeId = this.statusInfo.id;
      }
    );
    this.service.getEmployeeType(this.typeId)
      .subscribe(response => {
        this.data = response.json().data;
        this.statusInfo = this.data;
       
      },
        error => {
          console.log(error);
        }
      )
  }
  editType() {
    this.service.editEmployeeType(this.typeId, this.statusInfo)
      .subscribe(response => {
        this.data = response.json();
        if (this.data.statusCode.code === '200') {
          this.isSuccess = true;
        } else {
          // console.log(this.data.errorMessages);
          this.isFailure = true;
        }
      },
        error => {
          console.log(error);
        }
      );
  }

}

