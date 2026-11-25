import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, FormField, maxLength, minLength, pattern, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { CellEditor, EditableColumn, Table } from "primeng/table";
import { Tag } from "primeng/tag";
import { FORMA_PAGO_SAT_VACIO, IFilaFormaPagoSat, IFilaVistaFormaPagoSat, IFormaPagoSat } from "../../modelos/forma-pago-sat.interface";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";

@Component({
    selector: 'app-catalogo-formas-pago',
    templateUrl: './catalogo-formas-pago.componente.html',
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
export class CatalogoFormasPagoComponente {
    readonly titulo = 'Formas de pago';
    readonly descripcion = 'Define las condiciones comerciales de cobro y pago, como contado, crédito o parcialidades.';
    readonly estatus = [
        { label: 'Activo', value: true },
        { label: 'Inactivo', value: false }
    ];

    protected readonly formulario: FieldTree<IFormaPagoSat> = this.crearFormulario();
    protected readonly formasPago = signal<IFilaFormaPagoSat[]>([
        this.crearFila(1, { codigo: '01', descripcion: 'Efectivo', activo: true }),
        this.crearFila(2, { codigo: '03', descripcion: 'Transferencia electrónica de fondos', activo: true }),
        this.crearFila(3, { codigo: '28', descripcion: 'Tarjeta de débito', activo: false })
    ]);
    protected readonly filas = computed<IFilaVistaFormaPagoSat[]>(() => [
        { id: 0, ...FORMA_PAGO_SAT_VACIO, formulario: this.formulario, esNueva: true },
        ...this.formasPago().map(formaPago => ({ ...formaPago, esNueva: false }))
    ]);

    private siguienteId = 4;

    guardarFormaPago(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.formasPago.update(formasPago => [this.crearFila(this.siguienteId++, valores), ...formasPago]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(formaPago: IFilaFormaPagoSat): void {
        formaPago.formulario().markAsTouched();
        if (formaPago.formulario().invalid()) return;

        this.formasPago.update(formasPago => formasPago.map(item =>
            item.id === formaPago.id ? { ...item, ...this.obtenerValores(formaPago.formulario) } : item
        ));
        formaPago.formulario().reset();
    }

    eliminarFormaPago(formaPago: IFilaFormaPagoSat): void {
        this.formasPago.update(formasPago => formasPago.filter(item => item.id !== formaPago.id));
    }

    private crearFormulario(formaPago?: IFormaPagoSat): FieldTree<IFormaPagoSat> {
        const modelo = signal<IFormaPagoSat>({ ...FORMA_PAGO_SAT_VACIO, ...formaPago });
        return form(modelo, (campo) => {
            required(campo.codigo, { message: 'El código es obligatorio.' });
            maxLength(campo.codigo, 2, { message: 'Usa máximo 2 dígitos.' });
            pattern(campo.codigo, /^\d{2}$/, { message: 'Solo dígitos, por ejemplo 01.' });
            required(campo.descripcion, { message: 'La descripción es obligatoria.' });
            minLength(campo.descripcion, 2, { message: 'Escribe al menos 2 caracteres.' });
        });
    }

    private crearFila(id: number, formaPago: IFormaPagoSat): IFilaFormaPagoSat {
        return { id, ...formaPago, formulario: this.crearFormulario(formaPago) };
    }

    private obtenerValores(formulario: FieldTree<IFormaPagoSat>): IFormaPagoSat {
        return {
            codigo: String(formulario.codigo().value() ?? '').trim(),
            descripcion: String(formulario.descripcion().value() ?? '').trim(),
            activo: formulario.activo().value() === true
        };
    }

    private reiniciarFormulario(formulario: FieldTree<IFormaPagoSat>): void {
        formulario().reset({ ...FORMA_PAGO_SAT_VACIO });
    }
}
