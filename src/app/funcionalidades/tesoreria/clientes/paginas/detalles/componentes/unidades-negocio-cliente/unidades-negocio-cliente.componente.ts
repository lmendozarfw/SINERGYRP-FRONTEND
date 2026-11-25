import { Component, computed, signal } from "@angular/core";
import { DatePipe } from '@angular/common';
import { FieldTree, FormField, form, required } from "@angular/forms/signals";
import { ButtonDirective } from "primeng/button";
import { DatePicker } from "primeng/datepicker";
import { Drawer } from "primeng/drawer";
import { Select } from "primeng/select";
import { PIcon } from "@primeicons/angular";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { CLIENTE_UNIDAD_NEGOCIO_VACIO, IUnidadNegocioCliente } from "../../../../modelos/unidad-negocio-cliente.interface";

interface IUnidadNegocioClienteItem extends IUnidadNegocioCliente { id: number; }

@Component({
    selector: 'app-unidades-negocio-cliente',
    templateUrl: './unidades-negocio-cliente.componente.html',
    imports: [DatePipe, ButtonDirective, DatePicker, Drawer, EtiquetaFormularioComponente, FormField, MensajeAyudaErrorComponente, PIcon, Select]
})
export class UnidadesNegocioClienteComponente {
    readonly opcionesUnidadNegocio = [
        { label: 'Manufactura', value: 1 },
        { label: 'Comercialización', value: 2 },
        { label: 'Servicios', value: 3 }
    ];
    readonly opcionesPrincipal = [{ label: 'Sí', value: true }, { label: 'No', value: false }];

    protected readonly formulario: FieldTree<IUnidadNegocioCliente> = this.crearFormulario();
    protected readonly unidades = signal<IUnidadNegocioClienteItem[]>([]);
    protected readonly drawerVisible = signal(false);
    protected readonly editandoId = signal<number | null>(null);
    protected readonly tituloDrawer = computed(() => this.editandoId() ? 'Editar unidad de negocio' : 'Nueva unidad de negocio');

    readonly tieneInformacionPendiente = computed(() => {
        const f = this.formulario();
        return f.dirty() || (f.touched() && f.invalid());
    });

    private siguienteId = 1;

    abrirNuevo(): void {
        this.editandoId.set(null);
        this.reiniciarFormulario(this.formulario);
        this.drawerVisible.set(true);
    }

    editar(unidad: IUnidadNegocioClienteItem): void {
        this.editandoId.set(unidad.id);
        this.formulario().reset({ ...unidad });
        this.drawerVisible.set(true);
    }

    cerrarDrawer(): void {
        this.drawerVisible.set(false);
        this.editandoId.set(null);
        this.reiniciarFormulario(this.formulario);
    }

    guardar(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;
        const valores = this.obtenerValores(this.formulario);
        const id = this.editandoId();
        if (id) {
            this.unidades.update(items => items.map(i => i.id === id ? { ...i, ...valores } : i));
        } else {
            this.unidades.update(items => [{ id: this.siguienteId++, ...valores }, ...items]);
        }
        this.cerrarDrawer();
    }

    eliminar(unidad: IUnidadNegocioClienteItem): void {
        this.unidades.update(items => items.filter(i => i.id !== unidad.id));
    }

    obtenerNombreUnidad(idUnidadNegocio: number | null): string {
        return this.opcionesUnidadNegocio.find(o => o.value === idUnidadNegocio)?.label ?? 'Sin unidad';
    }

    private crearFormulario(): FieldTree<IUnidadNegocioCliente> {
        const modelo = signal<IUnidadNegocioCliente>({ ...CLIENTE_UNIDAD_NEGOCIO_VACIO });
        return form(modelo, (campo) => {
            required(campo.idUnidadNegocio, { message: 'Selecciona una unidad de negocio.' });
            required(campo.fechaInicio, { message: 'La fecha de inicio es obligatoria.' });
        });
    }

    private obtenerValores(formulario: FieldTree<IUnidadNegocioCliente>): IUnidadNegocioCliente {
        const idUnidadNegocio = formulario.idUnidadNegocio().value();
        return {
            idCliente: null,
            idUnidadNegocio: typeof idUnidadNegocio === 'number' ? idUnidadNegocio : null,
            esPrincipal: formulario.esPrincipal().value() === true,
            fechaInicio: this.normalizarFecha(formulario.fechaInicio().value()),
            fechaFin: this.normalizarFecha(formulario.fechaFin().value())
        };
    }

    private normalizarFecha(valor: unknown): Date | null {
        if (!valor) return null;
        if (valor instanceof Date) return valor;
        const fecha = new Date(String(valor));
        return Number.isNaN(fecha.getTime()) ? null : fecha;
    }

    private reiniciarFormulario(formulario: FieldTree<IUnidadNegocioCliente>): void {
        formulario().reset({ ...CLIENTE_UNIDAD_NEGOCIO_VACIO });
    }
}
