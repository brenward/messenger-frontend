import { Injectable } from "@angular/core";
import { User } from "./user.model";

@Injectable()
export class LoginService{
    currentUser:User | undefined;

    setUser(username:string){
        this.currentUser = new User(username, "");
    }

    getUser(){
        return this.currentUser;
    }


}