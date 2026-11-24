import { Component, inject } from "@angular/core";
import { EncabezadoPaginaComponente } from "@compartido/componentes/encabezado-pagina/encabezado-pagina.componente";
import { BreadcrumbServicio } from "@nucleo/servicios/breadcrumb.servicio";
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'app-catalogo-pagina',
    templateUrl: './catalogo.pagina.html',
    imports: [EncabezadoPaginaComponente, TabsModule]
})
export class CatalogoPagina {
    private readonly breadcrumbServicio = inject(BreadcrumbServicio);

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
}