import { Component, computed, inject, Injector, signal } from "@angular/core";
import { FieldTree, form, pattern, required } from "@angular/forms/signals";
import { ButtonDirective } from "primeng/button";
import { Drawer } from "primeng/drawer";
import { PIcon } from "@primeicons/angular";
import { CUENTA_BANCARIA_CLIENTE_VACIA, ICuentaBancariaCliente, IFilaCuentaBancariaCliente } from "../../../../modelos/cuenta-bancaria-cliente.interface";
import { TarjetaCreditoComponente } from "@compartido/componentes/tarjeta-credito/tarjeta-credito.componente";
import { FormularioCuentaBancariaClienteComponente } from "../formulario-cuenta-bancaria-cliente/formulario-cuenta-bancaria-cliente.componente";

@Component({
    selector: 'app-cuentas-bancarias-cliente',
    templateUrl: './cuentas-bancarias-cliente.componente.html',
    imports: [ButtonDirective, Drawer, FormularioCuentaBancariaClienteComponente, PIcon, TarjetaCreditoComponente]
})
export class CuentasBancariasClienteComponente {
    // este injector es solo temporal, cuando se aplique funcionalidad se va a quitar
    private readonly injector = inject(Injector);

    protected readonly formulario: FieldTree<ICuentaBancariaCliente> = this.crearFormulario();
    protected readonly cuentas = signal<IFilaCuentaBancariaCliente[]>([]);
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

    editar(item: IFilaCuentaBancariaCliente): void {
        this.editandoId.set(item.id);
        // this.formulario().reset(this.aForm(item)); 
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
        console.log({ valores });
        const id = this.editandoId();
        console.log({ id });
        if (id) {
            this.cuentas.update(items => items.map(i => i.id === id ? { ...i, ...valores } : i));
        }
        else {
            const fila = this.crearFila(this.siguienteId++, valores);
            console.log({ fila });
            this.cuentas.update(items => [fila, ...items]);
        }
        this.cerrarDrawer();
    }

    eliminar(item: IFilaCuentaBancariaCliente): void {
        this.cuentas.update(items => items.filter(i => i.id !== item.id));
    }

    private crearFormulario(cuenta?: ICuentaBancariaCliente): FieldTree<ICuentaBancariaCliente> {
        const modelo = signal<ICuentaBancariaCliente>({ ...CUENTA_BANCARIA_CLIENTE_VACIA, ...cuenta });
        return form(modelo, (campo) => {
            required(campo.banco, { message: 'El banco es obligatorio.' });
            required(campo.idMoneda, { message: 'La moneda es obligatoria.' });
            pattern(campo.numeroCuenta, /^[0-9]{16}$/, { message: 'Deben ser 16 números.' });
        }, { injector: this.injector });
    }

    private obtenerValores(formulario: FieldTree<ICuentaBancariaCliente>): ICuentaBancariaCliente {
        const idMoneda = formulario.idMoneda().value();
        return {
            idCliente: null,
            banco: String(formulario.banco().value() ?? '').trim(),
            nombreCuenta: String(formulario.nombreCuenta().value()),
            titularCuenta: String(formulario.titularCuenta().value()),
            numeroCuenta: String(formulario.numeroCuenta().value()),
            clabe: String(formulario.clabe().value()),
            idMoneda: typeof idMoneda === 'number' ?
                idMoneda : null, activa: formulario.activa().value() === true,
            observaciones: String(formulario.observaciones().value())
        };
    }

    private crearFila(id: number, cuenta: ICuentaBancariaCliente): IFilaCuentaBancariaCliente {
        return { id, ...cuenta, formulario: this.crearFormulario(cuenta) };
    }

    private reiniciarFormulario(formulario: FieldTree<ICuentaBancariaCliente>): void {
        formulario().reset({ ...CUENTA_BANCARIA_CLIENTE_VACIA });
    }
}
