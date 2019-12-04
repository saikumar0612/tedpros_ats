import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css']
})
export class LicensesComponent implements OnInit {

  licenses;
  licenseData: any = {};
  licInfo: any = {};
  filterData = [{}];
  isShowPopup = false;
  availableRecords = 0;
  // sharmistha - 08-01-2019 - start
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
  // sharmistha - 08-01-2019 - end

  constructor(public http: Http, public service: UserService) {
    this.service.getLicenses()
      .subscribe(response => {
        this.licenses = response.json().data;
        this.filterData = this.licenses;
        this.availableRecords = this.filterData.length;
      },
        error => {
          console.log(error);
        }
      )
  }

  ngOnInit() {
    // sharmistha - 08-01-2019 - start
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
    // sharmistha - 08-01-2019 - end
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.licenses;
    } else {

      if (key === 'name') {
        this.filterData = this.licenses.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

  showJobDetails(linId){
    try {
      this.service.getLicenceId(linId)
        .subscribe(response => {
          this.licInfo = response.json().data;
        },
          error => {
            console.log(error);
          }
        )
    }
    catch (error) {
      console.log(error);
    }
    this.isShowPopup = true;
  }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
  }

}
