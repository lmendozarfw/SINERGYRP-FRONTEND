import { FieldTree } from "@angular/forms/signals";

export interface IUnidadNegocio {
    codigo: string;
    nombre: string;
    activa: boolean;
}

export const UNIDAD_NEGOCIO_VACIA: IUnidadNegocio = {
    codigo: '',
    nombre: '',
    activa: true
};

export interface IUnidadNegocioRegistro extends IUnidadNegocio {
    id: number;
    idOrganizacion: number;
}

export interface IFilaUnidadNegocio extends IUnidadNegocioRegistro {
    formulario: FieldTree<IUnidadNegocio>;
}

export interface IFilaVistaUnidadNegocio extends IFilaUnidadNegocio {
    esNueva: boolean;
}
