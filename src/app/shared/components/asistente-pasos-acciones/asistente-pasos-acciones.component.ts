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

    @Input() puedeRegresar = false;

    @Input() puedeContinuar = true;

    @Input() esUltimoPaso = false;

    @Input() guardando = false;

    @Output() regresar = new EventEmitter<void>();

    @Output() continuar = new EventEmitter<void>();

    @Output() guardarBorrador = new EventEmitter<void>();
}
