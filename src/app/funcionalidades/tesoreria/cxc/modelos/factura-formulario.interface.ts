import { IPartidaImpuesto } from "@funcionalidades/tesoreria/modelos/partida-impuesto.interface";
import { IPartidaDocumentoCxc } from "./partida-documento-cxc.interface";

export type MetodoPagoFactura = 'PUE' | 'PPD';

export interface IPartidaFacturaFormulario extends IPartidaDocumentoCxc {
    impuestos: IPartidaImpuesto[];
}

export interface IFacturaFormulario {
    idCliente: string;
    idMoneda: string;
    moneda: string;
    tipoCambio: number;
    serie: string;
    folio: string;
    fechaDocumento: Date;
    fechaVencimiento: Date | null;
    formaPago: string;
    metodoPago: MetodoPagoFactura;
    usoCfdi: string;
    exportacion: string;
    lugarExpedicion: string;
    observaciones: string;
    partidas: IPartidaFacturaFormulario[];
}

export interface IResumenFactura {
    subtotal: number;
    descuento: number;
    impuestosTrasladados: number;
    impuestosRetenidos: number;
    total: number;
    totalMonedaBase: number;
}

const redondear = (valor: number): number => Math.round((valor + Number.EPSILON) * 10000) / 10000;

export const calcularImporteImpuesto = (impuesto: IPartidaImpuesto): number => {
    if (impuesto.tipoFactor === 'Exento') return 0;
    return redondear((impuesto.base ?? 0) * (impuesto.tasaOCuota ?? 0));
};

export const calcularPartida = (partida: IPartidaFacturaFormulario): IPartidaFacturaFormulario => {
    const subtotal = redondear((partida.cantidad || 0) * (partida.precioUnitario ?? 0));
    const descuento = partida.tipoDescuento === '%'
        ? redondear(subtotal * ((partida.porcentajeDescuento ?? 0) / 100))
        : partida.tipoDescuento === 'I'
            ? redondear(partida.descuento || 0)
            : 0;
    const impuestos = partida.impuestos.map(impuesto => ({
        ...impuesto,
        importe: calcularImporteImpuesto(impuesto)
    }));
    const impuestosTrasladados = redondear(
        impuestos.filter(impuesto => !impuesto.esRetencion)
            .reduce((suma, impuesto) => suma + (impuesto.importe ?? 0), 0)
    );
    const impuestosRetenidos = redondear(
        impuestos.filter(impuesto => impuesto.esRetencion)
            .reduce((suma, impuesto) => suma + (impuesto.importe ?? 0), 0)
    );
    const total = redondear(subtotal - descuento + impuestosTrasladados - impuestosRetenidos);

    return {
        ...partida,
        impuestos,
        subtotal,
        descuento,
        impuestosTrasladados,
        impuestosRetenidos,
        total
    };
};

export const calcularResumenFactura = (
    partidas: IPartidaFacturaFormulario[],
    tipoCambio: number
): IResumenFactura => {
    const calculadas = partidas.map(calcularPartida);
    const subtotal = redondear(calculadas.reduce((suma, partida) => suma + partida.subtotal, 0));
    const descuento = redondear(calculadas.reduce((suma, partida) => suma + partida.descuento, 0));
    const impuestosTrasladados = redondear(
        calculadas.reduce((suma, partida) => suma + partida.impuestosTrasladados, 0)
    );
    const impuestosRetenidos = redondear(
        calculadas.reduce((suma, partida) => suma + partida.impuestosRetenidos, 0)
    );
    const total = redondear(subtotal - descuento + impuestosTrasladados - impuestosRetenidos);

    return {
        subtotal,
        descuento,
        impuestosTrasladados,
        impuestosRetenidos,
        total,
        totalMonedaBase: redondear(total * (tipoCambio || 1))
    };
};

export const crearPartidaFacturaVacia = (id: string, numeroPartida: number): IPartidaFacturaFormulario => ({
    id,
    idDocumentoCxc: '',
    numeroPartida,
    concepto: '',
    cantidad: 1,
    precioUnitario: 0,
    subtotal: 0,
    tipoDescuento: '',
    porcentajeDescuento: null,
    descuento: 0,
    objetoImp: '02',
    impuestosTrasladados: 0,
    impuestosRetenidos: 0,
    total: 0,
    subtotalMonedaBase: null,
    totalMonedaBase: null,
    idProductoServicioSat: '',
    idUnidadMedidaSat: '',
    impuestos: []
});
