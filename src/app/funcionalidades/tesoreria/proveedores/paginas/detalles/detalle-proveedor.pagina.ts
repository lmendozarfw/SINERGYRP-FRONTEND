import { Component, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncabezadoPaginaComponente } from '@compartido/componentes/encabezado-pagina/encabezado-pagina.componente';
import { IPestanaComponente } from '@compartido/interfaces/pestana-componente.interface';
import { BreadcrumbServicio } from '@nucleo/servicios/breadcrumb.servicio';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { ConfiguracionCreditoProveedorComponente } from './componentes/configuracion-credito-proveedor/configuracion-credito-proveedor.componente';
import { ContactosProveedorComponente } from './componentes/contactos-proveedor/contactos-proveedor.componente';
import { CuentasBancariasProveedorComponente } from './componentes/cuentas-bancarias-proveedor/cuentas-bancarias-proveedor.componente';
import { DatosGeneralesProveedorComponente } from './componentes/datos-generales-proveedor/datos-generales-proveedor.componente';
import { DomiciliosProveedorComponente } from './componentes/domicilios-proveedor/domicilios-proveedor.componente';
import { InformacionFiscalProveedorComponente } from './componentes/informacion-fiscal-proveedor/informacion-fiscal-proveedor.componente';
import { UnidadesNegocioProveedorComponente } from './componentes/unidades-negocio-proveedor/unidades-negocio-proveedor.componente';

@Component({
  selector: 'app-detalle-proveedor-pagina',
  imports: [
    EncabezadoPaginaComponente,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    DatosGeneralesProveedorComponente,
    InformacionFiscalProveedorComponente,
    ConfiguracionCreditoProveedorComponente,
    UnidadesNegocioProveedorComponente,
    DomiciliosProveedorComponente,
    ContactosProveedorComponente,
    CuentasBancariasProveedorComponente,
  ],
  templateUrl: './detalle-proveedor.pagina.html',
})
export class DetalleProveedorPagina {
  private readonly breadcrumb = inject(BreadcrumbServicio);
  private readonly ruta = inject(ActivatedRoute);

  readonly datosGenerales = viewChild(DatosGeneralesProveedorComponente);
  readonly informacionFiscal = viewChild(InformacionFiscalProveedorComponente);
  readonly configuracionCredito = viewChild(ConfiguracionCreditoProveedorComponente);
  readonly unidadesNegocio = viewChild(UnidadesNegocioProveedorComponente);
  readonly domicilios = viewChild(DomiciliosProveedorComponente);
  readonly contactos = viewChild(ContactosProveedorComponente);
  readonly cuentasBancarias = viewChild(CuentasBancariasProveedorComponente);

  readonly idProveedor = this.ruta.snapshot.paramMap.get('id') ?? '';
  readonly titulo = `Proveedor ${this.idProveedor}`;

  readonly pestanas: IPestanaComponente[] = [
    { valor: '0', titulo: 'Datos generales', descripcion: 'Información principal del proveedor.' },
    { valor: '1', titulo: 'Información fiscal', descripcion: 'Datos fiscales y contables del proveedor.' },
    { valor: '2', titulo: 'Configuración de crédito', descripcion: 'Condiciones comerciales y de crédito.' },
    { valor: '3', titulo: 'Unidades de negocio', descripcion: 'Unidades de negocio asociadas al proveedor.' },
    { valor: '4', titulo: 'Domicilios', descripcion: 'Domicilios registrados del proveedor.' },
    { valor: '5', titulo: 'Contactos', descripcion: 'Contactos asociados al proveedor.' },
    { valor: '6', titulo: 'Cuentas bancarias', descripcion: 'Cuentas bancarias del proveedor.' },
  ];

  readonly pestanaActiva = signal('0');

  constructor() {
    this.breadcrumb.configurar([
      { llave: 'proveedores', etiqueta: 'Proveedores', ruta: '/app/proveedores', deshabilitado: false },
      { llave: 'detalle-proveedor', etiqueta: this.titulo, ruta: `/app/proveedores/${this.idProveedor}`, deshabilitado: true },
    ]);
  }

  cambiarPestana(valor: string | number | undefined): void {
    this.pestanaActiva.set(valor === undefined ? '0' : String(valor));
  }

  tieneInformacionPendiente(valor: string): boolean {
    switch (valor) {
      case '0': return this.datosGenerales()?.tieneInformacionPendiente() ?? false;
      case '1': return this.informacionFiscal()?.tieneInformacionPendiente() ?? false;
      case '2': return this.configuracionCredito()?.tieneInformacionPendiente() ?? false;
      case '3': return this.unidadesNegocio()?.tieneInformacionPendiente() ?? false;
      case '4': return this.domicilios()?.tieneInformacionPendiente() ?? false;
      case '5': return this.contactos()?.tieneInformacionPendiente() ?? false;
      case '6': return this.cuentasBancarias()?.tieneInformacionPendiente() ?? false;
      default: return false;
    }
  }
}
