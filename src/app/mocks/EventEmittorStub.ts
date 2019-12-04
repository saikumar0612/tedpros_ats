import { EventEmitterService } from '../core/services/event-emitter.service';

export class EventEmittorStub extends EventEmitterService {
    onRecentActivityRefresh() {
        console.log('onRecentActivityRefresh function called');
    }
    onUserAlertRefresh() {
        console.log('onUserAlertRefresh function called');
    }
    onUserProfilePicRefresh() {
        console.log('onUserProfilePicRefresh function called');
    }
    onUserPictureRefresh() {
        console.log('onUserPictureRefresh function called');
    }
}
