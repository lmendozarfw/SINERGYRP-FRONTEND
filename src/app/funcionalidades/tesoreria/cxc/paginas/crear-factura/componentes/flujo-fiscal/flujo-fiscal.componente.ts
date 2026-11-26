import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EtiquetaFormularioComponente } from '@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente';
import {
  IAvisoFiscalFactura,
  IParcialidadFactura,
} from '@funcionalidades/tesoreria/cxc/modelos/factura-vista.interface';
import { PIcon } from '@primeicons/angular';
import { InputText } from 'primeng/inputtext';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-factura-flujo-fiscal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, EtiquetaFormularioComponente, InputText, PIcon, Tag],
  templateUrl: './flujo-fiscal.componente.html',
})
export class FacturaFlujoFiscalComponente {
  readonly esPPD = input.required<boolean>();
  readonly aviso = input.required<IAvisoFiscalFactura>();
  readonly parcialidad = input.required<IParcialidadFactura>();
  readonly formaPago = input.required<string>();
  readonly metodoPago = input.required<string>();
  readonly usoCfdi = input.required<string>();
  readonly exportacion = input.required<string>();
}
