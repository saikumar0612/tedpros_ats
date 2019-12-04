import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopMenuRoutingModule } from './top-menu-routing.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DesignComponent } from './design/design.component';
import { FooterComponent } from './footer/footer.component';

 
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TopMenuRoutingModule
  ],
  declarations: [TopBarComponent, DesignComponent, FooterComponent],
  exports: [
    TopBarComponent,
    DesignComponent,
    FooterComponent
  ]
})
export class TopMenuModule { }
