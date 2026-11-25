import { FieldTree } from "@angular/forms/signals";

export interface IUnidadMedidaSat {
    codigo: string;
    nombre: string;
    descripcion: string;
    fechaInicioVigencia: Date | null;
    fechaFinVigencia: Date | null;
    activo: boolean;
}

export const UNIDAD_NEGOCIO_SAT_VACIO: IUnidadMedidaSat = {
    codigo: '',
    nombre: '',
    descripcion: '',
    fechaFinVigencia: null,
    fechaInicioVigencia: null,
    activo: true
};

export interface IFilaUnidadMedidaSat extends IUnidadMedidaSat {
    id: number;
    formulario: FieldTree<IUnidadMedidaSat>;
}

export interface IFilaVistaUnidadMedidaSat extends IFilaUnidadMedidaSat {
    esNueva: boolean;
}