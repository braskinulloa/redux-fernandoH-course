import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  usuario: Usuario | null = null;
  userSubs?: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('usuario').pipe(
      filter( auth => auth.usuario != null)
    ).subscribe( ({ usuario }) => {
      this.usuario = usuario;    
    });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
  }
}
