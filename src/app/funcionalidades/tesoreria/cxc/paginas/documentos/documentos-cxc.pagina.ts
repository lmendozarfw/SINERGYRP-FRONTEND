import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EncabezadoPaginaComponente } from '@compartido/componentes/encabezado-pagina/encabezado-pagina.componente';
import { IOpcionSelector } from '@compartido/interfaces/selector.interface';
import { EstadoDocumentoCxcEnum } from '@funcionalidades/tesoreria/cxc/enumerables/estado-documento-cxc.enum';
import { TipoDocumentoCxcEnum } from '@funcionalidades/tesoreria/cxc/enumerables/tipo-documento-cxc.enum';
import { IDocumentoCxcListado } from '@funcionalidades/tesoreria/cxc/modelos/documento_cxc.interface';
import { BreadcrumbServicio } from '@nucleo/servicios/breadcrumb.servicio';
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';

const ETIQUETAS_TIPO_DOCUMENTO: Record<TipoDocumentoCxcEnum, string> = {
  [TipoDocumentoCxcEnum.FACTURA]: 'Factura',
  [TipoDocumentoCxcEnum.COTIZACION]: 'Cotización',
  [TipoDocumentoCxcEnum.NOTA_CREDITO]: 'Nota de crédito',
  [TipoDocumentoCxcEnum.NOTA_CARGO]: 'Nota de cargo',
  [TipoDocumentoCxcEnum.PAGO]: 'Pago',
  [TipoDocumentoCxcEnum.ANTICIPO]: 'Anticipo',
};

const ETIQUETAS_ESTADO_DOCUMENTO: Record<EstadoDocumentoCxcEnum, string> = {
  [EstadoDocumentoCxcEnum.BORRADOR]: 'Borrador',
  [EstadoDocumentoCxcEnum.EMITIDO]: 'Emitido',
  [EstadoDocumentoCxcEnum.CANCELADO]: 'Cancelado',
};

const DATOS_FISCALES = {
  idOrganizacion: '1',
  idEmisorFiscal: '1',
  idUnidadNegocio: '1',
  idConceptoMovimiento: '1',
  idFormaPagoSat: '03',
  idMetodoPagoSat: 'PUE',
  idUsoCfdiSat: 'I01',
  exportacion: '01',
  lugarExpedicion: '06600',
  idUsuarioCreacion: '1',
  origen: 'SINERGY',
  observaciones: '',
} as const;

