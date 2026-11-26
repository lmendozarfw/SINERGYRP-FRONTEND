export interface IPartidaImpuesto {
    id: string;
    idPartidaDocumentoCxc?: string | null;
    idPartidaDocumentoCxp?: string | null;
    impuestoSat: string;
    tipoFactor: string;
    tasaOCuota?: number | null;
    esRetencion: boolean;
    base: number;
    importe?: number | null;
}
