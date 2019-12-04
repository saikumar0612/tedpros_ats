import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { JobDetailsComponent } from './job-details/job-details.component';

import { DesignComponent } from '../top-menu/design/design.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ShortlistJobsComponent } from './shortlist-jobs/shortlist-jobs.component';
import { RepresentFormComponent } from './represent-form/represent-form.component';
import { CandidateConsentDocumentComponent } from './candidate-consent-document/candidate-consent-document.component';

 
const routes: Routes = [
  {
    path:'',component:DesignComponent,children:[
      { path: 'job-list', component:ApplyJobComponent},
      { path: 'jobdetails/:id', component:JobDetailsComponent},
      { path: 'favouriteJobs', component:WishListComponent},
      { path: 'appliedJobs', component:AppliedJobsComponent},
      { path: 'shortlistJobs', component:ShortlistJobsComponent},
      { path: 'consent/:id', component:RepresentFormComponent},
      { path: 'consent-document/:canId/:jobId/:docId', component:CandidateConsentDocumentComponent},
      { path:'',redirectTo: 'job-list', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplyJobRoutingModule { }
