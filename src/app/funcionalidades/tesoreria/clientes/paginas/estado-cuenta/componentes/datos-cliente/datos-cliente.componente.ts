import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { IClienteEstadoCuenta } from '../../modelos/estado-cuenta.interface';

@Component({
  selector: 'app-datos-cliente-estado-cuenta',
  templateUrl: './datos-cliente.componente.html',
  imports: [DatePipe, DecimalPipe],
})
export class DatosClienteEstadoCuentaComponente {
  readonly cliente = input.required<IClienteEstadoCuenta>();
}
