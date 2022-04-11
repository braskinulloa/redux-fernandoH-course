import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import * as auth from '../auth/auth.actions';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario?: Usuario;

  constructor(private auth: AngularFireAuth, private fireStore: AngularFirestore, private store: Store) { }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      // console.log(fuser);
      if (fuser) {
        this.fireStore.doc(`${fuser.uid}/usuario`).valueChanges().pipe(take(1)).subscribe( docuser => {
          const usuario: Usuario = docuser as Usuario;
          console.log('usuario ', usuario);
          this._usuario = usuario;
          this.store.dispatch( auth.setUser({ usuario: usuario }));
        });
      } else {
        this._usuario = undefined;
        this.store.dispatch( auth.unSetUser());
        this.store.dispatch(unSetItems());

      } 
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
  
  public get usuario() : Usuario | undefined {
    return this._usuario;
  }
  
}
