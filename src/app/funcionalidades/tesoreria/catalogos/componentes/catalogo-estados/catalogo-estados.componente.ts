import { Component } from "@angular/core";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";

@Component({
    selector: 'app-catalogo-estados',
    imports: [CatalogoVacioComponente],
    template: `<app-catalogo-vacio [titulo]="titulo" [descripcion]="descripcion" />`
})
export class CatalogoEstadosComponente {
    readonly titulo = 'Estados';
    readonly descripcion = 'Administra los estados o entidades federativas relacionados a cada país.';
}
