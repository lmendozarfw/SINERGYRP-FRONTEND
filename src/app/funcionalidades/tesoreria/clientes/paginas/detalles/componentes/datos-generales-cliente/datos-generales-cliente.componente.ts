import { Component, computed, signal } from "@angular/core";
import { FieldTree, FormField, form, maxLength, minLength, pattern, required } from "@angular/forms/signals";
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { IOpcionSelector } from "@compartido/interfaces/selector.interface";
import { DatePicker } from "primeng/datepicker";

interface IDatosGeneralesClienteForm {
    codigo: string;
    estadoCliente: string;
    nombreRazonSocial: string;
    nombreComercial: string;
    tipoPersona: string;
    rfc: string;
    identificadorFiscalExtranjero: string;
    fechaAlta: Date | null;
}

const DATOS_GENERALES_VACIO: IDatosGeneralesClienteForm = {
    codigo: '',
    estadoCliente: '',
    nombreRazonSocial: '',
    nombreComercial: '',
    tipoPersona: '',
    rfc: '',
    identificadorFiscalExtranjero: '',
    fechaAlta: null
};

@Component({
    selector: 'app-datos-generales-cliente',
    templateUrl: './datos-generales-cliente.componente.html',
    imports: [ButtonDirective, EtiquetaFormularioComponente, FormField, InputText, MensajeAyudaErrorComponente, Select, DatePicker]
})
export class DatosGeneralesClienteComponente {
    readonly opcionesTipoPersona: IOpcionSelector[] = [
        { etiqueta: 'Física', valor: 'Física' },
        { etiqueta: 'Moral', valor: 'Moral' }
    ];
    readonly opcionesEstado: IOpcionSelector[] = [
        { etiqueta: 'Activo', valor: 'activo' },
        { etiqueta: 'En revisión', valor: 'en revisión' },
        { etiqueta: 'Inactivo', valor: 'inactivo' }
    ];

    protected readonly formulario: FieldTree<IDatosGeneralesClienteForm> = this.crearFormulario();

    readonly tieneInformacionPendiente = computed(() => {
        const estado = this.formulario();
        return estado.invalid() || estado.dirty();
    });

    guardar(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;
        this.formulario().reset(this.obtenerValores());
    }

    private crearFormulario(): FieldTree<IDatosGeneralesClienteForm> {
        const modelo = signal<IDatosGeneralesClienteForm>({ ...DATOS_GENERALES_VACIO });
        return form(modelo, (campo) => {
            required(campo.codigo, { message: 'El código es obligatorio.' });
            required(campo.estadoCliente, { message: 'Selecciona un estado.' });
            required(campo.nombreRazonSocial, { message: 'El nombre o razón social es obligatorio.' });
            minLength(campo.nombreRazonSocial, 2, { message: 'Escribe al menos 2 caracteres.' });
            required(campo.tipoPersona, { message: 'Selecciona un tipo de persona.' });
            required(campo.rfc, { message: 'El RFC es obligatorio.' });
            pattern(campo.rfc, /^[A-Za-zÑ&]{3,4}\d{6}[A-Za-z0-9]{3}$/, { message: 'Ingresa un RFC válido.' });
            maxLength(campo.rfc, 13, { message: 'El RFC debe tener máximo 13 caracteres.' });
        });
    }

    private obtenerValores(): IDatosGeneralesClienteForm {
        return {
            codigo: String(this.formulario.codigo().value() ?? '').trim(),
            estadoCliente: String(this.formulario.estadoCliente().value() ?? ''),
            nombreRazonSocial: String(this.formulario.nombreRazonSocial().value() ?? '').trim(),
            nombreComercial: String(this.formulario.nombreComercial().value() ?? '').trim(),
            tipoPersona: String(this.formulario.tipoPersona().value() ?? ''),
            rfc: String(this.formulario.rfc().value() ?? '').trim().toUpperCase(),
            identificadorFiscalExtranjero: String(this.formulario.identificadorFiscalExtranjero().value() ?? '').trim(),
            fechaAlta: new Date(this.formulario.fechaAlta().value() ?? '')
        };
    }
}

