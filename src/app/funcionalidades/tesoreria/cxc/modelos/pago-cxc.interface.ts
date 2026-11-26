import { IImpuestoPagoCxc } from "./impuesto-pago-cxc.interface";

export interface IPagoCxc {
    id: string;
    idDocumentoCxc: string;
    fechaPago: Date;
    idFormaPagoSat: string;
    idCuentaBancaria?: string | null;
    idCuentaBancariaCliente?: string | null;
    numeroOperacion?: string | null;
    rfcEmisorCuentaOrdenante?: string | null;
    nombreBancoOrdenante?: string | null;
    cuentaOrdenante?: string | null;
    rfcEmisorCuentaBeneficiario?: string | null;
    cuentaBeneficiario?: string | null;
    observaciones?: string | null;
    impuestos?: IImpuestoPagoCxc[];
}
