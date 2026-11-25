export interface IEmisorFiscal {
    idOrganizacion: number;
    idUnidadNegocio: number | null;
    idRegimenFiscal: number | null;
    rfc: string;
    razonSocial: string;
    codigoPostalExpedicion: string;
    activo: boolean;
}

