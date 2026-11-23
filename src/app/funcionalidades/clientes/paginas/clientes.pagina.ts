import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Drawer } from 'primeng/drawer';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { PIcon } from '@primeicons/angular';
import { BarraAccionesMasivasComponente } from '../../../compartido/componentes/barra-acciones-masivas/barra-acciones-masivas.componente';
import { EtiquetaFormularioComponente } from '../../../compartido/componentes/form-label/etiqueta-formulario.componente';
import { MensajeAyudaErrorComponente } from '../../../compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.component';
import { EncabezadoPaginaComponente } from '../../../compartido/componentes/encabezado-pagina/encabezado-pagina.componente';
import { BreadcrumbServicio } from '../../../nucleo/servicios/breadcrumb.servicio';
import { Cliente } from '../modelos/cliente';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogoConfirmacionServicio } from '../../../compartido/componentes/confirmacion/confirmacion.servicio';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-clients-page',
  host: { class: 'block' },
  imports: [
    DecimalPipe,
    Drawer,
    IconField,
    InputIcon,
    InputText,
    Select,
    TableModule,
    Tag,
    BarraAccionesMasivasComponente,
    EtiquetaFormularioComponente,
    MensajeAyudaErrorComponente,
    EncabezadoPaginaComponente,
    PIcon,
    ConfirmDialog,
  ],
  templateUrl: './clientes.pagina.html',
})
export class ClientsPage {
  private readonly dialogoConfirmacion = inject(DialogoConfirmacionServicio);
  private readonly breadcrumb = inject(BreadcrumbServicio);

  readonly drawerVisible = signal(false);
  readonly selectedClients = signal<Cliente[]>([]);

  readonly tipoPersonaOptions: SelectOption[] = [
    { label: 'Física', value: 'Física' },
    { label: 'Moral', value: 'Moral' },
  ];
  readonly regimenOptions: SelectOption[] = [
    { label: '601 · General de Ley Personas Morales', value: '601 · General' },
    { label: '612 · Personas Físicas con Actividades Empresariales', value: '612 · PFAE' },
    { label: '616 · Sin obligaciones fiscales', value: '616 · Sin obligaciones' },
  ];
  readonly ivaOptions: SelectOption[] = [
    { label: 'IVA 16%', value: 'IVA 16%' },
    { label: 'IVA 8%', value: 'IVA 8%' },
    { label: 'Exento', value: 'Exento' },
  ];
  readonly usoCfdiOptions: SelectOption[] = [
    { label: 'G01 · Adquisición de mercancías', value: 'G01' },
    { label: 'G03 · Gastos generales', value: 'G03' },
    { label: 'I01 · Ingresos por ventas', value: 'I01' },
  ];
  readonly formaPagoOptions: SelectOption[] = [
    { label: '01 · Efectivo', value: '01 · Efectivo' },
    { label: '03 · Transferencia electrónica', value: '03 · Transferencia' },
    { label: '04 · Tarjeta de crédito', value: '04 · Tarjeta' },
  ];
  readonly metodoPagoOptions: SelectOption[] = [
    { label: 'PUE · Pago en una sola exhibición', value: 'PUE' },
    { label: 'PPD · Pago en parcialidades o diferido', value: 'PPD' },
  ];

  readonly clients: Cliente[] = [
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

  openDrawer(): void {
    this.drawerVisible.set(true);
  }

  clearSelection(): void {
    this.selectedClients.set([]);
  }

  onDelete(client?: Cliente): void {
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
