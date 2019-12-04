import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-pay-grade',
  templateUrl: './add-pay-grade.component.html',
  styleUrls: ['./add-pay-grade.component.css']
})
export class AddPayGradeComponent implements OnInit {
  payData: any = {};
  data;
  isSuccess = false;
  isFailure = false;
  constructor(private http: Http, private router: Router, public service: UserService,  private blocation: Location) {
  }
// added form reset after success - sharmistha - 08-23-2019 - start
  addPay(addPayFrm:NgForm) {
    this.service.addPaygrades(this.payData)
      .subscribe(response => {
        this.data = response.json();
        if (this.data.statusCode.code == "200") {
          this.isSuccess = true;
          addPayFrm.reset();

        }
        else {
          console.log(this.data.errorMessages);
          this.isFailure = true;
        }
      },
        error => {
          console.log(error);
        }
      )
  }
// added form reset after success - sharmistha - 08-23-2019 - end

  ngOnInit() {
  }

  cancel(){
    this.blocation.back()
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

}
