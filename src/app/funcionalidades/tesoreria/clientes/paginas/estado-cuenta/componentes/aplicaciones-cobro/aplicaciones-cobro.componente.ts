import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadoAplicacionCobro } from '@funcionalidades/tesoreria/cxc/modelos/aplicacion-cobro.interface';
import { IOpcionSelector } from '@compartido/interfaces/selector.interface';
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import {
  ETIQUETAS_ESTADO_APLICACION,
  IAplicacionEstadoCuenta,
  severidadEstadoAplicacion,
} from '../../modelos/estado-cuenta.interface';

@Component({
  selector: 'app-aplicaciones-cobro-estado-cuenta',
  templateUrl: './aplicaciones-cobro.componente.html',
  imports: [
    ButtonDirective,
    DatePipe,
    DecimalPipe,
    FormsModule,
    IconField,
    InputIcon,
    InputText,
    PIcon,
    Select,
    TableModule,
    Tag,
    Tooltip,
  ],
})
export class AplicacionesCobroEstadoCuentaComponente {
  readonly aplicaciones = input.required<IAplicacionEstadoCuenta[]>();

  readonly busqueda = signal('');
  readonly filtroEstado = signal<EstadoAplicacionCobro | null>(null);

  readonly opcionesEstado: IOpcionSelector[] = Object.entries(ETIQUETAS_ESTADO_APLICACION)
    .map(([valor, etiqueta]) => ({ etiqueta, valor }));

  readonly aplicacionesFiltradas = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const estado = this.filtroEstado();

    return this.aplicaciones()
      .filter((aplicacion) => {
        const coincideTexto = !texto || [
          aplicacion.id,
          aplicacion.documentoAbono,
          aplicacion.documentoCargo,
          this.etiquetaEstado(aplicacion.estado),
        ].some((valor) => valor.toLowerCase().includes(texto));

        return coincideTexto && (!estado || aplicacion.estado === estado);
      })
      .sort((a, b) => b.fechaAplicacion.getTime() - a.fechaAplicacion.getTime());
  });

  etiquetaEstado(estado: EstadoAplicacionCobro): string {
    return ETIQUETAS_ESTADO_APLICACION[estado];
  }

  severidadEstado(estado: EstadoAplicacionCobro): 'success' | 'warn' {
    return severidadEstadoAplicacion(estado);
  }

  limpiarFiltros(): void {
    this.busqueda.set('');
    this.filtroEstado.set(null);
  }
}
