
import { Component } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { PIcon } from '@primeicons/angular';

@Component({
    selector: 'app-confirmacion',
    standalone: true,
    imports: [ButtonDirective, ConfirmDialog, PIcon],
    templateUrl: './confirmacion.component.html',
    styleUrl: './confirmacion.component.scss',
})
export class ConfirmacionComponent {

    obtenerIcono(tipo?: string): string {
        switch (tipo) {
            case 'advertencia':
                return 'exclamation-triangle';

            case 'peligro':
                return 'trash';

            case 'informacion':
                return 'eye';

            default:
                return 'question';
        }
    }

    obtenerClaseIcono(tipo: string): string {
        return 'bg-ds-navy';
        // Aun no me decido si poner varios colores
        switch (tipo) {
            case 'advertencia':
                return 'bg-ds-warning';

            case 'peligro':
                return 'bg-ds-danger';

            case 'informacion':
                return 'bg-ds-primary';

            default:
                return 'bg-ds-navy';
        }
    }
}
