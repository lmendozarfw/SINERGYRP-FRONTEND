import { Component, computed, input } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";
import { PIcon } from '@primeicons/angular';
@Component({
    selector: 'app-mensaje-ayuda-error',
    template: `
        @if (errorVisible()) {
            <span class="ds-field-error mt-1">
                <svg pIcon="exclamation-triangle" [size]="14"></svg>
                {{ mensajeErrorCampo() }}
            </span>    
        } @else if (mensajeAyuda()) {
            <span class="ds-field-help mt-1">{{ mensajeAyuda() }}</span>
        }
    `,
    styles: [],
    imports: [PIcon]
})
export class MensajeAyudaErrorComponente {
    readonly campo = input<FieldTree<unknown>>();
    condicion = input<boolean>(false);
    mensajeAyuda = input<string>();
    mensajeError = input<string>();

    readonly errorVisible = computed(() => {
        const estado = this.campo()?.();
        return (estado?.touched() || estado?.dirty()) && estado?.invalid();
    });
    readonly mensajeErrorCampo = computed(() => {
        const primerError = this.campo()?.().errors()[0]?.message ?? 'Campo inválido.';
        return primerError;
    }); 
    constructor() {
        
    }
}