import { Component, computed, inject, signal } from "@angular/core";
import { EncabezadoPaginaComponente } from "@compartido/componentes/encabezado-pagina/encabezado-pagina.componente";
import { BreadcrumbServicio } from "@nucleo/servicios/breadcrumb.servicio";
import { TabsModule } from 'primeng/tabs';
import { IPestanaComponente } from "@compartido/interfaces/pestana-componente.interface";
import { ConfiguracionConceptosCxcComponente } from "./componentes/configuracion-conceptos-cxc/configuracion-conceptos-cxc.componente";
import { ConfiguracionCuentasBancariasCxcComponente } from "./componentes/configuracion-cuentas-bancarias-cxc/configuracion-cuentas-bancarias-cxc.componente";
import { ConfiguracionGeneralCxcComponente } from "./componentes/configuracion-generales-cxc/configuracion-generales-cxc.componente";

@Component({
    selector: 'app-configuracion-cxc-pagina',
    templateUrl: './configuracion-cxc.pagina.html',
    imports: [
        ConfiguracionConceptosCxcComponente,
        ConfiguracionCuentasBancariasCxcComponente,
        ConfiguracionGeneralCxcComponente,
        EncabezadoPaginaComponente,
        TabsModule
    ]
})
export class ConfiguracionCxcPagina {
    private readonly breadcrumbServicio = inject(BreadcrumbServicio);

    readonly catalogos: IPestanaComponente[] = [
        { valor: '0', titulo: 'Configuración general', descripcion: 'Define la moneda base, la tolerancia de vencimientos y las reglas de cobro de la organización.' },
        { valor: '1', titulo: 'Conceptos de movimientos', descripcion: 'Administra los cargos y abonos, su cuenta contable y las reglas de timbrado de cada documento.' },
        { valor: '2', titulo: 'Cuentas bancarias', descripcion: 'Administra las cuentas bancarias de la organización para recibir los cobros.' },
    ];

    readonly pestanaActiva = signal('0');
    readonly catalogoActual = computed(() => this.catalogos.find(catalogo => catalogo.valor === this.pestanaActiva()) ?? this.catalogos[0]);

    constructor() {
        this.breadcrumbServicio.configurar([
            {
                etiqueta: 'Tesoreria',
                llave: 'tesoreria',
                deshabilitado: true
            },
            {
                etiqueta: 'Cuentas por cobrar',
                llave: 'cuentas-por-cobrar',
                deshabilitado: true
            },
            {
                etiqueta: 'Configuración',
                llave: 'catalogos',
                deshabilitado: true
            }
        ]);
    }

    cambiarPestana(valor: string | number | undefined): void {
        this.pestanaActiva.set(valor === undefined ? '0' : String(valor));
    }
}
