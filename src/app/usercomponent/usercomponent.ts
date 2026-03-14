import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usercomponent',
  imports: [],
  templateUrl: './usercomponent.html',
  styleUrl: './usercomponent.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Usercomponent {
  username:string = "";
  userSet:boolean = false;
  errorMessage:string = "";

  nameChangeSubscription: Subscription;
  readonly changeDetector = inject(ChangeDetectorRef);

  constructor(private loginService:LoginService){
    this.nameChangeSubscription = loginService.userUpdate.subscribe((value) => {
      if(value === "Error"){
        this.errorMessage = "User not found.";
        this.username = "";
        this.userSet = false;
      }else{
        this.username = value;
        this.userSet = true;
        this.errorMessage = "";
      }
      this.changeDetector.detectChanges();
    })
  }

  onUserNameEntered(nameInput:HTMLInputElement){
    this.loginService.setUser(nameInput.value);
  }

  ngOnDestroy(){
    this.nameChangeSubscription.unsubscribe;
  }
}
