import { Component } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from "./providers/chat.service";
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  //title = 'firechat';

  //public chats: Observable<any[]>;
  
  constructor( public _cs: ChatService) { }


}


