import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, required } from "@angular/forms/signals";
import { ButtonDirective } from "primeng/button";
import { Drawer } from "primeng/drawer";
import { PIcon } from "@primeicons/angular";
import { DOMICILIO_PROVEEDOR_VACIO, IDomicilioProveedor } from "../../../../modelos/domicilio-proveedor.interface";
import { DOM_FORM_VACIO, FormularioDomicilioProveedorComponente, IDomicilioProveedorForm } from "../formulario-domicilio-proveedor/formulario-domicilio-proveedor.componente";

interface IDomicilioProveedorItem extends IDomicilioProveedor { id: number; }

@Component({
    selector: 'app-domicilios-proveedor',
    templateUrl: './domicilios-proveedor.componente.html',
    imports: [ButtonDirective, Drawer, FormularioDomicilioProveedorComponente, PIcon]
})
export class DomiciliosProveedorComponente {
    protected readonly formulario: FieldTree<IDomicilioProveedorForm> = this.crearFormulario();
    protected readonly domicilios = signal<IDomicilioProveedorItem[]>([]);
    protected readonly drawerVisible = signal(false);
    protected readonly editandoId = signal<number | null>(null);
    protected readonly tituloDrawer = computed(() => this.editandoId() ? 'Editar domicilio' : 'Nuevo domicilio');

    readonly tieneInformacionPendiente = computed(() => { const f = this.formulario(); return f.dirty() || (f.touched() && f.invalid()); });
    private siguienteId = 1;

    abrirNuevo(): void { this.editandoId.set(null); this.reiniciarFormulario(this.formulario); this.drawerVisible.set(true); }
    editar(item: IDomicilioProveedorItem): void { this.editandoId.set(item.id); this.formulario().reset(this.aForm(item)); this.drawerVisible.set(true); }
    cerrarDrawer(): void { this.drawerVisible.set(false); this.editandoId.set(null); this.reiniciarFormulario(this.formulario); }

    guardar(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;
        const valores = this.obtenerValores(this.formulario);
        const id = this.editandoId();
        if (id) this.domicilios.update(items => items.map(i => i.id === id ? { ...i, ...valores } : i));
        else this.domicilios.update(items => [{ id: this.siguienteId++, ...valores }, ...items]);
        this.cerrarDrawer();
    }

    eliminar(item: IDomicilioProveedorItem): void { this.domicilios.update(items => items.filter(i => i.id !== item.id)); }

    obtenerDireccion(item: IDomicilioProveedorItem): string {
        const partes = [item.calle, item.numeroExterior, item.numeroInterior ? `Int. ${item.numeroInterior}` : null].filter(Boolean);
        return partes.length ? partes.join(' ') : 'Sin dirección';
    }

    obtenerUbicacion(item: IDomicilioProveedorItem): string {
        return [item.colonia, item.codigoPostal ? `CP ${item.codigoPostal}` : null, item.localidad].filter(Boolean).join(' · ');
    }

    private crearFormulario(): FieldTree<IDomicilioProveedorForm> {
        const modelo = signal<IDomicilioProveedorForm>({ ...DOM_FORM_VACIO });
        return form(modelo, (campo) => { required(campo.tipoDomicilio, { message: 'El tipo de domicilio es obligatorio.' }); });
    }

    private obtenerValores(formulario: FieldTree<IDomicilioProveedorForm>): IDomicilioProveedor {
        const txt = (v: unknown) => { const s = String(v ?? '').trim(); return s || null; };
        return { idProveedor: null, tipoDomicilio: String(formulario.tipoDomicilio().value() ?? '').trim(), alias: txt(formulario.alias().value()), nombreReceptor: txt(formulario.nombreReceptor().value()), calle: txt(formulario.calle().value()), numeroExterior: txt(formulario.numeroExterior().value()), numeroInterior: txt(formulario.numeroInterior().value()), colonia: txt(formulario.colonia().value()), codigoPostal: txt(formulario.codigoPostal().value()), localidad: txt(formulario.localidad().value()), idMunicipio: null, telefono: txt(formulario.telefono().value()), referencias: txt(formulario.referencias().value()), esPrincipal: formulario.esPrincipal().value() === true, activo: formulario.activo().value() === true };
    }

    private aForm(d?: IDomicilioProveedor): IDomicilioProveedorForm {
        const b = { ...DOMICILIO_PROVEEDOR_VACIO, ...d };
        return { tipoDomicilio: b.tipoDomicilio ?? '', alias: b.alias ?? '', nombreReceptor: b.nombreReceptor ?? '', calle: b.calle ?? '', numeroExterior: b.numeroExterior ?? '', numeroInterior: b.numeroInterior ?? '', colonia: b.colonia ?? '', codigoPostal: b.codigoPostal ?? '', localidad: b.localidad ?? '', telefono: b.telefono ?? '', referencias: b.referencias ?? '', esPrincipal: b.esPrincipal, activo: b.activo };
    }

    private reiniciarFormulario(formulario: FieldTree<IDomicilioProveedorForm>): void { formulario().reset({ ...DOM_FORM_VACIO }); }
}
