import { Component, input } from "@angular/core";
import { FieldTree, FormField } from "@angular/forms/signals";
import { DatePicker } from "primeng/datepicker";
import { Select } from "primeng/select";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { IUnidadNegocioProveedor } from "../../../../modelos/unidad-negocio-proveedor.interface";

@Component({
    selector: 'app-formulario-unidad-negocio-proveedor',
    template: `
    <form class="ds-client-form flex flex-col gap-4 p-6" (submit)="$event.preventDefault();">
      <div class="ds-field">
        <app-etiqueta-formulario para="un-id" [obligatorio]="true">Unidad de negocio</app-etiqueta-formulario>
        <p-select appendTo="body" inputId="un-id" [formField]="formulario().idUnidadNegocio" fluid [options]="opcionesUnidadNegocio" optionLabel="label" optionValue="value" placeholder="Selecciona una unidad" />
        <app-mensaje-ayuda-error [campo]="formulario().idUnidadNegocio"></app-mensaje-ayuda-error>
      </div>
      <div class="ds-field">
        <app-etiqueta-formulario para="un-principal">¿Es principal?</app-etiqueta-formulario>
        <p-select appendTo="body" inputId="un-principal" [formField]="formulario().esPrincipal" fluid [options]="opcionesPrincipal" optionLabel="label" optionValue="value" />
      </div>
      <div class="ds-field">
        <app-etiqueta-formulario para="un-inicio" [obligatorio]="true">Fecha inicio</app-etiqueta-formulario>
        <p-datepicker appendTo="body" inputId="un-inicio" [formField]="formulario().fechaInicio" fluid dateFormat="dd/mm/yy" placeholder="Selecciona fecha" />
        <app-mensaje-ayuda-error [campo]="formulario().fechaInicio"></app-mensaje-ayuda-error>
      </div>
      <div class="ds-field">
        <app-etiqueta-formulario para="un-fin">Fecha fin</app-etiqueta-formulario>
        <p-datepicker appendTo="body" inputId="un-fin" [formField]="formulario().fechaFin" fluid dateFormat="dd/mm/yy" [showClear]="true" placeholder="Selecciona fecha" />
      </div>
    </form>
    `,
    imports: [DatePicker, EtiquetaFormularioComponente, FormField, MensajeAyudaErrorComponente, Select]
})
export class FormularioUnidadNegocioProveedorComponente {
    readonly formulario = input.required<FieldTree<IUnidadNegocioProveedor>>();

    readonly opcionesUnidadNegocio = [
        { label: 'Manufactura', value: 1 },
        { label: 'Comercialización', value: 2 },
        { label: 'Servicios', value: 3 }
    ];
    readonly opcionesPrincipal = [{ label: 'Sí', value: true }, { label: 'No', value: false }];
}
