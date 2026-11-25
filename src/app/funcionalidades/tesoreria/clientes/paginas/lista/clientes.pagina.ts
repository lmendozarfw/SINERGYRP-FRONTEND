import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { BarraAccionesMasivasComponente } from '@compartido/componentes/barra-acciones-masivas/barra-acciones-masivas.componente';
import { CopiarTextoComponente } from '@compartido/componentes/copiar-texto/copiar-texto.componente';
import { DialogoConfirmacionServicio } from '@compartido/componentes/confirmacion/confirmacion.servicio';
import { EncabezadoPaginaComponente } from '@compartido/componentes/encabezado-pagina/encabezado-pagina.componente';
import { IOpcionSelector } from '@compartido/interfaces/selector.interface';
import { BreadcrumbServicio } from '@nucleo/servicios/breadcrumb.servicio';
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { ICliente } from '../../modelos/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-pagina',
  imports: [
    DecimalPipe,
    ButtonDirective,
    IconField,
    InputIcon,
    InputText,
    Select,
    TableModule,
    PIcon,
    Tag,
    EncabezadoPaginaComponente,
    CopiarTextoComponente,
    BarraAccionesMasivasComponente,
  ],
  templateUrl: './clientes.pagina.html',
})
export class ClientesPagina {
  private readonly rutas = inject(Router);
  private readonly dialogoConfirmacion = inject(DialogoConfirmacionServicio);
  private readonly breadcrumb = inject(BreadcrumbServicio);

  readonly drawerVisible = signal(false);
  readonly seleccion = signal<ICliente[]>([]);

  readonly opcionesTipoPersona: IOpcionSelector[] = [
    { etiqueta: 'Física', valor: 'Física' },
    { etiqueta: 'Moral', valor: 'Moral' },
  ];
  readonly opcionesRegimen: IOpcionSelector[] = [
    { etiqueta: '601 · General de Ley Personas Morales', valor: '601 · General' },
    { etiqueta: '612 · Personas Físicas con Actividades Empresariales', valor: '612 · PFAE' },
    { etiqueta: '616 · Sin obligaciones fiscales', valor: '616 · Sin obligaciones' },
  ];
  readonly opcionesEstado: IOpcionSelector[] = [
    { etiqueta: 'Activo', valor: 'activo' },
    { etiqueta: 'En revisión', valor: 'en revisión' },
    { etiqueta: 'Inactivo', valor: 'inactivo' },
  ];
  readonly opcionesIva: IOpcionSelector[] = [
    { etiqueta: 'IVA 16%', valor: 'IVA 16%' },
    { etiqueta: 'IVA 8%', valor: 'IVA 8%' },
    { etiqueta: 'Exento', valor: 'Exento' },
  ];
  readonly opcionesUsoCfdi: IOpcionSelector[] = [
    { etiqueta: 'G01 · Adquisición de mercancías', valor: 'G01' },
    { etiqueta: 'G03 · Gastos generales', valor: 'G03' },
    { etiqueta: 'I01 · Ingresos por ventas', valor: 'I01' },
  ];
  readonly opcionesFormaPago: IOpcionSelector[] = [
    { etiqueta: '01 · Efectivo', valor: '01 · Efectivo' },
    { etiqueta: '03 · Transferencia electrónica', valor: '03 · Transferencia' },
    { etiqueta: '04 · Tarjeta de crédito', valor: '04 · Tarjeta' },
  ];
  readonly opcionesMetodoPago: IOpcionSelector[] = [
    { etiqueta: 'PUE · Pago en una sola exhibición', valor: 'PUE' },
    { etiqueta: 'PPD · Pago en parcialidades o diferido', valor: 'PPD' },
  ];

