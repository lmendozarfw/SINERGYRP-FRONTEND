import { FieldTree } from "@angular/forms/signals";

export interface IUnidadNegocioCliente {
    idCliente: number | null;
    idUnidadNegocio: number | null;
    esPrincipal: boolean;
    fechaInicio: Date | null;
    fechaFin: Date | null;
}

export const CLIENTE_UNIDAD_NEGOCIO_VACIO: IUnidadNegocioCliente = {
    idCliente: null,
    idUnidadNegocio: null,
    esPrincipal: false,
    fechaFin: null,
    fechaInicio: null
};

export interface IFilaUnidadNegocioCliente extends IUnidadNegocioCliente {
    id: number;
    formulario: FieldTree<IUnidadNegocioCliente>;
}

export interface IFilaVistaUnidadNegocioCliente extends IFilaUnidadNegocioCliente {
    esNueva: boolean;
}