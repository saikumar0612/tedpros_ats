import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RightBarComponent } from './right-bar/right-bar.component';
import { LogoutComponent } from './logout/logout.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ModalComponent } from '../core/directives/modal.component';
// import { SafeHtmlPipe } from '../core/pipes/safe-html.pipe';
import { SafehtmlModule } from '../core/directivesmodule/safehtml.module';
import { ChatComponent } from './chat/chat.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SafehtmlModule,
    ReactiveFormsModule,
    PickerModule,
    EmojiModule,
    FormsModule
  ],
  declarations: [
    TopMenuComponent,
    SidebarComponent,
    RightBarComponent,
    LogoutComponent,
    LayoutComponent,
    ModalComponent,
    ChatComponent
  ],
  exports: [
    TopMenuComponent,
    SidebarComponent,
    RightBarComponent,
    LogoutComponent,
    ModalComponent,
    SafehtmlModule,
    ChatComponent
  ],
  providers:[
  ],
  entryComponents:[
    ChatComponent
  ]
})
export class SharedModule { }
