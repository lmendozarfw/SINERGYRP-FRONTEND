import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, FormField, max, maxLength, min, minLength, pattern, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { ButtonDirective } from "primeng/button";
import { InputNumber } from "primeng/inputnumber";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { CellEditor, EditableColumn, Table } from "primeng/table";
import { Tag } from "primeng/tag";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";
import { IFilaMoneda, IFilaVistaMoneda, IMoneda, MONEDA_VACIA } from "../../modelos/moneda.interface";

@Component({
    selector: 'app-catalogo-monedas',
    templateUrl: './catalogo-monedas.componente.html',
    imports: [
        ButtonDirective,
        CatalogoVacioComponente,
        CellEditor,
        EditableColumn,
        FormField,
        InputNumber,
        InputText,
        PIcon,
        Select,
        Table,
        Tag
    ]
})
export class CatalogoMonedasComponente {
    readonly titulo = 'Monedas';
    readonly estadosMoneda = [
        { label: 'Activa', value: true },
        { label: 'Inactiva', value: false }
    ];

    protected readonly formulario: FieldTree<IMoneda> = this.crearFormulario();
    protected readonly monedas = signal<IFilaMoneda[]>([
        this.crearFila(1, { codigo: 'MXN', nombre: 'Peso mexicano', decimales: 2, activa: true }),
        this.crearFila(2, { codigo: 'USD', nombre: 'Dólar estadounidense', decimales: 2, activa: true }),
        this.crearFila(3, { codigo: 'EUR', nombre: 'Euro', decimales: 2, activa: false })
    ]);
    protected readonly filas = computed<IFilaVistaMoneda[]>(() => [
        { id: 0, ...MONEDA_VACIA, formulario: this.formulario, esNueva: true },
        ...this.monedas().map(moneda => ({ ...moneda, esNueva: false }))
    ]);

    private siguienteId = 4;

    campoInvalido<T>(campo: FieldTree<T>): boolean {
        const estado = campo();
        return (estado.touched() || estado.dirty()) && estado.invalid();
    }

    mensajeError<T>(campo: FieldTree<T>): string | null {
        if (!this.campoInvalido(campo)) return null;
        return campo().errors()[0]?.message ?? 'Revisa este campo.';
    }

    guardarMoneda(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.monedas.update(monedas => [this.crearFila(this.siguienteId++, valores), ...monedas]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(moneda: IFilaMoneda): void {
        moneda.formulario().markAsTouched();
        if (moneda.formulario().invalid()) return;

        this.monedas.update(monedas => monedas.map(item =>
            item.id === moneda.id ? { ...item, ...this.obtenerValores(moneda.formulario) } : item
        ));
        moneda.formulario().reset();
    }

    eliminarMoneda(moneda: IFilaMoneda): void {
        this.monedas.update(monedas => monedas.filter(item => item.id !== moneda.id));
    }

    private crearFormulario(moneda?: IMoneda): FieldTree<IMoneda> {
        const modelo = signal<IMoneda>({ ...MONEDA_VACIA, ...moneda });
        return form(modelo, (campo) => {
            required(campo.codigo, { message: 'El código es obligatorio.' });
            minLength(campo.codigo, 2, { message: 'Usa al menos 2 letras.' });
            maxLength(campo.codigo, 5, { message: 'Usa máximo 5 letras.' });
            pattern(campo.codigo, /^[A-Za-z]{2,5}$/, { message: 'Solo letras, de 2 a 5 caracteres.' });
            required(campo.nombre, { message: 'El nombre es obligatorio.' });
            minLength(campo.nombre, 2, { message: 'Escribe al menos 2 caracteres.' });
            required(campo.decimales, { message: 'Indica el número de decimales.' });
            min(campo.decimales, 0, { message: 'El mínimo es 0.' });
            max(campo.decimales, 6, { message: 'El máximo es 6.' });
        });
    }

    private crearFila(id: number, moneda: IMoneda): IFilaMoneda {
        return { id, ...moneda, formulario: this.crearFormulario(moneda) };
    }

    private obtenerValores(formulario: FieldTree<IMoneda>): IMoneda {
        return {
            codigo: String(formulario.codigo().value() ?? '').trim().toUpperCase(),
            nombre: String(formulario.nombre().value() ?? '').trim(),
            decimales: Number(formulario.decimales().value() ?? 0),
            activa: formulario.activa().value() === true
        };
    }

    private reiniciarFormulario(formulario: FieldTree<IMoneda>): void {
        formulario().reset({ ...MONEDA_VACIA });
    }
}
