import { FieldTree } from "@angular/forms/signals";

export interface ITipoIva {
    codigo: string;
    nombre: string;
    tasa: number;
    activo: boolean;
}

export const TIPO_IVA_VACIO: ITipoIva = {
    codigo: '',
    nombre: '',
    tasa: 0,
    activo: true
};

export interface IFilaTipoIva extends ITipoIva {
    id: number;
    formulario: FieldTree<ITipoIva>;
}

export interface IFilaVista extends IFilaTipoIva {
    esNueva: boolean;
}