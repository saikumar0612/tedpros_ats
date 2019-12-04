import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-work-week',
  templateUrl: './work-week.component.html',
  styleUrls: ['./work-week.component.css']
})
export class WorkWeekComponent implements OnInit {
  weekData: any = [];
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

  constructor(private service: UserService) {

  }

  ngOnInit() {
    
    this.service.getWorkWeek().subscribe(response => {
      this.weeks = response.json().data;
      // console.log(this.weeks);
    });
  }
}
