import { Component, inject } from "@angular/core";
import { EncabezadoPaginaComponente } from "@compartido/componentes/encabezado-pagina/encabezado-pagina.componente";
import { BreadcrumbServicio } from "@nucleo/servicios/breadcrumb.servicio";
import { PIcon } from "@primeicons/angular";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-configuracion-pagina',
    templateUrl: './configuracion.pagina.html',
    imports: [
        EncabezadoPaginaComponente,
        PIcon,
        RouterLink
    ]
})
export class ConfiguracionPagina {
    private readonly breadcrumbServicio = inject(BreadcrumbServicio);

    constructor() {
        this.breadcrumbServicio.configurar([
            {
                etiqueta: 'Configuración',
                llave: 'configuracion',
                ruta: '/app/configuracion',
                deshabilitado: true
            }
        ]);
    }
}
