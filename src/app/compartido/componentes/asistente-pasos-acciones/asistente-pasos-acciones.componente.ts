import { Component, computed, input, output } from '@angular/core';

import { ButtonDirective } from 'primeng/button';
import { PIcon } from '@primeicons/angular';

@Component({
    selector: 'app-asistente-pasos-acciones',
    standalone: true,
    imports: [ButtonDirective, PIcon],
    templateUrl: './asistente-pasos-acciones.componente.html',
    styleUrl: './asistente-pasos-acciones.componente.scss'
})
export class AsistentePasosAccionesComponente {
    pasoActual = input(1);
    totalPasos = input(5);
    siguientePaso = input('');
    puedeRegresar = input(false);
    puedeContinuar = input(true);
    esUltimoPaso = input(false);
    guardando = input(false);

    regresar = output<void>();
    continuar = output<void>();
    guardarBorrador = output<void>();

    progreso = computed(() => {
        const totalPasos = this.totalPasos();
        if (totalPasos <= 0) {
            return 0;
        }

        return Math.min(100, Math.max(0, (this.pasoActual() / totalPasos) * 100));
    });
}
