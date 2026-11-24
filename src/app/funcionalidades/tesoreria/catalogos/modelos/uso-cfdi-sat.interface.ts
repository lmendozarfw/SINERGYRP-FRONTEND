import { FieldTree } from "@angular/forms/signals";

export interface IUsoCfdiSat {
    codigo: string;
    descripcion: string;
    aplicaPersonaFisica: boolean;
    aplicaPersonaMoral: boolean;
    activo: boolean;
}

export const USO_CFDI_SAT_VACIO: IUsoCfdiSat = {
    codigo: '',
    descripcion: '',
    aplicaPersonaFisica: false,
    aplicaPersonaMoral: false,
    activo: true
}

export interface IFilaUsoCfdiSat extends IUsoCfdiSat {
    id: number;
    formulario: FieldTree<IUsoCfdiSat>;
}

export interface IFilaVistaUsoCfdiSat extends IFilaUsoCfdiSat {
    esNueva: boolean;
}