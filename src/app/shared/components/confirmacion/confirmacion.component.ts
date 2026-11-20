
import { Component } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { PIcon } from '@primeicons/angular';

@Component({
    selector: 'app-confirmacion',
    standalone: true,
    imports: [ConfirmDialog, PIcon],
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
        return 'bg-[#130f40]';
        // Aun no me decido si poner varios colores
        switch (tipo) {
            case 'advertencia':
                return 'bg-[#f0932b]';

            case 'peligro':
                return 'bg-[#eb4d4b]';

            case 'informacion':
                return 'bg-[#686de0]';

            default:
                return 'bg-[#130f40]';
        }
    }
}
