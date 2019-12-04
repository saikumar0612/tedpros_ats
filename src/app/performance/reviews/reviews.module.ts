import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DataTableModule } from 'angular-6-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChartsModule } from 'ng2-charts';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpModule } from '@angular/http';
import { AddReviewComponent } from './add-review/add-review.component';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { EvaluateReviewComponent } from './evaluate-review/evaluate-review.component';
import { ManageReviewsComponent } from './manage-reviews/manage-reviews.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    HttpModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    DataTableModule,
    NgMultiSelectDropDownModule.forRoot(),
    ArchwizardModule,
    CustomFormsModule,
    DateRangePickerModule,
    ImageCropperModule,
    ChartsModule,
    CKEditorModule,
    SharedModule,
     //adding in date picker module --suresh-- on 08-07-2019 start 
    OwlDateTimeModule,
    OwlNativeDateTimeModule
     //adding in date picker module --suresh-- on 08-07-2019 end 
  ],
  declarations: [
    AddReviewComponent,
    EditReviewComponent,
    EvaluateReviewComponent,
    ManageReviewsComponent,
    MyReviewsComponent,
    ReviewListComponent
  ]
})
export class ReviewsModule { }
