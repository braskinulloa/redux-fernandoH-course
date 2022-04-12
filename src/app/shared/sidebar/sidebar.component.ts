import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  
  usuario: Usuario | null = null;
  userSubs?: Subscription;

  constructor(private auth: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('usuario').pipe(
      filter( auth => auth.usuario != null)
    ).subscribe( ({ usuario }) => {
      this.usuario = usuario;    
    });
  }
  
  logOut() {
    this.auth.logOut()
      .then( res => {
        this.router.navigate(['/login']);
      })
      .catch( (err: FirebaseError) => {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'close'
        })
      });
  }
  
  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
  }
}
