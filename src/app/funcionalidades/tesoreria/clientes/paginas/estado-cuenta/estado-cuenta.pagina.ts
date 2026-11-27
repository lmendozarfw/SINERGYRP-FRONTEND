import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncabezadoPaginaComponente } from '@compartido/componentes/encabezado-pagina/encabezado-pagina.componente';
import { BreadcrumbServicio } from '@nucleo/servicios/breadcrumb.servicio';
import { IPestanaComponente } from '@compartido/interfaces/pestana-componente.interface';
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from 'primeng/button';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { AplicacionesCobroEstadoCuentaComponente } from './componentes/aplicaciones-cobro/aplicaciones-cobro.componente';
import { CuentasBancariasEstadoCuentaComponente } from './componentes/cuentas-bancarias/cuentas-bancarias.componente';
import { DatosClienteEstadoCuentaComponente } from './componentes/datos-cliente/datos-cliente.componente';
import { DocumentosEstadoCuentaComponente } from './componentes/documentos-cxc/documentos-cxc.componente';
import { ResumenFinancieroEstadoCuentaComponente } from './componentes/resumen-financiero/resumen-financiero.componente';
import { EstadoCuentaServicio } from './servicios/estado-cuenta.servicio';

@Component({
  selector: 'app-estado-cuenta-pagina',
  templateUrl: './estado-cuenta.pagina.html',
  imports: [
    AplicacionesCobroEstadoCuentaComponente,
    ButtonDirective,
    CuentasBancariasEstadoCuentaComponente,
    DatosClienteEstadoCuentaComponente,
    DocumentosEstadoCuentaComponente,
    EncabezadoPaginaComponente,
    PIcon,
    ResumenFinancieroEstadoCuentaComponente,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
  ],
})
export class EstadoCuentaPagina {
  private readonly ruta = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly breadcrumb = inject(BreadcrumbServicio);
  private readonly servicio = inject(EstadoCuentaServicio);

  readonly estadoCuenta = signal(
    this.servicio.obtenerEstadoCuenta(Number(this.ruta.snapshot.paramMap.get('id'))),
  );

  readonly pestanas: IPestanaComponente[] = [
    {
      valor: '0',
      titulo: 'Créditos, posición y cuentas',
      descripcion: 'Posición de la cuenta, línea de crédito y cuentas bancarias.',
    },
    {
      valor: '1',
      titulo: 'Documentos',
      descripcion: 'Facturas, notas de cargo y notas de crédito del cliente.',
    },
    {
      valor: '2',
      titulo: 'Aplicaciones de cobro',
      descripcion: 'Abonos y aplicaciones registradas.',
    },
  ];

  readonly pestanaActiva = signal('0');

  constructor() {
    const cliente = this.estadoCuenta()?.cliente;
    this.breadcrumb.configurar([
      { llave: 'clients', etiqueta: 'Clientes', ruta: '/app/clientes', deshabilitado: false },
      {
        llave: 'cliente',
        etiqueta: cliente?.nombre ?? 'Cliente',
        ruta: cliente ? `/app/clientes/${cliente.id}` : '/app/clientes',
        deshabilitado: false,
      },
      { llave: 'estado-cuenta', etiqueta: 'Estado de cuenta', deshabilitado: true },
    ]);
  }

  cambiarPestana(valor: string | number | undefined): void {
    this.pestanaActiva.set(valor === undefined ? '0' : String(valor));
  }

  volverAlCliente(): void {
    const cliente = this.estadoCuenta()?.cliente;
    if (cliente) {
      this.router.navigate(['/app', 'clientes', cliente.id]);
      return;
    }
    this.router.navigate(['/app', 'clientes']);
  }

  imprimir(): void {
    window.print();
  }
}
