import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IResumenFactura } from '@funcionalidades/tesoreria/cxc/modelos/factura-formulario.interface';

@Component({
  selector: 'app-factura-resumen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  templateUrl: './resumen.componente.html',
})
export class FacturaResumenComponente {
  readonly resumen = input.required<IResumenFactura>();
  readonly moneda = input.required<string>();
  readonly cantidadPartidas = input.required<number>();
}
