import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IOpcionSelector } from '@compartido/interfaces/selector.interface';
import { EstadoDocumentoCxcEnum } from '@funcionalidades/tesoreria/cxc/enumerables/estado-documento-cxc.enum';
import { TipoDocumentoCxcEnum } from '@funcionalidades/tesoreria/cxc/enumerables/tipo-documento-cxc.enum';
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import {
  ETIQUETAS_ESTADO_DOCUMENTO,
  ETIQUETAS_TIPO_DOCUMENTO,
  IDocumentoEstadoCuenta,
  severidadEstadoDocumento,
} from '../../modelos/estado-cuenta.interface';

@Component({
  selector: 'app-documentos-estado-cuenta',
  templateUrl: './documentos-cxc.componente.html',
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
  ],
})
export class DocumentosEstadoCuentaComponente {
  readonly documentos = input.required<IDocumentoEstadoCuenta[]>();

  readonly busqueda = signal('');
  readonly filtroTipo = signal<TipoDocumentoCxcEnum | null>(null);
  readonly filtroEstado = signal<EstadoDocumentoCxcEnum | null>(null);

  readonly opcionesTipo: IOpcionSelector[] = Object.entries(ETIQUETAS_TIPO_DOCUMENTO)
    .map(([valor, etiqueta]) => ({ etiqueta, valor }));
  readonly opcionesEstado: IOpcionSelector[] = Object.entries(ETIQUETAS_ESTADO_DOCUMENTO)
    .map(([valor, etiqueta]) => ({ etiqueta, valor }));

  readonly documentosFiltrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const tipo = this.filtroTipo();
    const estado = this.filtroEstado();

    return this.documentos().filter((documento) => {
      const coincideTexto = !texto || [
        documento.serie,
        documento.folio,
        this.etiquetaTipo(documento.tipoDocumento),
        this.etiquetaEstado(documento.estado),
      ].some((valor) => valor.toLowerCase().includes(texto));

      return coincideTexto
        && (!tipo || documento.tipoDocumento === tipo)
        && (!estado || documento.estado === estado);
    });
  });

  etiquetaTipo(tipo: TipoDocumentoCxcEnum): string {
    return ETIQUETAS_TIPO_DOCUMENTO[tipo];
  }

  etiquetaEstado(estado: EstadoDocumentoCxcEnum): string {
    return ETIQUETAS_ESTADO_DOCUMENTO[estado];
  }

  severidadEstado(estado: EstadoDocumentoCxcEnum): 'success' | 'warn' | 'danger' {
    return severidadEstadoDocumento(estado);
  }

  limpiarFiltros(): void {
    this.busqueda.set('');
    this.filtroTipo.set(null);
    this.filtroEstado.set(null);
  }
}
