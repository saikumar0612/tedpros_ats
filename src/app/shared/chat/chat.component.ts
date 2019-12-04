import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, Output,Inject, OnChanges, ViewEncapsulation,ViewChild, ElementRef, ViewRef, Renderer2, Renderer, AfterViewInit, OnDestroy } from '@angular/core';
import { ChatModel } from 'src/app/core/model/chat.model';
import { FormGroup,  Validators, FormArray, FormBuilder,FormControl} from '@angular/forms';
// import {EmojiPickerModule} from 'ng-emoji-button-picker';
declare var io: any;
import * as dateFns from 'date-fns';
import { DOCUMENT } from '@angular/common';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  chatModel: ChatModel;
  
  userName;

  @Input()
  openPopup = false;

  formGroup: FormGroup;

  toggleChatWindow = false;
  popup=true;

  toMsg: FormArray;

  fromMsg: FormArray;

  socket: any;

  messages=[];
  sortmsg:any;

  closeDialogSubject = new BehaviorSubject(false);

  closeDialog = this.closeDialogSubject.asObservable();

  @ViewChild('chatUL', {static: false})
  chatUL: ElementRef;

  inputText: string = '';
  openPopup1: Function;
  @ViewChild('inputEl', {static: false})
  inputEl: ElementRef;

  setPopupAction(fn: any) {
    this.openPopup1 = fn;
  }

  constructor(private formBuilder: FormBuilder, private renderer: Renderer, @Inject(DOCUMENT) private document: any ) { }

  ngOnInit() {
    // this.socket = io();
    this.socket = io('http://162.254.209.129:4201');
    this.generateForm();
    const webSocket = this.socket;
    webSocket.on(`private-msg-${this.chatModel.$fromId}`, (data) => {
      this.receiveMessage(data);
    });


    webSocket.emit('cache-msg', {id: `${this.chatModel.$toId}`});
    webSocket.emit('cache-msg', {id: `${this.chatModel.$fromId}`});

    webSocket.on(`cache-msg-${this.chatModel.$toId}`, (data) => {
      if(data)
      {
        const from= data.map(x => x ).filter(x => x.to === this.chatModel.$fromId);
        this.sortmsg=this.sortData(from);
      }
    });

    webSocket.on(`cache-msg-${this.chatModel.$fromId}`, (data) => {
      console.log(`data from - ${this.chatModel.$fromId}`, data);
      if(data)
      {
      const to= data.map(x => x ).filter(x => x.to === this.chatModel.$toId);
      this.sortmsg=this.sortData(to);
    }
    });
    this.scrollToBottom();

    setTimeout(()=>{ 
      
      this.inputEl.nativeElement.focus();
    },0);
  }
  
  sortData(data) {
    if(data)
    {
      data.map(ele=>{
        this.messages.push(ele);
      })
    }
    return this.messages.sort((a, b) => {
      return <any>new Date(a.timestamp) - <any>new Date(b.timestamp);
    });
  }


  ngAfterViewInit() {
    if(this.chatModel.$msg && this.chatModel.$msg !== '') {
      // console.log('receive msg chat ', this.chatModel.$msg);
      // this.receiveMessage({message: this.chatModel.$msg, timestamp: this.chatModel.$timestamp, from: this.chatModel.$toId})
    }
    this.scrollToBottom();
  }


  ngOnChanges() {
    
  }

  addEmoji(event: any,fromId,toId)
  {
    const result = this.formGroup.value;
  //   console.log(event);
  //  console.log(event.emoji.native);
   console.log(result.inputMsg);

   this.formGroup.controls['inputMsg'].setValue(result.inputMsg+event.emoji.native);
      const chatId='emoji-'+fromId+'-'+toId;
      let element = this.document.getElementById(chatId);
      let parent: HTMLElement = document.getElementById(chatId);
      let child = parent.children[0];
      this.renderer.setElementStyle(child, 'display', 'none');

      
    // setTimeout(()=>{ 
      this.inputEl.nativeElement.focus();
    // },0);
  }

  openemoji(fromId,toId)
  {
    // console.log("trigger");
      const chatId='emoji-'+fromId+'-'+toId;
      let element = this.document.getElementById(chatId);
      let parent: HTMLElement = document.getElementById(chatId);
      // console.log(parent);
      let child = parent.children[0];
      this.renderer.setElementStyle(child, 'display', 'block');

  }

  sendMessage(event: any) {
    event.stopPropagation();
    const result = this.formGroup.value;
  if(result.inputMsg)
  {
    this.toMsg = this.formGroup.get('toMsg') as FormArray;
    this.toMsg.push(this.formBuilder.group({
      message: result.inputMsg,
      timestamp: dateFns.format(new Date(), 'YYYY-MM-DD H:m:s')
    }))

    const send = `<style>.text > p:first-of-type{width:100%;margin-top:0;margin-bottom:auto;line-height: 13px;font-size: 12px;
        } 
        .text > p:last-of-type{
            width:100%;text-align:right;color:silver;margin-bottom:-7px;margin-top:auto;
        }
        
        .msj:before{
          width: 0;
          height: 0;
          content:"";
          top:-5px;
          left:-14px;
          position:relative;
          border-style: solid;
          border-width: 0 13px 13px 0;
          border-color: transparent #ffffff transparent transparent;            
      }
      .msj-rta:after{
          width: 0;
          height: 0;
          content:"";
          top:-5px;
          left:14px;
          position:relative;
          border-style: solid;
          border-width: 13px 13px 0 0;
          border-color: whitesmoke transparent transparent transparent;           
      }</style><li style="width:100%">
          <div class="msj-rta" style="float:right;background:whitesmoke;margin-top:5px;width:85%;border-radius:5px;padding:5px;display:flex;">
              <div class="avatar">
              </div>
              <div class="text" style="float:left;padding-right:10px;width:100%;display:flex;flex-direction:column;">
                  <p>${result.inputMsg}</p>
                  <p><small>${dateFns.format(new Date(), 'YYYY-MM-DD H:m:s')}</small></p>
              </div>
          </div>
      </li>`;
    this.chatUL.nativeElement.insertAdjacentHTML('beforeend', send);
    // this.receiveMessage();

    const webSocket = this.socket;
    webSocket.emit('private-message', {
      from:  this.chatModel.$fromId,
      to: this.chatModel.$toId,
      message: result.inputMsg,
      fromUserName: this.chatModel.$from,
      toUserName: this.chatModel.$to,
      timestamp:dateFns.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    });

    this.formGroup.controls['inputMsg'].setValue('');
  
  }
  this.scrollToBottom();
  }

  receiveMessage(data: any) {
    if(data.from === this.chatModel.$toId) {
      this.fromMsg = this.formGroup.get('fromMsg') as FormArray;
      this.fromMsg.push(this.formBuilder.group({
        message: data.message,
        timestamp: data.timestamp
      }));

      const receive = `<style>.text > p:first-of-type{width:100%;margin-top:0;margin-bottom:auto;line-height: 13px;font-size: 12px;
      } 
      .text > p:last-of-type{
          width:100%;text-align:right;color:silver;margin-bottom:-7px;margin-top:auto;
      }
      .msj:before{
        width: 0;
        height: 0;
        content:"";
        top:-5px;
        left:-14px;
        position:relative;
        border-style: solid;
        border-width: 0 13px 13px 0;
        border-color: transparent #ffffff transparent transparent;            
    }
    .msj-rta:after{
        width: 0;
        height: 0;
        content:"";
        top:-5px;
        left:14px;
        position:relative;
        border-style: solid;
        border-width: 13px 13px 0 0;
        border-color: whitesmoke transparent transparent transparent;           
    } </style><li style="width:100%">
      <div class="msj"  style="float:left;background:white;margin-top:5px;width:85%;border-radius:5px;padding:5px;display:flex;">
          <div class="avatar">
          </div>
          <div  class="text" style="float:left;padding-right:10px;width:100%;display:flex;flex-direction:column;">
              <p>${data.message}</p>
              <p><small>${data.timestamp}</small></p>
          </div>
      </div>
  </li>`;
      this.renderer.invokeElementMethod(this.chatUL.nativeElement, 'insertAdjacentHTML', ['beforeend', receive]);
    }
    this.scrollToBottom();
    }

  generateForm() {
    // this.closepopups();
    this.openPopup=true;
    this.toggleChatWindow=true;
    this.formGroup = this.formBuilder.group({
      inputMsg: '',
      fromMsg: this.formBuilder.array([]),
      toMsg: this.formBuilder.array([]),
      isActive: this.formBuilder.control(true)
    });
    this.popup=true;
  }

  toggleDialogOpen(fromId,toId) {
    const chatId='chat-'+fromId+'-'+toId;
    const chatIdMin='chatMin-'+fromId+'-'+toId;
    this.toggleChatWindow = !this.toggleChatWindow;
    // console.log("toggleDialog trigged");
    // console.log("Chat window toggleDialog  function trigged. Chat window Id:"+chatId);
    // console.log(this.toggleChatWindow);
    let element = this.document.getElementById(chatId);
    element.style.display = 'none';
    let elementMin = this.document.getElementById(chatIdMin);
    elementMin.style.display = 'block';
  }
  toggleDialogClose(fromId,toId) {
    const chatId='chat-'+fromId+'-'+toId;
    const chatIdMin='chatMin-'+fromId+'-'+toId;
    this.toggleChatWindow = !this.toggleChatWindow;
    // console.log("toggleDialog trigged");
    // console.log("Chat window toggleDialog  function trigged. Chat window Id:"+chatId);
    // console.log(this.toggleChatWindow);
    let element = this.document.getElementById(chatId);
    element.style.display = 'block';
    let elementMin = this.document.getElementById(chatIdMin);
    elementMin.style.display = 'none';
  }

  chatClose(fromId,toId)
  {
   
   this.closeDialogSubject.next(true);
   this.popup=false;
  }

  closepopups()
  {
    console.log("Chat closed trigged");
    this.closeDialogSubject.next(true);
    this.popup=false;
  }

  chatOpen(fromId,toId)
  {
    const chatId='chat-'+fromId+'-'+toId;
    const chatIdMin='chatMin-'+fromId+'-'+toId;
    // console.log("Chat window open function trigged. Chat window Id:"+chatId);
    let element = this.document.getElementById(chatId);
    let elementMin = this.document.getElementById(chatIdMin);
    this.popup=true;
  }
  scrollToBottom(): void {
    try {
        // this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        console.log("Scroll trigged:" + this.chatUL.nativeElement.scrollHeight)
    } catch(err) { }                 
  }
}
