import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonDirective } from 'primeng/button';
import { ArrowLeft, ArrowRight, Save } from '@primeicons/angular';

@Component({
    selector: 'app-asistente-pasos-acciones',
    standalone: true,
    imports: [ButtonDirective, ArrowLeft, ArrowRight, Save],
    templateUrl: './asistente-pasos-acciones.component.html',
    styleUrl: './asistente-pasos-acciones.component.scss'
})
export class AsistentePasosAccionesComponent {

    @Input() pasoActual = 1;

    @Input() totalPasos = 5;

    @Input() siguientePaso = '';

    @Input() puedeRegresar = false;

    @Input() puedeContinuar = true;

    @Input() esUltimoPaso = false;

    @Input() guardando = false;

    @Output() regresar = new EventEmitter<void>();

    @Output() continuar = new EventEmitter<void>();

    @Output() guardarBorrador = new EventEmitter<void>();

    get progreso(): number {
        if (this.totalPasos <= 0) {
            return 0;
        }

        return Math.min(100, Math.max(0, (this.pasoActual / this.totalPasos) * 100));
    }
}
