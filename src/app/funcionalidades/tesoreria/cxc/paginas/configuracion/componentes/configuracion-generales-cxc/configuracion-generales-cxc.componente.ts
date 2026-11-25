import { Component, signal } from "@angular/core";
import { FieldTree, FormField, form, required } from "@angular/forms/signals";
import { CONFIGURACION_GENERAL_CXC_VACIA, IConfiguracionCxp } from "@funcionalidades/tesoreria/cxc/modelos/configuracion-cxc.interface";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { TarjetaComponente } from "@compartido/componentes/tarjeta/tarjeta.componente";
import { ButtonDirective } from "primeng/button";
import { Checkbox } from "primeng/checkbox";
import { InputNumber } from "primeng/inputnumber";
import { Select } from "primeng/select";

@Component({
    selector: 'app-configuracion-general-cxc',
    templateUrl: './configuracion-generales-cxc.componente.html',
    imports: [
        ButtonDirective,
        Checkbox,
        EtiquetaFormularioComponente,
        FormField,
        InputNumber,
        MensajeAyudaErrorComponente,
        Select,
        TarjetaComponente
    ]
})
export class ConfiguracionGeneralCxcComponente {
    protected readonly opcionesMoneda = [
        { etiqueta: 'MXN · Peso mexicano', valor: 1 },
        { etiqueta: 'USD · Dólar estadounidense', valor: 2 },
        { etiqueta: 'EUR · Euro', valor: 3 }
    ];

    protected readonly formulario = this.crearFormulario();

    constructor() {}

    guardar(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores: IConfiguracionCxp = {
            permitirPagoMayorSaldo: Boolean(this.formulario.permitirPagoMayorSaldo().value()),
            idMonedaBase: this.formulario.idMonedaBase().value() ?? null,
            diasToleranciaVencimiento: Number(this.formulario.diasToleranciaVencimiento().value() ?? 0)
        };
        this.formulario().reset(valores);
    }

    private crearFormulario(configuracion?: IConfiguracionCxp): FieldTree<IConfiguracionCxp> {
        const model = signal<IConfiguracionCxp>({...CONFIGURACION_GENERAL_CXC_VACIA});
        return form<IConfiguracionCxp>(model, (campo) => {
            required(campo.idMonedaBase, { message: 'La moneda es obligatoria.' });
            required(campo.diasToleranciaVencimiento, { message: 'Los dias de tolerancia son obligatorios.' });
        });
    }
}