import { EstadoDocumentoCxcEnum } from "../enumerables/estado-documento-cxc.enum";
import { TipoDocumentoCxcEnum } from "../enumerables/tipo-documento-cxc.enum";
import { IPartidaDocumentoCxc } from "./partida-documento-cxc.interface";

export interface IDocumentoCxc {
    id: string;
    idOrganizacion: string;
    idEmisorFiscal?: string | null;
    idCliente: string;
    idUnidadNegocio: string;
    idConceptoMovimiento: string;

    // Identificación del documento
    tipoDocumento: TipoDocumentoCxcEnum;
    serie: string;
    folio: string;

    // Fechas
    fechaDocumento: Date;
    fechaVencimiento?: Date | null;

    // Moneda
    idMoneda: string;
    tipoCambio: number;

    // Importes en moneda del documento
    subtotal: number;
    descuento: number;
    impuestosTrasladados: number;
    impuestosRetenidos: number;
    total: number;

    // Importes en moneda base
    totalMonedaBase?: number | null;

    partidas?: IPartidaDocumentoCxc[];

    // Datos fiscales para emisión del CFDI
    idFormaPagoSat?: string | null;
    idMetodoPagoSat?: string | null;
    idUsoCfdiSat?: string | null;
    exportacion?: string | null;
    lugarExpedicion?: string | null;

    // Procedencia
    origen?: string | null;

    // Estado del documento
    estado: EstadoDocumentoCxcEnum;

    observaciones?: string | null;

    // Auditoria
    idUsuarioCreacion?: string | null;
    creadoEn: Date;
    actualizadoEn?: Date | null;
}

export interface IDocumentoCxcListado extends IDocumentoCxc {
    cliente: string;
    moneda: string;
}
