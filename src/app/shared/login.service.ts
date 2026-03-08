import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class LoginService{
    currentUser:User | undefined;

    constructor(private http:HttpClient){}

    setUser(username:string){
        this.lookupUserOnService(username).subscribe({
            next: (response) => {this.setCurrentUser(username)},
            error: (error) => { console.log("error")}
        });        
    }

    setCurrentUser(username:string){
        this.currentUser = new User(username, "");
    }

    getUser(){
        return this.currentUser;
    }

    lookupUserOnService(username:string){
        return this.http.get("http://localhost:8181/chats/" + username);       
    }


}