import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, FormField, minLength, pattern, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { CellEditor, EditableColumn, Table } from "primeng/table";
import { Tag } from "primeng/tag";
import { IFilaRegimentFiscalSat, IFilaVistaRegimenFiscalSat, IRegimenFiscalSat, REGIMEN_FISCAL_SAT_VACIO } from "../../modelos/regimen-fiscal-sat.interface";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";

@Component({
    selector: 'app-catalogo-regimenes-fiscales',
    templateUrl: './catalogo-regimenes-fiscales.componente.html',
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
export class CatalogoRegimenesFiscalesComponente {
    readonly titulo = 'Regímenes fiscales del SAT';
    readonly descripcion = 'Consulta y mantén los regímenes fiscales utilizados en la facturación electrónica.';
    readonly siNo = [
        { label: 'Sí', value: true },
        { label: 'No', value: false }
    ];

    protected readonly formulario: FieldTree<IRegimenFiscalSat> = this.crearFormulario();
    protected readonly regimenes = signal<IFilaRegimentFiscalSat[]>([
        this.crearFila(1, { codigo: '601', descripcion: 'General', aplicaPersonaFisica: true, aplicaPersonaMoral: true, activo: true }),
        this.crearFila(2, { codigo: '612', descripcion: 'Personas físicas con actividades empresariales y profesionales', aplicaPersonaFisica: true, aplicaPersonaMoral: false, activo: true }),
        this.crearFila(3, { codigo: '630', descripcion: 'Sin obligaciones fiscales', aplicaPersonaFisica: true, aplicaPersonaMoral: true, activo: false })
    ]);
    protected readonly filas = computed<IFilaVistaRegimenFiscalSat[]>(() => [
        { id: 0, ...REGIMEN_FISCAL_SAT_VACIO, formulario: this.formulario, esNueva: true },
        ...this.regimenes().map(regimen => ({ ...regimen, esNueva: false }))
    ]);

    private siguienteId = 4;

    guardarRegimen(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.regimenes.update(regimenes => [this.crearFila(this.siguienteId++, valores), ...regimenes]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(regimen: IFilaRegimentFiscalSat): void {
        regimen.formulario().markAsTouched();
        if (regimen.formulario().invalid()) return;

        this.regimenes.update(regimenes => regimenes.map(item =>
            item.id === regimen.id ? { ...item, ...this.obtenerValores(regimen.formulario) } : item
        ));
        regimen.formulario().reset();
    }

    eliminarRegimen(regimen: IFilaRegimentFiscalSat): void {
        this.regimenes.update(regimenes => regimenes.filter(item => item.id !== regimen.id));
    }

    private crearFormulario(regimen?: IRegimenFiscalSat): FieldTree<IRegimenFiscalSat> {
        const modelo = signal<IRegimenFiscalSat>({ ...REGIMEN_FISCAL_SAT_VACIO, ...regimen });
        return form(modelo, (campo) => {
            required(campo.codigo, { message: 'El código es obligatorio.' });
            pattern(campo.codigo, /^\d{3}$/, { message: 'Usa 3 dígitos, por ejemplo 601.' });
            required(campo.descripcion, { message: 'La descripción es obligatoria.' });
            minLength(campo.descripcion, 2, { message: 'Escribe al menos 2 caracteres.' });
        });
    }

    private crearFila(id: number, regimen: IRegimenFiscalSat): IFilaRegimentFiscalSat {
        return { id, ...regimen, formulario: this.crearFormulario(regimen) };
    }

    private obtenerValores(formulario: FieldTree<IRegimenFiscalSat>): IRegimenFiscalSat {
        return {
            codigo: String(formulario.codigo().value() ?? '').trim(),
            descripcion: String(formulario.descripcion().value() ?? '').trim(),
            aplicaPersonaFisica: formulario.aplicaPersonaFisica().value() === true,
            aplicaPersonaMoral: formulario.aplicaPersonaMoral().value() === true,
            activo: formulario.activo().value() === true
        };
    }

    private reiniciarFormulario(formulario: FieldTree<IRegimenFiscalSat>): void {
        formulario().reset({ ...REGIMEN_FISCAL_SAT_VACIO });
    }
}
