import { Component, input } from "@angular/core";
import { FieldTree, FormField } from "@angular/forms/signals";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { TarjetaCreditoComponente } from "@compartido/componentes/tarjeta-credito/tarjeta-credito.componente";
import { ICuentaBancariaCliente } from "../../../../modelos/cuenta-bancaria-cliente.interface";

@Component({
    selector: 'app-formulario-cuenta-bancaria-cliente',
    template: `
    <div class="flex flex-col gap-5 pt-2">
      <app-tarjeta-credito [banco]="formulario().banco().value()" [titular]="formulario().titularCuenta().value()!" [esSoloLectura]="false" [activo]="formulario().activa().value()" [moneda]="'MXN'" [numeroCuenta]="formulario().numeroCuenta().value()"></app-tarjeta-credito>

      <form class="grid grid-cols-1 gap-4 md:grid-cols-2" (submit)="$event.preventDefault();">
        <div class="ds-field md:col-span-2">
          <app-etiqueta-formulario para="banco" [obligatorio]="true">Banco</app-etiqueta-formulario>
          <p-select appendTo="body" inputId="banco" [formField]="formulario().banco" fluid [options]="opcionesBanco" optionLabel="label" optionValue="value" placeholder="Selecciona banco" />
          <app-mensaje-ayuda-error [campo]="formulario().banco"></app-mensaje-ayuda-error>
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="nombre">Nombre cuenta</app-etiqueta-formulario>
          <input id="nombre" pInputText [formField]="formulario().nombreCuenta" fluid />
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="titular">Titular</app-etiqueta-formulario>
          <input id="titular" pInputText [formField]="formulario().titularCuenta" fluid />
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="num">Número de cuenta</app-etiqueta-formulario>
          <input id="num" pInputText [formField]="formulario().numeroCuenta" fluid />
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="clabe">CLABE</app-etiqueta-formulario>
          <input id="clabe" pInputText [formField]="formulario().clabe" fluid />
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="moneda">Moneda</app-etiqueta-formulario>
          <p-select appendTo="body" inputId="moneda" [formField]="formulario().idMoneda" fluid [options]="opcionesMoneda" optionLabel="label" optionValue="value" placeholder="Selecciona" />
        </div>
        <div class="ds-field">
          <app-etiqueta-formulario para="activa">Activa</app-etiqueta-formulario>
          <p-select appendTo="body" inputId="activa" [formField]="formulario().activa" fluid [options]="opcionesSiNo" optionLabel="label" optionValue="value" />
        </div>
        <div class="ds-field md:col-span-2">
          <app-etiqueta-formulario para="observaciones">Observaciones</app-etiqueta-formulario>
          <input id="observaciones" pInputText [formField]="formulario().observaciones" fluid />
        </div>
      </form>
    </div>
    `,
    imports: [EtiquetaFormularioComponente, FormField, InputText, MensajeAyudaErrorComponente, Select, TarjetaCreditoComponente]
})
export class FormularioCuentaBancariaClienteComponente {
    readonly formulario = input.required<FieldTree<ICuentaBancariaCliente>>();

    readonly opcionesSiNo = [{ label: 'Sí', value: true }, { label: 'No', value: false }];
    readonly opcionesMoneda = [{ label: 'MXN', value: 1 }, { label: 'USD', value: 2 }];
    readonly opcionesBanco = [
        { label: 'BBVA', value: 'BBVA' },
        { label: 'Citibanamex', value: 'Citibanamex' },
        { label: 'BanBajío', value: 'BanBajío' },
        { label: 'Otro banco', value: 'Otro' }
    ];
}
