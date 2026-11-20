
import { Component } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
    selector: 'app-confirmacion',
    standalone: true,
    imports: [ConfirmDialog],
    templateUrl: './confirmacion.component.html',
    styleUrl: './confirmacion.component.scss'
})
export class ConfirmacionComponent {

    obtenerIcono(tipo: string): string {
        switch (tipo) {
            case 'advertencia':
                return 'pi-exclamation-triangle';

            case 'peligro':
                return 'pi-trash';

            case 'informacion':
                return 'pi-info';

            default:
                return 'pi-question';
        }
    }

    obtenerClaseIcono(tipo: string): string {
        switch (tipo) {
            case 'advertencia':
                return 'icono-advertencia';

            case 'peligro':
                return 'icono-peligro';

            case 'informacion':
                return 'icono-informacion';

            default:
                return 'icono-pregunta';
        }
    }
}
