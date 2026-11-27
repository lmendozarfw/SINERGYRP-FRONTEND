import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BarraAccionesMasivasComponente } from '@compartido/componentes/barra-acciones-masivas/barra-acciones-masivas.componente';
import { CopiarTextoComponente } from '@compartido/componentes/copiar-texto/copiar-texto.componente';
import { DialogoConfirmacionServicio } from '@compartido/componentes/confirmacion/confirmacion.servicio';
import { EncabezadoPaginaComponente } from '@compartido/componentes/encabezado-pagina/encabezado-pagina.componente';
import { EtiquetaFormularioComponente } from '@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente';
import { MensajeAyudaErrorComponente } from '@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente';
import { IOpcionSelector } from '@compartido/interfaces/selector.interface';
import { BreadcrumbServicio } from '@nucleo/servicios/breadcrumb.servicio';
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { IProveedor } from '../modelos/proveedor';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-proveedores-pagina',
  imports: [
    DecimalPipe,
    ButtonDirective,
    Drawer,
    IconField,
    InputIcon,
    InputText,
    Select,
    TableModule,
    PIcon,
    Tag,
    EncabezadoPaginaComponente,
    CopiarTextoComponente,
    EtiquetaFormularioComponente,
    MensajeAyudaErrorComponente,
    BarraAccionesMasivasComponente,
    DatePicker
],
  templateUrl: './proveedores.pagina.html',
})
export class ProveedoresPagina {
  private readonly dialogoConfirmacion = inject(DialogoConfirmacionServicio);
  private readonly breadcrumb = inject(BreadcrumbServicio);
  private readonly router = inject(Router);

