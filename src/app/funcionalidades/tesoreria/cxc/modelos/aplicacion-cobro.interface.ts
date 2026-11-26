export type EstadoAplicacionCobro = 'aplicada' | 'revertida';

export interface IAplicacionCobro {
    id: string;
    idOrganizacion: string;
    idDocumentoAbono: string;
    idDocumentoCargo: string;
    fechaAplicacion: Date;
    importeCargo: number;
    importeAbono: number;
    equivalencia: number;
    importeMonedaBase?: number | null;
    numeroParcialidad: number;
    saldoAnterior: number;
    saldoInsoluto: number;
    estado: EstadoAplicacionCobro;
    idReversaAplicacion?: string | null;
    observaciones?: string | null;
    creadoEn: Date;
}
