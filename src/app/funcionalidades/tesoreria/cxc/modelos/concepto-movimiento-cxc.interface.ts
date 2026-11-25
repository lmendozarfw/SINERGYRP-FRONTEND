export interface IConceptoMovimientoCxc {
    id?: number | null;
    idOrganizacion: number | null;
    codigo: string;
    descripcion: string;
    tipoDocumento: string;
    naturaleza: string;
    requiereTimbrado: boolean;
    cuentaContableCodigo: string;
    polizaSeleccionada: string;
    cuentaContableReemplazo: string;
    activo: boolean;
    esFiscal: boolean;
}

export const CONCEPTO_MOVIMIENTO_CXC_VACIO: IConceptoMovimientoCxc = {
    idOrganizacion: null,
    codigo: '',
    descripcion: '',
    tipoDocumento: '',
    naturaleza: '',
    requiereTimbrado: false,
    cuentaContableCodigo: '',
    polizaSeleccionada: '',
    cuentaContableReemplazo: '',
    activo: true,
    esFiscal: false
};

export interface IConceptoMovimientoCxcItem extends IConceptoMovimientoCxc {
    id: number;
}
