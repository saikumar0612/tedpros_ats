import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPayGradeComponent } from './add-pay-grade/add-pay-grade.component';
import { EditPayGradeComponent } from './edit-pay-grade/edit-pay-grade.component';
import { PayGradesComponent } from './pay-grades/pay-grades.component';
import { LayoutComponent } from './../../shared/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'pay-grades', component: PayGradesComponent },
      { path: 'add-pay-grades', component: AddPayGradeComponent },
      { path: 'edit-pay-grades/:id', component: EditPayGradeComponent },
      { path: '', redirectTo: 'pay-grades', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayGradesRoutingModule { }
