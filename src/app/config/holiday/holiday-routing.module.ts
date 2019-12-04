import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddHolidaysComponent } from "./add-holidays/add-holidays.component";
import { HolidaysComponent } from "./holidays/holidays.component";
import { LayoutComponent } from "../../shared/layout/layout.component";
import { EditHolidaysComponent } from './edit-holidays/edit-holidays.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'holidays', component: HolidaysComponent },
      { path: 'add-holidays', component: AddHolidaysComponent },
      { path: 'edit-holidays/:id', component:EditHolidaysComponent},
      { path: '', redirectTo: 'holidays', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidayRoutingModule { }
