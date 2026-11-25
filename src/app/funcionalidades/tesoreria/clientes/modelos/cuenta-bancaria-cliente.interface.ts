import { FieldTree } from "@angular/forms/signals";

export interface ICuentaBancariaCliente {
    idCliente: number | null;
    banco: string;
    nombreCuenta: string | null;
    titularCuenta: string | null;
    numeroCuenta: string | null;
    clabe: string | null;
    idMoneda: number | null;
    activa: boolean;
    observaciones: string | null;
}

export const CUENTA_BANCARIA_CLIENTE_VACIA: ICuentaBancariaCliente = {
    idCliente: null,
    banco: '',
    nombreCuenta: null,
    titularCuenta: null,
    numeroCuenta: null,
    clabe: null,
    idMoneda: null,
    activa: true,
    observaciones: null
};

export interface IFilaCuentaBancariaCliente extends ICuentaBancariaCliente {
    id: number;
    formulario: FieldTree<ICuentaBancariaCliente>;
}

export interface IFilaVistaCuentaBancariaCliente extends IFilaCuentaBancariaCliente {
    esNueva: boolean;
}