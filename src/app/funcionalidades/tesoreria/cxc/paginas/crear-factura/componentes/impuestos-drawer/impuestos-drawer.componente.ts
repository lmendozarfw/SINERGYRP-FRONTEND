import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EtiquetaFormularioComponente } from '@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente';
import { IOpcionSelector } from '@compartido/interfaces/selector.interface';
import { IPartidaFacturaFormulario } from '@funcionalidades/tesoreria/cxc/modelos/factura-formulario.interface';
import { IImpuestoValorChange } from '@funcionalidades/tesoreria/cxc/modelos/factura-vista.interface';
import { IPartidaImpuesto } from '@funcionalidades/tesoreria/modelos/partida-impuesto.interface';
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Drawer } from 'primeng/drawer';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-factura-impuestos-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonDirective,
    Checkbox,
    DecimalPipe,
    Drawer,
    EtiquetaFormularioComponente,
    FormsModule,
    InputNumber,
    PIcon,
    Select,
  ],
  templateUrl: './impuestos-drawer.componente.html',
  styleUrl: './impuestos-drawer.componente.scss',
})
export class FacturaImpuestosDrawerComponente {
  readonly visible = model(false);
  readonly partida = input<IPartidaFacturaFormulario | null>(null);
  readonly moneda = input.required<string>();
  readonly opcionesImpuesto = input.required<IOpcionSelector[]>();
  readonly opcionesTipoFactor = input.required<IOpcionSelector[]>();

  readonly agregarImpuesto = output<void>();
  readonly impuestoChange = output<IImpuestoValorChange>();
  readonly eliminarImpuesto = output<string>();
  readonly cerrar = output<void>();

  cambiarValor<K extends keyof IPartidaImpuesto>(
    impuesto: IPartidaImpuesto,
    campo: K,
    valor: IPartidaImpuesto[K]
  ): void {
    this.impuestoChange.emit({ id: impuesto.id, campo, valor });
  }

  alCambiarVisible(valor: boolean): void {
    this.visible.set(valor);
    if (!valor) this.cerrar.emit();
  }

  cerrarDrawer(): void {
    this.alCambiarVisible(false);
  }
}
