
import { Injectable, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

export type TipoConfirmacion =
    | 'pregunta'
    | 'advertencia'
    | 'peligro'
    | 'informacion';

export interface OpcionesConfirmacion {
    titulo: string;
    mensaje: string;
    tipo?: TipoConfirmacion;
    textoAceptar?: string;
    textoCancelar?: string;
    alConfirmar: () => void;
    alCancelar?: () => void;
}

@Injectable({
    providedIn: 'root'
})
export class DialogoConfirmacionService {

    private readonly confirmationService = inject(ConfirmationService);

    mostrar(opciones: OpcionesConfirmacion): void {
        const data: any = {
            tipo: opciones.tipo ?? 'pregunta'
        };
        this.confirmationService.confirm({
            key: 'confirmacion-global',

            header: opciones.titulo,
            message: opciones.mensaje,

            acceptLabel: opciones.textoAceptar ?? 'Aceptar',
            rejectLabel: opciones.textoCancelar ?? 'Cancelar',

            acceptButtonProps: data,
            
            accept: opciones.alConfirmar,
            reject: opciones.alCancelar,

            closable: false,
            closeOnEscape: true,
            dismissableMask: false,
            defaultFocus: 'reject'
        });
    }
}
