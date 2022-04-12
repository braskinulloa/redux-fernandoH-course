import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egres.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort( (a, b) => {
      if (a.tipo == 'ingreso') {
        return -1;
      } else if (a.tipo == 'egreso') {
        return 1
      } else {
        return 0;
      }
    });
  }

}
