import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, pattern, required } from "@angular/forms/signals";
import { ButtonDirective } from "primeng/button";
import { Drawer } from "primeng/drawer";
import { PIcon } from "@primeicons/angular";
import { CONTACTO_CLIENTE_VACIO, IContactoCliente } from "../../../../modelos/contacto-cliente.interface";
import { CONTACTO_FORM_VACIO, FormularioContactoClienteComponente, IContactoClienteForm } from "../formulario-contacto-cliente/formulario-contacto-cliente.componente";

interface IContactoClienteItem extends IContactoCliente { id: number; }

@Component({
    selector: 'app-contactos-cliente',
    templateUrl: './contactos-cliente.componente.html',
    imports: [ButtonDirective, Drawer, FormularioContactoClienteComponente, PIcon]
})
export class ContactosClienteComponente {
    protected readonly formulario: FieldTree<IContactoClienteForm> = this.crearFormulario();
    protected readonly contactos = signal<IContactoClienteItem[]>([]);
    protected readonly drawerVisible = signal(false);
    protected readonly editandoId = signal<number | null>(null);
    protected readonly tituloDrawer = computed(() => this.editandoId() ? 'Editar contacto' : 'Nuevo contacto');

    readonly tieneInformacionPendiente = computed(() => { const f = this.formulario(); return f.dirty() || (f.touched() && f.invalid()); });
    private siguienteId = 1;

    abrirNuevo(): void { this.editandoId.set(null); this.reiniciarFormulario(this.formulario); this.drawerVisible.set(true); }
    editar(item: IContactoClienteItem): void { this.editandoId.set(item.id); this.formulario().reset(this.aForm(item)); this.drawerVisible.set(true); }
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

    eliminar(item: IContactoClienteItem): void { this.contactos.update(items => items.filter(i => i.id !== item.id)); }

    private crearFormulario(): FieldTree<IContactoClienteForm> {
        const modelo = signal<IContactoClienteForm>({ ...CONTACTO_FORM_VACIO });
        return form(modelo, (campo) => {
            required(campo.nombre, { message: 'El nombre es obligatorio.' });
            pattern(campo.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, { when: ({ value }) => !!String(value() ?? '').trim(), message: 'Ingresa un correo válido.' });
        });
    }

    private obtenerValores(formulario: FieldTree<IContactoClienteForm>): IContactoCliente {
        const txt = (v: unknown) => { const s = String(v ?? '').trim(); return s || null; };
        return { idCliente: null, nombre: String(formulario.nombre().value() ?? '').trim(), puesto: txt(formulario.puesto().value()), tipoContacto: txt(formulario.tipoContacto().value()), telefono: txt(formulario.telefono().value()), email: txt(formulario.email().value()), esPrincipal: formulario.esPrincipal().value() === true, activo: formulario.activo().value() === true };
    }

    private aForm(c?: IContactoCliente): IContactoClienteForm {
        const b = { ...CONTACTO_CLIENTE_VACIO, ...c };
        return { nombre: b.nombre ?? '', puesto: b.puesto ?? '', tipoContacto: b.tipoContacto ?? '', telefono: b.telefono ?? '', email: b.email ?? '', esPrincipal: b.esPrincipal, activo: b.activo };
    }

    private reiniciarFormulario(formulario: FieldTree<IContactoClienteForm>): void { formulario().reset({ ...CONTACTO_FORM_VACIO }); }
}
