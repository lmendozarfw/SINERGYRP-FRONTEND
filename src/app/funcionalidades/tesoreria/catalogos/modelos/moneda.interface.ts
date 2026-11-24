import { FieldTree } from "@angular/forms/signals";

export interface IMoneda {
    codigo: string;
    nombre: string;
    decimales: number | null;
    activa: boolean;
}

export const MONEDA_VACIA: IMoneda = {
    codigo: '',
    nombre: '',
    decimales: null,
    activa: true
};

export interface IFilaMoneda extends IMoneda {
    id: number;
    formulario: FieldTree<IMoneda>;
}

export interface IFilaVistaMoneda extends IFilaMoneda {
    esNueva: boolean;
}
