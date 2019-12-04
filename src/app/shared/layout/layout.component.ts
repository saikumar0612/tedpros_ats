import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit, ViewChild, Input, ComponentFactoryResolver, Inject, ViewContainerRef } from '@angular/core';
import { InteractionService } from '../../core/services/interaction.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private interactionService: InteractionService, private authService: AuthenticationService) {
  }
  ngOnInit() {
    // this.interactionService.getUserInfo().subscribe(info => {
   //   console.log('info ', info);
   //   if (info) {
   //     this.infoArray.push(info);
   //     if (!document.getElementById(`chat-${info.fromId}-${info.toId}`)) {
   //       this.interactionService.setRootViewContainerRef(this.viewContainerRef);
   //       this.interactionService.addDynamicComponent(info, true);
   //     }
   //   }
   // })
 }
 
 initialize() {

 }
}
