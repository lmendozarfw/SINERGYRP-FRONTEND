import { FieldTree } from "@angular/forms/signals";

export interface IContactoCliente {
    idCliente: number | null;
    nombre: string;
    puesto: string | null;
    tipoContacto: string | null;
    telefono: string | null;
    email: string | null;
    esPrincipal: boolean;
    activo: boolean;
}

export const CONTACTO_CLIENTE_VACIO: IContactoCliente = {
    idCliente: null,
    nombre: '',
    puesto: null,
    tipoContacto: null,
    telefono: null,
    email: null,
    esPrincipal: false,
    activo: true
};

export interface IFilaContactoCliente extends IContactoCliente {
    id: number;
    formulario: FieldTree<IContactoCliente>;
}

export interface IFilaVistaContactoCliente extends IFilaContactoCliente {
    esNueva: boolean;
}