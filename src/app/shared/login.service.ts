import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable()
export class LoginService{
    currentUser:User | undefined;
    userUpdate: Subject<string> = new Subject<string>();

    constructor(private http:HttpClient){}

    setUser(username:string){
        this.lookupUserOnService(username).subscribe({
            next: (response) => {
                this.setCurrentUser(username);
                this.userUpdate.next(username);
            },
            error: (error) => { 
                this.userUpdate.next("Error");
                console.log("error")}
        });        
    }

    setCurrentUser(username:string){
        this.currentUser = new User(username, "");
    }

    getUser(){
        return this.currentUser;
    }

    lookupUserOnService(username:string){
        return this.http.get("http://localhost:8181/user/" + username);       
    }


}