import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services';
import { DatePipe, Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-dependents-info',
  templateUrl: './dependents-info.component.html',
  styleUrls: ['./dependents-info.component.css']
})
export class DependentsInfoComponent implements OnInit {
  editDependentsName:any={}
  log
  logger:any={};
  message;
  isShowPopup;
  error;
  errormsg;
  loading;

  userDependents: any = {
    statusCode: {},
    data: {},
  }
  info: any = {};
  url: any;
  displayContact: boolean = false;
  relationset=[];
  dependentslist:any = {
    name:"",
    relation:"",
    ssn:"",
    dob:"",
    gender:"",
    country:{
      id:'',
      name:''
    },
    identity1:'',
    identity2: ''
  };
  dependentslist1 = [];
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
  indexofDependents;
  dateError = ' ';
  today;
  countries = [];
  // sharmistha - 08-02-2019 - end
  
  //sharmistha - 10-09-2019 - start
  isIndia:boolean =  false;
  isAmerica:boolean = false;
  isOther:boolean = true;
  //sharmistha - 10-09-2019 - end

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, public service: UserService,private eventEmitterService: EventEmitterService, public blocation: Location) {

    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='View Dependent Info';
    this.logger.comment='View Dependent Info';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
        this.eventEmitterService.onRecentActivityRefresh();    
    });
  }

  addDependents() {
    this.userDependents.data = this.dependentslist1;
    this.service.editDependencyInfo(this.userDependents.data)
      .subscribe(response => {
        this.info = response.json();
        if (this.info.statusCode.code === '200') {
          this.message = this.info.data;
          this.isShowPopup = true;
        }
        else {
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
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

  //get user dependents info - sharmistha - 08-03-2019 - start
  getDependentsInfo(){
    this.service.getPersonalDependentInfo()
      .subscribe(response => {
        this.userDependents = response.json();
        if (this.userDependents.data) {
          this.dependentslist1 = this.userDependents.data;
          this.dependentslist1.forEach(obj => {
            obj.countryname = obj.country.name; 
            obj.countryId = obj.country.id;  
          });      
        }
        else {
          this.dependentslist1 = [];
        }
        console.log(this.dependentslist1);
      },
        error => {
          console.log(error);
        }
      )
  }
  //get user dependents info - sharmistha - 08-03-2019 - end

  // get countries list - sharmistha - 10-04-2019 - start
  getCountriesInfo(){
    this.service.getCountries()
    .subscribe(response => {
      this.countries = response.json().data;
      this.loading = false;
      // console.log(this.countries);
    },
    error => {
      console.log(error);
    });
  }
  // get countries list - sharmistha - 10-04-2019 - end


  // saikumar 19/08/2019 started here 
  dateValidate() {    
    this.dateError = '';
    this.errormsg = '';
    this.today = new Date();    
    console.log(this.today);
    if (this.dependentslist.dob >= this.today) {
    this.dateError = 'Please select valid  date';
    console.log('1' + this.dateError);
    } else {
    this.dateError = '';
    
    }
  }
  // saikumar 19/08/2019 ended here

  ngOnInit() {

    //moved the services from contructor to ngOnInit - sharmistha - 08-02-2019 - start
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 

    this.getDependentsInfo();
    this.getCountriesInfo();

    // get relation info
    this.service.getRelations()
    .subscribe(response => {
      this.relationset = response.json().data;
      this.loading = false;
    },
    error => {
      console.log(error);
    });

    //moved the services from contructor to ngOnInit - sharmistha - 08-02-2019 - end
  }

  location: string;
  onNavigate(location) {
    this.router.navigate([location]);
  }

  cancel() {
    // this.router.navigate(['myInfo']);
    // sharmistha - 08-02-2019 - start
    this.blocation.back()
    // sharmistha - 08-02-2019 - end
  }

  editContact() {
    this.displayContact = true;
  }

  backContact(addUser:NgForm) {
    // sharmistha - 08-03-2019 - start
    this.getDependentsInfo();
    // sharmistha - 08-03-2019 - start
    this.displayContact = false;
    addUser.resetForm();
    this.isOther = true;
    this.isIndia = false;
    this.isAmerica = false;
    this.indexofDependents =null;
  }

  // adding new experience record in the table display
  name: string;
  relation: string;
  dob: string;
  snn: string;
  gender:string;

  //changed the code of insert and edit functionality - sharmistha - 08-02-2019 - start
  insertDependent(addUser: NgForm, name,relation,relationname,gender,dob,countryId,countryname) {
    let identity1;
    let identity2;
    if(countryId === "231"){
      identity1 = this.dependentslist.ssn;
      identity2 = "";
    }
    else if(countryId === "101"){
      identity1 = this.dependentslist.aadhar;
      identity2 = this.dependentslist.pan;
    }
    else{
      identity1 = this.dependentslist.identification;
      identity2 = "";
    }
    // let identity1 = this.dependentslist.identity1;
    // let identity2 = this.dependentslist.identity2;
    
    if(this.indexofDependents!=null || this.indexofDependents==0 || this.indexofDependents!=undefined){
      const dob = new DatePipe('en-US').transform(this.dependentslist.dob, 'yyyy-MM-dd');
      let validBoolean = false;
      for (let index = 0; index < this.dependentslist1.length; index++) {
        if (this.dependentslist1[index].relation === relation && this.dependentslist1[index].name === name && this.dependentslist1[index].dob === dob && this.dependentslist1[index].countryId === countryId && this.dependentslist1[index].identity1 === identity1 && this.dependentslist1[index].identity2 === identity2 && this.dependentslist1[index].gender === gender) {
          validBoolean = true;
        }
      }
      const today = new Date();
      const todayDate = new DatePipe('en-US').transform(today, 'yyyy-MM-dd');
      if (validBoolean) {
        this.errormsg = 'Duplicate data cannot be added';
      }
      else if (dob >= todayDate) {
        this.errormsg = 'Please select a valid Date Of Birth';
      }
      else{
        this.errormsg="";  
        if(countryId === "231"){
          identity2 = "";
        }
        else if(countryId !== "101"){
          identity2 = "";
        }
        this.editDependentsName ={
          relation:relation,
          relationname:relationname,
          name:name,
          identity1:identity1,
          identity2:identity2,
          dob:dob,
          gender:gender,
          countryId:countryId,
          countryname:countryname
        };
          
        this.dependentslist1.splice(this.indexofDependents,1,this.editDependentsName);
        this.resetForm(addUser);
        this.indexofDependents =null;
        for (let i = 0; i < this.relationset.length; i++) {
          if (this.relationset[i].id === this.editDependentsName.relation) {
            this.editDependentsName.relationname = this.relationset[i].relation;
          }         
        }

        for (let i = 0; i < this.countries.length; i++) {
          if (this.countries[i].id === this.editDependentsName.countryId) {
            this.editDependentsName.countryname = this.countries[i].name;
          }         
        }
      }  
    }
    else if(this.indexofDependents == null ){
      const dob = new DatePipe('en-US').transform(this.dependentslist.dob, 'yyyy-MM-dd');
      let validBoolean = false;
      for (let index = 0; index < this.dependentslist1.length; index++) {
        if (this.dependentslist1[index].relation === relation && this.dependentslist1[index].name === name && this.dependentslist1[index].dob === dob && this.dependentslist1[index].countryId === countryId && this.dependentslist1[index].identity1 === identity1 && this.dependentslist1[index].identity2 === identity2 && 
          this.dependentslist1[index].gender === gender) {
          validBoolean = true;
        }
      }
      const today = new Date();
      const todayDate = new DatePipe('en-US').transform(today, 'yyyy-MM-dd');
      if (validBoolean) {
        this.errormsg = 'Duplicate data cannot be added';
      }
      else if (dob >= todayDate) {
        this.errormsg = 'Please select a valid Date Of Birth';
      }
      else{
        this.errormsg="";
        
        this.dependentslist.dob ="";
        this.dependentslist1.push({'name': name, 'relation': relation, 'relationname':relationname, 'dob': dob, 'identity1':identity1, 'identity2': identity2, 'gender':gender, 'countryId':countryId, 'countryname':countryname});
        this.resetForm(addUser);
        for (let i = 0; i < this.relationset.length; i++) {
          if (this.relationset[i].id === relation) {
            this.dependentslist1[this.dependentslist1.length - 1].relationname = this.relationset[i].relation;
          }
        }

        for (let i = 0; i < this.countries.length; i++) {
          if (this.countries[i].id === countryId) {
            this.dependentslist1[this.dependentslist1.length - 1].countryname = this.countries[i].name;
          }         
        }
      }
    }
  }
  //changed the code of insert and edit functionality - sharmistha - 08-02-2019 - end


  //edit dependent info
  editDependent(dependentinfo) {
    this.dependentslist.name = dependentinfo.name;
    this.dependentslist.relation = dependentinfo.relation;
    this.dependentslist.country.id = dependentinfo.countryId;
    if(dependentinfo.countryId === "101"){
      this.isIndia = true;
      this.isAmerica = false;
      this.isOther = false;
      this.dependentslist.aadhar = dependentinfo.identity1;
      this.dependentslist.pan = dependentinfo.identity2;
    }
    else if(dependentinfo.countryId === "231"){
      this.isIndia = false;
      this.isAmerica = true;
      this.isOther = false;
      this.dependentslist.ssn = dependentinfo.identity1;
    }
    else{
      this.isOther = true;
      this.isIndia = false;
      this.isAmerica = false;
      this.dependentslist.identification = dependentinfo.identity1;
    }
    // this.dependentslist.identity1 = dependentinfo.identity1;
    // this.dependentslist.identity2 = dependentinfo.identity2;
    this.dependentslist.gender = dependentinfo.gender;
    if(dependentinfo.dob){
      this.dependentslist.dob = new Date(dependentinfo.dob);
    }
    else{
      this.dependentslist.dob=null;
    }

    let index = this.dependentslist1.indexOf(dependentinfo);
    this.indexofDependents = index;
  }

  removeDependent(dependentinfo) {
    let index = this.dependentslist1.indexOf(dependentinfo);
    this.dependentslist1.splice(index, 1);
  }

  change(countryId){
    // console.log(this.indexofDependents);
    if(this.indexofDependents == null){
      console.log("index is null");
      this.dependentslist.identification = "";
      this.dependentslist.ssn = "";
      this.dependentslist.aadhar = "";
      this.dependentslist.pan = "";
    }
    else{
      console.log(this.dependentslist);
    }
    if(countryId === "101"){
      this.isIndia = true;
      this.isAmerica = false;
      this.isOther = false;
    }
    else if(countryId === "231"){
      this.isIndia = false;
      this.isAmerica = true;
      this.isOther = false;
    }
    else{
      this.isOther = true;
      this.isIndia = false;
      this.isAmerica = false;
    }
  }

  resetForm(addUser:NgForm){
    addUser.resetForm();
    this.isOther = true;
    this.isIndia = false;
    this.isAmerica = false;
    this.indexofDependents =null;
  }

}