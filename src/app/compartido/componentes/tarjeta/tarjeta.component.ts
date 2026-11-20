import { Component, input } from "@angular/core";
import { PIcon } from '@primeicons/angular';

@Component({
    selector: 'app-tarjeta',
    template: `
    
    <div>
        <div class="ds-card flex flex-col gap-4">

            <header class="flex items-center gap-3">
                @if (icono()) {
                    <span class="flex w-10 h-10 items-center justify-center bg-ds-primary-soft rounded-sm text-ds-primary">
                        <svg [pIcon]="icono()!" [size]="18"></svg>
                    </span>
                }
                <div class="min-w-0">
                    <h3 class="ds-title-card">{{ titulo() }}</h3>
                    @if(descripcion()) {
                        <p class="ds-subtitle-card text-ds-muted">
                            {{ descripcion() }}
                        </p>
                    }
                </div>
            </header>

            <ng-content></ng-content>

        </div>
    </div>
    
    `,
    styles: [`
        .ds-subtitle-card {
            font-size: 14px;
            line-height: 18px;
            font-weight: 300;
        }
    `],
    imports: [PIcon]
})
export class TarjetaComponent {
    titulo = input<string>();
    descripcion = input<string>();
    icono = input<string>();

}  