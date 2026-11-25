export interface IConfiguracionCxp {
    id?: number | null;
    idOrganizacion?: number | null;
    permitirPagoMayorSaldo: boolean;
    idMonedaBase: number | null;
    diasToleranciaVencimiento: number;
    creadoEn?: Date;
    actualizadoEn?: Date | null;
}

export const CONFIGURACION_GENERAL_CXC_VACIA : IConfiguracionCxp = {
    permitirPagoMayorSaldo: false,
    idMonedaBase: null,
    diasToleranciaVencimiento: 0
}