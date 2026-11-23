import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { DialogoConfirmacionServicio } from '@compartido/componentes/confirmacion/confirmacion.servicio';
import { BreadcrumbServicio } from '@nucleo/servicios/breadcrumb.servicio';
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Drawer } from 'primeng/drawer';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { EncabezadoPaginaComponente } from '@compartido/componentes/encabezado-pagina/encabezado-pagina.componente';
import { CopiarTextoComponente } from '@compartido/componentes/copiar-texto/copiar-texto.componente';
import { EtiquetaFormularioComponente } from '@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente';
import { MensajeAyudaErrorComponente } from '@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente';
import { BarraAccionesMasivasComponente } from '@compartido/componentes/barra-acciones-masivas/barra-acciones-masivas.componente';
import { IOpcionSelector } from '@compartido/interfaces/selector.interface';
import { ICliente } from '../modelos/cliente';

@Component({
  selector: 'app-clientes-pagina',
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
    ConfirmDialog,
    Tag,
    EncabezadoPaginaComponente,
    CopiarTextoComponente,
    EtiquetaFormularioComponente,
    MensajeAyudaErrorComponente,
    BarraAccionesMasivasComponente
],
  templateUrl: './clientes.pagina.html',
})
export class ClientesPagina {
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
      nombre_razon_social: 'Grupo Industrial Raudal, S.A. de C.V.',
      nombre_comercial: 'Raudal',
      tipo_persona: 'Moral',
      rfc: 'RIR240315AB1',
      id_regimen_fiscal: '601 · General',
      id_tipo_iva: 'IVA 16%',
      id_uso_cfdi_predeterminado: 'G03',
      id_forma_pago_predeterminada: '03 · Transferencia',
      id_metodo_pago_predeterminado: 'PPD',
      limite_credito: 150000,
      dias_credito: 30,
      observaciones: 'Cliente preferente con facturación mensual.',
    },
    {
      nombre_razon_social: 'Comercializadora Nova, S. de R.L. de C.V.',
      nombre_comercial: 'Nova',
      tipo_persona: 'Moral',
      rfc: 'CNO890412H23',
      id_regimen_fiscal: '601 · General',
      id_tipo_iva: 'IVA 16%',
      id_uso_cfdi_predeterminado: 'G01',
      id_forma_pago_predeterminada: '03 · Transferencia',
      id_metodo_pago_predeterminado: 'PUE',
      limite_credito: 85000,
      dias_credito: 15,
      observaciones: 'Solicita factura por cada pedido.',
    },
    {
      nombre_razon_social: 'Laura Gutiérrez Méndez',
      nombre_comercial: 'Estudio Gutiérrez',
      tipo_persona: 'Física',
      rfc: 'GUML850921E45',
      id_regimen_fiscal: '612 · PFAE',
      id_tipo_iva: 'IVA 16%',
      id_uso_cfdi_predeterminado: 'G03',
      id_forma_pago_predeterminada: '04 · Tarjeta',
      id_metodo_pago_predeterminado: 'PUE',
      limite_credito: 25000,
      dias_credito: 0,
      observaciones: 'Pago de contado por defecto.',
    },
    {
      nombre_razon_social: 'Manufacturas del Norte, S.A. de C.V.',
      nombre_comercial: 'Man Norte',
      tipo_persona: 'Moral',
      rfc: 'MNO750618K12',
      id_regimen_fiscal: '601 · General',
      id_tipo_iva: 'IVA 16%',
      id_uso_cfdi_predeterminado: 'G01',
      id_forma_pago_predeterminada: '03 · Transferencia',
      id_metodo_pago_predeterminado: 'PPD',
      limite_credito: 220000,
      dias_credito: 45,
      observaciones: 'Requiere orden de compra para cada entrega.',
    },
    {
      nombre_razon_social: 'Servicios Profesionales Ámbar, S.C.',
      nombre_comercial: 'Ámbar',
      tipo_persona: 'Moral',
      rfc: 'SPA910203R77',
      id_regimen_fiscal: '601 · General',
      id_tipo_iva: 'Exento',
      id_uso_cfdi_predeterminado: 'G03',
      id_forma_pago_predeterminada: '03 · Transferencia',
      id_metodo_pago_predeterminado: 'PUE',
      limite_credito: 0,
      dias_credito: 0,
      observaciones: 'Sin línea de crédito autorizada.',
    },
    {
      nombre_razon_social: 'Fernando Ríos Castro',
      nombre_comercial: 'Ríos y Asociados',
      tipo_persona: 'Física',
      rfc: 'RICF790114M31',
      id_regimen_fiscal: '612 · PFAE',
      id_tipo_iva: 'IVA 8%',
      id_uso_cfdi_predeterminado: 'G03',
      id_forma_pago_predeterminada: '01 · Efectivo',
      id_metodo_pago_predeterminado: 'PUE',
      limite_credito: 12000,
      dias_credito: 8,
      observaciones: 'Contacto principal: fernando.rios@example.com.',
    },
    {
      nombre_razon_social: 'Distribuidora Solstice, S.A. de C.V.',
      nombre_comercial: 'Solstice',
      tipo_persona: 'Moral',
      rfc: 'DSO160902TQ8',
      id_regimen_fiscal: '616 · Sin obligaciones',
      id_tipo_iva: 'Exento',
      id_uso_cfdi_predeterminado: 'I01',
      id_forma_pago_predeterminada: '03 · Transferencia',
      id_metodo_pago_predeterminado: 'PUE',
      limite_credito: 60000,
      dias_credito: 20,
      observaciones: 'Facturación electrónica pendiente de validación.',
    },
  ];

  constructor() {
    this.breadcrumb.configurar([
      { llave: 'clients', etiqueta: 'Clientes', ruta: '/app/clients', deshabilitado: true },
    ]);
  }

  abrirDrawer(): void {
    this.drawerVisible.set(true);
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
        console.log('Eliminado');
      }
    });
  }
}
