import { Component } from "@angular/core";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";

@Component({
    selector: 'app-catalogo-regimenes-fiscales',
    imports: [CatalogoVacioComponente],
    template: `<app-catalogo-vacio [titulo]="titulo" [descripcion]="descripcion" />`
})
export class CatalogoRegimenesFiscalesComponente {
    readonly titulo = 'Regímenes fiscales del SAT';
    readonly descripcion = 'Consulta y mantén los regímenes fiscales utilizados en la facturación electrónica.';
}
