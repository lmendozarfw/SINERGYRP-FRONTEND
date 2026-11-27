import { Component, input } from "@angular/core";
import { FieldTree, FormField } from "@angular/forms/signals";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";

export interface IDomicilioClienteForm { tipoDomicilio: string; alias: string; nombreReceptor: string; calle: string; numeroExterior: string; numeroInterior: string; colonia: string; codigoPostal: string; localidad: string; telefono: string; referencias: string; esPrincipal: boolean; activo: boolean; }
export const DOM_FORM_VACIO: IDomicilioClienteForm = { tipoDomicilio: '', alias: '', nombreReceptor: '', calle: '', numeroExterior: '', numeroInterior: '', colonia: '', codigoPostal: '', localidad: '', telefono: '', referencias: '', esPrincipal: false, activo: true };

@Component({
  selector: 'app-formulario-domicilio-cliente',
  template: `
    <form class="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2" (submit)="$event.preventDefault();">
      <div class="ds-field">
        <app-etiqueta-formulario para="dom-tipo" [obligatorio]="true">Tipo domicilio</app-etiqueta-formulario>
        <p-select appendTo="body" inputId="dom-tipo" [formField]="formulario().tipoDomicilio" fluid [options]="opcionesTipoDomicilio" optionLabel="label" optionValue="value" placeholder="Selecciona" />
        <app-mensaje-ayuda-error [campo]="formulario().tipoDomicilio"></app-mensaje-ayuda-error>
      </div>
      <div class="ds-field">
        <app-etiqueta-formulario para="dom-alias">Alias</app-etiqueta-formulario>
        <input id="dom-alias" pInputText [formField]="formulario().alias" fluid />
      </div>
      <div class="ds-field md:col-span-2">
        <app-etiqueta-formulario para="dom-receptor">Nombre receptor</app-etiqueta-formulario>
        <input id="dom-receptor" pInputText [formField]="formulario().nombreReceptor" fluid />
      </div>
      <div class="ds-field md:col-span-2">
        <app-etiqueta-formulario para="dom-calle">Calle</app-etiqueta-formulario>
        <input id="dom-calle" pInputText [formField]="formulario().calle" fluid />
      </div>
      <div class="ds-field">
        <app-etiqueta-formulario para="dom-ext">No. exterior</app-etiqueta-formulario>
        <input id="dom-ext" pInputText [formField]="formulario().numeroExterior" fluid />
      </div>
      <div class="ds-field">
        <app-etiqueta-formulario para="dom-int">No. interior</app-etiqueta-formulario>
        <input id="dom-int" pInputText [formField]="formulario().numeroInterior" fluid />
      </div>
      <div class="ds-field">
        <app-etiqueta-formulario para="dom-col">Colonia</app-etiqueta-formulario>
        <input id="dom-col" pInputText [formField]="formulario().colonia" fluid />
      </div>
      <div class="ds-field">
        <app-etiqueta-formulario para="dom-cp">Código postal</app-etiqueta-formulario>
        <input id="dom-cp" pInputText [formField]="formulario().codigoPostal" fluid />
      </div>
      <div class="ds-field">
        <app-etiqueta-formulario para="dom-loc">Localidad</app-etiqueta-formulario>
        <input id="dom-loc" pInputText [formField]="formulario().localidad" fluid />
      </div>
      <div class="ds-field">
        <app-etiqueta-formulario para="dom-tel">Teléfono</app-etiqueta-formulario>
        <input id="dom-tel" pInputText [formField]="formulario().telefono" fluid />
      </div>
      <div class="ds-field md:col-span-2">
        <app-etiqueta-formulario para="dom-ref">Referencias</app-etiqueta-formulario>
        <input id="dom-ref" pInputText [formField]="formulario().referencias" fluid />
      </div>
      <div class="ds-field">
        <app-etiqueta-formulario para="dom-principal">Principal</app-etiqueta-formulario>
        <p-select appendTo="body" inputId="dom-principal" [formField]="formulario().esPrincipal" fluid [options]="opcionesSiNo" optionLabel="label" optionValue="value" />
      </div>
      <div class="ds-field">
        <app-etiqueta-formulario para="dom-activo">Activo</app-etiqueta-formulario>
        <p-select appendTo="body" inputId="dom-activo" [formField]="formulario().activo" fluid [options]="opcionesSiNo" optionLabel="label" optionValue="value" />
      </div>
    </form>
    `,
  imports: [EtiquetaFormularioComponente, FormField, InputText, MensajeAyudaErrorComponente, Select]
})
export class FormularioDomicilioClienteComponente {
  readonly formulario = input.required<FieldTree<IDomicilioClienteForm>>();

  readonly opcionesTipoDomicilio = [{ label: 'Fiscal', value: 'Fiscal' }, { label: 'Envío', value: 'Envío' }, { label: 'Cobranza', value: 'Cobranza' }];
  readonly opcionesSiNo = [{ label: 'Sí', value: true }, { label: 'No', value: false }];
}
