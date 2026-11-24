import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, FormField, maxLength, minLength, pattern, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { CellEditor, EditableColumn, Table } from "primeng/table";
import { IFilaMunicipio, IFilaVistaMunicipio, IMunicipio, MUNICIPIO_VACIO } from "../../modelos/municipio.interface";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";

@Component({
    selector: 'app-catalogo-municipios',
    templateUrl: './catalogo-municipios.componente.html',
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
        Table
    ]
})
export class CatalogoMunicipiosComponente {
    readonly titulo = 'Municipios';
    readonly descripcion = 'Gestiona los municipios o alcaldías disponibles para cada estado.';
    readonly estados = [
        { label: 'Guanajuato', value: 1 },
        { label: 'Jalisco', value: 2 },
        { label: 'Ciudad de México', value: 3 }
    ];

    protected readonly formulario: FieldTree<IMunicipio> = this.crearFormulario();
    protected readonly municipios = signal<IFilaMunicipio[]>([
        this.crearFila(1, { idEstado: 1, codigoMunicipio: '001', nombre: 'Abasolo' }),
        this.crearFila(2, { idEstado: 1, codigoMunicipio: '020', nombre: 'Guanajuato' }),
        this.crearFila(3, { idEstado: 1, codigoMunicipio: '023', nombre: 'León' })
    ]);
    protected readonly filas = computed<IFilaVistaMunicipio[]>(() => [
        { id: 0, ...MUNICIPIO_VACIO, formulario: this.formulario, esNueva: true },
        ...this.municipios().map(municipio => ({ ...municipio, esNueva: false }))
    ]);

    private siguienteId = 4;

    guardarMunicipio(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.municipios.update(municipios => [this.crearFila(this.siguienteId++, valores), ...municipios]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(municipio: IFilaMunicipio): void {
        municipio.formulario().markAsTouched();
        if (municipio.formulario().invalid()) return;

        this.municipios.update(municipios => municipios.map(item =>
            item.id === municipio.id ? { ...item, ...this.obtenerValores(municipio.formulario) } : item
        ));
        municipio.formulario().reset();
    }

    eliminarMunicipio(municipio: IFilaMunicipio): void {
        this.municipios.update(municipios => municipios.filter(item => item.id !== municipio.id));
    }

    obtenerNombreEstado(idEstado: number | null): string {
        return this.estados.find(estado => estado.value === idEstado)?.label ?? 'Sin estado';
    }

    private crearFormulario(municipio?: IMunicipio): FieldTree<IMunicipio> {
        const modelo = signal<IMunicipio>({ ...MUNICIPIO_VACIO, ...municipio });
        return form(modelo, (campo) => {
            required(campo.idEstado, { message: 'Selecciona un estado.' });
            required(campo.codigoMunicipio, { message: 'El código de municipio es obligatorio.' });
            maxLength(campo.codigoMunicipio, 3, { message: 'Usa máximo 3 dígitos.' });
            pattern(campo.codigoMunicipio, /^\d{1,3}$/, { message: 'Usa de 1 a 3 dígitos, por ejemplo 001.' });
            required(campo.nombre, { message: 'El nombre es obligatorio.' });
            minLength(campo.nombre, 2, { message: 'Escribe al menos 2 caracteres.' });
        });
    }

    private crearFila(id: number, municipio: IMunicipio): IFilaMunicipio {
        return { id, ...municipio, formulario: this.crearFormulario(municipio) };
    }

    private obtenerValores(formulario: FieldTree<IMunicipio>): IMunicipio {
        const idEstado = formulario.idEstado().value();
        return {
            idEstado: typeof idEstado === 'number' ? idEstado : null,
            codigoMunicipio: String(formulario.codigoMunicipio().value() ?? '').trim(),
            nombre: String(formulario.nombre().value() ?? '').trim()
        };
    }

    private reiniciarFormulario(formulario: FieldTree<IMunicipio>): void {
        formulario().reset({ ...MUNICIPIO_VACIO });
    }
}
