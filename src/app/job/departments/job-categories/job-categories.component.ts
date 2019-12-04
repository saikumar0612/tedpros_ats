import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';


@Component({
  selector: 'app-job-categories',
  templateUrl: './job-categories.component.html',
  styleUrls: ['./job-categories.component.css']
})
export class JobCategoriesComponent implements OnInit {
  categories = [{
    name: '',
    id:""
  }];
  filterData: any = [{
    name: ''
  }];
  catData: any = {};
  catInfo: any = {};
  info = {
    name: '',
    id:''
  };
  availableRecords = 0;
  isShowPopup = false;
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  component: { name: string; id: string; }[];
  constructor(public http: Http, public service: UserService) { 
  }

  // search logic
  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.categories;
    } else {

      if (key === 'name') {
        this.filterData = this.categories.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

  ngOnInit() {
    this.userPermissions = this.currentUser.permission;
    this.service.getJobCategories()
    .subscribe(response => {
      this.categories = response.json().data;
      this.filterData = this.categories;
      this.availableRecords = this.filterData.length;
      
    },
      error => {
        console.log(error);
      }
    );
  }

  //job info
  showJobDetails(jobId){
    this.info = this.categories.filter(x => x.id == jobId)[0];
    this.isShowPopup = true;
  }

  // close popup
  closePopup(){
    this.isShowPopup = !this.isShowPopup;
  }

}
