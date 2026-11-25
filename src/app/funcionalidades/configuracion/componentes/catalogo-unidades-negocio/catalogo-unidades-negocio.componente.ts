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
import { IFilaUnidadNegocio, IFilaVistaUnidadNegocio, IUnidadNegocio, UNIDAD_NEGOCIO_VACIA } from "../../modelos/unidad-negocio.interface";

@Component({
    selector: 'app-catalogo-unidades-negocio',
    templateUrl: './catalogo-unidades-negocio.componente.html',
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
export class CatalogoUnidadesNegocioComponente {
    readonly titulo = 'Unidades de negocio';
    readonly estadosUnidad = [
        { label: 'Activa', value: true },
        { label: 'Inactiva', value: false }
    ];

    private readonly idOrganizacionActual = 1;

    protected readonly formulario: FieldTree<IUnidadNegocio> = this.crearFormulario();
    protected readonly unidadesNegocio = signal<IFilaUnidadNegocio[]>([
        this.crearFila(1, { codigo: 'MATRIZ', nombre: 'Matriz', activa: true }),
        this.crearFila(2, { codigo: 'PLANTA-N', nombre: 'Planta norte', activa: true }),
        this.crearFila(3, { codigo: 'SUCURSAL-S', nombre: 'Sucursal sur', activa: false })
    ]);
    protected readonly filas = computed<IFilaVistaUnidadNegocio[]>(() => [
        { id: 0, ...UNIDAD_NEGOCIO_VACIA, idOrganizacion: this.idOrganizacionActual, formulario: this.formulario, esNueva: true },
        ...this.unidadesNegocio().map(unidad => ({ ...unidad, esNueva: false }))
    ]);

    private siguienteId = 4;

    guardarUnidadNegocio(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.unidadesNegocio.update(unidades => [this.crearFila(this.siguienteId++, valores), ...unidades]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(unidad: IFilaUnidadNegocio): void {
        unidad.formulario().markAsTouched();
        if (unidad.formulario().invalid()) return;

        this.unidadesNegocio.update(unidades => unidades.map(item =>
            item.id === unidad.id ? { ...item, ...this.obtenerValores(unidad.formulario) } : item
        ));
        unidad.formulario().reset();
    }

    eliminarUnidadNegocio(unidad: IFilaUnidadNegocio): void {
        this.unidadesNegocio.update(unidades => unidades.filter(item => item.id !== unidad.id));
    }

    private crearFormulario(unidad?: IUnidadNegocio): FieldTree<IUnidadNegocio> {
        const modelo = signal<IUnidadNegocio>({ ...UNIDAD_NEGOCIO_VACIA, ...unidad });
        return form(modelo, (campo) => {
            required(campo.codigo, { message: 'El código es obligatorio.' });
            minLength(campo.codigo, 2, { message: 'Escribe al menos 2 caracteres.' });
            maxLength(campo.codigo, 30, { message: 'Usa máximo 30 caracteres.' });
            pattern(campo.codigo, /^[A-Za-z0-9_-]+$/, { message: 'Solo letras, números, guiones o guiones bajos.' });
            required(campo.nombre, { message: 'El nombre es obligatorio.' });
            minLength(campo.nombre, 2, { message: 'Escribe al menos 2 caracteres.' });
            maxLength(campo.nombre, 150, { message: 'Usa máximo 150 caracteres.' });
        });
    }

    private crearFila(id: number, unidad: IUnidadNegocio): IFilaUnidadNegocio {
        return { id, idOrganizacion: this.idOrganizacionActual, ...unidad, formulario: this.crearFormulario(unidad) };
    }

    private obtenerValores(formulario: FieldTree<IUnidadNegocio>): IUnidadNegocio {
        return {
            codigo: String(formulario.codigo().value() ?? '').trim().toUpperCase(),
            nombre: String(formulario.nombre().value() ?? '').trim(),
            activa: formulario.activa().value() === true
        };
    }

    private reiniciarFormulario(formulario: FieldTree<IUnidadNegocio>): void {
        formulario().reset({ ...UNIDAD_NEGOCIO_VACIA });
    }
}