  readonly clientes: ICliente[] = [
    {
      id: 1,
      idOrganizacion: 1,
      codigo: 'CLI-001',
      estadoCliente: 'activo',
      fechaAlta: new Date('2023-02-15T00:00:00'),
      nombreRazonSocial: 'Grupo Industrial Raudal, S.A. de C.V.',
      nombreComercial: 'Raudal',
      tipoPersona: 'Moral',
      rfc: 'RIR240315AB1',
      identificadorFiscalExtranjero: '',
      idRegimenFiscal: '601 · General',
      idTipoIva: 'IVA 16%',
      cuentaContable: '1010 · Clientes nacionales',
      idUsoCfdiPredeterminado: 'G03',
      idFormaPagoPredeterminada: '03 · Transferencia',
      idMetodoPagoPredeterminado: 'PPD',
      limiteCredito: 150000,
      diasCredito: 30,
      observaciones: 'Cliente preferente con facturación mensual.',
      creadoEn: new Date('2023-02-15T00:00:00'),
      actualizadoEn: new Date('2026-01-20T00:00:00'),
    },
    {
      id: 2,
      idOrganizacion: 1,
      codigo: 'CLI-002',
      estadoCliente: 'activo',
      fechaAlta: new Date('2022-08-03T00:00:00'),
      nombreRazonSocial: 'Comercializadora Nova, S. de R.L. de C.V.',
      nombreComercial: 'Nova',
      tipoPersona: 'Moral',
      rfc: 'CNO890412H23',
      identificadorFiscalExtranjero: '',
      idRegimenFiscal: '601 · General',
      idTipoIva: 'IVA 16%',
      cuentaContable: '1010 · Clientes nacionales',
      idUsoCfdiPredeterminado: 'G01',
      idFormaPagoPredeterminada: '03 · Transferencia',
      idMetodoPagoPredeterminado: 'PUE',
      limiteCredito: 85000,
      diasCredito: 15,
      observaciones: 'Solicita factura por cada pedido.',
      creadoEn: new Date('2022-08-03T00:00:00'),
      actualizadoEn: new Date('2025-11-04T00:00:00'),
    },
    {
      id: 3,
      idOrganizacion: 1,
      codigo: 'CLI-003',
      estadoCliente: 'activo',
      fechaAlta: new Date('2024-01-10T00:00:00'),
      nombreRazonSocial: 'Laura Gutiérrez Méndez',
      nombreComercial: 'Estudio Gutiérrez',
      tipoPersona: 'Física',
      rfc: 'GUML850921E45',
      identificadorFiscalExtranjero: '',
      idRegimenFiscal: '612 · PFAE',
      idTipoIva: 'IVA 16%',
      cuentaContable: '1011 · Clientes de servicios',
      idUsoCfdiPredeterminado: 'G03',
      idFormaPagoPredeterminada: '04 · Tarjeta',
      idMetodoPagoPredeterminado: 'PUE',
      limiteCredito: 25000,
      diasCredito: 0,
      observaciones: 'Pago de contado por defecto.',
      creadoEn: new Date('2024-01-10T00:00:00'),
      actualizadoEn: new Date('2025-09-18T00:00:00'),
    },
    {
      id: 4,
      idOrganizacion: 1,
      codigo: 'CLI-004',
      estadoCliente: 'activo',
      fechaAlta: new Date('2021-05-22T00:00:00'),
      nombreRazonSocial: 'Manufacturas del Norte, S.A. de C.V.',
      nombreComercial: 'Man Norte',
      tipoPersona: 'Moral',
      rfc: 'MNO750618K12',
      identificadorFiscalExtranjero: '',
      idRegimenFiscal: '601 · General',
      idTipoIva: 'IVA 16%',
      cuentaContable: '1010 · Clientes nacionales',
      idUsoCfdiPredeterminado: 'G01',
      idFormaPagoPredeterminada: '03 · Transferencia',
      idMetodoPagoPredeterminado: 'PPD',
      limiteCredito: 220000,
      diasCredito: 45,
      observaciones: 'Requiere orden de compra para cada entrega.',
      creadoEn: new Date('2021-05-22T00:00:00'),
      actualizadoEn: new Date('2026-02-11T00:00:00'),
    },
    {
      id: 5,
      idOrganizacion: 1,
      codigo: 'CLI-005',
      estadoCliente: 'inactivo',
      fechaAlta: new Date('2020-11-02T00:00:00'),
      nombreRazonSocial: 'Servicios Profesionales Ámbar, S.C.',
      nombreComercial: 'Ámbar',
      tipoPersona: 'Moral',
      rfc: 'SPA910203R77',
      identificadorFiscalExtranjero: '',
      idRegimenFiscal: '601 · General',
      idTipoIva: 'Exento',
      cuentaContable: '1011 · Clientes de servicios',
      idUsoCfdiPredeterminado: 'G03',
      idFormaPagoPredeterminada: '03 · Transferencia',
      idMetodoPagoPredeterminado: 'PUE',
      limiteCredito: 0,
      diasCredito: 0,
      observaciones: 'Sin línea de crédito autorizada.',
      creadoEn: new Date('2020-11-02T00:00:00'),
      actualizadoEn: new Date('2025-03-29T00:00:00'),
    },
    {
      id: 6,
      idOrganizacion: 1,
      codigo: 'CLI-006',
      estadoCliente: 'activo',
      fechaAlta: new Date('2025-04-17T00:00:00'),
      nombreRazonSocial: 'Fernando Ríos Castro',
      nombreComercial: 'Ríos y Asociados',
      tipoPersona: 'Física',
      rfc: 'RICF790114M31',
      identificadorFiscalExtranjero: '',
      idRegimenFiscal: '612 · PFAE',
      idTipoIva: 'IVA 8%',
      cuentaContable: '1011 · Clientes de servicios',
      idUsoCfdiPredeterminado: 'G03',
      idFormaPagoPredeterminada: '01 · Efectivo',
      idMetodoPagoPredeterminado: 'PUE',
      limiteCredito: 12000,
      diasCredito: 8,
      observaciones: 'Contacto principal: fernando.rios@example.com.',
      creadoEn: new Date('2025-04-17T00:00:00'),
      actualizadoEn: new Date('2025-12-06T00:00:00'),
    },
    {
      id: 7,
      idOrganizacion: 1,
      codigo: 'CLI-007',
      estadoCliente: 'en revisión',
      fechaAlta: new Date('2026-03-08T00:00:00'),
      nombreRazonSocial: 'Distribuidora Solstice, S.A. de C.V.',
      nombreComercial: 'Solstice',
      tipoPersona: 'Moral',
      rfc: 'DSO160902TQ8',
      identificadorFiscalExtranjero: 'IDF-44710',
      idRegimenFiscal: '616 · Sin obligaciones',
      idTipoIva: 'Exento',
      cuentaContable: '1010 · Clientes nacionales',
      idUsoCfdiPredeterminado: 'I01',
      idFormaPagoPredeterminada: '03 · Transferencia',
      idMetodoPagoPredeterminado: 'PUE',
      limiteCredito: 60000,
      diasCredito: 20,
      observaciones: 'Facturación electrónica pendiente de validación.',
      creadoEn: new Date('2026-03-08T00:00:00'),
      actualizadoEn: new Date('2026-03-15T00:00:00'),
    },
  ];

  constructor() {
    this.breadcrumb.configurar([
      {
        llave: 'clients',
        etiqueta: 'Clientes',
        ruta: '/app/clientes',
        deshabilitado: true,
      },
    ]);
  }

  severidadEstado(estado: string): 'success' | 'warn' | 'danger' {
    if (estado === 'activo') {
      return 'success';
    }
    return estado === 'inactivo' ? 'danger' : 'warn';
  }

  irACrearCliente(): void {
    this.rutas.navigate(['app', 'clientes', '1']);
  }

  limpiarSeleccion(): void {
    this.seleccion.set([]);
  }

  eliminar(cliente?: ICliente): void {
    this.dialogoConfirmacion.mostrar({
      titulo: '¿Eliminar cliente?',
      mensaje: 'Esta acción eliminará el cliente seleccionado. ¿Deseas continuar?',
      tipo: 'peligro',
      textoAceptar: 'Eliminar',
      textoCancelar: 'Cancelar',
      alConfirmar: () => {
        console.log('Eliminado', cliente?.codigo);
      },
    });
  }
}