  readonly drawerVisible = signal(false);
  readonly seleccion = signal<IProveedor[]>([]);

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
    { etiqueta: 'Activo', valor: 'Activo' },
    { etiqueta: 'En revisión', valor: 'En revisión' },
    { etiqueta: 'Inactivo', valor: 'Inactivo' },
  ];
  readonly opcionesMoneda: IOpcionSelector[] = [
    { etiqueta: 'MXN · Peso mexicano', valor: '1' },
    { etiqueta: 'USD · Dólar estadounidense', valor: '2' },
  ];
  readonly opcionesFormaPago: IOpcionSelector[] = [
    { etiqueta: '01 · Efectivo', valor: '1' },
    { etiqueta: '03 · Transferencia electrónica', valor: '3' },
    { etiqueta: '04 · Tarjeta de crédito', valor: '4' },
  ];
  readonly opcionesMetodoPago: IOpcionSelector[] = [
    { etiqueta: 'PUE · Pago en una sola exhibición', valor: '1' },
    { etiqueta: 'PPD · Pago en parcialidades o diferido', valor: '2' },
  ];

  readonly proveedores: IProveedor[] = [
    {
      id: 1,
      idOrganizacion: 1,
      codigo: 'PROV-001',
      estadoProveedor: 'Activo',
      fechaAlta: new Date('2023-02-15T00:00:00'),
      nombreRazonSocial: 'Grupo Industrial Raudal, S.A. de C.V.',
      nombreComercial: 'Raudal',
      tipoPersona: 'Moral',
      rfc: 'RIR240315AB1',
      identificadorFiscalExtranjero: '',
      idRegimenFiscal: '601 · General',
      cuentaContable: '2010 · Proveedores nacionales',
      diasCredito: 30,
      limiteCredito: 150000,
      idMonedaPredeterminada: 1,
      idFormaPagoPredeterminada: 3,
      idMetodoPagoPredeterminado: 2,
      esPagoContrarecibo: true,
      observaciones: 'Proveedor preferente con facturación mensual.',
      creadoEn: new Date('2023-02-15T00:00:00'),
      actualizadoEn: new Date('2026-01-20T00:00:00'),
    },
    {
      id: 2,
      idOrganizacion: 1,
      codigo: 'PROV-002',
      estadoProveedor: 'Activo',
      fechaAlta: new Date('2022-08-03T00:00:00'),
      nombreRazonSocial: 'Comercializadora Nova, S. de R.L. de C.V.',
      nombreComercial: 'Nova',
      tipoPersona: 'Moral',
      rfc: 'CNO890412H23',
      identificadorFiscalExtranjero: '',
      idRegimenFiscal: '601 · General',
      cuentaContable: '2010 · Proveedores nacionales',
      diasCredito: 15,
      limiteCredito: 85000,
      idMonedaPredeterminada: 1,
      idFormaPagoPredeterminada: 3,
      idMetodoPagoPredeterminado: 1,
      esPagoContrarecibo: false,
      observaciones: 'Solicita factura por cada pedido.',
      creadoEn: new Date('2022-08-03T00:00:00'),
      actualizadoEn: new Date('2025-11-04T00:00:00'),
    },
    {
      id: 3,
      idOrganizacion: 1,
      codigo: 'PROV-003',
      estadoProveedor: 'Activo',
      fechaAlta: new Date('2024-01-10T00:00:00'),
      nombreRazonSocial: 'Laura Gutiérrez Méndez',
      nombreComercial: 'Estudio Gutiérrez',
      tipoPersona: 'Física',
      rfc: 'GUML850921E45',
      identificadorFiscalExtranjero: '',
      idRegimenFiscal: '612 · PFAE',
      cuentaContable: '2011 · Proveedores de servicios',
      diasCredito: 0,
      limiteCredito: 25000,
      idMonedaPredeterminada: 1,
      idFormaPagoPredeterminada: 4,
      idMetodoPagoPredeterminado: 1,
      esPagoContrarecibo: false,
      observaciones: 'Pago de contado por defecto.',
      creadoEn: new Date('2024-01-10T00:00:00'),
      actualizadoEn: new Date('2025-09-18T00:00:00'),
    },
    {
      id: 4,
      idOrganizacion: 1,
      codigo: 'PROV-004',
      estadoProveedor: 'Activo',
      fechaAlta: new Date('2021-05-22T00:00:00'),
      nombreRazonSocial: 'Manufacturas del Norte, S.A. de C.V.',
      nombreComercial: 'Man Norte',
      tipoPersona: 'Moral',
      rfc: 'MNO750618K12',
      identificadorFiscalExtranjero: '',
      idRegimenFiscal: '601 · General',
      cuentaContable: '2010 · Proveedores nacionales',
      diasCredito: 45,
      limiteCredito: 220000,
      idMonedaPredeterminada: 1,
      idFormaPagoPredeterminada: 3,
      idMetodoPagoPredeterminado: 2,
      esPagoContrarecibo: true,
      observaciones: 'Requiere orden de compra para cada entrega.',
      creadoEn: new Date('2021-05-22T00:00:00'),
      actualizadoEn: new Date('2026-02-11T00:00:00'),
    },
    {
      id: 5,
      idOrganizacion: 1,
      codigo: 'PROV-005',
      estadoProveedor: 'Inactivo',
      fechaAlta: new Date('2020-11-02T00:00:00'),
      nombreRazonSocial: 'Servicios Profesionales Ámbar, S.C.',
      nombreComercial: 'Ámbar',
      tipoPersona: 'Moral',
      rfc: 'SPA910203R77',
      identificadorFiscalExtranjero: '',
      idRegimenFiscal: '601 · General',
      cuentaContable: '2011 · Proveedores de servicios',
      diasCredito: 0,
      limiteCredito: 0,
      idMonedaPredeterminada: 1,
      idFormaPagoPredeterminada: 3,
      idMetodoPagoPredeterminado: 1,
      esPagoContrarecibo: false,
      observaciones: 'Sin línea de crédito autorizada.',
      creadoEn: new Date('2020-11-02T00:00:00'),
      actualizadoEn: new Date('2025-03-29T00:00:00'),
    },
    {
      id: 6,
      idOrganizacion: 1,
      codigo: 'PROV-006',
      estadoProveedor: 'Activo',
      fechaAlta: new Date('2025-04-17T00:00:00'),
      nombreRazonSocial: 'Fernando Ríos Castro',
      nombreComercial: 'Ríos y Asociados',
      tipoPersona: 'Física',
      rfc: 'RICF790114M31',
      identificadorFiscalExtranjero: '',
      idRegimenFiscal: '612 · PFAE',
      cuentaContable: '2011 · Proveedores de servicios',
      diasCredito: 8,
      limiteCredito: 12000,
      idMonedaPredeterminada: 1,
      idFormaPagoPredeterminada: 1,
      idMetodoPagoPredeterminado: 1,
      esPagoContrarecibo: false,
      observaciones: 'Contacto principal: fernando.rios@example.com.',
      creadoEn: new Date('2025-04-17T00:00:00'),
      actualizadoEn: new Date('2025-12-06T00:00:00'),
    },
    {
      id: 7,
      idOrganizacion: 1,
      codigo: 'PROV-007',
      estadoProveedor: 'En revisión',
      fechaAlta: new Date('2026-03-08T00:00:00'),
      nombreRazonSocial: 'Distribuidora Solstice, S.A. de C.V.',
      nombreComercial: 'Solstice',
      tipoPersona: 'Moral',
      rfc: 'DSO160902TQ8',
      identificadorFiscalExtranjero: 'IDF-88231',
      idRegimenFiscal: '616 · Sin obligaciones',
      cuentaContable: '2010 · Proveedores nacionales',
      diasCredito: 20,
      limiteCredito: 60000,
      idMonedaPredeterminada: 2,
      idFormaPagoPredeterminada: 3,
      idMetodoPagoPredeterminado: 1,
      esPagoContrarecibo: true,
      observaciones: 'Documentación fiscal pendiente de validación.',
      creadoEn: new Date('2026-03-08T00:00:00'),
      actualizadoEn: new Date('2026-03-15T00:00:00'),
    },
  ];

  constructor() {
    this.breadcrumb.configurar([
      {
        llave: 'proveedores',
        etiqueta: 'Proveedores',
        ruta: '/app/proveedores',
        deshabilitado: true,
      },
    ]);
  }

  severidadEstado(estado: string): 'success' | 'warn' | 'danger' {
    if (estado === 'Activo') {
      return 'success';
    }
    return estado === 'Inactivo' ? 'danger' : 'warn';
  }

  abrirDrawer(): void {
    this.drawerVisible.set(true);
  }

  verProveedor(proveedor: IProveedor): void {
    this.router.navigate(['/app/proveedores', proveedor.id]);
  }

  editarProveedor(proveedor: IProveedor): void {
    this.router.navigate(['/app/proveedores', proveedor.id]);
  }

  limpiarSeleccion(): void {
    this.seleccion.set([]);
  }

  eliminar(proveedor?: IProveedor): void {
    this.dialogoConfirmacion.mostrar({
      titulo: '¿Eliminar proveedor?',
      mensaje: 'Esta acción eliminará el proveedor seleccionado. ¿Deseas continuar?',
      tipo: 'peligro',
      textoAceptar: 'Eliminar',
      textoCancelar: 'Cancelar',
      alConfirmar: () => {
        console.log('Eliminado', proveedor?.codigo);
      },
    });
  }
}
