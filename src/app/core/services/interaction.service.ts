import { Injectable, Inject, ComponentFactoryResolver } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ChatComponent } from './../../shared/chat/chat.component';
import { ChatModel } from '../model/chat.model';

@Injectable({
    providedIn: 'root'
})
export class InteractionService {
    private userInfoSubject = new BehaviorSubject<any>(null);
    private userInfo = this.userInfoSubject.asObservable();
    private userInfoListSubject = new BehaviorSubject<any[]>([]);
    private userInfoList = this.userInfoListSubject.asObservable();
    factoryResolver: ComponentFactoryResolver;
    rootViewContainer: any;
    usersList = [];

    constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
        this.factoryResolver = factoryResolver;
    }

    setRootViewContainerRef(viewContainerRef) {
        this.rootViewContainer = viewContainerRef
    }

    addDynamicComponent(chatModel: ChatModel, openPopup:boolean = false) {
        console.log("Trigger chat model")
        const factory = this.factoryResolver
            .resolveComponentFactory(ChatComponent);
        const component = factory
            .create(this.rootViewContainer.parentInjector);
        component.instance.chatModel = chatModel;
        component.instance.openPopup = true;
        this.rootViewContainer.insert(component.hostView);
    }


    setUserInfo(info) {
        this.usersList.push(info);
        this.userInfoSubject.next(info);
        this.userInfoListSubject.next(this.usersList);
        console.log('chatList ', this.usersList);
        localStorage.setItem('chatList', JSON.stringify(this.usersList));
    }

    getUserInfo() {
        return this.userInfo;
    }
}