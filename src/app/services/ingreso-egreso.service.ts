import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egres.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private fireStore: AngularFirestore, private auth: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user: string = this.auth.usuario?.uid ?? '';
    const { descripcion , monto , tipo } = ingresoEgreso;
    console.log(
      descripcion,
      monto,
      tipo
      );
    
    return this.fireStore.doc(`${user}/ingresos-egresos`)
      .collection('items')
      .add({ descripcion: descripcion, monto: monto, tipo: tipo })
  }

  initIngresosEgresosListener(uid: string) {
    return this.fireStore.collection(`${uid}/ingresos-egresos/items`).snapshotChanges()
    .pipe(
      map( snapshot => {
        return snapshot.map( (s: any) => { return { uid: s.payload.doc.id, ...s.payload.doc.data() } } )
      })
    );
  }
  deleteIngresoEgresoItem(uidItem: string) {
    const uidUser = this.auth.usuario?.uid;
    return this.fireStore.doc(`${uidUser}/ingresos-egresos/items/${uidItem}`).delete();
  }

}
