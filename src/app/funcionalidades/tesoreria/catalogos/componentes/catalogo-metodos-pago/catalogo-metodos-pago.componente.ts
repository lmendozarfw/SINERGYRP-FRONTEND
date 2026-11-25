import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, FormField, maxLength, minLength, pattern, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { CellEditor, EditableColumn, Table } from "primeng/table";
import { Tag } from "primeng/tag";
import { IFilaMetodoPagoSat, IFilaVistaMetodoPagoSat, IMetodoPagoSat, Metodo_PAGO_SAT_VACIO } from "../../modelos/metodo-pago-sat.interface";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";

@Component({
    selector: 'app-catalogo-metodos-pago',
    templateUrl: './catalogo-metodos-pago.componente.html',
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
export class CatalogoMetodosPagoComponente {
    readonly titulo = 'Métodos de pago';
    readonly descripcion = 'Configura los medios con los que se realizan cobros y pagos: transferencia, tarjeta, efectivo y otros.';
    readonly estatus = [
        { label: 'Activo', value: true },
        { label: 'Inactivo', value: false }
    ];

    protected readonly formulario: FieldTree<IMetodoPagoSat> = this.crearFormulario();
    protected readonly metodosPago = signal<IFilaMetodoPagoSat[]>([
        this.crearFila(1, { codigo: 'PUE', descripcion: 'Pago en una sola exhibición', activo: true }),
        this.crearFila(2, { codigo: 'PPD', descripcion: 'Pago en parcialidades o diferido', activo: true })
    ]);
    protected readonly filas = computed<IFilaVistaMetodoPagoSat[]>(() => [
        { id: 0, ...Metodo_PAGO_SAT_VACIO, formulario: this.formulario, esNueva: true },
        ...this.metodosPago().map(metodoPago => ({ ...metodoPago, esNueva: false }))
    ]);

    private siguienteId = 3;

    guardarMetodoPago(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.metodosPago.update(metodosPago => [this.crearFila(this.siguienteId++, valores), ...metodosPago]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(metodoPago: IFilaMetodoPagoSat): void {
        metodoPago.formulario().markAsTouched();
        if (metodoPago.formulario().invalid()) return;

        this.metodosPago.update(metodosPago => metodosPago.map(item =>
            item.id === metodoPago.id ? { ...item, ...this.obtenerValores(metodoPago.formulario) } : item
        ));
        metodoPago.formulario().reset();
    }

    eliminarMetodoPago(metodoPago: IFilaMetodoPagoSat): void {
        this.metodosPago.update(metodosPago => metodosPago.filter(item => item.id !== metodoPago.id));
    }

    private crearFormulario(metodoPago?: IMetodoPagoSat): FieldTree<IMetodoPagoSat> {
        const modelo = signal<IMetodoPagoSat>({ ...Metodo_PAGO_SAT_VACIO, ...metodoPago });
        return form(modelo, (campo) => {
            required(campo.codigo, { message: 'El código es obligatorio.' });
            maxLength(campo.codigo, 3, { message: 'Usa máximo 3 letras.' });
            pattern(campo.codigo, /^[A-Za-z]{3}$/, { message: 'Solo letras, de 3 caracteres.' });
            required(campo.descripcion, { message: 'La descripción es obligatoria.' });
            minLength(campo.descripcion, 2, { message: 'Escribe al menos 2 caracteres.' });
        });
    }

    private crearFila(id: number, metodoPago: IMetodoPagoSat): IFilaMetodoPagoSat {
        return { id, ...metodoPago, formulario: this.crearFormulario(metodoPago) };
    }

    private obtenerValores(formulario: FieldTree<IMetodoPagoSat>): IMetodoPagoSat {
        return {
            codigo: String(formulario.codigo().value() ?? '').trim().toUpperCase(),
            descripcion: String(formulario.descripcion().value() ?? '').trim(),
            activo: formulario.activo().value() === true
        };
    }

    private reiniciarFormulario(formulario: FieldTree<IMetodoPagoSat>): void {
        formulario().reset({ ...Metodo_PAGO_SAT_VACIO });
    }
}
