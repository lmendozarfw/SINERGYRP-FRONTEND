import {
    Component,
    input,
    model,
    output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { PIcon } from '@primeicons/angular';

export interface IPasoAsistente {
    id: number;
    titulo: string;
    bloqueado?: boolean;
    completado?: boolean;
}

@Component({
    selector: 'app-asistente-pasos',
    standalone: true,
    imports: [
        CommonModule,
        StepperModule,
        PIcon
    ],
    templateUrl: './asistente-pasos.componente.html',
    styleUrl: './asistente-pasos.componente.scss'
})
export class AsistentePasosComponente {
    pasos = model<IPasoAsistente[]>([]);
    permitirNavegacionLibre = input(false);
    validarCambio = input<(pasoActual: number, pasoDestino: number) => boolean>();

    pasoActivo = model<number>(1);
    pasoCambiado = output<number>();

    irA(id: number): boolean {
        if (!this.puedeIrA(id)) {
            return false;
        }
        this.cambiarPaso(id);
        return true;
    }

    siguiente(): boolean {
        const indice = this.indiceDe(this.pasoActivo());
        if (indice < 0) {
            return false;
        }
        const paso = this.pasos()[indice + 1];
        return paso ? this.irA(paso.id) : false;
    }

    anterior(): boolean {
        const indice = this.indiceDe(this.pasoActivo());
        if (indice <= 0) {
            return false;
        }
        const paso = this.pasos()[indice - 1];
        return paso ? this.irA(paso.id) : false;
    }

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

    estaBloqueado(paso: IPasoAsistente): boolean {
        return paso.bloqueado === true;
    }

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

    reiniciar(): void {
        this.pasos.update(pasos => pasos.map(paso => ({ ...paso, completado: false })));
        const primerPaso = this.pasos()[0];
        if (primerPaso) {
            this.cambiarPaso(primerPaso.id);
        }
    }

    alCambiarValor(id: number | undefined): void {
        if (id == null) {
            return;
        }
        if (this.puedeIrA(id)) {
            this.cambiarPaso(id);
        }
    }

    puedeSeleccionar(paso: IPasoAsistente): boolean {
        return this.puedeIrA(paso.id);
    }

    estaCompletado(paso: IPasoAsistente): boolean {
        if (paso.completado === true) {
            return true;
        }
        const indice = this.indiceDe(paso.id);
        const indiceActivo = this.indiceDe(this.pasoActivo());
        return indice !== -1 && indiceActivo !== -1 && indice < indiceActivo;
    }

    private cambiarPaso(id: number): void {
        if (this.pasoActivo() === id) {
            return;
        }
        this.pasoActivo.set(id);
        this.pasoCambiado.emit(id);
    }

    private puedeIrA(id: number): boolean {
        const paso = this.pasos().find(paso => paso.id === id);
        if (!paso || this.estaBloqueado(paso)) {
            return false;
        }

        const actual = this.pasoActivo();
        const validar = this.validarCambio();
        if (validar && !validar(actual, id)) {
            return false;
        }

        if (this.permitirNavegacionLibre()) {
            return true;
        }

        return this.indiceDe(id) <= this.indiceDe(actual) + 1;
    }

    private indiceDe(id: number): number {
        return this.pasos().findIndex(paso => paso.id === id);
    }

    private actualizarPaso(id: number, cambios: Partial<IPasoAsistente>): void {
        this.pasos.update(pasos => pasos.map(paso =>
            paso.id === id
                ? { ...paso, ...cambios }
                : paso
        ));
    }
}
