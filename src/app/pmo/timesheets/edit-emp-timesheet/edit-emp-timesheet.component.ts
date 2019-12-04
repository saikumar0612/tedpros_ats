import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-emp-timesheet',
  templateUrl: './edit-emp-timesheet.component.html',
  styleUrls: ['./edit-emp-timesheet.component.css']
})
export class EditEmpTimesheetComponent implements OnInit {
  timesheetInput:any= [{
    date:'',
    projectName:'',
    activity:'',
    noOfHours: '',
    description: ''
  }]

  singleLog = {
    date:'',
    projectName:'',
    activity:'',
    noOfHours: '',
    description: ''
  }

  constructor(private blocation:Location) { }

  ngOnInit() {
  }

  addLog(){
    this.timesheetInput.push(this.singleLog);
  }

  removeLog(index){
    this.timesheetInput.splice(index, 1);
  }
  cancel() {
    this.blocation.back(); 
  }

}