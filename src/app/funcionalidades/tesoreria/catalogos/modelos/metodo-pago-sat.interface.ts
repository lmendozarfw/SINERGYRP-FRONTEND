import { FieldTree } from "@angular/forms/signals";

export interface IMetodoPagoSat {
    codigo: string;
    descripcion: string;
    activo: boolean;
}

export const Metodo_PAGO_SAT_VACIO: IMetodoPagoSat = {
    codigo: '',
    descripcion: '',
    activo: true
}

export interface IFilaMetodoPagoSat extends IMetodoPagoSat {
    id: number;
    formulario: FieldTree<IMetodoPagoSat>;
}

export interface IFilaVistaMetodoPagoSat extends IFilaMetodoPagoSat {
    esNueva: boolean;
}