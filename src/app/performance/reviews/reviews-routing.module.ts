import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddReviewComponent } from './add-review/add-review.component';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { EvaluateReviewComponent } from './evaluate-review/evaluate-review.component';
import { ManageReviewsComponent } from './manage-reviews/manage-reviews.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'manage-reviews', component: ManageReviewsComponent },
      { path: 'evaluate-review/:id', component: EvaluateReviewComponent },
      { path: 'my-reviews', component: MyReviewsComponent },
      { path: 'review-list', component: ReviewListComponent },
      { path: 'add-review', component: AddReviewComponent },
      { path: 'edit-review/:id', component: EditReviewComponent },
      { path: '', redirectTo: 'manage-reviews', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
