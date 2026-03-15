import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ChatService } from '../shared/chat.service';
import { Chat } from '../shared/chat.model';
import { Subscription } from 'rxjs';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-chatcomponent',
  imports: [],
  templateUrl: './chatcomponent.html',
  styleUrl: './chatcomponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chatcomponent {
  currentChat: Chat | undefined;
  chatSelectedSubscription: Subscription;

  readonly changeDetector = inject(ChangeDetectorRef);
  
  constructor(private chatService:ChatService, private loginService:LoginService){
    this.chatSelectedSubscription = chatService.currentChatRefreshed.subscribe((chat) => {
      this.currentChat = chat;
      console.log("Current chat updated: ", chat);
      this.changeDetector.detectChanges();
    });
  }

  postMessage(messageInput:HTMLInputElement) {
    console.log("Posting message: " + messageInput.value);
    this.chatService.postMessageToChat(this.currentChat!, messageInput.value);
    messageInput.value = "";
  }

  get sortedMessages() {
    return this.currentChat?.messages?.slice().sort((a, b) => a.sequence - b.sequence) || [];
  }

  get currentUsername() {
    return this.loginService.getUser()?.username || "Unknown User";
  }

  ngOnDestroy(){
    this.chatSelectedSubscription.unsubscribe;
  } 
}
