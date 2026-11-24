import { FieldTree } from "@angular/forms/signals";

export interface IMunicipio {
    idEstado: number | null;
    codigoMunicipio: string;
    nombre: string;
}

export const MUNICIPIO_VACIO: IMunicipio = {
    idEstado: null,
    codigoMunicipio: '',
    nombre: ''
}

export interface IFilaMunicipio extends IMunicipio {
    id: number;
    formulario: FieldTree<IMunicipio>;
}

export interface IFilaVistaMunicipio extends IFilaMunicipio {
    esNueva: boolean;
}