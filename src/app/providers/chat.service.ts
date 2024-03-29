import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

//import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Mensaje } from "../interface/mensaje.interface";
import { Observable} from 'rxjs';

import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';



@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  
  public chats: Mensaje[] = [];
  public usuario: any = {};


  constructor(private afs: AngularFirestore,

               public afAuth: AngularFireAuth) { 

     this.afAuth.authState.subscribe( user => {

      console.log( 'Estado del usuario: ', user );

      if( !user ){
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;

    })

  }

  login( proveedor: string) {

    if( proveedor === 'google' ){
       this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
     }else{
       this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
     }    
  }
  logout() {

    this.usuario={};
    this.afAuth.auth.signOut();
  }

  cargarMensajes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats' ,ref => ref.orderBy('fecha','desc')
                                                                            .limit(5));
    
    return this.itemsCollection.valueChanges()
                                
                               .pipe(map((mensajes: Mensaje[]) => {

                                 console.log(mensajes);

                                  this.chats = [];

                                for ( let mensaje of mensajes ){
                                  this.chats.unshift( mensaje );
                                }

                                return this.chats;

                                // this.chats=mensajes;
                               }))

                               
 }
    agregarMensaje( texto: string ){

      let mensaje: Mensaje = {
      
      nombre:  this.usuario.nombre,
      //nombre:  "Demo",
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }

    return this.itemsCollection.add( mensaje );

  }
}
