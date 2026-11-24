import { FieldTree } from "@angular/forms/signals";

export interface IEstado {
    idPais: number | null;
    codigoEstado: string;
    nombre: string;
}

export const ESTADO_VACIO: IEstado = {
    idPais: null,
    codigoEstado: '',
    nombre: ''
};

export interface IFilaEstado extends IEstado {
    id: number;
    formulario: FieldTree<IEstado>;
}

export interface IFilaVistaEstado extends IFilaEstado {
    esNueva: boolean;
}