import { Component, input } from "@angular/core";
import { PIcon } from '@primeicons/angular';
@Component({
    selector: 'app-mensaje-ayuda-error',
    template: `
        @if (condicion()) {
            <span class="ds-field-error">
                <svg pIcon="exclamation-triangle" [size]="14"></svg>
                {{ mensajeError() }}
            </span>    
        } @else if (mensajeAyuda()) {
            <span class="ds-field-help">{{ mensajeAyuda() }}</span>
        }
    `,
    styles: [],
    imports: [PIcon]
})
export class MensajeAyudaErrorComponent {
    condicion = input<boolean>();
    mensajeAyuda = input<string>();
    mensajeError = input<string>();
}