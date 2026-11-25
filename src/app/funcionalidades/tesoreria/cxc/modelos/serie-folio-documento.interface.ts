import { FieldTree } from "@angular/forms/signals";

export interface ISerieFolioDocumento {
    id?: number | null;
    idOrganizacion: number | null;
    idUnidadNegocio: number | null;
    tipoDocumento: string;
    serie: string;
    siguienteFolio: number | null;
    activo: boolean;
}

export const SERIE_FOLIO_DOCUMENTO_VACIA: ISerieFolioDocumento = {
    idOrganizacion: null,
    idUnidadNegocio: null,
    tipoDocumento: '',
    serie: '',
    siguienteFolio: 1,
    activo: true
};

export interface IFilaSerieFolioDocumento extends ISerieFolioDocumento {
    id: number;
    formulario: FieldTree<ISerieFolioDocumento>;
}

export interface IFilaVistaSerieFolioDocumento extends IFilaSerieFolioDocumento {
    esNueva: boolean;
}
