import { Component } from '@angular/core';
import { NgIf } from "../../../node_modules/@angular/common/types/_common_module-chunk";
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-usercomponent',
  imports: [],
  templateUrl: './usercomponent.html',
  styleUrl: './usercomponent.css',
  providers: [LoginService]
})
export class Usercomponent {
  username:string = "";
  userSet:boolean = false; 

  constructor(private loginService:LoginService){}

  onUserNameEntered(nameInput:HTMLInputElement){
    this.loginService.setUser(this.username);
    let retrievedUser = this.loginService.getUser();

    if(retrievedUser != undefined){
      this.username = nameInput.value;
      this.userSet = true;
    }else{
      console.log("User undefined");
    }
  }
}
