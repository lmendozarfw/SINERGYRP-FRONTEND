import { Component, inject } from "@angular/core";
import { EncabezadoPaginaComponente } from "@compartido/componentes/encabezado-pagina/encabezado-pagina.componente";
import { BreadcrumbServicio } from "@nucleo/servicios/breadcrumb.servicio";
import { CatalogoEmisoresFiscalesComponente } from "@funcionalidades/configuracion/componentes/catalogo-emisores-fiscales/catalogo-emisores-fiscales.componente";

@Component({
    selector: 'app-emisores-fiscales-pagina',
    templateUrl: './emisores-fiscales.pagina.html',
    imports: [
    EncabezadoPaginaComponente,
    CatalogoEmisoresFiscalesComponente
]
})
export class EmisoresFiscalesPagina {
    private readonly breadcrumbServicio = inject(BreadcrumbServicio);

    constructor() {
        this.breadcrumbServicio.configurar([
            {
                etiqueta: 'Configuración',
                llave: 'configuracion',
                ruta: '/app/configuracion'
            },
            {
                etiqueta: 'Emisores fiscales',
                llave: 'emisores-fiscales',
                deshabilitado: true
            }
        ]);
    }
}
