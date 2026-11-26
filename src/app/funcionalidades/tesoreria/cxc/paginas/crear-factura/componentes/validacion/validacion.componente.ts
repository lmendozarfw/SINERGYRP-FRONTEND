import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-factura-validacion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tag],
  templateUrl: './validacion.componente.html',
})
export class FacturaValidacionComponente {
  readonly errores = input.required<string[]>();
}
