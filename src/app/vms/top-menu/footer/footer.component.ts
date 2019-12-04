import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  companyName;
  currentDate = new Date();
  currentYear;
  result:any;
  constructor() { }

  ngOnInit() {
    this.currentYear = new DatePipe('en-US').transform(this.currentDate, 'yyyy');   
    this.result = JSON.parse(localStorage.getItem('settings'));
      this.companyName = this.result.data.title;
  }

}
