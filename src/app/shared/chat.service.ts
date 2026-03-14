import { Injectable } from "@angular/core";
import { Chat } from "./chat.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable()
export class ChatService{
    private chats:Chat[] = [];
    private currentChat:Chat | undefined;

    chatsRefreshed: Subject<void> = new Subject();
    currentChatRefreshed: Subject<Chat> = new Subject();

    constructor(private http:HttpClient){}

    refreshChatListForUser(username:string){
        console.log("going to update list");
        this.retrieveUsersChatListFromServer(username).subscribe({
            next: (response) => { 
                this.chats = response;
                this.chatsRefreshed.next();
            },
            error: (error) => { console.log(error)}        
      });
    }

    retrieveUsersChatListFromServer(username:string){
        return this.http.get<Chat[]>("http://localhost:8181/chats/" + username);
    }

    getChatList(){
        return this.chats;
    }

    setCurrentChat(chat:Chat){
        this.currentChat = chat;
        this.currentChatRefreshed.next(chat);
    }

    getChat(){
        return this.currentChat;
    }

    addChat(){

    }

}