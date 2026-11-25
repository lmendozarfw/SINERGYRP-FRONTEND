import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, FormField, maxLength, minLength, pattern, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { CellEditor, EditableColumn, Table } from "primeng/table";
import { Tag } from "primeng/tag";
import { CatalogoVacioComponente } from "@funcionalidades/tesoreria/catalogos/componentes/catalogo-vacio/catalogo-vacio.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { EMISOR_FISCAL_VACIO, IEmisorFiscal, IFilaEmisorFiscal, IFilaVistaEmisorFiscal } from "@funcionalidades/configuracion/modelos/emisor-fiscal.interface";
import { EXPRESION_REGULAR_RFC } from "@compartido/constantes/expresion-regular-rfc";

@Component({
    selector: 'app-catalogo-emisores-fiscales',
    templateUrl: './catalogo-emisores-fiscales.componente.html',
    imports: [
        ButtonDirective,
        CatalogoVacioComponente,
        CellEditor,
        EditableColumn,
        FormField,
        InputText,
        MensajeAyudaErrorComponente,
        PIcon,
        Select,
        Table,
        Tag
    ]
})
export class CatalogoEmisoresFiscalesComponente {
    readonly titulo = 'Emisores fiscales';
    readonly estadosEmisor = [
        { label: 'Activo', value: true },
        { label: 'Inactivo', value: false }
    ];
    readonly unidadesNegocioOpciones = [
        { label: 'Manufactura', value: 1 },
        { label: 'Comercialización', value: 2 },
        { label: 'Servicios', value: 3 }
    ];
    readonly regimenesFiscales = [
        { label: '601 · General de Ley Personas Morales', value: 1 },
        { label: '612 · Personas Físicas con Actividades Empresariales', value: 2 },
        { label: '616 · Sin obligaciones fiscales', value: 3 }
    ];

    private readonly idOrganizacionActual = 1;

    protected readonly formulario: FieldTree<IEmisorFiscal> = this.crearFormulario();
    protected readonly unidadesNegocio = signal<IFilaEmisorFiscal[]>([
    ]);
    protected readonly filas = computed<IFilaVistaEmisorFiscal[]>(() => [
        { id: 0, ...EMISOR_FISCAL_VACIO, idOrganizacion: this.idOrganizacionActual, formulario: this.formulario, esNueva: true },
        ...this.unidadesNegocio().map(unidad => ({ ...unidad, esNueva: false }))
    ]);

    private siguienteId = 4;

    guardar(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.unidadesNegocio.update(unidades => [this.crearFila(this.siguienteId++, valores), ...unidades]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(unidad: IFilaEmisorFiscal): void {
        unidad.formulario().markAsTouched();
        if (unidad.formulario().invalid()) return;

        this.unidadesNegocio.update(unidades => unidades.map(item =>
            item.id === unidad.id ? { ...item, ...this.obtenerValores(unidad.formulario) } : item
        ));
        unidad.formulario().reset();
    }

    eliminarEmisorFiscal(emisor: IFilaEmisorFiscal): void {
        this.unidadesNegocio.update(unidades => unidades.filter(item => item.id !== emisor.id));
    }

    obtenerNombreUnidadNegocio(idUnidadNegocio: number | null): string {
        return this.unidadesNegocioOpciones.find(opcion => opcion.value === idUnidadNegocio)?.label ?? 'Sin unidad';
    }

    obtenerNombreRegimenFiscal(idRegimenFiscal: number | null): string {
        return this.regimenesFiscales.find(opcion => opcion.value === idRegimenFiscal)?.label ?? 'Sin régimen';
    }

    private crearFormulario(emisor?: IEmisorFiscal): FieldTree<IEmisorFiscal> {
        const modelo = signal<IEmisorFiscal>({ ...EMISOR_FISCAL_VACIO, ...emisor });
        return form(modelo, (campo) => {
            required(campo.idUnidadNegocio, { message: 'La unidad de negocio es obligatoria.' });
            required(campo.idRegimenFiscal, { message: 'El régimen fiscal es obligatorio.' });
            required(campo.rfc, { message: 'El RFC es obligatorio.' });
            pattern(campo.rfc, EXPRESION_REGULAR_RFC, { message: 'Debe ser un RFC válido.' });
            required(campo.razonSocial, { message: 'La razón social es obligatoria.' });
            required(campo.codigoPostalExpedicion, { message: 'El código postal es obligatorio.' });
        });
    }

    private crearFila(id: number, emisor: IEmisorFiscal): IFilaEmisorFiscal {
        return { id, ...emisor, idOrganizacion: this.idOrganizacionActual, formulario: this.crearFormulario(emisor) };
    }

    private obtenerValores(formulario: FieldTree<IEmisorFiscal>): IEmisorFiscal {
        return {
            idOrganizacion: this.idOrganizacionActual,
            idUnidadNegocio: formulario.idUnidadNegocio().value(),
            idRegimenFiscal: formulario.idRegimenFiscal().value(),
            rfc: String(formulario.rfc().value() ?? '').trim(),
            razonSocial: String(formulario.razonSocial().value() ?? '').trim(),
            codigoPostalExpedicion: String(formulario.codigoPostalExpedicion().value() ?? '').trim(),
            activo: formulario.activo().value() === true
        };
    }

    private reiniciarFormulario(formulario: FieldTree<IEmisorFiscal>): void {
        formulario().reset({ ...EMISOR_FISCAL_VACIO });
    }
}
