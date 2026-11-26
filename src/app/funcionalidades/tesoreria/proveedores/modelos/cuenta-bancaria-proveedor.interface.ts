import { FieldTree } from "@angular/forms/signals";

export interface ICuentaBancariaProveedor {
    idProveedor: number | null;
    banco: string;
    nombreCuenta: string;
    titularCuenta: string;
    numeroCuenta: string;
    clabe: string;
    idMoneda: number | null;
    activa: boolean;
    observaciones: string;
}

export const CUENTA_BANCARIA_PROVEEDOR_VACIA: ICuentaBancariaProveedor = {
    idProveedor: null,
    banco: '',
    nombreCuenta: '',
    titularCuenta: '',
    numeroCuenta: '',
    clabe: '',
    idMoneda: null,
    activa: true,
    observaciones: ''
};

export interface IFilaCuentaBancariaProveedor extends ICuentaBancariaProveedor {
    id: number;
    formulario: FieldTree<ICuentaBancariaProveedor>;
}

export interface IFilaVistaCuentaBancariaProveedor extends IFilaCuentaBancariaProveedor {
    esNueva: boolean;
}
