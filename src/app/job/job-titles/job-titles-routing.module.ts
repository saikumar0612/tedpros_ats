import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { AddJobTitlesComponent } from './add-job-titles/add-job-titles.component';
import { EditJobTitlesComponent } from './edit-job-titles/edit-job-titles.component';
import { JobTitlesComponent } from './job-titles/job-titles.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'job-titles', component: JobTitlesComponent },
      { path: 'add-job', component: AddJobTitlesComponent },
      { path: 'edit-job/:id', component: EditJobTitlesComponent },
      { path: '', redirectTo: 'job-titles', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobTitlesRoutingModule { }
