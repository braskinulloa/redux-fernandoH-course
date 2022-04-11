import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = new FormGroup({});
  cargando: boolean = false;
  uiSubscription?: Subscription;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });
  }
  loguearUsuario() {
    if (this.loginForm.valid) {
      this.store.dispatch(ui.isLoading());
      // Swal.fire({
      //   title: 'Cargando ...',
      //   timerProgressBar: true,
      //   didOpen: () => {
      //     Swal.showLoading()
      //   }
      // });
      const { correo, password } = this.loginForm.value
      this.auth.loguearUsuario(correo, password)
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
          this.loginForm.reset();
        })
    }
  }
  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }
}
