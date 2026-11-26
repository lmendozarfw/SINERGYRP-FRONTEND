import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, FormField, maxLength, minLength, pattern, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { CellEditor, EditableColumn, Table } from "primeng/table";
import { Tag } from "primeng/tag";
import {
    CLASIFICACION_CLIENTE_VACIO,
    IFilaClasificacionCliente,
    IFilaVistaClasificacionCliente,
    IClasificacionCliente
} from "@funcionalidades/tesoreria/clientes/modelos/clasificacion-cliente.interface";
import { CatalogoVacioComponente } from "@funcionalidades/tesoreria/catalogos/componentes/catalogo-vacio/catalogo-vacio.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";

@Component({
    selector: 'app-configuracion-clasificacion-clientes',
    templateUrl: './configuracion-clasificacion-clientes.componente.html',
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
export class ConfiguracionClasificacionClientesComponente {
    readonly titulo = 'Clasificación de clientes';
    readonly estatus = [
        { label: 'Activo', value: true },
        { label: 'Inactivo', value: false }
    ];

    private readonly idOrganizacionActual = 1;

    protected readonly formulario: FieldTree<IClasificacionCliente> = this.crearFormulario();
    protected readonly clasificaciones = signal<IFilaClasificacionCliente[]>([
        this.crearFila(1, { idOrganizacion: 1, codigo: 'VIP', descripcion: 'Cliente preferente', activo: true }),
        this.crearFila(2, { idOrganizacion: 1, codigo: 'REG', descripcion: 'Cliente regular', activo: true }),
        this.crearFila(3, { idOrganizacion: 1, codigo: 'NUE', descripcion: 'Cliente nuevo', activo: false })
    ]);
    protected readonly filas = computed<IFilaVistaClasificacionCliente[]>(() => [
        {
            ...CLASIFICACION_CLIENTE_VACIO,
            id: 0,
            idOrganizacion: this.idOrganizacionActual,
            formulario: this.formulario,
            esNueva: true
        },
        ...this.clasificaciones().map(clasificacion => ({ ...clasificacion, esNueva: false }))
    ]);

    private siguienteId = 4;

    guardarClasificacion(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.clasificaciones.update(clasificaciones => [this.crearFila(this.siguienteId++, valores), ...clasificaciones]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(clasificacion: IFilaClasificacionCliente): void {
        clasificacion.formulario().markAsTouched();
        if (clasificacion.formulario().invalid()) return;

        this.clasificaciones.update(clasificaciones => clasificaciones.map(item =>
            item.id === clasificacion.id ? { ...item, ...this.obtenerValores(clasificacion.formulario), id: item.id } : item
        ));
        clasificacion.formulario().reset();
    }

    eliminarClasificacion(clasificacion: IFilaClasificacionCliente): void {
        this.clasificaciones.update(clasificaciones => clasificaciones.filter(item => item.id !== clasificacion.id));
    }

    private crearFormulario(clasificacion?: IClasificacionCliente): FieldTree<IClasificacionCliente> {
        const modelo = signal<IClasificacionCliente>({ ...CLASIFICACION_CLIENTE_VACIO, ...clasificacion });
        return form(modelo, (campo) => {
            required(campo.codigo, { message: 'El código es obligatorio.' });
            minLength(campo.codigo, 2, { message: 'Usa al menos 2 caracteres.' });
            maxLength(campo.codigo, 10, { message: 'Usa máximo 10 caracteres.' });
            pattern(campo.codigo, /^[A-Za-z0-9_-]+$/, { message: 'Solo letras, números, guiones o guiones bajos.' });
            required(campo.descripcion, { message: 'La descripción es obligatoria.' });
            minLength(campo.descripcion, 2, { message: 'Escribe al menos 2 caracteres.' });
            maxLength(campo.descripcion, 100, { message: 'Usa máximo 100 caracteres.' });
        });
    }

    private crearFila(id: number, clasificacion: IClasificacionCliente): IFilaClasificacionCliente {
        return {
            ...clasificacion,
            id,
            idOrganizacion: this.idOrganizacionActual,
            formulario: this.crearFormulario(clasificacion)
        };
    }

    private obtenerValores(formulario: FieldTree<IClasificacionCliente>): IClasificacionCliente {
        return {
            idOrganizacion: this.idOrganizacionActual,
            codigo: String(formulario.codigo().value() ?? '').trim().toUpperCase(),
            descripcion: String(formulario.descripcion().value() ?? '').trim(),
            activo: formulario.activo().value() === true
        };
    }

    private reiniciarFormulario(formulario: FieldTree<IClasificacionCliente>): void {
        formulario().reset({ ...CLASIFICACION_CLIENTE_VACIO });
    }
}
