import { Component, computed, signal } from "@angular/core";
import { FieldTree, FormField, form } from "@angular/forms/signals";
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { IOpcionSelector } from "@compartido/interfaces/selector.interface";

interface IInformacionFiscalClienteForm {
    idRegimenFiscal: string;
    cuentaContable: string;
    idTipoIva: string;
    idUsoCfdiPredeterminado: string;
}

const INFORMACION_FISCAL_VACIO: IInformacionFiscalClienteForm = {
    idRegimenFiscal: '',
    cuentaContable: '',
    idTipoIva: '',
    idUsoCfdiPredeterminado: ''
};

@Component({
    selector: 'app-informacion-fiscal-cliente',
    templateUrl: './informacion-fiscal-cliente.componente.html',
    imports: [ButtonDirective, EtiquetaFormularioComponente, FormField, InputText, Select]
})
export class InformacionFiscalClienteComponente {
    readonly opcionesRegimen: IOpcionSelector[] = [
        { etiqueta: '601 · General de Ley Personas Morales', valor: '601 · General' },
        { etiqueta: '612 · Personas Físicas con Actividades Empresariales', valor: '612 · PFAE' },
        { etiqueta: '616 · Sin obligaciones fiscales', valor: '616 · Sin obligaciones' }
    ];
    readonly opcionesIva: IOpcionSelector[] = [
        { etiqueta: 'IVA 16%', valor: 'IVA 16%' },
        { etiqueta: 'IVA 8%', valor: 'IVA 8%' },
        { etiqueta: 'Exento', valor: 'Exento' }
    ];
    readonly opcionesUsoCfdi: IOpcionSelector[] = [
        { etiqueta: 'G01 · Adquisición de mercancías', valor: 'G01' },
        { etiqueta: 'G03 · Gastos generales', valor: 'G03' },
        { etiqueta: 'I01 · Ingresos por ventas', valor: 'I01' }
    ];

    protected readonly formulario: FieldTree<IInformacionFiscalClienteForm> = this.crearFormulario();
    readonly tieneInformacionPendiente = computed(() => this.formulario().dirty());

    guardar(): void {
        this.formulario().reset({
            idRegimenFiscal: String(this.formulario.idRegimenFiscal().value() ?? ''),
            cuentaContable: String(this.formulario.cuentaContable().value() ?? '').trim(),
            idTipoIva: String(this.formulario.idTipoIva().value() ?? ''),
            idUsoCfdiPredeterminado: String(this.formulario.idUsoCfdiPredeterminado().value() ?? '')
        });
    }

    private crearFormulario(): FieldTree<IInformacionFiscalClienteForm> {
        const modelo = signal<IInformacionFiscalClienteForm>({ ...INFORMACION_FISCAL_VACIO });
        return form(modelo, () => {});
    }
}
