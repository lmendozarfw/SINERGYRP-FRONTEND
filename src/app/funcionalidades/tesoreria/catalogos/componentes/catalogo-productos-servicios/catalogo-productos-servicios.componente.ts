import { DatePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, FormField, minLength, pattern, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { ButtonDirective } from "primeng/button";
import { DatePicker } from "primeng/datepicker";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { CellEditor, EditableColumn, Table } from "primeng/table";
import { Tag } from "primeng/tag";
import { IFilaProductoServicioSat, IFilaVistaProductoServicioSat, IProductoServicioSat, PRODUCTO_SERVICIO_SAT_VACIO } from "../../modelos/producto-servicio-sat.interface";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { CatalogoVacioComponente } from "../catalogo-vacio/catalogo-vacio.componente";

@Component({
    selector: 'app-catalogo-productos-servicios',
    templateUrl: './catalogo-productos-servicios.componente.html',
    imports: [
        ButtonDirective,
        CatalogoVacioComponente,
        CellEditor,
        DatePicker,
        DatePipe,
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
export class CatalogoProductosServiciosComponente {
    readonly titulo = 'Productos y servicios del SAT';
    readonly descripcion = 'Administra los códigos de productos y servicios utilizados en la facturación electrónica.';
    readonly estatus = [
        { label: 'Activo', value: true },
        { label: 'Inactivo', value: false }
    ];

    protected readonly formulario: FieldTree<IProductoServicioSat> = this.crearFormulario();
    protected readonly productosServicios = signal<IFilaProductoServicioSat[]>([
        this.crearFila(1, { codigo: '01010101', nombre: 'No categorizado', descripcion: 'Producto o servicio sin clasificación.', fechaInicioVigencia: new Date('2012-01-01'), fechaFinVigencia: null, activo: true }),
        this.crearFila(2, { codigo: '43211500', nombre: 'Computadoras portátiles', descripcion: 'Equipos de cómputo portátiles.', fechaInicioVigencia: new Date('2012-01-01'), fechaFinVigencia: null, activo: true }),
        this.crearFila(3, { codigo: '80111600', nombre: 'Servicios de consultoría', descripcion: 'Servicios profesionales de consultoría.', fechaInicioVigencia: new Date('2012-01-01'), fechaFinVigencia: null, activo: false })
    ]);
    protected readonly filas = computed<IFilaVistaProductoServicioSat[]>(() => [
        { id: 0, ...PRODUCTO_SERVICIO_SAT_VACIO, formulario: this.formulario, esNueva: true },
        ...this.productosServicios().map(productoServicio => ({ ...productoServicio, esNueva: false }))
    ]);

    private siguienteId = 4;

    guardarProductoServicio(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.productosServicios.update(productos => [this.crearFila(this.siguienteId++, valores), ...productos]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(productoServicio: IFilaProductoServicioSat): void {
        productoServicio.formulario().markAsTouched();
        if (productoServicio.formulario().invalid()) return;

        this.productosServicios.update(productos => productos.map(item =>
            item.id === productoServicio.id ? { ...item, ...this.obtenerValores(productoServicio.formulario) } : item
        ));
        productoServicio.formulario().reset();
    }

    eliminarProductoServicio(productoServicio: IFilaProductoServicioSat): void {
        this.productosServicios.update(productos => productos.filter(item => item.id !== productoServicio.id));
    }

    private crearFormulario(productoServicio?: IProductoServicioSat): FieldTree<IProductoServicioSat> {
        const modelo = signal<IProductoServicioSat>({ ...PRODUCTO_SERVICIO_SAT_VACIO, ...productoServicio });
        return form(modelo, (campo) => {
            required(campo.codigo, { message: 'El código es obligatorio.' });
            pattern(campo.codigo, /^\d{8}$/, { message: 'Usa 8 dígitos, por ejemplo 01010101.' });
            required(campo.nombre, { message: 'El nombre es obligatorio.' });
            minLength(campo.nombre, 2, { message: 'Escribe al menos 2 caracteres.' });
        });
    }

    private crearFila(id: number, productoServicio: IProductoServicioSat): IFilaProductoServicioSat {
        return { id, ...productoServicio, formulario: this.crearFormulario(productoServicio) };
    }

    private obtenerValores(formulario: FieldTree<IProductoServicioSat>): IProductoServicioSat {
        const fechaInicio = formulario.fechaInicioVigencia().value();
        const fechaFin = formulario.fechaFinVigencia().value();
        return {
            codigo: String(formulario.codigo().value() ?? '').trim(),
            nombre: String(formulario.nombre().value() ?? '').trim(),
            descripcion: String(formulario.descripcion().value() ?? '').trim(),
            fechaInicioVigencia: fechaInicio instanceof Date ? fechaInicio : null,
            fechaFinVigencia: fechaFin instanceof Date ? fechaFin : null,
            activo: formulario.activo().value() === true
        };
    }

    private reiniciarFormulario(formulario: FieldTree<IProductoServicioSat>): void {
        formulario().reset({ ...PRODUCTO_SERVICIO_SAT_VACIO });
    }
}
