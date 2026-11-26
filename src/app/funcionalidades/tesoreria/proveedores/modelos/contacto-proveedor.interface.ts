import { FieldTree } from "@angular/forms/signals";

export interface IContactoProveedor {
    idProveedor: number | null;
    nombre: string;
    puesto: string | null;
    tipoContacto: string | null;
    telefono: string | null;
    email: string | null;
    esPrincipal: boolean;
    activo: boolean;
}

export const CONTACTO_PROVEEDOR_VACIO: IContactoProveedor = {
    idProveedor: null,
    nombre: '',
    puesto: null,
    tipoContacto: null,
    telefono: null,
    email: null,
    esPrincipal: false,
    activo: true
};

export interface IFilaContactoProveedor extends IContactoProveedor {
    id: number;
    formulario: FieldTree<IContactoProveedor>;
}

export interface IFilaVistaContactoProveedor extends IFilaContactoProveedor {
    esNueva: boolean;
}
