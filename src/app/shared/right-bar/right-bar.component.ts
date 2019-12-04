import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../core/services';
import { EventEmitterService } from '../../core/services/event-emitter.service';
import { RightBarService } from '../../core/services/right-bar.service';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.css']
})
export class RightBarComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  logsData: any;

  headers: any;
  options: any;
  url: any;

  constructor(public http: Http, public service: UserService, public eventEmitterService: EventEmitterService,
    public sideNavService: RightBarService) {
    this.getusersactivity();
  }
  getusersactivity() {
    this.service.getUserlogs()
      .subscribe(response => {
        this.logsData = response.json().data.loggs;
        // console.log(this.logsData);
      });
  }
  ngOnInit() {

    if (this.eventEmitterService.refreshVar === undefined) {
      this.eventEmitterService.refreshVar = this.eventEmitterService.
        invokeRecentActivityRefresh.subscribe((name: string) => {
          this.getusersactivity();
        });
    }


  }

}
