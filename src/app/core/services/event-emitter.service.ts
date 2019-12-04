import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';


@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  invokeRecentActivityRefresh = new EventEmitter(); 
  invokeUserAlertRefresh = new EventEmitter();    
  invokeUserProfilePicRefresh = new EventEmitter();
  invokeUserPictureRefresh = new EventEmitter();
  subsVar: Subscription;
  refreshVar: Subscription;
  pictureVar: Subscription;
  profileVar: Subscription;
  constructor() { }

  onRecentActivityRefresh() { 
    this.invokeRecentActivityRefresh.emit();  
  } 
  onUserAlertRefresh(){ 
    this.invokeUserAlertRefresh.emit();  
  }
  onUserProfilePicRefresh(){
    this.invokeUserProfilePicRefresh.emit();
  }
  onUserPictureRefresh(){
    this.invokeUserPictureRefresh.emit();
  }
}
