import { Component } from '@angular/core';
import { NgIf } from "../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-usercomponent',
  imports: [],
  templateUrl: './usercomponent.html',
  styleUrl: './usercomponent.css',
})
export class Usercomponent {
  username:string = "";
  userSet:boolean = false; 

  onUserNameEntered(nameInput:HTMLInputElement){
    this.username = nameInput.value;
    this.userSet = true;
  }
}
