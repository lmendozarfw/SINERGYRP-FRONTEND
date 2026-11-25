import { FieldTree } from "@angular/forms/signals";

export interface ITipoCambio {
    idMonedaOrigen: number | null;
    idMonedaDestino: number | null;
    fecha: Date | null;
    tipoCambio: number;
    fuente: string;
}

export const TIPO_CAMBIO_VACIO: ITipoCambio = {
    idMonedaDestino: null,
    idMonedaOrigen: null,
    fecha: null,
    tipoCambio: 0,
    fuente: ''
};

export interface IFilaTipoCambio extends ITipoCambio {
    id: number;
    formulario: FieldTree<ITipoCambio>;
}

export interface IFilaVistaTipoCambio extends IFilaTipoCambio {
    esNueva: boolean;
}