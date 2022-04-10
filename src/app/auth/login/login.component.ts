import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  loguearUsuario() {
    if (this.loginForm.valid) {
      Swal.fire({
        title: 'Cargando ...',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
      });
      const { correo, password } = this.loginForm.value
      this.auth.loguearUsuario(correo, password)
        .then( res => {
          Swal.close();
          this.router.navigate(['/']);
        })
        .catch( (err: FirebaseError) => {
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
}
