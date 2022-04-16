import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egres.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIE } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ieSubscription?: Subscription;

  constructor(private store: Store<AppStateWithIE>, private ieService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ieSubscription = this.store.select('ie').subscribe( ({ items }) => this.ingresosEgresos = items );
  }

  ngOnDestroy(): void {
    this.ieSubscription?.unsubscribe();
  }
  borrar(uid: string) {
    this.ieService.deleteIngresoEgresoItem(uid)
      .then( res => {
        Swal.fire('Registro eliminado', '', 'success');
      })
      .catch( err => {
        Swal.fire('Error', err.message, 'error');
      });
  }
}
