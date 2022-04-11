import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup = new FormGroup({});
  uiSubscription?: Subscription;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });
  }
  crearUsuario(){
    if (this.registroForm.valid) {
      this.store.dispatch(ui.isLoading());
      // Swal.fire({
      //   title: 'Cargando ...',
      //   timerProgressBar: true,
      //   didOpen: () => {
      //     Swal.showLoading()
      //   }
      // });
      const { nombre, correo, password } = this.registroForm.value;
      this.authService.registrarUsuario(nombre, correo, password)
        .then( res => {
          // Swal.close();
          this.store.dispatch(ui.stopLoading());

          this.router.navigate(['/']);
        })
        .catch( (err: FirebaseError) => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'close'
          })
          this.registroForm.reset();
        });
    }
  }
  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }
}
