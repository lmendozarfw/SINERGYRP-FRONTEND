import { Component, input } from "@angular/core";
import { FieldTree, FormField } from "@angular/forms/signals";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";

export interface IContactoClienteForm { nombre: string; puesto: string; tipoContacto: string; telefono: string; email: string; esPrincipal: boolean; activo: boolean; }
export const CONTACTO_FORM_VACIO: IContactoClienteForm = { nombre: '', puesto: '', tipoContacto: '', telefono: '', email: '', esPrincipal: false, activo: true };

@Component({
    selector: 'app-formulario-contacto-cliente',
    template: `
    <form class="flex flex-col gap-4 pt-2" (submit)="$event.preventDefault();">
        <div class="ds-field">
            <app-etiqueta-formulario para="con-nombre" [obligatorio]="true">Nombre</app-etiqueta-formulario>
            <input id="con-nombre" pInputText [formField]="formulario().nombre" fluid />
            <app-mensaje-ayuda-error [campo]="formulario().nombre"></app-mensaje-ayuda-error>
        </div>
        <div class="ds-field">
            <app-etiqueta-formulario para="con-puesto">Puesto</app-etiqueta-formulario>
            <input id="con-puesto" pInputText [formField]="formulario().puesto" fluid />
        </div>
        <div class="ds-field">
            <app-etiqueta-formulario para="con-tipo">Tipo de contacto</app-etiqueta-formulario>
            <p-select appendTo="body" inputId="con-tipo" [formField]="formulario().tipoContacto" fluid [options]="opcionesTipoContacto" optionLabel="label" optionValue="value" placeholder="Selecciona" />
        </div>
        <div class="ds-field">
            <app-etiqueta-formulario para="con-tel">Teléfono</app-etiqueta-formulario>
            <input id="con-tel" pInputText [formField]="formulario().telefono" fluid />
        </div>
        <div class="ds-field">
            <app-etiqueta-formulario para="con-email">Email</app-etiqueta-formulario>
            <input id="con-email" pInputText [formField]="formulario().email" type="email" fluid />
            <app-mensaje-ayuda-error [campo]="formulario().email"></app-mensaje-ayuda-error>
        </div>
        <div class="ds-field">
            <app-etiqueta-formulario para="con-principal">Principal</app-etiqueta-formulario>
            <p-select appendTo="body" inputId="con-principal" [formField]="formulario().esPrincipal" fluid [options]="opcionesSiNo" optionLabel="label" optionValue="value" />
        </div>
        <div class="ds-field">
            <app-etiqueta-formulario para="con-activo">Activo</app-etiqueta-formulario>
            <p-select appendTo="body" inputId="con-activo" [formField]="formulario().activo" fluid [options]="opcionesSiNo" optionLabel="label" optionValue="value" />
        </div>
    </form>
    `,
    imports: [EtiquetaFormularioComponente, FormField, InputText, MensajeAyudaErrorComponente, Select]
})
export class FormularioContactoClienteComponente {
    readonly formulario = input.required<FieldTree<IContactoClienteForm>>();

    readonly opcionesSiNo = [{ label: 'Sí', value: true }, { label: 'No', value: false }];
    readonly opcionesTipoContacto = [{ label: 'Comercial', value: 'Comercial' }, { label: 'Facturación', value: 'Facturación' }, { label: 'Cobranza', value: 'Cobranza' }];
}
