import { Injectable } from "@angular/core";
import { Chat } from "./chat.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Message } from "./message.model";
import { LoginService } from "./login.service";

@Injectable()
export class ChatService{
    private chats:Chat[] = [];
    private currentChat:Chat | undefined;

    chatsRefreshed: Subject<void> = new Subject();
    currentChatRefreshed: Subject<Chat> = new Subject();

    constructor(private http:HttpClient, private loginService:LoginService){
        this.pollForChatUpdates()
    }

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

    refreshChat(chatId:string, newMessage:{}){
        //Get chat from server and update current chat
        this.http.get<Chat>("http://localhost:8181/chats/chat/" + chatId).subscribe({
            next: (response) => {
                console.log("get chats: ", response);
                /*Object.assign(newMessage, {username: this.loginService.getUser()?.username});
                Object.assign(newMessage, {seqeuence: response.messages.length + 1});
                response.messages.push(newMessage as Message);*/

                this.chats.forEach((chat, index) => {
                    if(chat.id === chatId){
                        this.chats[index] = response;
                    }
                });
                console.log("Chat refreshed: ", response);

                this.setCurrentChat(response);
            },
            error: (error) => { console.log(error)}        
      });
    }

    postMessageToChat(chat:Chat, message:string){

        const newMessage = {
            chatId: chat.id,
            message: message,
            userId: this.loginService.getUser()?.id
        };      

        this.http.post("http://localhost:8181/message", newMessage).subscribe({
            next: (response) => { 
                this.refreshChat(chat.id, newMessage);
            },
            error: (error) => { console.log(error)}        
      });
    
    }

    pollForChatUpdates(){       
        setInterval(() => {
            if(this.currentChat){
                const url = "http://localhost:8181/chats/chat/refreshed/" 
                    + this.currentChat.id 
                    + "?sequence=" 
                    + this.currentChat.messages.length;
                this.http.get<boolean>(url).subscribe({
                    next: (response) => { 
                        if(response){
                            console.log("Updates found for chat: ", this.currentChat?.chatName);
                            this.refreshChat(this.currentChat!.id, {});
                        }else{
                            console.log("No updates for chat: ", this.currentChat?.chatName);
                        }
                    },
                    error: (error) => { console.log(error)}        
                });
                console.log("Polling for updates for chat: ", this.currentChat.id);
            }
        }, 5000);
    }


}