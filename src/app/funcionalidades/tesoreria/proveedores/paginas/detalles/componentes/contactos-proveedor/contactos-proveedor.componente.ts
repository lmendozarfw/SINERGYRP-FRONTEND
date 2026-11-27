import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, pattern, required } from "@angular/forms/signals";
import { ButtonDirective } from "primeng/button";
import { Drawer } from "primeng/drawer";
import { PIcon } from "@primeicons/angular";
import { CONTACTO_PROVEEDOR_VACIO, IContactoProveedor } from "../../../../modelos/contacto-proveedor.interface";
import { CONTACTO_FORM_VACIO, FormularioContactoProveedorComponente, IContactoProveedorForm } from "../formulario-contacto-proveedor/formulario-contacto-proveedor.componente";

interface IContactoProveedorItem extends IContactoProveedor { id: number; }

@Component({
    selector: 'app-contactos-proveedor',
    templateUrl: './contactos-proveedor.componente.html',
    imports: [ButtonDirective, Drawer, FormularioContactoProveedorComponente, PIcon]
})
export class ContactosProveedorComponente {
    protected readonly formulario: FieldTree<IContactoProveedorForm> = this.crearFormulario();
    protected readonly contactos = signal<IContactoProveedorItem[]>([]);
    protected readonly drawerVisible = signal(false);
    protected readonly editandoId = signal<number | null>(null);
    protected readonly tituloDrawer = computed(() => this.editandoId() ? 'Editar contacto' : 'Nuevo contacto');

    readonly tieneInformacionPendiente = computed(() => { const f = this.formulario(); return f.dirty() || (f.touched() && f.invalid()); });
    private siguienteId = 1;

    abrirNuevo(): void { this.editandoId.set(null); this.reiniciarFormulario(this.formulario); this.drawerVisible.set(true); }
    editar(item: IContactoProveedorItem): void { this.editandoId.set(item.id); this.formulario().reset(this.aForm(item)); this.drawerVisible.set(true); }
    cerrarDrawer(): void { this.drawerVisible.set(false); this.editandoId.set(null); this.reiniciarFormulario(this.formulario); }

    guardar(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;
        const valores = this.obtenerValores(this.formulario);
        const id = this.editandoId();
        if (id) this.contactos.update(items => items.map(i => i.id === id ? { ...i, ...valores } : i));
        else this.contactos.update(items => [{ id: this.siguienteId++, ...valores }, ...items]);
        this.cerrarDrawer();
    }

    eliminar(item: IContactoProveedorItem): void { this.contactos.update(items => items.filter(i => i.id !== item.id)); }

    private crearFormulario(): FieldTree<IContactoProveedorForm> {
        const modelo = signal<IContactoProveedorForm>({ ...CONTACTO_FORM_VACIO });
        return form(modelo, (campo) => {
            required(campo.nombre, { message: 'El nombre es obligatorio.' });
            pattern(campo.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, { when: ({ value }) => !!String(value() ?? '').trim(), message: 'Ingresa un correo válido.' });
        });
    }

    private obtenerValores(formulario: FieldTree<IContactoProveedorForm>): IContactoProveedor {
        const txt = (v: unknown) => { const s = String(v ?? '').trim(); return s || null; };
        return { idProveedor: null, nombre: String(formulario.nombre().value() ?? '').trim(), puesto: txt(formulario.puesto().value()), tipoContacto: txt(formulario.tipoContacto().value()), telefono: txt(formulario.telefono().value()), email: txt(formulario.email().value()), esPrincipal: formulario.esPrincipal().value() === true, activo: formulario.activo().value() === true };
    }

    private aForm(c?: IContactoProveedor): IContactoProveedorForm {
        const b = { ...CONTACTO_PROVEEDOR_VACIO, ...c };
        return { nombre: b.nombre ?? '', puesto: b.puesto ?? '', tipoContacto: b.tipoContacto ?? '', telefono: b.telefono ?? '', email: b.email ?? '', esPrincipal: b.esPrincipal, activo: b.activo };
    }

    private reiniciarFormulario(formulario: FieldTree<IContactoProveedorForm>): void { formulario().reset({ ...CONTACTO_FORM_VACIO }); }
}
