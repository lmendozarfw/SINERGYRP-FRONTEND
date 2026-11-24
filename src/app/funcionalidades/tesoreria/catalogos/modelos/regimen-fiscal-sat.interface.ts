import { FieldTree } from "@angular/forms/signals";

export interface IRegimenFiscalSat {
    codigo: string;
    descripcion: string;
    aplicaPersonaFisica: boolean;
    aplicaPersonaMoral: boolean;
    activo: boolean;
}

export const REGIMEN_FISCAL_SAT_VACIO: IRegimenFiscalSat = {
    codigo: '',
    descripcion: '',
    aplicaPersonaFisica: false,
    aplicaPersonaMoral: false,
    activo: true
}

export interface IFilaRegimentFiscalSat extends IRegimenFiscalSat {
    id: number;
    formulario: FieldTree<IRegimenFiscalSat>;
}

export interface IFilaVistaRegimenFiscalSat extends IFilaRegimentFiscalSat {
    esNueva: boolean;
}