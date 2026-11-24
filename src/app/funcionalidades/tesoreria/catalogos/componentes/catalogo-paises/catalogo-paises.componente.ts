import { Component } from "@angular/core";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";

@Component({
    selector: 'app-catalogo-paises',
    imports: [CatalogoVacioComponente],
    template: `<app-catalogo-vacio [titulo]="titulo" [descripcion]="descripcion" />`
})
export class CatalogoPaisesComponente {
    readonly titulo = 'Países';
    readonly descripcion = 'Mantén el catálogo de países utilizado en direcciones, proveedores y datos fiscales.';
}
