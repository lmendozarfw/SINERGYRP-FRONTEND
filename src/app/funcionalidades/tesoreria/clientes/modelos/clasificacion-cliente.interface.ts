import { FieldTree } from "@angular/forms/signals";

export interface IClasificacionCliente {
    idOrganizacion?: number | null;
    codigo: string;
    descripcion: string;
    activo: boolean;
}

export const CLASIFICACION_CLIENTE_VACIO: IClasificacionCliente = {
    codigo: '',
    descripcion: '',
    activo: true
};

export interface IFilaClasificacionCliente extends IClasificacionCliente {
    id: number;
    formulario: FieldTree<IClasificacionCliente>;
}

export interface IFilaVistaClasificacionCliente extends IFilaClasificacionCliente {
    esNueva: boolean;
}