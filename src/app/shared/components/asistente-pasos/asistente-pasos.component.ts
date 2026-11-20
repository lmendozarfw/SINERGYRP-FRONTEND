
import {
    Component,
    EventEmitter,
    Input,
    Output,
    model
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { PIcon } from '@primeicons/angular';


export interface PasoAsistente {
    id: number;
    titulo: string;
    bloqueado?: boolean;
    completado?: boolean;
}

@Component({
    selector: 'app-asistente-pasos',
    standalone: true,
    host: { class: 'block w-full' },
    imports: [
        CommonModule,
        StepperModule,
        PIcon
    ],
    templateUrl: './asistente-pasos.component.html',
    styleUrl: './asistente-pasos.component.scss'
})
export class AsistentePasosComponent {

    @Input() pasos: PasoAsistente[] = [];

    @Input() permitirNavegacionLibre = true;

    @Input() validarCambio?: (
        pasoActual: number,
        pasoDestino: number
    ) => boolean;

    // Permite sincronizar el paso activo con el componente padre.
    pasoActivo = model<number>(1);

    @Output() pasoCambiado = new EventEmitter<number>();

    // -----------------------------------------
    // Navegación
    // -----------------------------------------

    irA(id: number): boolean {

        const paso = this.pasos.find(p => p.id === id);

        if (!paso || this.estaBloqueado(paso)) {
            return false;
        }

        if (!this.puedeCambiar(id)) {
            return false;
        }

        this.cambiarPaso(id);

        return true;
    }

    siguiente(): boolean {

        const siguientePaso = this.pasos.find(
            p => p.id > this.pasoActivo()
        );

        if (!siguientePaso) {
            return false;
        }

        return this.irA(siguientePaso.id);
    }

    anterior(): boolean {

        const pasoAnterior = [...this.pasos]
            .reverse()
            .find(p => p.id < this.pasoActivo());

        if (!pasoAnterior) {
            return false;
        }

        return this.irA(pasoAnterior.id);
    }

    // -----------------------------------------
    // Bloqueo de pasos
    // -----------------------------------------

    bloquearPaso(id: number): void {

        this.actualizarPaso(id, {
            bloqueado: true
        });
    }

    desbloquearPaso(id: number): void {

        this.actualizarPaso(id, {
            bloqueado: false
        });
    }

    estaBloqueado(paso: PasoAsistente): boolean {
        return paso.bloqueado === true;
    }

    // -----------------------------------------
    // Estado de los pasos
    // -----------------------------------------

    marcarCompletado(id: number): void {

        this.actualizarPaso(id, {
            completado: true
        });
    }

    desmarcarCompletado(id: number): void {

        this.actualizarPaso(id, {
            completado: false
        });
    }

    // -----------------------------------------
    // Reiniciar
    // -----------------------------------------

    reiniciar(): void {

        this.pasos = this.pasos.map(paso => ({
            ...paso,
            completado: false
        }));

        const primerPaso = this.pasos[0];

        if (primerPaso) {
            this.cambiarPaso(primerPaso.id);
        }
    }

    // -----------------------------------------
    // Métodos internos
    // -----------------------------------------

    private cambiarPaso(id: number): void {

        if (this.pasoActivo() === id) {
            return;
        }

        this.pasoActivo.set(id);
        this.pasoCambiado.emit(id);
    }

    private puedeCambiar(id: number): boolean {

        const actual = this.pasoActivo();

        if (!this.permitirNavegacionLibre && id > actual) {
            return false;
        }

        return this.validarCambio
            ? this.validarCambio(actual, id)
            : true;
    }

    private actualizarPaso(
        id: number,
        cambios: Partial<PasoAsistente>
    ): void {

        this.pasos = this.pasos.map(paso =>
            paso.id === id
                ? { ...paso, ...cambios }
                : paso
        );
    }

    alCambiarValor(id: number | undefined): void {
        if (!id) {
            return;
        }
        if (this.puedeCambiar(id)) {
            this.cambiarPaso(id);
        }
    }


    puedeSeleccionar(paso: PasoAsistente): boolean {

        if (this.estaBloqueado(paso)) {
            return false;
        }

        return this.puedeCambiar(paso.id);
    }

    estaCompletado(paso: PasoAsistente): boolean {

        return paso.completado === true ||
            paso.id < this.pasoActivo();
    }

}
