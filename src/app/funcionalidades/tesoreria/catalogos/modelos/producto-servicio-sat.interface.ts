import { FieldTree } from "@angular/forms/signals";

export interface IProductoServicioSat {
    codigo: string;
    nombre: string;
    descripcion: string;
    fechaInicioVigencia: Date | null;
    fechaFinVigencia: Date | null;
    activo: boolean;
}

export const PRODUCTO_SERVICIO_SAT_VACIO: IProductoServicioSat = {
    codigo: '',
    nombre: '',
    descripcion: '',
    fechaInicioVigencia: null,
    fechaFinVigencia: null,
    activo: true
}

export interface IFilaProductoServicioSat extends IProductoServicioSat {
    id: number;
    formulario: FieldTree<IProductoServicioSat>;
}

export interface IFilaVistaProductoServicioSat extends IFilaProductoServicioSat {
    esNueva: boolean;
}