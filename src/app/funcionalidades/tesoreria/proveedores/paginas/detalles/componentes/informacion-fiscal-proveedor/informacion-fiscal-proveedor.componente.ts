import { Component, computed, signal } from "@angular/core";
import { FieldTree, FormField, form } from "@angular/forms/signals";
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import { IOpcionSelector } from "@compartido/interfaces/selector.interface";

interface IInformacionFiscalProveedorForm {
    idRegimenFiscal: string;
    idTipoIva: string;
    cuentaContable: string;
}

const INFORMACION_FISCAL_VACIO: IInformacionFiscalProveedorForm = {
    idRegimenFiscal: '',
    idTipoIva: '',
    cuentaContable: ''
};

@Component({
    selector: 'app-informacion-fiscal-proveedor',
    templateUrl: './informacion-fiscal-proveedor.componente.html',
    imports: [ButtonDirective, EtiquetaFormularioComponente, FormField, InputText, MensajeAyudaErrorComponente, Select]
})
export class InformacionFiscalProveedorComponente {
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

    protected readonly formulario: FieldTree<IInformacionFiscalProveedorForm> = this.crearFormulario();
    readonly tieneInformacionPendiente = computed(() => this.formulario().dirty());

    guardar(): void {
        this.formulario().reset({
            idRegimenFiscal: String(this.formulario.idRegimenFiscal().value() ?? ''),
            idTipoIva: String(this.formulario.idTipoIva().value() ?? ''),
            cuentaContable: String(this.formulario.cuentaContable().value() ?? '').trim()
        });
    }

    private crearFormulario(): FieldTree<IInformacionFiscalProveedorForm> {
        const modelo = signal<IInformacionFiscalProveedorForm>({ ...INFORMACION_FISCAL_VACIO });
        return form(modelo, () => {});
    }
}
