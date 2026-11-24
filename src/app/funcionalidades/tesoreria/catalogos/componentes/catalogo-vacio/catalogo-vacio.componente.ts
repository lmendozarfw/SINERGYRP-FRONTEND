import { Component, input } from "@angular/core";
import { PIcon } from "@primeicons/angular";

@Component({
    selector: 'app-catalogo-vacio',
    imports: [PIcon],
    template: `
        <div class="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ds-line bg-ds-canvas px-4 py-12 text-center">
            <svg pIcon="inbox" [size]="28" class="text-ds-muted"></svg>
            <p class="m-0 text-sm font-medium text-ds-ink">Sin registros en {{ titulo() }}</p>
            <p class="m-0 max-w-md text-xs text-ds-muted">{{ descripcion() }}</p>
        </div>
    `
})
export class CatalogoVacioComponente {
    readonly titulo = input.required<string>();
    readonly descripcion = input.required<string>();
}
