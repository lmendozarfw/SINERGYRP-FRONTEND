import { Component } from "@angular/core";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";

@Component({
    selector: 'app-catalogo-municipios',
    imports: [CatalogoVacioComponente],
    template: `<app-catalogo-vacio [titulo]="titulo" [descripcion]="descripcion" />`
})
export class CatalogoMunicipiosComponente {
    readonly titulo = 'Municipios';
    readonly descripcion = 'Gestiona los municipios o alcaldías disponibles para cada estado.';
}
