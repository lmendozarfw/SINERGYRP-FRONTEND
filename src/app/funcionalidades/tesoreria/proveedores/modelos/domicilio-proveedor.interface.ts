import { FieldTree } from "@angular/forms/signals";

export interface IDomicilioProveedor {
    idProveedor: number | null;
    tipoDomicilio: string;
    alias: string | null;
    nombreReceptor: string | null;
    calle: string | null;
    numeroExterior: string | null;
    numeroInterior: string | null;
    colonia: string | null;
    codigoPostal: string | null;
    localidad: string | null;
    idMunicipio: number | null;
    telefono: string | null;
    referencias: string | null;
    esPrincipal: boolean;
    activo: boolean;
}

export const DOMICILIO_PROVEEDOR_VACIO: IDomicilioProveedor = {
    idProveedor: null,
    tipoDomicilio: '',
    alias: null,
    nombreReceptor: null,
    calle: null,
    numeroExterior: null,
    numeroInterior: null,
    colonia: null,
    codigoPostal: null,
    localidad: null,
    idMunicipio: null,
    telefono: null,
    referencias: null,
    esPrincipal: false,
    activo: true
};

export interface IFilaDomicilioProveedor extends IDomicilioProveedor {
    id: number;
    formulario: FieldTree<IDomicilioProveedor>;
}

export interface IFilaVistaDomicilioProveedor extends IFilaDomicilioProveedor {
    esNueva: boolean;
}
