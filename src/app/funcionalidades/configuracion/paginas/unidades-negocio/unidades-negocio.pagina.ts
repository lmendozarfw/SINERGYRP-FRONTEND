import { Component, inject } from "@angular/core";
import { EncabezadoPaginaComponente } from "@compartido/componentes/encabezado-pagina/encabezado-pagina.componente";
import { CatalogoUnidadesNegocioComponente } from "@funcionalidades/configuracion/componentes/catalogo-unidades-negocio/catalogo-unidades-negocio.componente";
import { BreadcrumbServicio } from "@nucleo/servicios/breadcrumb.servicio";

@Component({
    selector: 'app-unidades-negocio-pagina',
    templateUrl: './unidades-negocio.pagina.html',
    imports: [
        CatalogoUnidadesNegocioComponente,
        EncabezadoPaginaComponente
    ]
})
export class UnidadesNegocioPagina {
    private readonly breadcrumbServicio = inject(BreadcrumbServicio);

    constructor() {
        this.breadcrumbServicio.configurar([
            {
                etiqueta: 'Configuración',
                llave: 'configuracion',
                ruta: '/app/configuracion'
            },
            {
                etiqueta: 'Unidades de negocio',
                llave: 'unidades-negocio',
                deshabilitado: true
            }
        ]);
    }
}
