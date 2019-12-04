import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-job-categories',
  templateUrl: './edit-job-categories.component.html',
  styleUrls: ['./edit-job-categories.component.css']
})
export class EditJobCategoriesComponent implements OnInit {
  catId;
  data;
  isSuccess = false;
  isFailure = false;
  catInfo: any = { id: '', name: '' };
  catData: any = {};
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // url:any = 'http://localhost/tedpros_services/';
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public service: UserService,private blocation: Location) {
  }

  cancel(){
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
        this.catInfo.id = param.get('id');
        console.log(this.catInfo.id);
      }
    );
    // this.http.get(this.url+'job/getcategory/?id='+this.catInfo.id,  this.options)
    this.service.getJobCategory(this.catInfo.id)
      .subscribe(response => {
        const data = response.json().data;
        this.catInfo = data[0];
        // console.log(this.catInfo);
      },
        error => {
          console.log(error);
        }
      );
  }

  editCat() {
    this.catData.id = this.catInfo.id;
    this.catData.jobName = this.catInfo.name;
    this.service.editJobCategories(this.catData)
      .subscribe(response => {
        this.data = response.json();
        // console.log(this.cat);
        // if(this.cat === 'success'){
        //   this.router.navigate(['job-categories']);
        // }
        if (this.data.statusCode.code === '200') {
          this.isSuccess = true;
        } else {
          console.log(this.data.errorMessages);
          this.isFailure = true;
        }
      },
        error => {
          console.log(error);
        });
  }

}
