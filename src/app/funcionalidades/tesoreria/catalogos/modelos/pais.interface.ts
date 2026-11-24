import { FieldTree } from "@angular/forms/signals";

export interface IPais {
    codigoPais: string;
    nombre: string;
    codigoMoneda: string;
}

export const PAIS_VACIO: IPais = {
    codigoPais: '',
    nombre: '',
    codigoMoneda: ''
};

export interface IFilaPais extends IPais {
    id: number;
    formulario: FieldTree<IPais>;
}

export interface IFilaVistaPais extends IFilaPais {
    esNueva: boolean;
}
