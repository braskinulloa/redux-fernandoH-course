import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egres.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoEgresoForm: FormGroup = new FormGroup({});
  tipo: string = 'ingreso';
  isLoading: boolean = false;
  uiSeubscription?: Subscription;

  constructor(private fb: FormBuilder, private ieService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });
    this.uiSeubscription = this.store.select('ui').subscribe( ui => {
      this.isLoading = ui.isLoading;
    });
  }
  agregar() {
    if (this.ingresoEgresoForm.valid) {
      this.store.dispatch(isLoading());
      const { descripcion, monto } = this.ingresoEgresoForm.value;
      const ie: IngresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);      
      this.ieService.crearIngresoEgreso(ie)
      .then( ref => { 
        this.store.dispatch(stopLoading());
        this.ingresoEgresoForm.reset();
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch( err => {
        this.store.dispatch(stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
    }
  }
  ngOnDestroy() {
    this.uiSeubscription?.unsubscribe();
  }
}
