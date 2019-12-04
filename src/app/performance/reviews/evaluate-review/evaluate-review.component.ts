import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-evaluate-review',
  templateUrl: './evaluate-review.component.html',
  styleUrls: ['./evaluate-review.component.css']
})
export class EvaluateReviewComponent implements OnInit {
  log
  logger:any={};

  trackerData: any = {
    supervisor: '',
    user: '',
    jobTitle: '',
    kpiType: {
      id: '',
      name: ''
    },
  };
  kpiComments: any = {
    addedBy: '',
    type: '',
  };
  kpiType: any = {
    id: '',
    name: ''
  };
  kpiReview: any = {
    addedBy: '',
    type: '',
  };
  commentData: any = {
    review: '',
    userfinal: '',
    supervisorfinal: '',
    userComment: '',
    supervisorComment: ''
  };
  kpis;
  data;
  logoUrl;
  logo;
  class;
  loading = false;
  userComment = [];
  supervisorComment = [];
  reviewId: any;
  headers: any;
  options: any;  
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userId = this.currentUser.id;
  kipsFormObject = [];
  userObjects = [];
  supervisorObjects = [];

  constructor(private http: Http, private router: Router, public service: UserService, private route: ActivatedRoute,
    private location: Location,private eventEmitterService: EventEmitterService) {

    this.kpiComments.type = 'save';
    this.kpiReview.type = 'activate';

    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Evaluate Review';
    this.logger.comment='Evaluate Review';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      this.eventEmitterService.onRecentActivityRefresh();  
    });
  }

  printToSave(printSectionId: string) {
    let popupWinindow;
    const innerContents = document.getElementById(printSectionId).innerHTML;
    popupWinindow = window.open('', '_blank', 'width=1200,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write(
      '<html><head><link rel="stylesheet" type="text/css" href="../../../../assets/css/style.css" /></head><style>.form-header h5{color: red;}</style><body class="' + this.class + '" onload="window.print()"><div class="container-fluid full-screen"><div class="row"><div class="main-content">' + innerContents + '</div></div></div></body></html>'
    );
    popupWinindow.document.close();
  }

  ngOnInit() {
    const result = JSON.parse(localStorage.getItem('settings'));
    this.logo = this.service.getBaseUrl()+'/frontend/logos/'+ result.data.siteLogo;
    this.class = result.data.themeClass;

    this.route.params.subscribe(res => {
      this.reviewId = res.id;
    });
    this.loading = true;
    // get review details
    // this.http.get(this.url+'performance/getReview?id='+this.reviewId, this.options)
    this.service.getReviewId(this.reviewId)
      .subscribe(response => {
        this.trackerData = response.json().data;
        console.log(this.trackerData);
        this.kpis = this.trackerData.kpis;
        this.kpis.forEach(kpi => {
          // console.log(kpi);
          this.kipsFormObject.push({
            kpiId: kpi.id,
            indicator: kpi.indicator,
            minRating: kpi.minRating,
            maxRating: kpi.maxRating,
            kpiComment: '',
            kpiRating: '',
          });
        });
      });

    // get kpi comment
    this.loading = true;
    this.service.getCommentId(this.reviewId)
      .subscribe(response => {
        this.commentData = response.json().data;
        console.log(this.commentData);
        this.userComment = this.commentData.userComment;
        this.supervisorComment = this.commentData.supervisorComment;
        if (this.userComment) {
          this.userComment.forEach(kpi => {
            this.kipsFormObject.forEach(single => {
              if (kpi.id === single.kpiId) {
                this.userObjects.push({
                  kpiId: single.kpiId,
                  indicator: single.indicator,
                  minRating: single.minRating,
                  maxRating: single.maxRating,
                  kpiComment: kpi.kpiComment,
                  kpiRating: kpi.kpiRating,
                });
              }
            });
            // console.log(this.userObjects);
          });
        }

        if (this.supervisorComment) {
          this.supervisorComment.forEach(reviewer => {
            this.kipsFormObject.forEach(single => {
              if (reviewer.id === single.kpiId) {
                this.supervisorObjects.push({
                  kpiId: single.kpiId,
                  indicator: single.indicator,
                  minRating: single.minRating,
                  maxRating: single.maxRating,
                  kpiComment: reviewer.kpiComment,
                  kpiRating: reviewer.kpiRating,
                });
              }
            });
            // console.log(this.supervisorObjects);
          });
        }
        this.loading = false;
      });
    this.loading = false;
  }

  save() {
    this.kpiComments.addedBy = this.userId;
    this.kpiComments.kpiData = this.kipsFormObject;
    this.kpiComments.type = 'save';
    this.kpiComments.userId = this.trackerData.user.id;
    this.kpiComments.supervisorId = this.trackerData.supervisor.id;
    this.kpiComments.reviewId = this.reviewId;
    // console.log(this.kpiComments);
    // this.http.post(this.url+'performance/addEvaluation', this.kpiComments, this.options)
    this.service.addEvaluation(this.kpiComments)
      .subscribe(response => {
        this.data = response.json();
        console.log(this.data);
        if (this.data.statusCode.code === '200') {
          // this.router.navigate(['manage-reviews']);
          this.location.back();
        }
      },
        error => {
          console.log(error);
        });
  }


  approve() {
    this.kpiComments.addedBy = this.userId;
    this.kpiComments.kpiData = this.kipsFormObject;
    this.kpiComments.type = 'activate';
    this.kpiComments.userId = this.trackerData.user.id;
    this.kpiComments.supervisorId = this.trackerData.supervisor.id;
    this.kpiComments.reviewId = this.reviewId;
    console.log(this.kpiComments);
    this.service.addEvaluation(this.kpiComments)
      .subscribe(response => {
        this.data = response.json();
        console.log(this.data);
        if (this.data.statusCode.code === '200') {
          this.location.back();
        }
      },
        error => {
          console.log(error);
        });
  }


  activate() {
    this.kpiType.type = 'activate';
    this.kpiType.reviewId = this.reviewId;
    this.service.performanceApprove(this.kpiType)
      .subscribe(response => {
        this.data = response.json();
        if (this.data.statusCode.code === '200') {
          this.location.back();
        }
      },
        error => {
          console.log(error);
        });
  }

  cancel() {
    this.location.back();
  }

}
