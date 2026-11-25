export interface ICuentaBancariaCxc {
    idOrganizacion: number | null;
    banco: string;
    nombreCuenta: string;
    titularCuenta: string;
    clabe: string;
    idMoneda: number | null;
    activa: boolean;
}

export const CUENTA_BANCARIA_CXC_VACIA: ICuentaBancariaCxc = {
    idOrganizacion: null,
    banco: '',
    nombreCuenta: '',
    titularCuenta: '',
    clabe: '',
    idMoneda: null,
    activa: true
};

export interface ICuentaBancariaCxcItem extends ICuentaBancariaCxc {
    id: number;
}
