import { Component, input } from "@angular/core";
import { FieldTree, FormField } from "@angular/forms/signals";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { TarjetaCreditoComponente } from "@compartido/componentes/tarjeta-credito/tarjeta-credito.componente";
import { ICuentaBancariaProveedor } from "../../../../modelos/cuenta-bancaria-proveedor.interface";

@Component({
    selector: 'app-formulario-cuenta-bancaria-proveedor',
    template: `
    <div class="flex flex-col gap-5 p-6">
      <app-tarjeta-credito [banco]="formulario().banco().value()" [titular]="formulario().titularCuenta().value()!" [esSoloLectura]="false" [activo]="formulario().activa().value()" [moneda]="'MXN'" [numeroCuenta]="formulario().numeroCuenta().value()"></app-tarjeta-credito>

      <form class="ds-client-form grid grid-cols-1 gap-4 md:grid-cols-2" (submit)="$event.preventDefault();">
        <div class="ds-field">
          <app-etiqueta-formulario para="banco" [obligatorio]="true">Banco</app-etiqueta-formulario>
          <p-select appendTo="body" inputId="banco" [formField]="formulario().banco" fluid [options]="opcionesBanco" optionLabel="label" optionValue="value" placeholder="Selecciona banco" />
          <app-mensaje-ayuda-error [campo]="formulario().banco"></app-mensaje-ayuda-error>
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="swift">Código SWIFT</app-etiqueta-formulario>
          <input id="swift" class="ds-input" pInputText [formField]="formulario().swift" fluid />
          <app-mensaje-ayuda-error [campo]="formulario().swift"></app-mensaje-ayuda-error>
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="nombre">Nombre cuenta</app-etiqueta-formulario>
          <input id="nombre" class="ds-input" pInputText [formField]="formulario().nombreCuenta" fluid />
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="titular">Titular</app-etiqueta-formulario>
          <input id="titular" class="ds-input" pInputText [formField]="formulario().titularCuenta" fluid />
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="num">Número de cuenta</app-etiqueta-formulario>
          <input id="num" class="ds-input" pInputText [formField]="formulario().numeroCuenta" fluid />
          <app-mensaje-ayuda-error [campo]="formulario().numeroCuenta"></app-mensaje-ayuda-error>
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="clabe">CLABE</app-etiqueta-formulario>
          <input id="clabe" class="ds-input" pInputText [formField]="formulario().clabe" fluid />
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="moneda">Moneda</app-etiqueta-formulario>
          <p-select appendTo="body" inputId="moneda" [formField]="formulario().idMoneda" fluid [options]="opcionesMoneda" optionLabel="label" optionValue="value" placeholder="Selecciona" />
          <app-mensaje-ayuda-error [campo]="formulario().idMoneda"></app-mensaje-ayuda-error>
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="activa">Activa</app-etiqueta-formulario>
          <p-select appendTo="body" inputId="activa" [formField]="formulario().activa" fluid [options]="opcionesSiNo" optionLabel="label" optionValue="value" />
        </div>
        <div class="ds-field md:col-span-2">
          <app-etiqueta-formulario para="observaciones">Observaciones</app-etiqueta-formulario>
          <input id="observaciones" class="ds-input" pInputText [formField]="formulario().observaciones" fluid />
        </div>
      </form>
    </div>
    `,
    imports: [EtiquetaFormularioComponente, FormField, InputText, MensajeAyudaErrorComponente, Select, TarjetaCreditoComponente]
})
export class FormularioCuentaBancariaProveedorComponente {
    readonly formulario = input.required<FieldTree<ICuentaBancariaProveedor>>();

    readonly opcionesSiNo = [{ label: 'Sí', value: true }, { label: 'No', value: false }];
    readonly opcionesMoneda = [{ label: 'MXN', value: 1 }, { label: 'USD', value: 2 }];
    readonly opcionesBanco = [
        { label: 'BBVA', value: 'BBVA' },
        { label: 'Citibanamex', value: 'Citibanamex' },
        { label: 'BanBajío', value: 'BanBajío' },
        { label: 'Otro banco', value: 'Otro' }
    ];
}
