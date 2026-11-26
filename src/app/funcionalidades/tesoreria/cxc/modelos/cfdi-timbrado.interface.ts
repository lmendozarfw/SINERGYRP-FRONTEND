export type EstatusSatCfdi = 'vigente' | 'cancelado';

export interface ICfdiTimbrado {
    id: string;
    idDocumentoCxc: string;
    uuid: string;
    fechaTimbrado: Date;
    numeroCertificadoEmisor?: string | null;
    numeroCertificadoSat?: string | null;
    selloCfdi?: string | null;
    selloSat?: string | null;
    cadenaOriginalSat?: string | null;
    rfcProveedorCertificacion?: string | null;
    estatusSat: EstatusSatCfdi;
    fechaCancelacion?: Date | null;
    motivoCancelacion?: string | null;
    uuidSustitucion?: string | null;
}
