import { Component } from "@angular/core";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";

@Component({
    selector: 'app-catalogo-metodos-pago',
    imports: [CatalogoVacioComponente],
    template: `<app-catalogo-vacio [titulo]="titulo" [descripcion]="descripcion" />`
})
export class CatalogoMetodosPagoComponente {
    readonly titulo = 'Métodos de pago';
    readonly descripcion = 'Configura los medios con los que se realizan cobros y pagos: transferencia, tarjeta, efectivo y otros.';
}
