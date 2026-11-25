import { Component, computed, signal } from "@angular/core";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";
import { ESTADO_VACIO, IEstado, IFilaEstado, IFilaVistaEstado } from "../../modelos/estado.interface";
import { FieldTree, form, minLength, pattern, required, FormField } from "@angular/forms/signals";
import { Table, EditableColumn, CellEditor } from "primeng/table";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";

@Component({
    selector: 'app-catalogo-estados',
    imports: [CatalogoVacioComponente, Table, MensajeAyudaErrorComponente, EditableColumn, CellEditor, FormField, PIcon, ButtonDirective, InputText, Select],
    templateUrl: './catalogo-estados.componente.html'
})
export class CatalogoEstadosComponente {
    readonly titulo = 'Estados';
    readonly descripcion = 'Administra los estados o entidades federativas relacionados a cada país.';

    protected readonly formulario: FieldTree<IEstado> = this.crearFormulario();
    protected readonly estados = signal<IFilaEstado[]>([
        this.crearFila(1, { idPais: 1, codigoEstado: 'GTO', nombre: 'Guanajuato' })
    ]);
    protected readonly filas = computed<IFilaVistaEstado[]>(() => [
        { id: 0, ...ESTADO_VACIO, formulario: this.formulario, esNueva: true },
        ... this.estados().map(fila => ({ ...fila, esNueva: false }))
    ]);
    readonly paises = [
        { label: 'México', value: 1 },
        { label: 'Estados unidos de Ámerica', value: 2 }
    ];

    private siguienteId = 2;

    guardarEstado(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.estados.update(estados => [this.crearFila(this.siguienteId++, valores), ...estados]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(estado: IFilaEstado): void {
        estado.formulario().markAsTouched();
        if (estado.formulario().invalid()) return;

        this.estados.update(estados => estados.map(item =>
            item.id === estado.id ? { ...item, ...this.obtenerValores(estado.formulario) } : item
        ));
        estado.formulario().reset();
    }

    eliminarEstado(estado: IFilaEstado): void {
        this.estados.update(estados => estados.filter(item => item.id !== estado.id));
    }

    obtenerNombrePais(idPais: number | null): string {
        return this.paises.find(pais => pais.value === idPais)?.label ?? 'Sin país';
    }

    private crearFormulario(estado?: IEstado): FieldTree<IEstado> {
        const modelo = signal<IEstado>({ ...ESTADO_VACIO, ...estado });
        return form(modelo, (campo) => {
            required(campo.codigoEstado, { message: 'El código de estado es obligatorio.' });
            pattern(campo.codigoEstado, /^[A-Za-z]{2,5}$/, { message: 'Usa de 2 a 5 letras.' });
            required(campo.nombre, { message: 'El nombre es obligatorio.' });
            minLength(campo.nombre, 2, { message: 'Escribe al menos 2 caracteres.' });
            required(campo.idPais, { message: 'El id de país es obligatorio.' });
        });
    }

    private crearFila(id: number, estado: IEstado): IFilaEstado {
        return { id, ...estado, formulario: this.crearFormulario(estado) };
    }

    private obtenerValores(formulario: FieldTree<IEstado>): IEstado {
        const idPais = formulario.idPais().value();
        return {
            idPais: typeof idPais === 'number' ? idPais : null,
            codigoEstado: String(formulario.codigoEstado().value() ?? '').trim().toUpperCase(),
            nombre: String(formulario.nombre().value() ?? '').trim()
        };
    }

    private reiniciarFormulario(formulario: FieldTree<IEstado>): void {
        formulario().reset({ ...ESTADO_VACIO });
    }
}
