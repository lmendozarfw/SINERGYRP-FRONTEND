import { Component, computed, inject, signal } from "@angular/core";
import { EncabezadoPaginaComponente } from "@compartido/componentes/encabezado-pagina/encabezado-pagina.componente";
import { BreadcrumbServicio } from "@nucleo/servicios/breadcrumb.servicio";
import { TabsModule } from 'primeng/tabs';
import { CatalogoMonedasComponente } from "../componentes/catalogo-monedas/catalogo-monedas.componente";
import { CatalogoMetodosPagoComponente } from "../componentes/catalogo-metodos-pago/catalogo-metodos-pago.componente";
import { CatalogoFormasPagoComponente } from "../componentes/catalogo-formas-pago/catalogo-formas-pago.componente";
import { CatalogoPaisesComponente } from "../componentes/catalogo-paises/catalogo-paises.componente";
import { CatalogoEstadosComponente } from "../componentes/catalogo-estados/catalogo-estados.componente";
import { CatalogoMunicipiosComponente } from "../componentes/catalogo-municipios/catalogo-municipios.componente";
import { CatalogoRegimenesFiscalesComponente } from "../componentes/catalogo-regimenes-fiscales/catalogo-regimenes-fiscales.componente";

interface Catalogo {
    valor: string;
    titulo: string;
    descripcion: string;
}

@Component({
    selector: 'app-catalogo-pagina',
    templateUrl: './catalogo.pagina.html',
    imports: [
        EncabezadoPaginaComponente,
        TabsModule,
        CatalogoMonedasComponente,
        CatalogoMetodosPagoComponente,
        CatalogoFormasPagoComponente,
        CatalogoPaisesComponente,
        CatalogoEstadosComponente,
        CatalogoMunicipiosComponente,
        CatalogoRegimenesFiscalesComponente
    ]
})
export class CatalogoPagina {
    private readonly breadcrumbServicio = inject(BreadcrumbServicio);

    readonly catalogos: Catalogo[] = [
        { valor: '0', titulo: 'Monedas', descripcion: 'Administra las divisas disponibles para operaciones de tesorería, su número de decimales y su vigencia.' },
        { valor: '1', titulo: 'Métodos de pago', descripcion: 'Configura los medios con los que se realizan cobros y pagos: transferencia, tarjeta, efectivo y otros.' },
        { valor: '2', titulo: 'Formas de pago', descripcion: 'Define las condiciones comerciales de cobro y pago, como contado, crédito o parcialidades.' },
        { valor: '3', titulo: 'Países', descripcion: 'Mantén el catálogo de países utilizado en direcciones, proveedores y datos fiscales.' },
        { valor: '4', titulo: 'Estados', descripcion: 'Administra los estados o entidades federativas relacionados a cada país.' },
        { valor: '5', titulo: 'Municipios', descripcion: 'Gestiona los municipios o alcaldías disponibles para cada estado.' },
        { valor: '6', titulo: 'Regímenes fiscales del SAT', descripcion: 'Consulta y mantén los regímenes fiscales utilizados en la facturación electrónica.' },
    ];

    readonly pestanaActiva = signal('0');
    readonly catalogoActual = computed(() => this.catalogos.find(catalogo => catalogo.valor === this.pestanaActiva()) ?? this.catalogos[0]);

    constructor() {
        this.breadcrumbServicio.configurar([
            {
                etiqueta: 'Tesoreria',
                llave: 'tesoreria',
            },
            {
                etiqueta: 'Catálogos',
                llave: 'catalogos',
                deshabilitado: true
            }
        ]);
    }

    cambiarPestana(valor: string | number | undefined): void {
        this.pestanaActiva.set(valor === undefined ? '0' : String(valor));
    }
}
