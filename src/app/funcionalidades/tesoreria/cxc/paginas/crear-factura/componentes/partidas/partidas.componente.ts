import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IOpcionSelector } from '@compartido/interfaces/selector.interface';
import { IProductoFacturaOption } from '@funcionalidades/tesoreria/cxc/modelos/factura-catalogos';
import { IPartidaFacturaFormulario } from '@funcionalidades/tesoreria/cxc/modelos/factura-formulario.interface';
import {
  IPartidaSeleccionChange,
  IPartidaValorChange,
} from '@funcionalidades/tesoreria/cxc/modelos/factura-vista.interface';
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-factura-partidas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonDirective, DecimalPipe, FormsModule, InputNumber, InputText, PIcon, Select, Tooltip],
  templateUrl: './partidas.componente.html',
  styleUrl: './partidas.componente.scss',
})
export class FacturaPartidasComponente {
  readonly partidas = input.required<IPartidaFacturaFormulario[]>();
  readonly opcionesProducto = input.required<IProductoFacturaOption[]>();
  readonly opcionesUnidad = input.required<IOpcionSelector[]>();
  readonly opcionesTipoDescuento = input.required<IOpcionSelector[]>();
  readonly opcionesObjetoImp = input.required<IOpcionSelector[]>();

  readonly agregarPartida = output<void>();
  readonly duplicarPartida = output<IPartidaFacturaFormulario>();
  readonly eliminarPartida = output<string>();
  readonly abrirImpuestos = output<IPartidaFacturaFormulario>();
  readonly productoChange = output<IPartidaSeleccionChange>();
  readonly tipoDescuentoChange = output<IPartidaSeleccionChange>();
  readonly objetoImpChange = output<IPartidaSeleccionChange>();
  readonly partidaChange = output<IPartidaValorChange>();

  cambiarValor<K extends keyof IPartidaFacturaFormulario>(
    partida: IPartidaFacturaFormulario,
    campo: K,
    valor: IPartidaFacturaFormulario[K]
  ): void {
    this.partidaChange.emit({ id: partida.id, campo, valor });
  }

  cambiarProducto(id: string, valor: string): void {
    this.productoChange.emit({ id, valor });
  }

  cambiarTipoDescuento(id: string, valor: string): void {
    this.tipoDescuentoChange.emit({ id, valor });
  }

  cambiarObjetoImp(id: string, valor: string): void {
    this.objetoImpChange.emit({ id, valor });
  }
}
