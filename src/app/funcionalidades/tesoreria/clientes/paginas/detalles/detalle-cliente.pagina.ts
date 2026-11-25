import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
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
import { ICliente } from '../../modelos/cliente';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';
import { CatalogoMonedasComponente } from '@funcionalidades/tesoreria/catalogos/componentes/catalogo-monedas/catalogo-monedas.componente';
import { CatalogoMetodosPagoComponente } from '@funcionalidades/tesoreria/catalogos/componentes/catalogo-metodos-pago/catalogo-metodos-pago.componente';
import { IPestanaComponente } from '@compartido/interfaces/pestana-componente.interface';

@Component({
  selector: 'app-detalle-cliente-pagina',
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
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    CatalogoMonedasComponente,
    CatalogoMetodosPagoComponente
  ],
  templateUrl: './detalle-cliente.pagina.html',
})
export class DetalleClientePagina {
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

  readonly pestanas: IPestanaComponente[] = [
    { valor: '0', titulo: 'Datos generales', descripcion: 'Administra las divisas disponibles para operaciones de tesorería, su número de decimales y su vigencia.' },
    { valor: '1', titulo: 'Información fiscal', descripcion: 'Configura los medios con los que se realizan cobros y pagos: transferencia, tarjeta, efectivo y otros.' },
    { valor: '2', titulo: 'Configuración de crédito', descripcion: 'Define las condiciones comerciales de cobro y pago, como contado, crédito o parcialidades.' },
    { valor: '3', titulo: 'Unidades de negocio', descripcion: 'Mantén el catálogo de países utilizado en direcciones, proveedores y datos fiscales.' },
    { valor: '4', titulo: 'Domicilios', descripcion: 'Administra los estados o entidades federativas relacionados a cada país.' },
    { valor: '5', titulo: 'Contactos', descripcion: 'Gestiona los municipios o alcaldías disponibles para cada estado.' },
    { valor: '6', titulo: 'Cuentas bancarias', descripcion: 'Consulta y mantén los regímenes fiscales utilizados en la facturación electrónica.' },
  ];

  readonly pestanaActiva = signal('0');
  readonly pestanasConInformacionPendiente = computed(() => {
    const pestanas = this.pestanas;
  });
  constructor() {
    this.breadcrumb.configurar([
      {
        llave: 'clients',
        etiqueta: 'Clientes',
        ruta: '/app/clientes',
        deshabilitado: false,
      },
      {
        llave: '1',
        etiqueta: 'Grupo industrial de caja S.A. de C.V.',
        ruta: '/app/clientes/1',
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

  cambiarPestana(valor: string | number | undefined): void {
    this.pestanaActiva.set(valor === undefined ? '0' : String(valor));
  }
}
