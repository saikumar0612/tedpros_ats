import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-work-week',
  templateUrl: './edit-work-week.component.html',
  styleUrls: ['./edit-work-week.component.css']
})
export class EditWorkWeekComponent implements OnInit {
  // weekData: any = { };
  weekData=[];
  weeks: any ={
    country:{
      id:'',
      name:''
    },
    monday:{
      id:'',
      name:''
    },
    tuesday:{
      id:'',
      name:''
    },
    wednesday:{
      id:'',
      name:''
    },
    thursday:{
      id:'',
      name:''
    },
    friday:{
      id:'',
      name:''
    },
    saturday:{
      id:'',
      name:''
    },
    sunday:{
      id:'',
      name:'' 
    }
  }
  editdata: any;
  weekEdit: any = {};
  countries;
  error = null;
  message;
  isSuccess = false;
  isFailure = false;
  constructor(private service: UserService, private blocation: Location) {

    this.service.getWorkDay().subscribe(res => {
      this.weekData = res.json().data;
    });

    this.service.getCountries()
      .subscribe(response => {
        this.countries = response.json().data;
        // this.loading = false;
      });
  }
  ngOnInit() {
    this.service.getWorkWeek().subscribe(response => {
      this.weeks = response.json().data;
    });


  }


  editWork() {
    console.log(this.weeks);
    this.service.editWorkWeek(this.weeks).subscribe(data => {
      this.editdata = data.json();
      if (this.editdata.statusCode.code === '200') {
        this.isSuccess = true;
      } else {
        this.isFailure = true;
      }
    });
  }


  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  cancel() {
    this.blocation.back();
  }


}
