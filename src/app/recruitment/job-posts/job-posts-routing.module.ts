import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobsComponent } from './add-job/add-jobs.component';
import { EditJobsComponent } from './edit-job/edit-jobs.component';
import { JobsComponent } from './jobs/jobs.component';
import { ViewJobComponent } from './view-job/view-job.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'jobs', component: JobsComponent },
      { path: 'add-jobs', component: AddJobsComponent },
      { path: 'edit-jobs/:id', component: EditJobsComponent },
      { path: 'view-job/:id', component: ViewJobComponent },
      { path: '', redirectTo: 'jobs', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobPostsRoutingModule { }
