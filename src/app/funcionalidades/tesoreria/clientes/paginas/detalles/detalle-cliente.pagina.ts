import { Component, inject, signal, viewChild } from '@angular/core';
import { BreadcrumbServicio } from '@nucleo/servicios/breadcrumb.servicio';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';
import { EncabezadoPaginaComponente } from '@compartido/componentes/encabezado-pagina/encabezado-pagina.componente';
import { IPestanaComponente } from '@compartido/interfaces/pestana-componente.interface';
import { DatosGeneralesClienteComponente } from './componentes/datos-generales-cliente/datos-generales-cliente.componente';
import { InformacionFiscalClienteComponente } from './componentes/informacion-fiscal-cliente/informacion-fiscal-cliente.componente';
import { ConfiguracionCreditoClienteComponente } from './componentes/configuracion-credito-cliente/configuracion-credito-cliente.componente';
import { UnidadesNegocioClienteComponente } from './componentes/unidades-negocio-cliente/unidades-negocio-cliente.componente';
import { DomiciliosClienteComponente } from './componentes/domicilios-cliente/domicilios-cliente.componente';
import { ContactosClienteComponente } from './componentes/contactos-cliente/contactos-cliente.componente';
import { CuentasBancariasClienteComponente } from './componentes/cuentas-bancarias-cliente/cuentas-bancarias-cliente.componente';

@Component({
  selector: 'app-detalle-cliente-pagina',
  imports: [
    EncabezadoPaginaComponente,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    DatosGeneralesClienteComponente,
    InformacionFiscalClienteComponente,
    ConfiguracionCreditoClienteComponente,
    UnidadesNegocioClienteComponente,
    DomiciliosClienteComponente,
    ContactosClienteComponente,
    CuentasBancariasClienteComponente
  ],
  templateUrl: './detalle-cliente.pagina.html',
})
export class DetalleClientePagina {
  private readonly breadcrumb = inject(BreadcrumbServicio);

  readonly datosGenerales = viewChild(DatosGeneralesClienteComponente);
  readonly informacionFiscal = viewChild(InformacionFiscalClienteComponente);
  readonly configuracionCredito = viewChild(ConfiguracionCreditoClienteComponente);
  readonly unidadesNegocio = viewChild(UnidadesNegocioClienteComponente);
  readonly domicilios = viewChild(DomiciliosClienteComponente);
  readonly contactos = viewChild(ContactosClienteComponente);
  readonly cuentasBancarias = viewChild(CuentasBancariasClienteComponente);

  readonly pestanas: IPestanaComponente[] = [
    { valor: '0', titulo: 'Datos generales', descripcion: 'Información principal del cliente.' },
    { valor: '1', titulo: 'Información fiscal', descripcion: 'Datos fiscales y contables del cliente.' },
    { valor: '2', titulo: 'Configuración de crédito', descripcion: 'Condiciones comerciales y de crédito.' },
    { valor: '3', titulo: 'Unidades de negocio', descripcion: 'Unidades de negocio asociadas al cliente.' },
    { valor: '4', titulo: 'Domicilios', descripcion: 'Domicilios registrados del cliente.' },
    { valor: '5', titulo: 'Contactos', descripcion: 'Contactos asociados al cliente.' },
    { valor: '6', titulo: 'Cuentas bancarias', descripcion: 'Cuentas bancarias del cliente.' },
  ];

  readonly pestanaActiva = signal('0');

  constructor() {
    this.breadcrumb.configurar([
      { llave: 'clients', etiqueta: 'Clientes', ruta: '/app/clientes', deshabilitado: false },
      { llave: '1', etiqueta: 'Grupo industrial de caja S.A. de C.V.', ruta: '/app/clientes/1', deshabilitado: true },
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
