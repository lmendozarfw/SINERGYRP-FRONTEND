import { Component } from "@angular/core";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";

@Component({
    selector: 'app-catalogo-formas-pago',
    imports: [CatalogoVacioComponente],
    template: `<app-catalogo-vacio [titulo]="titulo" [descripcion]="descripcion" />`
})
export class CatalogoFormasPagoComponente {
    readonly titulo = 'Formas de pago';
    readonly descripcion = 'Define las condiciones comerciales de cobro y pago, como contado, crédito o parcialidades.';
}
