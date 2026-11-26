import { Component, computed, signal } from "@angular/core";
import { FieldTree, FormField, form, min } from "@angular/forms/signals";
import { ButtonDirective } from "primeng/button";
import { InputNumber } from "primeng/inputnumber";
import { Select } from "primeng/select";
import { Textarea } from "primeng/textarea";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { IOpcionSelector } from "@compartido/interfaces/selector.interface";

interface IConfiguracionCreditoProveedorForm {
    idMonedaPredeterminada: string;
    idFormaPagoPredeterminada: string;
    idMetodoPagoPredeterminado: string;
    limiteCredito: number | null;
    diasCredito: number | null;
    esPagoContrarecibo: boolean;
    observaciones: string;
}

const CONFIGURACION_CREDITO_VACIO: IConfiguracionCreditoProveedorForm = {
    idMonedaPredeterminada: '',
    idFormaPagoPredeterminada: '',
    idMetodoPagoPredeterminado: '',
    limiteCredito: null,
    diasCredito: null,
    esPagoContrarecibo: false,
    observaciones: ''
};

@Component({
    selector: 'app-configuracion-credito-proveedor',
    templateUrl: './configuracion-credito-proveedor.componente.html',
    imports: [ButtonDirective, EtiquetaFormularioComponente, FormField, InputNumber, MensajeAyudaErrorComponente, Select, Textarea]
})
export class ConfiguracionCreditoProveedorComponente {
    readonly opcionesMoneda: IOpcionSelector[] = [
        { etiqueta: 'MXN · Peso mexicano', valor: '1' },
        { etiqueta: 'USD · Dólar estadounidense', valor: '2' }
    ];
    readonly opcionesFormaPago: IOpcionSelector[] = [
        { etiqueta: '01 · Efectivo', valor: '1' },
        { etiqueta: '03 · Transferencia electrónica', valor: '3' },
        { etiqueta: '04 · Tarjeta de crédito', valor: '4' }
    ];
    readonly opcionesMetodoPago: IOpcionSelector[] = [
        { etiqueta: 'PUE · Pago en una sola exhibición', valor: '1' },
        { etiqueta: 'PPD · Pago en parcialidades o diferido', valor: '2' }
    ];
    readonly opcionesContrarecibo = [
        { etiqueta: 'Sí', valor: true },
        { etiqueta: 'No', valor: false }
    ];

    protected readonly formulario: FieldTree<IConfiguracionCreditoProveedorForm> = this.crearFormulario();
    readonly tieneInformacionPendiente = computed(() => {
        const estado = this.formulario();
        return estado.invalid() || estado.dirty();
    });

    guardar(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;
        this.formulario().reset(this.obtenerValores());
    }

    private crearFormulario(): FieldTree<IConfiguracionCreditoProveedorForm> {
        const modelo = signal<IConfiguracionCreditoProveedorForm>({ ...CONFIGURACION_CREDITO_VACIO });
        return form(modelo, (campo) => {
            min(campo.limiteCredito, 0, { message: 'El límite de crédito no puede ser negativo.' });
            min(campo.diasCredito, 0, { message: 'Los días de crédito no pueden ser negativos.' });
        });
    }

    private obtenerValores(): IConfiguracionCreditoProveedorForm {
        return {
            idMonedaPredeterminada: String(this.formulario.idMonedaPredeterminada().value() ?? ''),
            idFormaPagoPredeterminada: String(this.formulario.idFormaPagoPredeterminada().value() ?? ''),
            idMetodoPagoPredeterminado: String(this.formulario.idMetodoPagoPredeterminado().value() ?? ''),
            limiteCredito: this.aNumero(this.formulario.limiteCredito().value()),
            diasCredito: this.aNumero(this.formulario.diasCredito().value()),
            esPagoContrarecibo: Boolean(this.formulario.esPagoContrarecibo().value()),
            observaciones: String(this.formulario.observaciones().value() ?? '').trim()
        };
    }

    private aNumero(valor: unknown): number | null {
        if (valor === null || valor === undefined || valor === '') return null;
        const numero = Number(valor);
        return Number.isNaN(numero) ? null : numero;
    }
}
