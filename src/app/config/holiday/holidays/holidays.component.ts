import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  holidayList: any = [];
  holidayInfo: any = {};
  filterData: any;
  holidayRec = {
    id:'',
    name: '',
    dateAdded: '',
    day: '',
    repeat: '',

  };
  finalData;
  holidays: any = [];
  availableRecords:any;
  isShowPopup = false;
  holidayData: any = {
    name: '',
    dateAdded: '',
    day: '',
    repeat: ''
  };
  holiday;
  isSuccess = false;
  isFailure = false;
  constructor(private service: UserService,private router: Router) {

  }

  ngOnInit() {
    this.service.getHolidaysList()
      .subscribe(res => {
        this.holidayList = res.json().data;
        // console.log(this.holidayList);
        this.filterData = [];
        const holiday = this.holidayList;
        for (let i = 0; i < holiday.length; i++) {
          if (holiday[i].id != null) {
            this.holidayRec.id = holiday[i].id;
          }
          if (holiday[i].name != null) {
            this.holidayRec.name = holiday[i].name;
          } else {
            this.holidayRec.name = ' ';
          }
          if (holiday[i].dateAdded != null) {
            this.holidayRec.dateAdded= new DatePipe('en-US').transform(holiday[i].dateAdded, 'MM-dd-yyyy')
            // this.holidayRec.dateAdded = holiday[i].dateAdded;           
          } else {
            this.holidayRec.dateAdded = ' ';
          }
          if (holiday[i].day != null) {
            this.holidayRec.day = holiday[i].day;
          } else {
            this.holidayRec.day = ' ';
          }
          if (holiday[i].repeat != null) {
            this.holidayRec.repeat = holiday[i].repeat;
          } else {
            this.holidayRec.repeat = ' ';
          }


          this.holidays.push(this.holidayRec);

          this.holidayRec = {
            id:'',
            name: '',
            dateAdded: '',
            day: '',
            repeat: '',
          };
        }
        console.log(this.holidays);
        this.filterData = this.holidays;
        this.availableRecords = this.filterData.length;
      }
      // ,
      //   error => {
      //     console.log(error);
      //   }
      );
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.holidays;
      console.log(this.filterData);
    } else {

      if (key === 'name') {
        this.filterData = this.holidays.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'dateAdded') {
        this.filterData = this.holidays.filter(x =>
          x.dateAdded.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'day') {
        this.filterData = this.holidays.filter(x =>
          x.day.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
      else if (key === 'repeat') {
        this.filterData = this.holidays.filter(x =>
          x.repeat.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

  showJobDetails(holiday){
    try {
      this.service.getHolidayById(holiday)
        .subscribe(response => {
          this.holidayInfo = response.json().data;
          console.log(this.holidayInfo);
        }
        );
    }

    catch (error) {
      // console.log(error);
    }
    this.isShowPopup = true;
  }

  // editHoliday(holiday){
  //   this.router.navigate(['/holidays/edit-holidays']);
  //   localStorage.setItem('holidayId',holiday);
  // }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
  }

}
