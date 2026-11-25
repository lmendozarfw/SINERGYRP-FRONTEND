import { FieldTree } from "@angular/forms/signals";

export interface ICuentaBancariaCliente {
    idCliente: number | null;
    banco: string;
    nombreCuenta: string;
    titularCuenta: string;
    numeroCuenta: string;
    clabe: string;
    idMoneda: number | null;
    activa: boolean;
    observaciones: string;
}

export const CUENTA_BANCARIA_CLIENTE_VACIA: ICuentaBancariaCliente = {
    idCliente: null,
    banco: '',
    nombreCuenta: '',
    titularCuenta: '',
    numeroCuenta: '',
    clabe: '',
    idMoneda: null,
    activa: true,
    observaciones: ''
};

export interface IFilaCuentaBancariaCliente extends ICuentaBancariaCliente {
    id: number;
    formulario: FieldTree<ICuentaBancariaCliente>;
}

export interface IFilaVistaCuentaBancariaCliente extends IFilaCuentaBancariaCliente {
    esNueva: boolean;
}