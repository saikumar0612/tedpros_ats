import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobCategoriesComponent } from './add-job-categories/add-job-categories.component';
import { EditJobCategoriesComponent } from './edit-job-categories/edit-job-categories.component';
import { JobCategoriesComponent } from './job-categories/job-categories.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'job-categories', component: JobCategoriesComponent },
      { path: 'add-job-categories', component: AddJobCategoriesComponent },
      { path: 'edit-job-categories/:id', component: EditJobCategoriesComponent },
      { path: '', redirectTo: 'job-categories', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
