export interface IConceptoMovimientoCxc {
    id?: number | null;
    idOrganizacion: number | null;
    codigo: string;
    descripcion: string;
    tipoDocumento: string;
    naturaleza: string;
    requiereTimbrado: boolean;
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
    activo: true,
    esFiscal: false
};

export interface IConceptoMovimientoCxcFormulario extends IConceptoMovimientoCxc {
    cuentaContableCodigo: string;
    polizaSeleccionada: string;
    cuentaContableReemplazo: string;
}

export const CONCEPTO_MOVIMIENTO_CXC_FORMULARIO_VACIO: IConceptoMovimientoCxcFormulario = {
    ...CONCEPTO_MOVIMIENTO_CXC_VACIO,
    cuentaContableCodigo: '',
    polizaSeleccionada: '',
    cuentaContableReemplazo: ''
};

export interface IConceptoMovimientoCxcItem extends IConceptoMovimientoCxcFormulario {
    id: number;
}
