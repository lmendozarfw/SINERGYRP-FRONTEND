export type TipoArchivoCfdi = 'xml' | 'pdf' | 'acuse_cancelacion';

export interface IArchivoCfdi {
    id: string;
    idDocumentoCxc: string;
    tipoArchivo: TipoArchivoCfdi;
    ubicacion: string;
    nombreArchivo?: string | null;
    hashContenido?: string | null;
    creadoEn: Date;
}