@Component({
  selector: 'app-documentos-cxc-pagina',
  templateUrl: './documentos-cxc.pagina.html',
  styleUrl: './documentos-cxc.pagina.scss',
  imports: [
    ButtonDirective,
    DatePipe,
    DecimalPipe,
    EncabezadoPaginaComponente,
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
export class DocumentosCxcPagina {
  private readonly breadcrumb = inject(BreadcrumbServicio);
  private readonly router = inject(Router);

  readonly busqueda = signal('');
  readonly filtroTipoDocumento = signal<string | null>(null);
  readonly filtroEstado = signal<string | null>(null);

  readonly opcionesTipoDocumento: IOpcionSelector[] = Object.entries(ETIQUETAS_TIPO_DOCUMENTO)
    .map(([valor, etiqueta]) => ({ etiqueta, valor }));
  readonly opcionesEstado: IOpcionSelector[] = Object.entries(ETIQUETAS_ESTADO_DOCUMENTO)
    .map(([valor, etiqueta]) => ({ etiqueta, valor }));

  readonly documentos: IDocumentoCxcListado[] = [
    {
      ...DATOS_FISCALES,
      id: '1',
      idCliente: '1',
      cliente: 'Grupo Industrial Raudal, S.A. de C.V.',
      moneda: 'MXN',
      tipoDocumento: TipoDocumentoCxcEnum.FACTURA,
      serie: 'FAC',
      folio: '2026-001',
      fechaDocumento: new Date('2026-09-12T00:00:00'),
      fechaVencimiento: new Date('2026-10-12T00:00:00'),
      idMoneda: 'MXN',
      tipoCambio: 1,
      subtotal: 20000,
      descuento: 200,
      impuestosTrasladados: 3168,
      impuestosRetenidos: 0,
      total: 22968,
      totalMonedaBase: 22968,
      estado: EstadoDocumentoCxcEnum.EMITIDO,
      creadoEn: new Date('2026-09-12T10:24:00'),
      partidas: [
        {
          id: '101',
          idDocumentoCxc: '1',
          numeroPartida: 1,
          concepto: 'Consultoría financiera',
          cantidad: 10,
          precioUnitario: 1800,
          subtotal: 18000,
          tipoDescuento: null,
          porcentajeDescuento: null,
          descuento: 0,
          objetoImp: '02',
          impuestosTrasladados: 2880,
          impuestosRetenidos: 0,
          total: 20880,
          subtotalMonedaBase: 18000,
          totalMonedaBase: 20880,
          idProductoServicioSat: 'SERV-001',
          idUnidadMedidaSat: 'UNI-01',
        },
        {
          id: '102',
          idDocumentoCxc: '1',
          numeroPartida: 2,
          concepto: 'Licencias de software',
          cantidad: 4,
          precioUnitario: 500,
          subtotal: 2000,
          tipoDescuento: 'I',
          porcentajeDescuento: null,
          descuento: 200,
          objetoImp: '02',
          impuestosTrasladados: 288,
          impuestosRetenidos: 0,
          total: 2088,
          subtotalMonedaBase: 2000,
          totalMonedaBase: 2088,
          idProductoServicioSat: 'SERV-014',
          idUnidadMedidaSat: 'UNI-01',
        },
      ],
    },
    {
      ...DATOS_FISCALES,
      id: '2',
      idCliente: '2',
      cliente: 'Comercializadora Nova, S. de R.L. de C.V.',
      moneda: 'MXN',
      tipoDocumento: TipoDocumentoCxcEnum.COTIZACION,
      serie: 'COT',
      folio: '2026-014',
      fechaDocumento: new Date('2026-10-03T00:00:00'),
      fechaVencimiento: new Date('2026-11-02T00:00:00'),
      idMoneda: 'MXN',
      tipoCambio: 1,
      subtotal: 5000,
      descuento: 500,
      impuestosTrasladados: 720,
      impuestosRetenidos: 0,
      total: 5220,
      totalMonedaBase: 5220,
      estado: EstadoDocumentoCxcEnum.BORRADOR,
      creadoEn: new Date('2026-10-03T09:10:00'),
      partidas: [
        {
          id: '201',
          idDocumentoCxc: '2',
          numeroPartida: 1,
          concepto: 'Equipo de cómputo',
          cantidad: 2,
          precioUnitario: 2500,
          subtotal: 5000,
          tipoDescuento: '%',
          porcentajeDescuento: 10,
          descuento: 500,
          objetoImp: '02',
          impuestosTrasladados: 720,
          impuestosRetenidos: 0,
          total: 5220,
          subtotalMonedaBase: 5000,
          totalMonedaBase: 5220,
          idProductoServicioSat: 'PROD-088',
          idUnidadMedidaSat: 'UNI-02',
        },
      ],
    },
    {
      ...DATOS_FISCALES,
      id: '3',
      idCliente: '3',
      cliente: 'Laura Gutiérrez Méndez',
      moneda: 'MXN',
      tipoDocumento: TipoDocumentoCxcEnum.NOTA_CREDITO,
      serie: 'NCR',
      folio: '2026-003',
      fechaDocumento: new Date('2026-10-18T00:00:00'),
      idMoneda: 'MXN',
      tipoCambio: 1,
      subtotal: 1000,
      descuento: 0,
      impuestosTrasladados: 160,
      impuestosRetenidos: 0,
      total: 1160,
      totalMonedaBase: 1160,
      estado: EstadoDocumentoCxcEnum.EMITIDO,
      creadoEn: new Date('2026-10-18T12:45:00'),
      partidas: [
        {
          id: '301',
          idDocumentoCxc: '3',
          numeroPartida: 1,
          concepto: 'Devolución de servicios',
          cantidad: 1,
          precioUnitario: 1000,
          subtotal: 1000,
          tipoDescuento: null,
          porcentajeDescuento: null,
          descuento: 0,
          objetoImp: '02',
          impuestosTrasladados: 160,
          impuestosRetenidos: 0,
          total: 1160,
          subtotalMonedaBase: 1000,
          totalMonedaBase: 1160,
          idProductoServicioSat: 'SERV-001',
          idUnidadMedidaSat: 'UNI-01',
        },
      ],
    },
    {
      ...DATOS_FISCALES,
      id: '4',
      idCliente: '4',
      cliente: 'Manufacturas del Norte, S.A. de C.V.',
      moneda: 'USD',
      tipoDocumento: TipoDocumentoCxcEnum.PAGO,
      serie: 'PAG',
      folio: '2026-022',
      fechaDocumento: new Date('2026-11-05T00:00:00'),
      idMoneda: 'USD',
      tipoCambio: 18.4,
      subtotal: 15000,
      descuento: 0,
      impuestosTrasladados: 0,
      impuestosRetenidos: 0,
      total: 15000,
      totalMonedaBase: 276000,
      estado: EstadoDocumentoCxcEnum.EMITIDO,
      creadoEn: new Date('2026-11-05T16:30:00'),
      partidas: [],
    },
    {
      ...DATOS_FISCALES,
      id: '5',
      idCliente: '5',
      cliente: 'Servicios Profesionales Ámbar, S.C.',
      moneda: 'MXN',
      tipoDocumento: TipoDocumentoCxcEnum.ANTICIPO,
      serie: 'ANT',
      folio: '2026-007',
      fechaDocumento: new Date('2026-11-20T00:00:00'),
      idMoneda: 'MXN',
      tipoCambio: 1,
      subtotal: 5000,
      descuento: 0,
      impuestosTrasladados: 0,
      impuestosRetenidos: 0,
      total: 5000,
      totalMonedaBase: 5000,
      estado: EstadoDocumentoCxcEnum.CANCELADO,
      creadoEn: new Date('2026-11-20T11:05:00'),
      partidas: [],
    },
  ];

  readonly documentosFiltrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const tipo = this.filtroTipoDocumento();
    const estado = this.filtroEstado();

    return this.documentos.filter((documento) => {
      const coincideTexto = !texto || [
        documento.serie,
        documento.folio,
        documento.cliente,
        this.etiquetaTipoDocumento(documento.tipoDocumento),
        this.etiquetaEstado(documento.estado),
      ].some((valor) => valor.toLowerCase().includes(texto));

      return coincideTexto
        && (!tipo || documento.tipoDocumento === tipo)
        && (!estado || documento.estado === estado);
    });
  });

  constructor() {
    this.breadcrumb.configurar([
      { etiqueta: 'Tesoreria', llave: 'tesoreria', deshabilitado: true },
      { etiqueta: 'Cuentas por cobrar', llave: 'cuentas-por-cobrar', deshabilitado: true },
      { etiqueta: 'Documentos', llave: 'documentos', deshabilitado: true },
    ]);
  }

  etiquetaTipoDocumento(tipo: TipoDocumentoCxcEnum): string {
    return ETIQUETAS_TIPO_DOCUMENTO[tipo];
  }

  etiquetaEstado(estado: EstadoDocumentoCxcEnum): string {
    return ETIQUETAS_ESTADO_DOCUMENTO[estado];
  }

  severidadEstado(estado: EstadoDocumentoCxcEnum): 'success' | 'warn' | 'danger' {
    if (estado === EstadoDocumentoCxcEnum.EMITIDO) {
      return 'success';
    }
    return estado === EstadoDocumentoCxcEnum.CANCELADO ? 'danger' : 'warn';
  }

  limpiarFiltros(): void {
    this.busqueda.set('');
    this.filtroTipoDocumento.set(null);
    this.filtroEstado.set(null);
  }

  crearFactura(): void {
    this.router.navigate(['/app/tesoreria/cuentas-por-cobrar/documentos/nueva-factura']);
  }
}
