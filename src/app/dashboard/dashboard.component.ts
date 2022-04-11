import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil } from 'rxjs';
import { AppState } from '../app.reducer';
import { setItems, unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject;
  constructor(private store: Store<AppState>, private ieService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.store.select('usuario').pipe(
      takeUntil(this.unsubscribe$),
      filter( auth => auth.usuario != null)
    ).subscribe( ({usuario}) => {
      const uid = usuario?.uid ?? '';
      this.ieService.initIngresosEgresosListener(uid).pipe(takeUntil(this.unsubscribe$)).subscribe( ie => {
        this.store.dispatch(setItems({ items: ie }));        
      });      
    });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
