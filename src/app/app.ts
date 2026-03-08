import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Usercomponent } from "./usercomponent/usercomponent";
import { Chatcomponent } from "./chatcomponent/chatcomponent";
import { Chatlistcomponent } from './chatlistcomponent/chatlistcomponent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Usercomponent, Chatcomponent, Chatlistcomponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('messenger-frontend');
}
