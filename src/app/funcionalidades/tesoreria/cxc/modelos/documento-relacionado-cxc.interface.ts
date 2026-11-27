export interface IDocumentoRelacionadoCxc {
    id: string;
    idDocumentoOrigen: string;
    idDocumentoRelacionado: string;
    tipoRelacion: string;
    importeRelacionado?: number | null;
    observaciones?: string | null;
    creadoEn: Date;
}
