import { Component } from '@angular/core';
import { ChatService } from '../shared/chat.service';
import { Chat } from '../shared/chat.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatcomponent',
  imports: [],
  templateUrl: './chatcomponent.html',
  styleUrl: './chatcomponent.css',
})
export class Chatcomponent {
  currentChat: Chat | undefined;
  chatSelectedSubscription: Subscription;
  
  constructor(private chatService:ChatService){
    this.chatSelectedSubscription = chatService.currentChatRefreshed.subscribe((chat) => {
      this.currentChat = chat;
    });
  }

  ngOnDestroy(){
    this.chatSelectedSubscription.unsubscribe;
  } 
}
