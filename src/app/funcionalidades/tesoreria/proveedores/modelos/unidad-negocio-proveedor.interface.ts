import { FieldTree } from "@angular/forms/signals";

export interface IUnidadNegocioProveedor {
    idProveedor: number | null;
    idUnidadNegocio: number | null;
    esPrincipal: boolean;
    fechaInicio: Date | null;
    fechaFin: Date | null;
}

export const PROVEEDOR_UNIDAD_NEGOCIO_VACIO: IUnidadNegocioProveedor = {
    idProveedor: null,
    idUnidadNegocio: null,
    esPrincipal: false,
    fechaFin: null,
    fechaInicio: null
};

export interface IFilaUnidadNegocioProveedor extends IUnidadNegocioProveedor {
    id: number;
    formulario: FieldTree<IUnidadNegocioProveedor>;
}

export interface IFilaVistaUnidadNegocioProveedor extends IFilaUnidadNegocioProveedor {
    esNueva: boolean;
}
