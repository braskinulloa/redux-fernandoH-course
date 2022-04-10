import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  crearUsuario(){
    if (this.registroForm.valid) {
      Swal.fire({
        title: 'Cargando ...',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
      });
      const { nombre, correo, password } = this.registroForm.value;
      this.authService.registrarUsuario(nombre, correo, password)
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
          this.registroForm.reset();
        });
    }
  }
}
