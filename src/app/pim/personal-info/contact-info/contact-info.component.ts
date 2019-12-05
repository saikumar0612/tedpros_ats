import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  list={
    name:'',
    relation: '',
    relationname: '',
    contact: '',
    email: '',
    dob:''
  }
  indexofcontactDetails;
  log
  logger: any = {};
  message1
  isShowPopup1
  error1;
  isShowPopup;
  error;
  message;
  errormsg;

  // patterns
  contactPattern = '^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$';
  otherEmailPattern = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z.]{2,4}$)';

  zipError = '';
  userEmergency: any = {
    statusCode: {},
    data: {},
  }
  contactInfo: any = {
    city: { 'id': '', 'name': '' },
    state: { 'id': '', 'name': '' },
    country: { 'id': '', 'name': '' },
    homeTelephone: "",
    workTelephone: ""
  };
  contactDetails: any = {
    city: { 'id': '', 'name': '' },
    state: { 'id': '', 'name': '' },
    country: { 'id': '', 'name': '' },
    homeTelephone: "",
    workTelephone: ""
  };
  data: any = {
    city: { name: '' },
    state: { name: '' },
    country: { name: '' },
  }
  viewDetails: any = {};
  info: any = {};
  url: any;
  displayContact: boolean = false;
  displayEmergency: boolean = false;
  // emergencylist: Array<Emergency>;
  // emergencylist1: Array<Emergency>=[];
  emergencylist = {
    name: "",
    relation: "",
    contact: "",
    email: "",
    dob:''
  };
  emergencylist1 = [];
  relationset = [];
  index;
  countries;
  states;
  cities;
  loading;
  doberror;
  checkdate;
  differenceInHours;
  diffInDays;
  age;
  doberrormsg;
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, public service: UserService, private eventEmitterService: EventEmitterService) {

    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'View Contact Info';
    this.logger.comment = 'View Contact Info';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        // this.timerComponent.getusersactivity();
        // firstComponentFunction(){    
        this.eventEmitterService.onRecentActivityRefresh();
        // }  
      });
    this.contactDetails.country.id = "231";   

    // get relation info
    this.service.getRelations()
      .subscribe(response => {
        this.relationset = response.json().data;
        this.loading = false;
        // console.log(this.employmentStatus);
      },
        error => {
          console.log(error);
        });


    // get countries list
    this.service.getCountries()
    .subscribe(response => {
      this.countries = response.json().data;
      this.loading = false;
      // console.log(this.countries);
    },
    error => {
      console.log(error);
    });
    this.contactDetails.country.id = '231';
    this.change('231');
    this.contactInformation();
    this.getEmergencyInformation();
  }
  
  //get contact info
  contactInformation(){
    this.service.getPersonalContactInfo()
      .subscribe(response => {
        this.contactInfo = response.json().data;
        this.data = this.contactInfo;
        this.loading = false;
        if (this.contactInfo != null) {
          //get state based on country
          this.service.getStates(this.contactInfo.country.id)
          .subscribe(response => {
            this.states = response.json().data;
            this.loading = false;
          },
          error => {
            console.log(error);
          });

          // get city based on state
          this.service.getCities(this.contactInfo.state.id)
          .subscribe(response => {
            this.cities = response.json().data;
            this.loading = false;
          },
          error => {
            console.log(error);
          });
        }

      },
      error => {
        console.log(error);
      })
  }

  

    //get contact info
    getEmergencyInformation(){
      this.service.getEmergencyContactInfo()
      .subscribe(response => {
        this.emergencylist1 = response.json().data;
        if (response.json().data) {
          this.emergencylist1 = response.json().data;
        }
        else {
          this.emergencylist1 = [];
        }
      },
      error => {
        console.log(error);
      })
    }

  change(id) {
    this.service.getStates(id)
      .subscribe(response => {
        this.states = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  getCity(id) {
    this.service.getCities(id)
    .subscribe(response => {
      this.cities = response.json().data;
      this.loading = false;
    },
    error => {
      console.log(error);
    });
  }

  // added date of birth validation -sharmistha - 08-29-2019 - start
  dateOfBirthValidation(){
    this.doberror="";
    this.doberrormsg = "";
    this.checkdate= new Date();
    this.differenceInHours = Date.parse(this.checkdate) - Date.parse(this.emergencylist.dob);
    this.diffInDays = this.differenceInHours / 1000 / 60 / 60 / 24;
    this.age=this.diffInDays/365;
    if(this.age<14){
      this.doberror="Employee Below the Age 14 are not eligible";
    }   
  } 
  // added date of birth validation -sharmistha - 08-29-2019 - end

  getAddress() {
    const zip = this.contactInfo.zip;
    this.zipError = null;
    // console.log(zip);
    if (zip !== null) {
      this.service.getAddress(zip)
        .subscribe(response => {
          const result = response.json();
          // console.log(result);
          if (result.statusCode.code === '200') {
            this.contactInfo.country.id = result.data.country.id;
            this.change(this.contactInfo.country.id);
            this.contactInfo.state.id = result.data.state.id;
            this.getCity(this.contactInfo.state.id);
            this.contactInfo.city.id = result.data.city.id;
          } else {
            this.contactInfo.zip = '';
            this.zipError = 'Please enter a valid zip code';
            // console.log('zipcode not found');
          }
        },
          error => {
            console.log(error);
          });
    }
  }

  getAddress1() {
    const zip = this.contactDetails.zip;
    this.zipError = null;
    // console.log(zip);
    if (zip !== null) {
      this.service.getAddress(zip)
        .subscribe(response => {
          const result = response.json();
          // console.log(result);
          if (result.statusCode.code === '200') {
            this.contactDetails.country.id = result.data.country.id;
            this.change(this.contactDetails.country.id);
            this.contactDetails.state.id = result.data.state.id;
            this.getCity(this.contactDetails.state.id);
            this.contactDetails.city.id = result.data.city.id;
          } else {
            this.contactDetails.zip = '';
            this.zipError = 'Please enter a valid zip code';
            // console.log('zipcode not found');
          }
        },
          error => {
            console.log(error);
          });
    }
  }

  //edit emergency contact
  editEmergency(emergencyinfo) {
    // console.log(emergencyinfo);
    this.emergencylist.name = emergencyinfo.name;
    this.emergencylist.relation = emergencyinfo.relation;
    this.emergencylist.contact = emergencyinfo.contact;
    this.emergencylist.email = emergencyinfo.email;
    this.emergencylist.dob = new DatePipe('en-US').transform( emergencyinfo.dob, 'yyyy-MM-dd');

    let index = this.emergencylist1.indexOf(emergencyinfo);
    this.indexofcontactDetails = index;
    // this.emergencylist1.splice(index, 1);
  }

  ngOnInit() {
  }

  location: string;
  onNavigate(location) {
    this.router.navigate([location]);
  }

  cancel() {
    this.router.navigate(['myInfo']);
  }

  editContact() {
    this.displayContact = true;
  }

  editEmergencyInfo() {
    this.displayEmergency = true;
  }

  backContact() {
    this.displayContact = false;
    this.contactInformation();
  }

  backEmergencyContact(addUser:NgForm) {
    this.displayEmergency = false;
    addUser.resetForm();
    this.getEmergencyInformation();
  }
  // edit contact info
  editContactInfo() {
    console.log(this.contactInfo);
    // this.http.post(this.url + 'personal/editcontactInfo', this.contactInfo, this.options)
    this.service.editContactInfo(this.contactInfo)
      .subscribe(response => {
        this.info = response.json();
        if (this.info.statusCode.code === '200') {
          this.message = this.info.data;
          this.isShowPopup = true;
          //this.router.navigate(['myInfo']);
        }
        else {
          // this.userData.roles = [];
          this.error = this.info.errorMessages;
          this.loading = false;
          this.isShowPopup = true;
        }
      },
        error => {
          console.log(error);
        }
      )
  }
  
  resetForm(addContactFrm:NgForm){
    this.contactInfo.addressLine1 = "";
    this.contactInfo.addressLine2 = "";
    this.contactInfo.street = "";
    this.contactInfo.state.id = "";
    this.contactInfo.city.id = "";
    this.contactInfo.zip = "";
    this.contactInfo.otherEmail = "";
    this.contactInfo.homeTelephone = "";
    this.contactInfo.workTelephone = "";
    this.contactInfo.country.id = '231';
    this.change(this.contactInfo.country.id);
  }

  reset(){
    this.contactDetails.addressLine1 = "";
    this.contactDetails.addressLine2 = "";
    this.contactDetails.street = "";
    this.contactDetails.state.id = "";
    this.contactDetails.city.id = "";
    this.contactDetails.zip = "";
    this.contactDetails.otherEmail = "";
    this.contactDetails.homeTelephone = "";
    this.contactDetails.workTelephone = "";
    this.contactDetails.country.id = '231';
    this.change(this.contactDetails.country.id);
  }


  // add contact info
  addContactInfo() {
    // console.log(this.contactDetails);
    // this.http.post(this.url + 'personal/addContactInfo', this.contactDetails, this.options)
    this.service.addContactInfo(this.contactDetails)
      .subscribe(response => {
        this.info = response.json();
        if (this.info.statusCode.code === '200') {
          this.router.navigate(['myInfo']);
        }
      },
        error => {
          console.log(error);
        }
      )
  }

  // edit personal info
  // editEmergencyContactInfo(){
  //   this.http.post(this.url+ '/personal/editEmergencyContactInfo', this.emergencyContactInfo.data, this.options)
  //   .subscribe(response =>{
  //     this.info = response.json();
  //     if(this.info.statusCode.code === '200'){
  //       this.router.navigate(['myInfo']);
  //     }
  //   },
  //   error => {
  //     console.log(error);
  //   }
  // )
  // }

  addEmergency() {
    // console.log(this.emergencylist1);
    this.userEmergency.data = this.emergencylist1;
    // this.http.post(this.url + 'personal/editEmergencyContactInfo', this.userEmergency.data, this.options)
    this.service.editEmergencyContactInfo(this.userEmergency.data)
      .subscribe(response => {
        this.info = response.json();
        // console.log(this.contactInfo.data);
        if (this.info.statusCode.code === '200') {
          this.message1 = this.info.data;
          this.isShowPopup1 = true;
          //this.router.navigate(['myInfo']);
        }
        else {
          // this.userData.roles = [];
          this.error1 = this.info.errorMessages;
          this.loading = false;
          this.isShowPopup1 = true;
        }
      },
        error => {
          console.log(error);
        }
      )
  }
  closePopup1() {
    this.isShowPopup1 = !this.isShowPopup1;
  }


  // adding new experience record in the table display
  name: string;
  relation: string;
  contact: string;

  // changes in adding emergency - sharmistha - 08-29-2019 - start
  insertEmergency(addUser: NgForm, name, relation, relationname, contact, email, dob) { 
    console.log(dob)
    if(this.indexofcontactDetails!=null || this.indexofcontactDetails==0 || this.indexofcontactDetails!=undefined){
      const dob = new DatePipe('en-US').transform(this.emergencylist.dob, 'yyyy-MM-dd');
      this.errormsg = "";
      this.list={
        name:name,
        relation: relation,
        relationname: relationname,
        contact: contact,
        email: email,
        dob:dob
      }
      for (let i = 0; i < this.relationset.length; i++) {
        if (this.relationset[i].id === relation) {
          this.list.relationname = this.relationset[i].relation;
        }
      }
      this.emergencylist1.splice(this.indexofcontactDetails,1,this.list)
      this.indexofcontactDetails =null;
      addUser.resetForm();

    } else if(this.indexofcontactDetails==null){
        const dob = new DatePipe('en-US').transform(this.emergencylist.dob, 'yyyy-MM-dd');
        let validBoolean = false;
        this.emergencylist1.forEach(obj => {
        if (obj.relation === relation && obj.name === name && obj.contact === contact) {
          validBoolean = true;
        }
      });
      if (validBoolean) {
        this.errormsg = 'Duplicate data cannot be added';
      }
      else {
        if(this.doberror){
          this.doberrormsg = "Employee Below the Age 14 are not eligible";
        }
        else{
          this.errormsg = "";
          this.doberrormsg = "";
          addUser.resetForm();
          this.emergencylist1.push({ 'name': name, 'relation': relation, 'relationname': relationname, 'contact': contact, 'email': email, 'dob':dob });

          for (let i = 0; i < this.relationset.length; i++) {
            if (this.relationset[i].id === relation) {
              this.emergencylist1[this.emergencylist1.length - 1].relationname = this.relationset[i].relation;
            }
          }         
          this.emergencylist.contact = null;
          this.emergencylist.name = null;
          this.emergencylist.relation = null;
          this.emergencylist.email = null;
          this.emergencylist.dob = null;
        }
      }
    }
  }
  // changes in adding emergency - sharmistha - 08-29-2019 - end

  removeEmergency(emergencyinfo) {
    let index = this.emergencylist1.indexOf(emergencyinfo);
    this.emergencylist1.splice(index, 1);
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

}

//model class used to define a license
// export class Emergency{

//   name:string;
//   relation:string;
//   contact: string;

//   constructor(name,relation,contact){
//       this.name = name;
//       this.relation = relation;
//       this.contact = contact;
//   }

// }

