import { Component, computed, inject, Injector, signal } from "@angular/core";
import { FieldTree, form, FormField, pattern, required } from "@angular/forms/signals";
import { ButtonDirective } from "primeng/button";
import { Drawer } from "primeng/drawer";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { PIcon } from "@primeicons/angular";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { CUENTA_BANCARIA_PROVEEDOR_VACIA, ICuentaBancariaProveedor, IFilaCuentaBancariaProveedor } from "../../../../modelos/cuenta-bancaria-proveedor.interface";
import { TarjetaCreditoComponente } from "@compartido/componentes/tarjeta-credito/tarjeta-credito.componente";

@Component({
    selector: 'app-cuentas-bancarias-proveedor',
    templateUrl: './cuentas-bancarias-proveedor.componente.html',
    imports: [ButtonDirective, Drawer, EtiquetaFormularioComponente, FormField, InputText, MensajeAyudaErrorComponente, PIcon, Select, TarjetaCreditoComponente]
})
export class CuentasBancariasProveedorComponente {
    private readonly injector = inject(Injector);

    readonly opcionesSiNo = [{ label: 'Sí', value: true }, { label: 'No', value: false }];
    readonly opcionesMoneda = [{ label: 'MXN', value: 1 }, { label: 'USD', value: 2 }];
    readonly opcionesBanco = [
        { label: 'BBVA', value: 'BBVA' },
        { label: 'Citibanamex', value: 'Citibanamex' },
        { label: 'BanBajío', value: 'BanBajío' },
        { label: 'Otro banco', value: 'Otro' }
    ];

    protected readonly formulario: FieldTree<ICuentaBancariaProveedor> = this.crearFormulario();
    protected readonly cuentas = signal<IFilaCuentaBancariaProveedor[]>([]);
    protected readonly drawerVisible = signal(false);
    protected readonly editandoId = signal<number | null>(null);
    protected readonly tituloDrawer = computed(() => this.editandoId() ? 'Editar cuenta bancaria' : 'Nueva cuenta bancaria');

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

    editar(item: IFilaCuentaBancariaProveedor): void {
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
            this.cuentas.update(items => items.map(i => i.id === id ? { ...i, ...valores } : i));
        }
        else {
            this.cuentas.update(items => [this.crearFila(this.siguienteId++, valores), ...items]);
        }
        this.cerrarDrawer();
    }

    eliminar(item: IFilaCuentaBancariaProveedor): void {
        this.cuentas.update(items => items.filter(i => i.id !== item.id));
    }

    private crearFormulario(cuenta?: ICuentaBancariaProveedor): FieldTree<ICuentaBancariaProveedor> {
        const modelo = signal<ICuentaBancariaProveedor>({ ...CUENTA_BANCARIA_PROVEEDOR_VACIA, ...cuenta });
        return form(modelo, (campo) => {
            required(campo.banco, { message: 'El banco es obligatorio.' });
            required(campo.idMoneda, { message: 'La moneda es obligatoria.' });
            pattern(campo.numeroCuenta, /^[0-9]{16}$/, { message: 'Deben ser 16 números.' });
        }, { injector: this.injector });
    }

    private obtenerValores(formulario: FieldTree<ICuentaBancariaProveedor>): ICuentaBancariaProveedor {
        const idMoneda = formulario.idMoneda().value();
        return {
            idProveedor: null,
            banco: String(formulario.banco().value() ?? '').trim(),
            nombreCuenta: String(formulario.nombreCuenta().value()),
            titularCuenta: String(formulario.titularCuenta().value()),
            numeroCuenta: String(formulario.numeroCuenta().value()),
            clabe: String(formulario.clabe().value()),
            idMoneda: typeof idMoneda === 'number' ? idMoneda : null,
            activa: formulario.activa().value() === true,
            observaciones: String(formulario.observaciones().value())
        };
    }

    private aForm(cuenta: ICuentaBancariaProveedor): ICuentaBancariaProveedor {
        return {
            idProveedor: cuenta.idProveedor ?? null,
            banco: cuenta.banco ?? '',
            nombreCuenta: cuenta.nombreCuenta ?? '',
            titularCuenta: cuenta.titularCuenta ?? '',
            numeroCuenta: cuenta.numeroCuenta ?? '',
            clabe: cuenta.clabe ?? '',
            idMoneda: cuenta.idMoneda ?? null,
            activa: cuenta.activa === true,
            observaciones: cuenta.observaciones ?? ''
        };
    }

    private crearFila(id: number, cuenta: ICuentaBancariaProveedor): IFilaCuentaBancariaProveedor {
        return { id, ...cuenta, formulario: this.crearFormulario(cuenta) };
    }

    private reiniciarFormulario(formulario: FieldTree<ICuentaBancariaProveedor>): void {
        formulario().reset({ ...CUENTA_BANCARIA_PROVEEDOR_VACIA });
    }
}
