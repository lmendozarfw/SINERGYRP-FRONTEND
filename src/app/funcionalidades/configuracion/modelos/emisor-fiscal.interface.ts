import { FieldTree } from "@angular/forms/signals";

export interface IEmisorFiscal {
    idOrganizacion: number | null;
    idUnidadNegocio: number | null;
    idRegimenFiscal: number | null;
    rfc: string;
    razonSocial: string;
    codigoPostalExpedicion: string;
    activo: boolean;
}

export const EMISOR_FISCAL_VACIO: IEmisorFiscal = {
    idOrganizacion: null,
    idUnidadNegocio: null,
    idRegimenFiscal: null,
    rfc: '',
    razonSocial: '',
    codigoPostalExpedicion: '',
    activo: true
};

export interface IFilaEmisorFiscal extends IEmisorFiscal {
    id: number;
    formulario: FieldTree<IEmisorFiscal>;
}

export interface IFilaVistaEmisorFiscal extends IFilaEmisorFiscal {
    esNueva: boolean;
}