import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, FormField, minLength, pattern, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { CellEditor, EditableColumn, Table } from "primeng/table";
import { Tag } from "primeng/tag";
import { IFilaUsoCfdiSat, IFilaVistaUsoCfdiSat, IUsoCfdiSat, USO_CFDI_SAT_VACIO } from "../../modelos/uso-cfdi-sat.interface";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";

@Component({
    selector: 'app-catalogo-usos-cfdi',
    templateUrl: './catalogo-usos-cfdi.componente.html',
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
export class CatalogoUsosCfdiComponente {
    readonly titulo = 'Usos de CFDI del SAT';
    readonly descripcion = 'Administra los usos de CFDI permitidos en la facturación electrónica.';
    readonly siNo = [
        { label: 'Sí', value: true },
        { label: 'No', value: false }
    ];

    protected readonly formulario: FieldTree<IUsoCfdiSat> = this.crearFormulario();
    protected readonly usosCfdi = signal<IFilaUsoCfdiSat[]>([
        this.crearFila(1, { codigo: 'G01', descripcion: 'Adquisición de mercancías', aplicaPersonaFisica: true, aplicaPersonaMoral: true, activo: true }),
        this.crearFila(2, { codigo: 'G03', descripcion: 'Gastos por cuenta de terceros', aplicaPersonaFisica: true, aplicaPersonaMoral: true, activo: true }),
        this.crearFila(3, { codigo: 'I01', descripcion: 'Construcciones', aplicaPersonaFisica: true, aplicaPersonaMoral: true, activo: false })
    ]);
    protected readonly filas = computed<IFilaVistaUsoCfdiSat[]>(() => [
        { id: 0, ...USO_CFDI_SAT_VACIO, formulario: this.formulario, esNueva: true },
        ...this.usosCfdi().map(uso => ({ ...uso, esNueva: false }))
    ]);

    private siguienteId = 4;

    guardarUsoCfdi(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.usosCfdi.update(usos => [this.crearFila(this.siguienteId++, valores), ...usos]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(uso: IFilaUsoCfdiSat): void {
        uso.formulario().markAsTouched();
        if (uso.formulario().invalid()) return;

        this.usosCfdi.update(usos => usos.map(item =>
            item.id === uso.id ? { ...item, ...this.obtenerValores(uso.formulario) } : item
        ));
        uso.formulario().reset();
    }

    eliminarUsoCfdi(uso: IFilaUsoCfdiSat): void {
        this.usosCfdi.update(usos => usos.filter(item => item.id !== uso.id));
    }

    private crearFormulario(uso?: IUsoCfdiSat): FieldTree<IUsoCfdiSat> {
        const modelo = signal<IUsoCfdiSat>({ ...USO_CFDI_SAT_VACIO, ...uso });
        return form(modelo, (campo) => {
            required(campo.codigo, { message: 'El código es obligatorio.' });
            pattern(campo.codigo, /^[A-Z]\d{2}$/, { message: 'Usa una letra y dos dígitos, por ejemplo G01.' });
            required(campo.descripcion, { message: 'La descripción es obligatoria.' });
            minLength(campo.descripcion, 2, { message: 'Escribe al menos 2 caracteres.' });
        });
    }

    private crearFila(id: number, uso: IUsoCfdiSat): IFilaUsoCfdiSat {
        return { id, ...uso, formulario: this.crearFormulario(uso) };
    }

    private obtenerValores(formulario: FieldTree<IUsoCfdiSat>): IUsoCfdiSat {
        return {
            codigo: String(formulario.codigo().value() ?? '').trim().toUpperCase(),
            descripcion: String(formulario.descripcion().value() ?? '').trim(),
            aplicaPersonaFisica: formulario.aplicaPersonaFisica().value() === true,
            aplicaPersonaMoral: formulario.aplicaPersonaMoral().value() === true,
            activo: formulario.activo().value() === true
        };
    }

    private reiniciarFormulario(formulario: FieldTree<IUsoCfdiSat>): void {
        formulario().reset({ ...USO_CFDI_SAT_VACIO });
    }
}
