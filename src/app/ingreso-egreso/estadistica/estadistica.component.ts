import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egres.model';
import { AppStateWithIE } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  ingresosTotal: number = 0;
  egresosTotal: number = 0;

  // Doughnut
  doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: []
  };
  doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppStateWithIE>) { }

  ngOnInit(): void {
    this.store.select('ie').subscribe( ({ items }) => {
      this.calcular(items);
    })
  }
  calcular(ie: IngresoEgreso[]) {
    for (const item of ie) {
      if (item.tipo == 'ingreso') {
        this.ingresos++;
        this.ingresosTotal += item.monto;
      }
      if (item.tipo == 'egreso') {
        this.egresos++;
        this.egresosTotal += item.monto;
      }
    }
    this.doughnutChartData = { ...this.doughnutChartData, datasets: [{ data: [this.ingresosTotal, this.egresosTotal] }] };
  }
}
