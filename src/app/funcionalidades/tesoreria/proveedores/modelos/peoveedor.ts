export interface IProveedor {
    id?: number;
    idOrganizacion?: number;
    codigo: string;
    estado: string;
    fechaAlta: Date;
    nombreRazonSocial: string;
    nombreComercial: string;
    tipoPersona: string;
    rfc: string;
    identificadorFiscalExtranjero: string;
    idRegimentFiscal: string;
    cuentaContable: string;
    diasCredito: number;
    limiteCredito: number;
    idMonedaPredeterminada: number;
    idFormaPagoPredeterminada: number;
    idMetodoPagoPredeterminado: number;
    esPagoContrarecibo: boolean;
    observaciones: string;
    fechaCreacion: Date;
    fechaModificacion: Date;
}