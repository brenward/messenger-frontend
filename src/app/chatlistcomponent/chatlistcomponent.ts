import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../shared/login.service';
import { ChatService } from '../shared/chat.service';
import { Chat } from '../shared/chat.model';
import { NgForOf } from "../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-chatlistcomponent',
  templateUrl: './chatlistcomponent.html',
  styleUrl: './chatlistcomponent.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Chatlistcomponent {
  chats: Chat[] = [];
  nameChangeSubscription: Subscription;
  chatsRefreshedSubscription: Subscription;

  readonly changeDetector = inject(ChangeDetectorRef);

  constructor(private loginService:LoginService, private chatService:ChatService){
    this.nameChangeSubscription = loginService.userUpdate.subscribe((value) => {
      if(value !== "Error"){
        chatService.refreshChatListForUser(value);
      }
    });
    this.chatsRefreshedSubscription = chatService.chatsRefreshed.subscribe(() => {
      this.chats = chatService.getChatList();
      this.changeDetector.detectChanges();
    });
  }

  onAdd(){
    
  }

  ngOnDestroy(){
    this.nameChangeSubscription.unsubscribe;
    this.chatsRefreshedSubscription.unsubscribe;
  }
}
