import { FieldTree } from "@angular/forms/signals";

export interface ITipoRelacionCfdiSat {
    codigo: string;
    descripcion: string;
    activo: boolean;
}

export const TIPO_RELACION_CFDI_SAT_VACIO: ITipoRelacionCfdiSat = {
    codigo: '',
    descripcion: '',
    activo: true
};

export interface IFilaTipoRelacionCfdiSat extends ITipoRelacionCfdiSat {
    id: number;
    formulario: FieldTree<ITipoRelacionCfdiSat>;
}

export interface IFilaVistaTipoRelacionCfdiSat extends IFilaTipoRelacionCfdiSat {
    esNueva: boolean;
}