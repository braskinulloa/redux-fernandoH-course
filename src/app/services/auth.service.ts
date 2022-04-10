import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private fireStore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      console.log(fuser);
      
    });
  }

  registrarUsuario(nombre: string, correo: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(correo, password)
      .then( ({user}) => {
        const newUser = new Usuario(user?.uid, nombre, user?.email);
        return this.fireStore.doc(`${user?.uid}/usuario`).set({ ...newUser });
      });
  }
  loguearUsuario(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }
  logOut(){
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(map( fuser => fuser != null ));
  }
}
