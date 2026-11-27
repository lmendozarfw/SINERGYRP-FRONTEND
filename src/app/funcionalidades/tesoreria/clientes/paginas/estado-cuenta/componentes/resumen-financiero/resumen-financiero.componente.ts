import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { IResumenEstadoCuenta } from '../../modelos/estado-cuenta.interface';

@Component({
  selector: 'app-resumen-financiero-estado-cuenta',
  templateUrl: './resumen-financiero.componente.html',
  imports: [DatePipe, DecimalPipe],
})
export class ResumenFinancieroEstadoCuentaComponente {
  readonly resumen = input.required<IResumenEstadoCuenta>();
}
