import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})
export class LeaveTypeComponent implements OnInit {
  leavedata: any;
  data: any;
  leaveInfo: any = [];
  leaveRec = {
    id: '',
    name: '',
    country: '',
  };
  leaves: any = [];
  leaveModel: any = {
    country:{
      name:""
    }
  };
  isShowPopup = false;
  availableRecords = 0;
  constructor(private service: UserService) {

  }

  ngOnInit() {
    this.service.getLeaveType().subscribe(res => {
      this.data = res.json().data;
      this.leavedata = this.data;
      // console.log(this.leavedata);
      const leave = this.data;
      for (let i = 0; i < leave.length; i++) {
        this.leaveRec.id = leave[i].id;
        if (leave[i].name !== null) {
          this.leaveRec.name = leave[i].name;
        } else {
          this.leaveRec.name = ' ';
        }
        if (leave[i].country !== null) {
          this.leaveRec.country = leave[i].country.name;
        } else {
          this.leaveRec.country = ' ';
        }

        this.leaves.push(this.leaveRec);

        this.leaveRec = {
          id: '',
          name: '',
          country: '',
        };
      }
      this.leavedata = this.leaves;
      this.availableRecords = this.leavedata.length;
    });
  }

  search(term: string, key: string) {
    if (!term) {
      this.leavedata = this.leaves;
      // console.log(this.leavedata);
    } else {

      if (key === 'name') {
        this.leavedata = this.leaves.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'country') {
        this.leavedata = this.leaves.filter(x =>
          x.country.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
	this.availableRecords = this.leavedata.length;
  }

  showJobDetails(leave){
    try {
      this.service.getLeaveTypeById(leave)
        .subscribe(response => {
          this.leaveModel = response.json().data;
          // console.log(this.leaveModel);
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
