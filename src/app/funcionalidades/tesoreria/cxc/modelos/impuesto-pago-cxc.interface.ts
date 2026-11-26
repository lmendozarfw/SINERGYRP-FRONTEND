import { IPartidaImpuesto } from "@funcionalidades/tesoreria/modelos/partida-impuesto.interface";

export interface IImpuestoPagoCxc extends Omit<IPartidaImpuesto, 'idPartidaDocumentoCxc' | 'idPartidaDocumentoCxp'> {
    idDocumentoPago: string;
}
