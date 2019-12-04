import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services';

@Component({
  selector: 'app-pay-grades',
  templateUrl: './pay-grades.component.html',
  styleUrls: ['./pay-grades.component.css']
})
export class PayGradesComponent implements OnInit {
  paygrades;
  filterData = [];
  payData: any = {};
  payInfo: any = {};
  filteredCurrency:any;
  isShowPopup=false;
  availableRecords:any;
  // sharmistha - 08-02-2019 - start
  currentUser ={
    token:'',
    email:'',
    id: '',
    flag: '',
    empType: {
        id:'',
        employeeType: ''
    },
    userType: {
        id: '',
        name: '',
        typeName: ''
    },
    first_name: '',
    last_name: '',
    middle_name: '',
    isAdmin: false,
    Adminrole: false,
    permission: {},
    submenuPermission: { },
    fieldPermission: {}
  };
  userPermissions : any;
  // sharmistha - 08-02-2019 - end
  constructor(public http: Http, public service: UserService) {

  }

  ngOnInit() {
    // sharmistha - 08-02-2019 - start
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
    // sharmistha - 08-02-2019 - end

    this.service.getPayGrades()
    .subscribe(response => {
      this.paygrades = response.json().data;
      this.filterData = this.paygrades;
      this.filterData.forEach(obj => {
        // appended $ syn=mbol to maximum and minimum salary - sharmistha - 08-23-2019 - start
        obj.min_salary = '$'+obj.min_salary;
        obj.max_salary = '$'+obj.max_salary;
        // appended $ syn=mbol to maximum and minimum salary - sharmistha - 08-23-2019 - end
      })
      this.availableRecords = this.filterData.length;
      // console.log(this.filterData);
    },
      error => {
        console.log(error);
      }
    )
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.paygrades;
    } else {

      if (key === 'name') {
        this.filterData = this.paygrades.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if(key === 'min_salary'){
        this.filterData = this.paygrades.filter(x =>
          x.min_salary.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if(key === 'max_salary'){
        this.filterData = this.paygrades.filter(x =>
          x.max_salary.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      // sharmistha - 08-02-2019 - start
      } else if(key === 'currency'){
        this.filteredCurrency = this.paygrades.filter(y => y.currency != null);
        this.filterData = this.filteredCurrency.filter(x =>
          x.currency.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      // sharmistha - 08-02-2019 - end
    }
    this.availableRecords = this.filterData.length;
  }

  showJobDetails(jobId){
    this.service.getPatGradesID(jobId)
    .subscribe(response => {
      this.payInfo = response.json().data;
      // console.log(this.payInfo);
    },
      error => {
        console.log(error);
      })
    this.isShowPopup = true;
  }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
  }

}
