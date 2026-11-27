import { Component, input } from "@angular/core";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { Select } from "primeng/select";
import { DatePicker } from "primeng/datepicker";
import { FieldTree, FormField } from "@angular/forms/signals";
import { IUnidadNegocioCliente } from "@funcionalidades/tesoreria/clientes/modelos/unidad-negocio-cliente.interface";

@Component({
    selector: 'app-formulario-unidad-negocio-cliente',
    template: `
    <form class="flex flex-col gap-4 pt-2" (submit)="$event.preventDefault();">
        <div class="ds-field">
            <app-etiqueta-formulario para="id" [obligatorio]="true">Unidad de negocio</app-etiqueta-formulario>
            <p-select appendTo="body" inputId="id" [formField]="formulario().idUnidadNegocio" [invalid]="unidadNegocioError.errorVisible()" fluid [options]="opcionesUnidadNegocio" optionLabel="label" optionValue="value" placeholder="Selecciona una unidad" />
            <app-mensaje-ayuda-error #unidadNegocioError [campo]="formulario().idUnidadNegocio"></app-mensaje-ayuda-error>
        </div>
        <div class="ds-field">
            <app-etiqueta-formulario para="principal">¿Es principal?</app-etiqueta-formulario>
            <p-select appendTo="body" inputId="principal" [formField]="formulario().esPrincipal" fluid [options]="opcionesPrincipal" optionLabel="label" optionValue="value" />
        </div>
        <div class="ds-field">
            <app-etiqueta-formulario para="inicio" [obligatorio]="true">Fecha inicio</app-etiqueta-formulario>
            <p-datepicker appendTo="body" inputId="inicio" [formField]="formulario().fechaInicio" [invalid]="fechaInicioError.errorVisible()" fluid dateFormat="dd/mm/yy" placeholder="Selecciona fecha" />
            <app-mensaje-ayuda-error #fechaInicioError [campo]="formulario().fechaInicio"></app-mensaje-ayuda-error>
        </div>
        <div class="ds-field">
            <app-etiqueta-formulario para="fin">Fecha fin</app-etiqueta-formulario>
            <p-datepicker appendTo="body" inputId="fin" [formField]="formulario().fechaFin" fluid dateFormat="dd/mm/yy" [showClear]="true" placeholder="Selecciona fecha" />
        </div>
    </form>
    `,
    imports: [MensajeAyudaErrorComponente, EtiquetaFormularioComponente, Select, DatePicker, FormField]
})
export class FormularioUnidadNegocioClienteComponente {
    readonly formulario = input.required<FieldTree<IUnidadNegocioCliente>>();

    readonly opcionesUnidadNegocio = [
        { label: 'Manufactura', value: 1 },
        { label: 'Comercialización', value: 2 },
        { label: 'Servicios', value: 3 }
    ];
    readonly opcionesPrincipal = [{ label: 'Sí', value: true }, { label: 'No', value: false }];
}
