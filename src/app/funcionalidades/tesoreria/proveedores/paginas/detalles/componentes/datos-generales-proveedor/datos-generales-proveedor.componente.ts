import { Component, computed, signal } from "@angular/core";
import { FieldTree, FormField, form, maxLength, minLength, pattern, required } from "@angular/forms/signals";
import { ButtonDirective } from "primeng/button";
import { DatePicker } from "primeng/datepicker";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { IOpcionSelector } from "@compartido/interfaces/selector.interface";

interface IDatosGeneralesProveedorForm {
    codigo: string;
    estadoProveedor: string;
    nombreRazonSocial: string;
    nombreComercial: string;
    tipoPersona: string;
    rfc: string;
    identificadorFiscalExtranjero: string;
    fechaAlta: Date | null;
}

const DATOS_GENERALES_VACIO: IDatosGeneralesProveedorForm = {
    codigo: '',
    estadoProveedor: '',
    nombreRazonSocial: '',
    nombreComercial: '',
    tipoPersona: '',
    rfc: '',
    identificadorFiscalExtranjero: '',
    fechaAlta: null
};

@Component({
    selector: 'app-datos-generales-proveedor',
    templateUrl: './datos-generales-proveedor.componente.html',
    imports: [ButtonDirective, DatePicker, EtiquetaFormularioComponente, FormField, InputText, MensajeAyudaErrorComponente, Select]
})
export class DatosGeneralesProveedorComponente {
    readonly opcionesTipoPersona: IOpcionSelector[] = [
        { etiqueta: 'Física', valor: 'Física' },
        { etiqueta: 'Moral', valor: 'Moral' }
    ];
    readonly opcionesEstado: IOpcionSelector[] = [
        { etiqueta: 'Activo', valor: 'Activo' },
        { etiqueta: 'En revisión', valor: 'En revisión' },
        { etiqueta: 'Inactivo', valor: 'Inactivo' }
    ];

    protected readonly formulario: FieldTree<IDatosGeneralesProveedorForm> = this.crearFormulario();

    readonly tieneInformacionPendiente = computed(() => {
        const estado = this.formulario();
        return estado.invalid() || estado.dirty();
    });

    guardar(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;
        this.formulario().reset(this.obtenerValores());
    }

    private crearFormulario(): FieldTree<IDatosGeneralesProveedorForm> {
        const modelo = signal<IDatosGeneralesProveedorForm>({ ...DATOS_GENERALES_VACIO });
        return form(modelo, (campo) => {
            required(campo.codigo, { message: 'El código es obligatorio.' });
            required(campo.estadoProveedor, { message: 'Selecciona un estado.' });
            required(campo.nombreRazonSocial, { message: 'El nombre o razón social es obligatorio.' });
            minLength(campo.nombreRazonSocial, 2, { message: 'Escribe al menos 2 caracteres.' });
            required(campo.tipoPersona, { message: 'Selecciona un tipo de persona.' });
            required(campo.rfc, { message: 'El RFC es obligatorio.' });
            pattern(campo.rfc, /^[A-Za-zÑ&]{3,4}\d{6}[A-Za-z0-9]{3}$/, { message: 'Ingresa un RFC válido.' });
            maxLength(campo.rfc, 13, { message: 'El RFC debe tener máximo 13 caracteres.' });
        });
    }

    private obtenerValores(): IDatosGeneralesProveedorForm {
        return {
            codigo: String(this.formulario.codigo().value() ?? '').trim(),
            estadoProveedor: String(this.formulario.estadoProveedor().value() ?? ''),
            nombreRazonSocial: String(this.formulario.nombreRazonSocial().value() ?? '').trim(),
            nombreComercial: String(this.formulario.nombreComercial().value() ?? '').trim(),
            tipoPersona: String(this.formulario.tipoPersona().value() ?? ''),
            rfc: String(this.formulario.rfc().value() ?? '').trim().toUpperCase(),
            identificadorFiscalExtranjero: String(this.formulario.identificadorFiscalExtranjero().value() ?? '').trim(),
            fechaAlta: this.formulario.fechaAlta().value() ?? null
        };
    }
}
