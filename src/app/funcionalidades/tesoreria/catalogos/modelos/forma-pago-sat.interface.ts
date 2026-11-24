import { FieldTree } from "@angular/forms/signals";

export interface IFormaPagoSat {
    codigo: string;
    descripcion: string;
    activo: boolean;
}

export const FORMA_PAGO_SAT_VACIO: IFormaPagoSat = {
    codigo: '',
    descripcion: '',
    activo: true
}

export interface IFilaFormaPagoSat extends IFormaPagoSat {
    id: number;
    formulario: FieldTree<IFormaPagoSat>;
}

export interface IFilaVistaFormaPagoSat extends IFilaFormaPagoSat {
    esNueva: boolean;
}