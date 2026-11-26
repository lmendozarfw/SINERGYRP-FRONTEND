import { IPartidaImpuesto } from "@funcionalidades/tesoreria/modelos/partida-impuesto.interface";

export type ObjetoImpDocumentoCxc = '01' | '02' | '03' | '04';

export interface IPartidaDocumentoCxc {
    id: string;
    idDocumentoCxc: string;
    numeroPartida: number;
    concepto: string;
    cantidad: number;
    precioUnitario?: number | null;
    subtotal: number;
    tipoDescuento?: string | null;
    porcentajeDescuento?: number | null;
    descuento: number;
    objetoImp: ObjetoImpDocumentoCxc;
    impuestosTrasladados: number;
    impuestosRetenidos: number;
    total: number;
    subtotalMonedaBase?: number | null;
    totalMonedaBase?: number | null;
    idProductoServicioSat: string;
    idUnidadMedidaSat: string;
    impuestos?: IPartidaImpuesto[];
}
