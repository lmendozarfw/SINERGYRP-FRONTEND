import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, FormField, pattern, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { ButtonDirective } from "primeng/button";
import { Drawer } from "primeng/drawer";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { TarjetaCreditoComponente } from "@compartido/componentes/tarjeta-credito/tarjeta-credito.componente";
import { CUENTA_BANCARIA_CXC_VACIA, ICuentaBancariaCxc, ICuentaBancariaCxcItem } from "../../../../modelos/cuenta-bancaria-cxc.interface";

@Component({
    selector: 'app-configuracion-cuentas-bancarias-cxc',
    templateUrl: './configuracion-cuentas-bancarias-cxc.componente.html',
    imports: [ButtonDirective, Drawer, EtiquetaFormularioComponente, FormField, InputText, MensajeAyudaErrorComponente, PIcon, Select, TarjetaCreditoComponente]
})
export class ConfiguracionCuentasBancariasCxcComponente {
    readonly opcionesSiNo = [{ label: 'Sí', value: true }, { label: 'No', value: false }];
    readonly opcionesMoneda = [{ label: 'MXN', value: 1 }, { label: 'USD', value: 2 }];
    readonly opcionesBanco = [
        { label: 'BBVA', value: 'BBVA' },
        { label: 'Citibanamex', value: 'Citibanamex' },
        { label: 'BanBajío', value: 'BanBajío' },
        { label: 'Otro banco', value: 'Otro' }
    ];

    protected readonly formulario: FieldTree<ICuentaBancariaCxc> = this.crearFormulario();
    protected readonly cuentas = signal<ICuentaBancariaCxcItem[]>([
        {
            id: 1,
            idOrganizacion: 1,
            banco: 'BBVA',
            nombreCuenta: 'Cuenta principal MXN',
            titularCuenta: 'SinergyRP S.A. de C.V.',
            clabe: '012180001234567890',
            idMoneda: 1,
            activa: true
        },
        {
            id: 2,
            idOrganizacion: 1,
            banco: 'Citibanamex',
            nombreCuenta: 'Cuenta dólares',
            titularCuenta: 'SinergyRP S.A. de C.V.',
            clabe: '044180001234567891',
            idMoneda: 2,
            activa: false
        }
    ]);
    protected readonly drawerVisible = signal(false);
    protected readonly editandoId = signal<number | null>(null);
    protected readonly tituloDrawer = computed(() => this.editandoId() ? 'Editar cuenta bancaria' : 'Nueva cuenta bancaria');

    private siguienteId = 3;

    abrirNuevo(): void {
        this.editandoId.set(null);
        this.reiniciarFormulario(this.formulario);
        this.drawerVisible.set(true);
    }

    editar(item: ICuentaBancariaCxcItem): void {
        this.editandoId.set(item.id);
        this.formulario().reset(this.aForm(item));
        this.drawerVisible.set(true);
    }

    cerrarDrawer(): void {
        this.drawerVisible.set(false);
        this.editandoId.set(null);
        this.reiniciarFormulario(this.formulario);
    }

    guardar(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) {
            return;
        }
        const valores = this.obtenerValores(this.formulario);
        const id = this.editandoId();
        if (id) {
            this.cuentas.update(items => items.map(item => item.id === id ? { ...item, ...valores } : item));
        }
        else {
            this.cuentas.update(items => [{ id: this.siguienteId++, ...valores }, ...items]);
        }
        this.cerrarDrawer();
    }

    eliminar(item: ICuentaBancariaCxcItem): void {
        this.cuentas.update(items => items.filter(i => i.id !== item.id));
    }

    obtenerNombreMoneda(idMoneda: unknown): string {
        return this.opcionesMoneda.find(opcion => opcion.value === idMoneda)?.label ?? '—';
    }

    texto(valor: unknown): string {
        return String(valor ?? '');
    }

    private crearFormulario(cuenta?: ICuentaBancariaCxc): FieldTree<ICuentaBancariaCxc> {
        const modelo = signal<ICuentaBancariaCxc>({ ...CUENTA_BANCARIA_CXC_VACIA, ...cuenta });
        return form(modelo, (campo) => {
            required(campo.banco, { message: 'El banco es obligatorio.' });
            required(campo.idMoneda, { message: 'La moneda es obligatoria.' });
            pattern(campo.clabe, /^\d{18}$/, { message: 'La CLABE debe tener 18 dígitos.' });
        });
    }

    private aForm(item: ICuentaBancariaCxc): ICuentaBancariaCxc {
        return {
            idOrganizacion: item.idOrganizacion,
            banco: item.banco,
            nombreCuenta: item.nombreCuenta,
            titularCuenta: item.titularCuenta,
            clabe: item.clabe,
            idMoneda: item.idMoneda,
            activa: item.activa
        };
    }

    private obtenerValores(formulario: FieldTree<ICuentaBancariaCxc>): ICuentaBancariaCxc {
        const idMoneda = formulario.idMoneda().value();
        return {
            idOrganizacion: 1,
            banco: String(formulario.banco().value() ?? '').trim(),
            nombreCuenta: String(formulario.nombreCuenta().value() ?? '').trim(),
            titularCuenta: String(formulario.titularCuenta().value() ?? '').trim(),
            clabe: String(formulario.clabe().value() ?? '').trim(),
            idMoneda: typeof idMoneda === 'number' ? idMoneda : null,
            activa: formulario.activa().value() === true
        };
    }

    private reiniciarFormulario(formulario: FieldTree<ICuentaBancariaCxc>): void {
        formulario().reset({ ...CUENTA_BANCARIA_CXC_VACIA });
    }
}
